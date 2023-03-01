
import ReactDOM from 'react-dom/client';

import './index.css';
import $ from "jquery";

import RootComponent from './RootComponent'
import { load_store, Store } from './Store';
import { version, branch, commit } from './version'

const attachComponentToWebsite = (n: HTMLElement, tmp_store: Store) => {

  // attaching the component to the existing website
  const menu: HTMLElement = document.createElement('div')
  $(menu).prependTo(n);
  const root = ReactDOM.createRoot(menu);

  root.render(
    <RootComponent tmp_store={tmp_store} />
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

const tryToInit = (restored_settings: Store) => {

  if (counter < 10) {
    counter++;
    // try to init menu
    // this part tries to find the following element on every website
    // this can be optimized and limited by setting a custom host

    // check if custom hosts are setup
    if (restored_settings.custom_hosts.length > 0) {
      // if setup, check if this host is allowed
      if (!restored_settings.custom_hosts.includes(location.host)) {
        // if none is allowed, stop execution
        if (init_interval != null)
          clearInterval(init_interval);
        return;
      }
    }

    // this code only runs if no host was setup or the host is allowed
    var n = $('[class^="workspace-shell-ui__sidebar-grouped-menu-container__"]')[0];
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
    if (init_interval != null)
      clearInterval(init_interval);
    return;
  }
}

var counter = 0;
var init_interval: NodeJS.Timer | null = null;

const start = async () => {
  const restored_settings: Store = await load_store()
  init_interval = setInterval(() => tryToInit(restored_settings), 100);
}

start()


