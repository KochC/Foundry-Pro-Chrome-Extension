import { useState, useEffect } from 'react';
import { Card, H5, Switch, NumericInput } from "@blueprintjs/core";
import { Store, initial_store, load_store, save_store } from '../Store'

const CodeGuard = () => {

    const [store, setStore] = useState<Store>(initial_store)

    const on_store_change_listener = async () => {
        setStore(await load_store())
    }

    const init = async () => {
        on_store_change_listener()
        chrome.storage.onChanged.addListener(on_store_change_listener);
    }

    useEffect(() => {
        init()
    }, [])

    const toggle_code_quard_state = () => {
        save_store(
            {
                ...store,
                code_guard: {
                    ...store.code_guard,
                    state: !store.code_guard.state
                }
            }
        )
    }

    const code_guard_scan_interval = () => { }

    return (
        <Card>
            <H5>
                Secret Guard Settings
            </H5>
            <p className="bp4-text-muted bp4-text-small">
                The Secret Guard is a tool to identify potential threads in authoring tools such as Code-Repository.
                The intension is to detect jwt-tokens or other kinds of hard coded secrets, that should never make it into a commit.
            </p>
            <p>Code Guard is {store.code_guard.state ? "enabled" : "disabled"}.</p>

            <Switch checked={store.code_guard.state} onChange={toggle_code_quard_state} />
            <p className="bp4-text-muted bp4-text-small">
                To change the scan interval, please disable the code quard and enable again after changing the parameters.
            </p>
            <NumericInput disabled={store.code_guard.state} onValueChange={code_guard_scan_interval} fill={true} leftIcon={"stopwatch"} allowNumericCharactersOnly={true} value={store.code_guard.scan_interval} />
        </Card>
    );
};

type CodeGuardListenerProps = {
    store: Store;
}

export const CodeGuardListener = ({ store }: CodeGuardListenerProps) => {
    const [codeGuardInterval, setCodeGuardInterval] = useState<ReturnType<typeof setInterval>>()

    const init = () => {
        console.log(store.code_guard.state, codeGuardInterval)
        if (store.code_guard.state && codeGuardInterval == undefined) {
            setCodeGuardInterval(setInterval(guard_code, store.code_guard.scan_interval))
        } else if (!store.code_guard.state && codeGuardInterval != undefined) {
            clearInterval(codeGuardInterval)
            setCodeGuardInterval(undefined)
        }
    }

    useEffect(() => {
        init()
    }, [store.code_guard])

    const guard_code = () => {
        // jwt token pattern: /([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
        const regex = /([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/g;

        // query all open 'code files'
        var elements_to_guard = Array.from(document.querySelectorAll('[role=code]'))
        elements_to_guard.map((c) => {
            // query all 'lines of code'
            var lines = Array.from(c.getElementsByClassName('view-lines')[0].children)
            lines.map((l) => {
                var content = l.textContent
                const findings = content!.match(regex);
                if (findings !== null) {
                    l.classList.add("code_guard_error");
                }
            })
        })
    }

    return (
        <></>
    )
}

export default CodeGuard