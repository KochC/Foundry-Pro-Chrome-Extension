import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps } from '../Item';

import { Card, H5, Button, ControlGroup, InputGroup, Icon } from "@blueprintjs/core";

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
        const response = await chrome.runtime.sendMessage(
            { action: "reset_links" }
        );
        // receiving the updated list
        setCustomLinks(response.custom_links)
    }

    const add_link = async () => {
        // sending a new list enry
        const response = await chrome.runtime.sendMessage(
            { action: "add_link", payload: { icon: "a", url: url, name: name } }
        );
        // receiving the updated list
        setCustomLinks(response.custom_links)
    }

    const [customLinks, setCustomLinks] = useState<LinkProps[]>([])

    const init = async () => {
        // requesting an update
        const response = await chrome.runtime.sendMessage({ action: "request_update" });
        // get the whole store as a result
        // therefore only updating the custom_links
        setCustomLinks(response.custom_links)
    }

    useEffect(() => {
        // request first update from the background.js
        init()
    }, [])

    return (
        <SettingsContainer>
            <Card>
                <H5>
                    Add your custom links
                </H5>
                <p>
                    User interfaces that enable people to interact smoothly with data, ask better questions, and
                    make better decisions.
                </p>
                <ControlGroup>
                    <InputGroup onChange={changedName} id=" text-input" value={name} placeholder="Name" />
                    <InputGroup onChange={changedUrl} id="text-input" value={url} placeholder="Link" />
                    <Button onClick={add_link}>
                        Add
                    </Button>
                </ControlGroup>
            </Card>
            <Card>
                <H5>Manage existing links:</H5>
                <table width="100%" className="bp4-html-table bp4-compact bp4-html-table-condensed">
                    <tbody>
                        {
                            customLinks.length > 0 ? customLinks.map((link) =>
                                <tr>
                                    <TD width="180px">{link.name}</TD>
                                    <TD width="300px">{link.url}</TD>
                                    <TD width="40px"><Icon icon="delete" size={16} intent="danger" /></TD>
                                </tr>
                            ) : <li>No custom links</li>
                        }
                    </tbody>
                </table>

            </Card>
            <Card>
                <H5>Reset Settings</H5>
                <Button icon="refresh" intent="danger" text="Reset all links" onClick={reset} />
            </Card>
        </SettingsContainer >
    );
};

export default ManageExistingLinks