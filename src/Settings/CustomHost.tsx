
import { useState, useEffect } from 'react';
import { H5, Callout, Tag, ControlGroup, InputGroup, Button, Icon } from "@blueprintjs/core";
import { useStore } from '../Store'
import styled from 'styled-components';

const Space = styled.div`
    padding-right: 5px;
    padding-bottom: 5px;
    display: inline-block;
`

const CustomHost = () => {

    const { settings, addCustomHost, removeCustomHost } = useStore()
    const [host, setHost] = useState<string>("")

    const init = async () => { }

    const remove = (host: string) => {
        removeCustomHost(host)
    }

    const add = () => {
        addCustomHost(host)
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
                settings.custom_hosts.length > 0 ? <p className="bp4-text-muted bp4-text-small">
                    We detected the following host:
                </p> : ""
            }
            {
                settings.custom_hosts.length > 0 ?
                    settings.custom_hosts.map((host) =>
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