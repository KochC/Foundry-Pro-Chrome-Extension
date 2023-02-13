import React from 'react';
import styled from 'styled-components';

const Popup = styled.div`
    margin: 0;
    min-width: 200px;
    background: green;
`

const Menu = () => {
    return (
        <Popup>
            <p>Foundry-pro Chrome Extension</p>
        </Popup>
    );
};

export default Menu;