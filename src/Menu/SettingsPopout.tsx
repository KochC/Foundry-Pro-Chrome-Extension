
import { useEffect } from 'react';
import styled from 'styled-components';

import extension_icon from '../../icon/icon48_dark.png'
import { PopoverInteractionKind, Button, Position } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2"
import { Store } from '../Store'
import Popup from '../Settings/Popout'

const Container = styled.li`
    box-sizing: inherit;
    height: 30px;
    line-height: 30px;
    overflow: hidden;

    > span{
        width: 100%;
        padding-right: 3px;
    }
    & .custom_menu_button{
        display: block;
        text-align: left;
        padding: 0 8px;
    }
    & .custom_menu_button:hover{
        background: 0;
    }
`

const Box = styled.div`
    border-radius: 3px;
`
const Logo = styled.img`
    margin-bottom: -4.5px;
    margin-right: 5px;
`

type PopoutMenuEntryProps = {
    store: Store;
}

const ProSettingsPopout = ({ store }: PopoutMenuEntryProps) => {

    const init = async () => {
    }

    // this function runs once at the beginning
    useEffect(() => {
        init();
    }, [])

    let popoverContent = (
        <Box>
            <Popup store={store} />
        </Box>
    );

    return (
        <Container>
            <Popover2
                inheritDarkTheme={false}
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp4-popover-content-sizing"
                content={popoverContent}
                position={Position.RIGHT_TOP}
                minimal={true}
                usePortal={true}
                modifiers={{
                    preventOverflow: { enabled: true },
                }}
            >
                <Button className='custom_menu_button' minimal={true} fill={true} ><Logo height="20px" src={extension_icon} />Foundry Pro</Button>
            </Popover2>
        </Container >
    );
};

export default ProSettingsPopout;