import styled from 'styled-components';
import extension_icon from '../../icon/icon48_dark.png'
import { Tag, AnchorButton, Button, Navbar, Alignment, Tabs, Tab, H6 } from "@blueprintjs/core";
import { version } from '../version';
import About from './About';
import CustomHost from './CustomHost';
import CustomLinks from './CustomLinks';
import SecretGuard from './CodeGuard';
import { reset_store } from '../Store';
import React, { useEffect, useRef } from 'react';


const SettingsContainer = styled.div`
    width: 660px;    
    & div:focus{
        outline:none;
    }
    & button:focus{
        outline:none;
    }
`

const Content = styled.div`
    padding: 20px;
`

const Category = styled.p`
    color: #5F6B7C;
    margin: 0;
    padding: 20px 10px 5px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;

    &:first-of-type{
        padding-top: 0;
    }
`

const Logo = styled.img`
    margin-bottom: -4.5px;
    margin-right: 5px;
`



const Settings = () => {
    let ref = React.createRef<HTMLInputElement>();
    const reset = () => {
        reset_store()
    }

    useEffect(() => {
        console.log(ref.current)
        let normalize = document.createElement('link')
        normalize.href = "node_modules/normalize.css/normalize.css"
        normalize.rel = "stylesheet"
        ref.current?.appendChild(normalize)

        let blueprint = document.createElement('link')
        blueprint.href = "node_modules/@blueprintjs/core/lib/css/blueprint.css"
        blueprint.rel = "stylesheet"
        ref.current?.appendChild(blueprint)

        let blueprint_icons = document.createElement('link')
        blueprint_icons.href = "node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css"
        blueprint_icons.rel = "stylesheet"
        ref.current?.appendChild(blueprint_icons)
    }, [])

    return (
        <SettingsContainer ref={ref} >
            <Navbar className="bp4-dark">
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>
                        <Logo height="20px" src={extension_icon} />Foundry-Pro
                    </Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <AnchorButton small minimal={true} intent="danger" icon="issue" text="Report an issue" target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension/issues" />
                    <Navbar.Divider />
                    <Tag round={true} minimal={true}>
                        {"Release " + version}
                    </Tag>
                    {version == "local" ?
                        <Button minimal={true} onClick={reset}>
                            Reset
                        </Button> : ""
                    }
                </Navbar.Group>
            </Navbar>
            <Content>
                <Tabs
                    animate={true}
                    id="TabsExample"
                    key={"vertical"}
                    renderActiveTabPanelOnly={false}
                    vertical={true}
                >
                    <Category>General Config</Category>
                    <Tab id="rx" title="Custom Links" panel={<CustomLinks />} />
                    <Tab id="ng" title="Custom Host" panel={<CustomHost />} />
                    <Tab id="sg" title="Secret Guard" panel={<SecretGuard />} />
                    <Category>Information</Category>
                    <Tab id="mb" title="About" panel={<About />} panelClassName="ember-panel" />
                    <Tabs.Expander />
                </Tabs>
            </Content>
        </SettingsContainer >
    );
};

export default Settings;