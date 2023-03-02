
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProSettingsPopout from './SettingsPopout'

import {
  Toast,
  Toaster,
  Position,
  ToastProps
} from "@blueprintjs/core";

import { useStore } from '../Store'
import { CodeGuardListener } from "../Settings/CodeGuard"
import SessionToken from "./SessionToken"
import DevelopmentToken from "./DevelopmentToken"
import CustomLinks from "./CustomLinks"

const MenuWrapper = styled.ul`
  padding: 0 3px 0 7px;
  margin: 0;
  li{
    list-style: none;
  }
  > *{
    padding: 0 1px 0 0;
    > a{
      padding-left: 10px;
      margin-right: 3px;
    }
  }
`

const Menu = () => {

  const { settings } = useStore();

  const init = async () => { }

  // this function runs once at the beginning
  useEffect(() => {
    init();
  }, [])

  var toaster: Toaster;
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (msg: string, intent: ToastProps['intent'], icon: ToastProps['icon']) => {
    toaster.show({ message: msg, intent: intent, icon: icon, timeout: 5000 });
  }

  const refHandlers = {
    toaster: (ref: Toaster) => toaster = ref,
  };

  return (
    <>
      <Toaster position={Position.TOP} ref={refHandlers.toaster}>
        {toasts.map(toast => <Toast {...toast} />)}
      </Toaster>

      <MenuWrapper>
        <ProSettingsPopout />
        <SessionToken toast={addToast} />
        <DevelopmentToken toast={addToast} />
        <CustomLinks />
      </MenuWrapper>

      <CodeGuardListener />
    </>
  );
};

export default Menu;
