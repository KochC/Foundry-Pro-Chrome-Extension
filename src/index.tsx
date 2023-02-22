import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import $ from "jquery";
import Menu from "./Menu/Menu";
import Popup from "./Settings/Popup"
import styled from "styled-components"

import { save_store, load_store, initial_store } from './Store';

const MenuBorder = styled.div`
`

function init_popup(n: any) {
  const popup = ReactDOM.createRoot(n);
  popup.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}

function init_menu(n: any) {
  // check if hosts are setup
  if (store.custom_hosts.length == 0) {
    // if not setup, auto configure this one
    const detected_hostname = location.hostname
    save_store(
      {
        ...store,
        custom_hosts: [detected_hostname]
      }
    )
  }

  var banner = $('[class^="workspace-shell-ui__banner"]')[0];
  if (banner !== undefined) {
    banner.classList.add("expand_by_hover");
  }

  $('<div class="pf_separator"/>').prependTo(n);
  var menu = document.createElement('div')
  menu.setAttribute("id", "pf_menu_89345h0ade")
  $(menu).prependTo(n);
  const domNode: any = document.getElementById("pf_menu_89345h0ade")
  const root = ReactDOM.createRoot(domNode);
  root.render(
    <React.StrictMode>
      <MenuBorder>
        <Menu></Menu>
      </MenuBorder>
    </React.StrictMode>
  );
}

const init = async () => {
  if (counter < 10) {

    counter++;

    // try to init popup
    // this part is needed to enable settings on every tab
    var p = document.getElementById("pf_popup_container")
    if (p !== null) {
      console.log("Init popup")
      if (init_interval != null)
        clearInterval(init_interval);
      init_popup(p);
      return;
    }


    // try to init menu
    // this part tries to find the following element on every website
    // this can be optimized and limited by setting a custom host
    store = await load_store()
    // check if custom hosts are setup
    if (store.custom_hosts.length > 0) {

      // if setup, check if this host is allowed
      if (!store.custom_hosts.includes(location.host)) {

        // if none is allowed, stop execution
        if (init_interval != null)
          clearInterval(init_interval);
        return;
      }
    }

    // this code only runs if no host was setup or the host is allowed
    var n = $('[class^="workspace-shell-ui__sidebar-grouped-menu-container__"]')[0];
    if (n !== undefined) {
      console.log("Init menu")
      if (init_interval != null)
        clearInterval(init_interval);
      init_menu(n);
      return;
    }


  } else {
    // stop trying because there is no foundry installation
    console.log("Not foundry nor popup");

    if (init_interval != null)
      clearInterval(init_interval);
    return;
  }
}

var counter = 0;
var store = initial_store;
var init_interval = setInterval(init, 100);
