import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import $ from "jquery";
import Menu from "./Menu";

import styled from "styled-components"

const MenuBorder = styled.div`
`

var counter = 10;
    var init_interval = setInterval(() => {
        if (
            document.URL.includes("foundry") ||
            document.URL.includes("palantir")
        ) {
            counter++;
            var n = $(
                '[class^="workspace-shell-ui__sidebar-grouped-menu-container__"]'
            )[0];
            if (n !== undefined || counter > 10) {
                clearInterval(init_interval);
                init(n);
            }
        } else {
            // stop trying because there is no foundry installation
          console.log("Not foundry");
          clearInterval(init_interval);
        }
    }, 1000);


function init(n: any) {

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
