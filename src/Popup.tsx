import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LinkProps } from './Item';
import ManageExistingLinks from './Settings/ManageCustomLinks';
import extension_icon from '../icon/icon48_dark.png'
import { Card, H5, Button, ControlGroup, InputGroup, Tag } from "@blueprintjs/core";

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

        </SettingsContainer >
    );
};

export default Settings;