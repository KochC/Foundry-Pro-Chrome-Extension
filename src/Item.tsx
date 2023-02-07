import { useEffect, useRef } from "react";
import styled from 'styled-components'

const ItemContainer = styled.li`
    width: 100%;
    height: 30px;
    display: block;
    margin: 0;
    padding: 7px;
    border-radius: 3px;
    margin: 1px 7px;
    list-style-type: none;

    &:hover{
        background-color: rgba(28,33,39,.8)
    }
`

const Icon = styled.div`
    float: left;
    width: 20px;
    height: 20px;

    & svg{
        color: #8F99A8 !important;
    }
`

const Link = styled.a`
    display: block;
    width: 100%;
    height: 100%;
    color: #8F99A8;
`

const Label = styled.div`
    float: left;
    margin-left: 7px;
    margin-right: 10px;
    width: auto;
    color: white;
`

type ItemProps = {
    name: string,
    callback: React.MouseEventHandler<HTMLAnchorElement>
}

const Item = ({ name, callback }: ItemProps) => {
    return (
        <ItemContainer>
            <Link onClick={ callback }>
                <Icon>
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 3C5 3 3 5 3 7.5S5 12 7.5 12C9.5 12 11.1 10.8 11.7 9H15V12H18V9H21V6H11.7C11.1 4.2 9.5 3 7.5 3M7.5 6C8.3 6 9 6.7 9 7.5S8.3 9 7.5 9 6 8.3 6 7.5 6.7 6 7.5 6M12 14L10.9 16.6L8 16.9L10.2 18.8L9.5 21.6L12 20.1L14.4 21.6L13.8 18.8L16 16.9L13.1 16.7L12 14Z" /></svg>
                </Icon>
                <Label>{name}</Label>
            </Link>
        </ItemContainer>
    );
};

export default Item;
