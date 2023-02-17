import styled from 'styled-components';
import extension_icon from '../../icon/icon48_dark.png'
import { Tag, AnchorButton, Navbar, Alignment, Tabs, Tab } from "@blueprintjs/core";
import { version } from '../version';
import About from './About';
import CustomHost from './CustomHost';
import CustomLinks from './CustomLinks';

const SettingsContainer = styled.div`
    width: 660px;
`

const Content = styled.div`
    padding: 20px;

    & div:focus{
        outline:none;
    }
`

const Logo = styled.img`
    margin-bottom: -4.5px;
    margin-right: 5px;
`

const Settings = () => {
    return (
        <SettingsContainer>
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
                </Navbar.Group>
            </Navbar>
            <Content>
                <Tabs
                    animate={true}
                    id="TabsExample"
                    key={"vertical"}
                    renderActiveTabPanelOnly={true}
                    vertical={true}
                >
                    <Tab id="rx" title="Custom Links" panel={<CustomLinks />} />
                    <Tab id="ng" title="Custom Host" panel={<CustomHost />} />
                    <Tab id="mb" title="About" panel={<About />} panelClassName="ember-panel" />
                    <Tabs.Expander />
                </Tabs>
            </Content>
        </SettingsContainer >
    );
};

export default Settings;