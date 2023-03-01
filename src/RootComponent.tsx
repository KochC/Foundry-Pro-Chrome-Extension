
import React, { useState, useEffect } from 'react';
import Menu from "./Menu/Menu";
import { Store, save_store, load_store, initial_store } from './Store';

const RootComponent = () => {

    const [store, setStore] = useState<Store>(initial_store)

    const onStoreChangeListener = async () => {
        setStore(await load_store())
    }

    const autoDetectHost = () => {
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
    }

    const attachStoreListener = () => {
        chrome.storage.onChanged.addListener(onStoreChangeListener);
    }

    const registerToBackground = () => {
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

    const init = async () => {
        await onStoreChangeListener()
        attachStoreListener();
        registerToBackground();
        autoDetectHost()
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <React.StrictMode>
            <Menu store={store}></Menu>
        </React.StrictMode>
    );
};

export default RootComponent;