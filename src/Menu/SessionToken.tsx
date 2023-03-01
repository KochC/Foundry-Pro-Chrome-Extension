
import { useEffect } from 'react';
import { MenuItem, ToastProps } from "@blueprintjs/core";
import { Store, save_store } from '../Store'

type SessionTokenProps = {
    store: Store;
    toast: (msg: string, intent: ToastProps['intent'], icon: ToastProps['icon']) => void;
}

const SessionToken = ({ store, toast }: SessionTokenProps) => {

    const getSessionKeyFromCookie = () => {
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

    const copySessionToken = (event: any) => {
        const key = getSessionKeyFromCookie();
        if (key !== "") {
            navigator.clipboard.writeText(key);
            toast("Session token was copied to clipboard!", "success", 'tick')
        } else {
            toast("Something went wrong!", "danger", 'error')
        }
    };

    const init = async () => {
        save_store(
            {
                ...store,
                session_token:
                {
                    token: getSessionKeyFromCookie(),
                    valid_until: null
                }
            }
        )
    }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            {
                store.token_manager.session_token_state ?
                    <MenuItem icon="key" text="Copy session token" onClick={copySessionToken} /> : ""
            }
        </>
    );
};

export default SessionToken;