import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps } from '../Menu/LinkProps';

import { Card, H5, Button, Divider, ControlGroup, InputGroup, Icon, Callout } from "@blueprintjs/core";

const SettingsContainer = styled.div`
    > div{
        margin: 20px;
        overflow: hidden;
    }
`
const TD = styled.td`
    display: block;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const ManageExistingLinks = () => {

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    const changedName = (e: any) => {
        setName(e.target.value);
    }

    const changedUrl = (e: any) => {
        setUrl(e.target.value);
    }

    const reset = async () => {
        chrome.runtime.sendMessage(
            { action: "reset_links" }
        );

    }

    const add_link = async () => {
        // sending a new list enry
        chrome.runtime.sendMessage(
            { action: "add_link", payload: { icon: "a", url: url, name: name } }
        );
    }

    const [customLinks, setCustomLinks] = useState<LinkProps[]>([])

    const init = () => {
        // requesting an update
        chrome.runtime.sendMessage({ action: "request_update" }, (result) => {
            if (!window.chrome.runtime.lastError) {
                // works
            } else {
                const error = window.chrome.runtime.lastError
                // we dont care abour this error
            }
        })
    }

    const delete_item = async (item: LinkProps) => {
        // request to delete one item
        chrome.runtime.sendMessage({ action: "delete_link", name: item.name });
    }

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action == "update_client") {
                setCustomLinks(request.payload.store.custom_links)
            }
            return false;
        });
        // request first update from the background.js

        init()

    }, [])

    return (
        <SettingsContainer>
            <Card>
                <H5>
                    Add your custom links
                </H5>
                <p className="bp4-text-muted bp4-text-small">
                    Add links here to show in the side panel on the top. You can add relative and absolute links.
                </p>
                <ControlGroup>
                    <InputGroup leftIcon="new-text-box" width="180px" onChange={changedName} id=" text-input" value={name} placeholder="Name" />
                    <InputGroup leftIcon="link" fill={true} onChange={changedUrl} id="text-input" value={url} placeholder="Link" />
                    <Button intent="primary" onClick={add_link}>
                        <Icon icon="add" size={16} />
                    </Button>
                </ControlGroup>
                <br />
                <Divider />
                <br />
                <H5>Manage existing links</H5>
                <table width="100%" className="bp4-html-table bp4-compact bp4-html-table-condensed">
                    <tbody>
                        {
                            customLinks.length > 0 ? customLinks.map((link) =>
                                <tr>
                                    <TD width="180px">{link.name}</TD>
                                    <TD width="300px">{link.url}</TD>
                                    <TD width="40px"><Icon icon="cross" size={16} onClick={() => delete_item(link)} intent="danger" /></TD>
                                </tr>
                            ) : <Callout icon="info-sign" title={"No custom links setup yet"}>
                                To setup your first custom link, just fill out the form above.
                            </Callout>
                        }
                    </tbody>
                </table>

                <br />
                <Divider />
                <br />

                <H5>Reset Settings</H5>
                <Button icon="refresh" minimal intent="danger" text="Reset all links" onClick={reset} />
            </Card>
        </SettingsContainer >
    );
};

export default ManageExistingLinks