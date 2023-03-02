
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import $ from "jquery";

import RootComponent from './RootComponent'
import Popup from './Popup/Popup'
import { Settings } from './Store';
import { load_store } from './chrome_store';
import { version, branch, commit } from './version'

const attachComponentToWebsite = (n: HTMLElement, tmp_store: Settings) => {

  // attaching the component to the existing website
  const menu: HTMLElement = document.createElement('div')
  menu.setAttribute("id", "pf_menu_89345h0ade")
  $(menu).prependTo(n);
  const domNode: any = document.getElementById("pf_menu_89345h0ade")
  const root = ReactDOM.createRoot(domNode);

  root.render(
    <React.StrictMode>
      <RootComponent loaded_settings={tmp_store} />
    </React.StrictMode>
  );
}

const attachComponentToPopup = (n: any) => {
  const popup = ReactDOM.createRoot(n);
  popup.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}

const welcomeConsoleMessage = () => {
  console.log('\n' +
    '********************************' + '\n\n' +
    '   Foundry Pro' + '\n' +
    '   Version: ' + version + '\n' +
    '   Branch:  ' + branch + '\n' +
    '   Commit:  ' + commit + '\n\n' +
    '******************************** \n\n')
}

const tryToInit = (restored_settings: Settings) => {
  if (counter < 10) {
    counter++;
    // try to init menu
    // this part tries to find the following element on every website
    // this can be optimized and limited by setting a custom host
    var p = document.getElementById("pf_popup_container")
    if (p !== null) {
      console.log("Init popup")
      if (init_interval != null)
        clearInterval(init_interval);
      attachComponentToPopup(p);
      return;
    }

    // check if custom hosts are setup
    if (restored_settings.custom_hosts.length > 0) {
      // if setup, check if this host is allowed
      if (!restored_settings.custom_hosts.includes(window.location.host)) {
        // if none is allowed, stop execution
        if (init_interval != null)
          clearInterval(init_interval);
        return;
      }
    }

    // this code only runs if no host was setup or the host is allowed
    var n: HTMLElement = $('[class^="workspace-shell-ui__sidebar-grouped-menu-container__"]')[0];
    if (n !== undefined) {
      welcomeConsoleMessage()

      // try to clear interval
      if (init_interval != null)
        clearInterval(init_interval);

      // init main component
      attachComponentToWebsite(n, restored_settings);
      return;
    }

  } else {
    // stop trying because there is no foundry installation
    if (init_interval != null) {
      clearInterval(init_interval);
      init_interval = null
      return;
    }
  }
}

var counter = 0;
var init_interval: NodeJS.Timer | null = null;

const start = async () => {
  let restored_settings: Settings;
  try {
    restored_settings = await load_store()
  }
  catch (e) {
    console.log(e)
  }

  init_interval = setInterval(() => tryToInit(restored_settings), 100);
}

$(document).ready(function () {
  start()
});



