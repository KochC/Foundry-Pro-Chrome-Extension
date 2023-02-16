import styled from 'styled-components';
import ManageExistingLinks from './ManageCustomLinks';
import extension_icon from '../../icon/icon48_dark.png'
import { Tag } from "@blueprintjs/core";

const SettingsContainer = styled.div`
    width: 600px;
`

const Logo = styled.img`
    margin-bottom: -4.5px;
    margin-right: 5px;
`

const Settings = () => {
    return (
        <SettingsContainer>
            <nav className="bp4-navbar bp4-dark">
                <div>
                    <div className="bp4-navbar-group bp4-align-left">
                        <div className="bp4-navbar-heading">
                            <Logo height="20px" src={extension_icon} />Foundry-Pro</div>
                    </div>
                    <div className="bp4-navbar-group bp4-align-right">
                        <Tag>
                            {"Release Version 1.34"}
                        </Tag>
                    </div>
                </div>
            </nav>
            <ManageExistingLinks />
            <p className="bp4-text-muted bp4-text-small" style={{ textAlign: "center" }}>
                This chrome extension is open-source and was started by <a href="http://koch.codes">koch.codes</a>. It uses <br /> the open source Blueprint framework from Palantir for UI components.
            </p>
        </SettingsContainer >
    );
};

export default Settings;