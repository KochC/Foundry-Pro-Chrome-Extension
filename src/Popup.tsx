import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiXml } from '@mdi/js';
import extension_icon from '../icon/icon48_dark.png'

const Popup = styled.div`
    width: 270px;
    max-width: 500px;
    height: auto;
    background-color: #2d72d2;
    border-radius: 2px;
    padding: 10px 8px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.2858142857;
    text-transform: none;
    color: #F6F7FC;
    font-family: Source-Sans-Pro,Helvetica,sans-serif,blueprint-icons-16;

    & img{
        width: 20px;
        height: 20px;
        margin-bottom: -5px;
    }

    & p{
        margin: 0;
        padding: 0;
    }

    & a{
        color: white;
    }
`

const Menu = () => {
    return (
        <Popup>
            <p>
                <img src={extension_icon} /> Foundry-pro Chrome Extension
            </p>
            <p>
                <br />
                Please report issues or feature requests <a target="_blank" href="https://github.com/KochC/Foundry-Pro-Chrome-Extension/issues">here</a>.
            </p>
        </Popup >
    );
};

export default Menu;