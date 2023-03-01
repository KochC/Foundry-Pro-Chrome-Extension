import { useEffect } from 'react';
import { MenuItem, ToastProps } from "@blueprintjs/core";
import { Store } from '../Store'

type DevelopmentTokenProps = {
    store: Store;
    toast: (msg: string, intent: ToastProps['intent'], icon: ToastProps['icon']) => void;
}

const DevelopmentToken = ({ store, toast }: DevelopmentTokenProps) => {

    const copyDevelopmentToken = (event: any) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + store.session_token.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: "Dev token created by Foundry-Pro. This token is only valid for " + store.token_manager.dev_token_ttl + "s and will auto expire.",
                name: "foundry-pro-dev-token-" + store.token_manager.dev_token_ttl,
                secondsToLive: store.token_manager.dev_token_ttl,
            })
        };

        fetch("/multipass/api/tokens", requestOptions)
            .then(res => res.json())
            .then((result) => {
                navigator.clipboard.writeText(result.access_token);
                toast("Development token was copied to clipboard!", "success", 'tick')
            },
                (error) => {
                    toast("Something went wrong!", "danger", 'error')
                }
            )
    }

    const init = async () => {
    }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            {
                store.token_manager.dev_token_state ?
                    <MenuItem icon="bug" text="Copy development token" onClick={copyDevelopmentToken} /> : ""
            }
        </>
    );
};

export default DevelopmentToken;