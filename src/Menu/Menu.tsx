import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProSettings from './PopoutMenuEntry'

import {
  Toast,
  Toaster,
  Position,
  ToastProps,
  MenuItem
} from "@blueprintjs/core";

import { Store, initial_store, load_store } from '../Store'
import { CodeGuardListener } from "../Settings/CodeGuard"

const Container = styled.ul`
  padding: 0 10px;
  margin: 0;
  li{
    list-style: none;
  }
`
const get_session_key = () => {
  var nameEQ = "PALANTIR_TOKEN=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      var value = c.substring(nameEQ.length, c.length);
      return value;
    }
  }
  return "";
}

const Menu = () => {

  const [store, setStore] = useState<Store>(initial_store)

  const on_store_change_listener = async () => {
    setStore(await load_store())
  }

  const init = async () => {
    on_store_change_listener()
    chrome.storage.onChanged.addListener(on_store_change_listener);

    // register to the background.js
    chrome.runtime.sendMessage({ action: "register" }, (result) => {
      if (!window.chrome.runtime.lastError) {
        // works
      } else {
        const error = window.chrome.runtime.lastError
        //console.log(error.message)
      }
    });
  }

  // this function runs once at the beginning
  useEffect(() => {
    init();
  }, [])

  const copySessionToken = (event: any) => {
    const key = get_session_key();
    if (key !== "") {
      navigator.clipboard.writeText(key);
      addToast("Session token was copied to clipboard!", "success", 'tick')
    } else {
      addToast("Something went wrong!", "danger", 'error')
    }
  };

  const copyDevelopmentToken = (event: any) => {

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + get_session_key(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "Dev token created by Foundry-Pro. This token is only valid for " + store.token_manager.dev_token_ttl + "s and will auto expire.",
        name: "foundry-pro-dev-token-" + store.token_manager.dev_token_ttl,
        secondsToLive: store.token_manager.dev_token_ttl,
      })
    };

    fetch("/multipass/api/tokens", requestOptions)
      .then(res => res.json())
      .then((result) => {
        navigator.clipboard.writeText(result.access_token);
        addToast("Development token was copied to clipboard!", "success", 'tick')
      },
        (error) => {
          addToast("Something went wrong!", "danger", 'error')
        }
      )
  }

  var toaster: Toaster;
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (msg: string, intent: ToastProps['intent'], icon: ToastProps['icon']) => {
    toaster.show({ message: msg, intent: intent, icon: icon, timeout: 5000 });
  }

  const refHandlers = {
    toaster: (ref: Toaster) => toaster = ref,
  };

  return (
    <div>
      <ProSettings store={store} ></ProSettings>
      <Container>
        {
          store.token_manager.session_token_state ?
            <MenuItem icon="key" text="Copy session token" onClick={copySessionToken} /> : ""
        }
        {
          store.token_manager.dev_token_state ?
            <MenuItem icon="bug" text="Copy development token" onClick={copyDevelopmentToken} /> : ""
        }
        {
          store.custom_links.length > 0 ? store.custom_links.map((link) => <MenuItem icon="link" text={link.name} href={link.url} />) : ""
        }
      </Container>

      <CodeGuardListener store={store} />

      <Toaster position={Position.TOP} ref={refHandlers.toaster}>
        {toasts.map(toast => <Toast {...toast} />)}
      </Toaster>
    </div>
  );
};

export default Menu;