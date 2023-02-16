import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps } from './LinkProps'

import {
  Toast,
  Toaster,
  Position,
  ToastProps,
  MenuItem,
  MenuDivider,
  Icon
} from "@blueprintjs/core";

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

const Menu2 = () => {

  const [customLinks, setCustomLinks] = useState<LinkProps[]>([])

  const init = async () => {
    // requesting an update
    const response = await chrome.runtime.sendMessage({ action: "request_update" });
    // get the whole store as a result
    // therefore only updating the custom_links
    setCustomLinks(response.custom_links)
  }

  // this function runs once at the beginning
  useEffect(() => {
    // add update listener for potential updates from the background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action == "update_client") {
        setCustomLinks(request.payload.store.custom_links)
      }
      return true;
    })
    // request an update from background.js
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
        description: "short-live-dev-token",
        name: "short-live-dev-token",
        secondsToLive: 5 * 60,
      })
    };

    fetch("/multipass/api/tokens", requestOptions)
      .then(res => res.json())
      .then((result) => {
        navigator.clipboard.writeText(result);
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
      <Container>
        <MenuItem icon="key" text="Copy session token" onClick={copySessionToken} />
        <MenuItem icon="bug" text="Copy development token" onClick={copyDevelopmentToken} />
        {
          customLinks.length > 0 ? customLinks.map((link) => <MenuItem icon="link" text={link.name} href={link.url} />) : ""
        }
      </Container>

      <Toaster position={Position.TOP} ref={refHandlers.toaster}>
        {toasts.map(toast => <Toast {...toast} />)}
      </Toaster>
    </div>
  );
};

export default Menu2;