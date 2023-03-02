
import React, { useEffect } from 'react';
import Menu from "./Menu/Menu";
import { useStore, Settings } from './Store';

type RootComponentProps = {
    loaded_settings: Settings
}

const RootComponent = ({ loaded_settings }: RootComponentProps) => {

    const { settings, initialize, addCustomHost } = useStore();

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
        registerToBackground()
        // update state with local settings if not yet done
        if (!settings.ready) {
            initialize(loaded_settings)
        }

        // only do this if local settings are loaded
        if (settings.ready) {
            const detected_hostname = location.hostname
            if (!settings.custom_hosts.includes(detected_hostname)) {
                addCustomHost(detected_hostname)
            }
        }
    }

    useEffect(() => {
        init();
    }, [settings.ready])

    return (
        <React.StrictMode>
            <Menu></Menu>
        </React.StrictMode>
    );
};

export default RootComponent;