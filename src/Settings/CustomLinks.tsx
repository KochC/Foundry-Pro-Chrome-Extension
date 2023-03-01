import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, H5, Button, HTMLTable, ControlGroup, InputGroup, Icon, NumericInput, Tag, Switch } from "@blueprintjs/core";
import { Store, LinkProps, initial_store, load_store, save_store } from '../Store'

const SettingsContainer = styled.div`
    > div{
        margin: 0px;
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
type ManageExistingLinksProps = {
    store: Store;
}

const ManageExistingLinks = ({ store }: ManageExistingLinksProps) => {

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")


    const init = async () => {

    }

    const reset = async () => {
        save_store(
            {
                ...store,
                custom_links: []
            }
        )
    }

    const add_link = async () => {
        save_store(
            {
                ...store,
                custom_links: [...store.custom_links, { url: url, name: name }]
            }
        )
    }


    const delete_item = async (item: LinkProps) => {
        save_store(
            {
                ...store,
                custom_links: store.custom_links.filter((i) => i.name !== item.name)
            }
        )
    }

    const toggle_dev_token_state = () => {
        save_store(
            {
                ...store,
                token_manager: {
                    ...store.token_manager,
                    dev_token_state: !store.token_manager.dev_token_state
                }
            }
        )
    }

    const toggle_session_token_state = () => {
        save_store(
            {
                ...store,
                token_manager: {
                    ...store.token_manager,
                    session_token_state: !store.token_manager.session_token_state
                }
            }
        )
    }

    const dev_token_ttl_change = (ttl: number) => {
        save_store(
            {
                ...store,
                token_manager: {
                    ...store.token_manager,
                    dev_token_ttl: ttl
                }
            }
        )
    }

    useEffect(() => {
        init()
    }, [store.token_manager.dev_token_state, store.token_manager.session_token_state])

    return (
        <SettingsContainer>
            <>
                <H5>
                    Add your custom links
                </H5>
                <p className="bp4-text-muted bp4-text-small">
                    Add links here to show in the side panel on the top. You can add relative and absolute links.
                </p>
                <ControlGroup>
                    <InputGroup
                        leftIcon="new-text-box"
                        width="180px"
                        onChange={(e) => setName(e.target.value)}
                        id=" text-input"
                        value={name}
                        placeholder="Name"
                    />
                    <InputGroup
                        leftIcon="link"
                        fill={true}
                        onChange={(e) => setUrl(e.target.value)}
                        id="text-input"
                        value={url}
                        placeholder="Link"
                    />
                    <Button
                        intent="primary"
                        onClick={add_link}
                    >
                        <Icon icon="add" size={16} />
                    </Button>
                </ControlGroup>
                <br />
                <br />
                <H5>Manage existing links</H5>
                <HTMLTable compact={true} width="100%" >
                    <tbody style={{ width: "100%" }}>
                        <tr>
                            <TD style={{ width: "calc(50% - 20px)", height: "32px" }}>
                                Session Token
                            </TD>
                            <TD style={{ width: "calc(50% - 20px)", height: "32px" }}>
                                <Tag round={true} minimal={true}>default</Tag>
                            </TD>
                            <TD className='gray' style={{ width: "40px", paddingTop: "10px", height: "32px", paddingLeft: "5px" }}>
                                <Switch checked={store.token_manager.session_token_state} onChange={toggle_session_token_state} />
                            </TD>
                        </tr>
                        <tr>
                            <TD style={{ width: "calc(50% - 20px)", height: "32px" }}>
                                Development Token
                            </TD>
                            <TD style={{ width: "calc(50% - 20px)", height: "32px", paddingTop: "1px", paddingBottom: 0 }}>
                                <NumericInput disabled={!store.token_manager.dev_token_state} onValueChange={dev_token_ttl_change} fill={true} leftIcon={"stopwatch"} allowNumericCharactersOnly={true} value={store.token_manager.dev_token_ttl} />
                            </TD>
                            <TD style={{ width: "40px", paddingTop: "10px", height: "32px", paddingLeft: "5px" }}>
                                <Switch checked={store.token_manager.dev_token_state} onChange={toggle_dev_token_state} />
                            </TD>
                        </tr>
                        {
                            store.custom_links.length > 0 ? store.custom_links.map((link) =>
                                <tr>
                                    <TD style={{ width: "calc(50% - 20px)" }}>
                                        {link.name}
                                    </TD>
                                    <TD style={{ width: "calc(50% - 20px)" }}>
                                        <Tag round={true} minimal={true}>
                                            ...{link.url.substring(link.url.length - 20, link.url.length)}
                                        </Tag>
                                    </TD>
                                    <TD style={{ width: "40px" }}>
                                        <Icon style={{ cursor: "pointer" }} icon="cross" size={16} onClick={() => delete_item(link)} intent="danger" />
                                    </TD>
                                </tr>
                            ) : ""
                        }
                    </tbody>
                </HTMLTable>

                <br />
                <br />

                <H5>Reset Settings</H5>
                <Button icon="refresh" minimal intent="danger" text="Reset all links" onClick={reset} />
            </>
        </SettingsContainer >
    );
};

export default ManageExistingLinks