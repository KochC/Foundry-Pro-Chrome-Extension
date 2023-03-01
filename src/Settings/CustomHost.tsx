import { useState, useEffect } from 'react';
import { Card, H5, Callout, Tag, ControlGroup, InputGroup, Button, Icon } from "@blueprintjs/core";
import { Store, initial_store, load_store, save_store } from '../Store'
import styled from 'styled-components';

const Space = styled.div`
    padding-right: 5px;
    padding-bottom: 5px;
    display: inline-block;
`

const CustomHost = () => {

    const [store, setStore] = useState<Store>(initial_store)
    const [host, setHost] = useState<string>("")

    const on_store_change_listener = async () => {
        setStore(await load_store())
    }

    const init = async () => {
        on_store_change_listener()
        chrome.storage.onChanged.addListener(on_store_change_listener);
    }

    const remove = (host: string) => {
        save_store(
            {
                ...store,
                custom_hosts: store.custom_hosts.filter((item) => item !== host)
            }
        )
    }

    const add = () => {
        if (!store.custom_hosts.includes(host)) {
            save_store(
                {
                    ...store,
                    custom_hosts: [...store.custom_hosts, host]
                }
            )
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <H5>
                Manually add additional hosts
            </H5>
            <p className="bp4-text-muted bp4-text-small">
                Add hosts here to allow the extension to run on multiple hosts.
            </p>
            <ControlGroup>
                <InputGroup fill={true} leftIcon="globe-network" value={host} onChange={(e) => setHost(e.target.value)} id=" text-input" placeholder="host" />
                <Button intent="primary" onClick={add}>
                    <Icon icon="add" size={16} />
                </Button>
            </ControlGroup>
            <br />
            <br />
            <H5>
                Auto detected hosts
            </H5>
            {
                store!.custom_hosts.length > 0 ? <p className="bp4-text-muted bp4-text-small">
                    We detected the following host:
                </p> : ""
            }
            {
                store!.custom_hosts.length > 0 ?
                    store!.custom_hosts.map((host) =>
                        <Space>
                            <Tag onRemove={() => { remove(host) }}>{host}</Tag>
                        </Space>
                    ) : <Callout intent="warning" title="No host detected!" icon="info-sign">
                        You can define your custom host here or simply navigate to your Foundry instance one. The extension will detect the host automatically and will limit itself on every other host from then on. If you want to set a different host or add another one, please add it manually here.
                    </Callout>
            }
            <br />
            <br />
            <Callout intent="primary" title="Privacy disclaimer" icon="info-sign">
                Please note, this chrome extension does <strong>not</strong> send any information anywhere else. It does not collect any data! The settings of this extension are saved within chromes sync storage.
            </Callout>

        </>
    );
};

export default CustomHost