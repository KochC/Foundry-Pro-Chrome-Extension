import React from "react";

import styled from 'styled-components';

const Box = styled.div`
    width: 432px;
    max-width: 500px;
    height: auto;
    z-index: 1000;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #2d72d2;
    border-radius: 2px;
    padding: 10px 8px;
    transition: top 0.25s ease-in-out;
    box-shadow: 0 5px 10px 0px rgb(0 0 0 / 20%);

    &.open{
        top: 39px;
    }
    &.closed{
        top: -50px;
    }
`

const CloseIcon = styled.div`
    float: right;
    width: 18px;
    height: 18px;
    cursor: pointer;
    & svg{
        width: 100%;
        height: 100%;
    }
`

const Icon = styled.div`
    float: left;
    width: 18px;
    height: 18px;
    margin: 0 5px 0 0;
    & svg{
        width: 100%;
        height: 100%;
    }
`

interface PopupProps {
    message: string
    closePopup: () => void
    open: boolean
}

const Notification: React.FC<PopupProps> = ({ message, closePopup, open }) => {

    setTimeout(closePopup, 5000);
    return (
        <Box className={open ? "open" : "closed"}>
            <Icon><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z" /></svg></Icon>
            {message}
            <CloseIcon onClick={closePopup}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg></CloseIcon>
        </Box>
    );
};

export default Notification;
