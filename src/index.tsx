import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import $ from "jquery";
import Menu from "./Menu/Menu";
import Popup from "./Settings/Popup"
import styled from "styled-components"

const MenuBorder = styled.div`
`

var counter = 0;

const init = () => {
  if (counter < 10) {
    counter++;
    // try to init menu
    var n = $('[class^="workspace-shell-ui__sidebar-grouped-menu-container__"]')[0];
    if (n !== undefined) {
      console.log("Init menu")
      if (init_interval != null)
        clearInterval(init_interval);
      init_menu(n);
      return;
    }

    // try to init popup
    var p = document.getElementById("pf_popup_container")
    if (p !== null) {
      console.log("Init popup")
      if (init_interval != null)
        clearInterval(init_interval);
      init_popup(p);
      return;
    }
  } else {
    // stop trying because there is no foundry installation
    console.log("Not foundry nor popup");

    var dummy_menu = document.createElement('div');
    dummy_menu.classList.add('dummy_menu');
    document.body.append(dummy_menu);


    var dummy_popup = document.createElement('div');
    dummy_popup.classList.add('dummy_popup');
    document.body.append(dummy_popup);

    var css_1 = document.createElement('link');
    css_1.setAttribute('rel', 'stylesheet');
    css_1.setAttribute('type', "text/css");
    css_1.href = "./node_modules/normalize.css/normalize.css"
    document.head.append(css_1)

    var css_2 = document.createElement('link');
    css_2.setAttribute('rel', 'stylesheet');
    css_2.setAttribute('type', "text/css");
    css_2.href = "./node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css"
    document.head.append(css_2)

    var css_3 = document.createElement('link');
    css_3.setAttribute('rel', 'stylesheet');
    css_3.setAttribute('type', "text/css");
    css_3.href = "./node_modules/@blueprintjs/core/lib/css/blueprint.css"
    document.head.append(css_3)


    init_popup(dummy_popup);
    init_menu(dummy_menu);

    if (init_interval != null)
      clearInterval(init_interval);
    return;
  }
}


var init_interval = setInterval(init, 100);

function init_popup(n: any) {
  const popup = ReactDOM.createRoot(n);
  popup.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}

function init_menu(n: any) {

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
