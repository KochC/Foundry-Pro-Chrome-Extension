import styled from 'styled-components';
import extension_icon from '../../icon/icon48_light.png'
import { AnchorButton, Button, Tabs, Tab } from "@blueprintjs/core";
import { version } from '../version';
import About from './About';
import CustomHost from './CustomHost';
import CustomLinks from './CustomLinks';
import SecretGuard from './CodeGuard';
import { reset_store } from '../Store';
import React, { useEffect } from 'react';

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

const Box = styled.div`
    min-width: 300px;
    width: 100%;
    max-width: 700px;
`

const Logo = styled.img`
    margin-bottom: -4.5px;
    margin-right: 5px;
`
const PopoverHeader = styled.div`
    background: rgb(179,179,179);
    background: linear-gradient(0deg, rgba(230,230,230,1) 0%, rgba(240,240,240,1) 100%);
    padding: 20px 20px 5px;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid lightgray;
    > h3{
        font-size: 22px;
        font-weight: normal;
        display: inline-block;
    }
`

const PopoverBody = styled.div`
    background: white;
    border-radius: 0 0 3px 3px;
    display: flex;
    padding: 10px;

    & .bp4-tab-list{
        border-right: 1px solid lightgray;
        padding-right: 10px;
    }

    & .bp4-tab-panel{
        padding-left: 10px !important;
    }
`

const PopoverFooter = styled.div`
    border-top: 1px solid lightgray;
    background: white;
    border-radius: 0 0 3px 3px;
    background: rgb(240,240,240);
    display: flex;
    padding: 10px;
`

const Settings = () => {
    let ref = React.createRef<HTMLInputElement>();
    const reset = () => {
        reset_store()
    }

    useEffect(() => {
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

        chrome.runtime.sendMessage({
            action: "resize",
            clientHeight: ref.current?.scrollHeight,
            clientWidth: ref.current?.scrollWidth
        });
    }, [])

    return (
        <Box>
            <PopoverHeader ref={ref}>
                <Logo height="25px" src={extension_icon} /><h3>Foundry Pro</h3>
                <p className="bp4-text-muted bp4-text-small">
                    {"Version " + version}. Open-source Chrome Extension to improve the developers experience on the platform.

                </p>
            </PopoverHeader>
            <PopoverBody>
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
            </PopoverBody>
            <PopoverFooter>
                <AnchorButton small minimal={true} icon="issue" text="Report an issue on Github" target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension/issues" />
                {version == "local" ?
                    <Button intent="danger" minimal={true} onClick={reset}>
                        Reset Settings
                    </Button> : ""
                }
            </PopoverFooter>
        </Box>
    );
};

export default Settings;