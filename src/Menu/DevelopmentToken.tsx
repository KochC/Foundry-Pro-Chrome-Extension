import { useEffect } from 'react';
import { MenuItem, ToastProps } from "@blueprintjs/core";
import { useStore } from '../Store'

type DevelopmentTokenProps = {
    toast: (msg: string, intent: ToastProps['intent'], icon: ToastProps['icon']) => void;
}

const DevelopmentToken = ({ toast }: DevelopmentTokenProps) => {

    const { settings } = useStore()

    const copyDevelopmentToken = (event: any) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + settings.token_manager.current_session_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: "Dev token created by Foundry-Pro. This token is only valid for " + settings.token_manager.dev_token_ttl + "s and will auto expire.",
                name: "foundry-pro-dev-token-" + settings.token_manager.dev_token_ttl,
                secondsToLive: settings.token_manager.dev_token_ttl,
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

    const init = async () => { }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])


    return (
        <>
            {
                settings.token_manager.dev_token_state ?
                    <MenuItem icon="bug" text="Copy development token" onClick={copyDevelopmentToken} /> : ""
            }
        </>
    );
};

export default DevelopmentToken;