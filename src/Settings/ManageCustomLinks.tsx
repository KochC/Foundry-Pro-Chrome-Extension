import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps } from '../Item';

const SettingsContainer = styled.div`
    padding: 10px 0 10px 0;
    input{
        width: calc(50% - 20px);
        float: left;
    }
    button{
        width: 40px;
        float: left;
    }
    a{
        cursor: pointer;
        text-decoration: underline;
    }
`
const Name = styled.td`

`
const Link = styled.td`
    font-style: italic;
    text-overflow: elipsis;
    verflow: hidden;
    white-space:nowrap
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
            <div>
                <p>Add your custom link:</p>
                <input onChange={changedName} value={name} placeholder='Name'></input>
                <input onChange={changedUrl} value={url} placeholder='url'></input>
                <button onClick={add_link}>Add</button>
            </div>
            <br />
            <p>Manage existing links:</p>
            <table>
                <tbody>
                    {
                        customLinks.length > 0 ? customLinks.map((link) =>
                            <tr>
                                <Name>{link.name}</Name>
                                <Link>{link.url}</Link>
                                <td>X</td>
                            </tr>
                        ) : <li>No custom links</li>
                    }
                </tbody>
            </table>
            <a onClick={reset}>Reset all</a>
        </SettingsContainer >
    );
};

export default ManageExistingLinks