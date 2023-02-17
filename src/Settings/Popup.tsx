import styled from 'styled-components';
import ManageExistingLinks from './ManageCustomLinks';
import extension_icon from '../../icon/icon48_dark.png'
import { Tag, AnchorButton, Navbar, Alignment, Icon } from "@blueprintjs/core";
import { version } from '../version';

const SettingsContainer = styled.div`
    width: 600px;
    padding-bottom: 7px;
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
            <ManageExistingLinks />
            <p className="bp4-text-muted bp4-text-small" style={{ textAlign: "center" }}>
                This chrome extension is <a target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension">open-source</a> and was built with <Icon icon="heart" size={12} /> by <a target="_blank" href="http://koch.codes">koch.codes</a>. <br />
                It uses <a target="_blank" href="https://blueprintjs.com/">Blueprint</a> from Palantir for UI components.
            </p>
        </SettingsContainer >
    );
};

export default Settings;