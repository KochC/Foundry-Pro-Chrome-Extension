
import React, { useState, useEffect } from 'react';
import Menu from "./Menu/Menu";
import { Store, save_store, load_store, initial_store } from './Store';


type RootComponentProps = {
    tmp_store: Store;
}

const RootComponent = ({ tmp_store }: RootComponentProps) => {

    const [store, setStore] = useState<Store>(initial_store)

    const onStoreChangeListener = async () => {
        console.log("STORE CHANGED")
        setStore(await load_store())
        console.log("STORE CHANGED")
    }

    const getHostInfo = () => {
        const detected_hostname = location.hostname
        if (!store.custom_hosts.includes(detected_hostname)) {
            console.log("SAVE CUSTOM_HOST")
            save_store(
                {
                    ...store,
                    custom_hosts: [...store.custom_hosts, detected_hostname]
                }
            ).then(() => {
                console.log(store.token_manager.session_token)
                console.log("SAVED SHOST")
            })
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
        setStore(tmp_store)
        getHostInfo()
        registerToBackground()
        attachStoreListener()
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