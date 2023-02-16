import React from "react";
import styled from 'styled-components'
import Icon from '@mdi/react';

const ItemContainer = styled.li`
    width: 100%;
    height: 30px;
    display: block;
    margin: 0;
    padding: 7px;
    border-radius: 3px;
    margin: 1px 7px;
    list-style-type: none;
    overflow: hidden;
    &:hover{
        background-color: rgba(28,33,39,.8)
    }
`

const IconComponent = styled.div`
    float: left;
    width: 20px;
    height: 20px;

    & svg{
        color: #8F99A8 !important;
    }
`

const LinkComponent = styled.a`
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

type ItemProps = {
    icon: string
    name: string,
    callback: React.MouseEventHandler<HTMLAnchorElement>
}

export const Item = ({ icon, name, callback }: ItemProps) => {
    return (
        <ItemContainer>
            <LinkComponent onClick={callback}>
                <IconComponent>
                    <Icon path={icon}
                        size={0.9}
                        color="#8F99A8" />
                </IconComponent>
                <Label>{name}</Label>
            </LinkComponent>
        </ItemContainer>
    );
};

export type LinkProps = {
    icon: string
    name: string,
    url: string
}

export const Link = ({ icon, name, url }: LinkProps) => {
    return (
        <ItemContainer>
            <LinkComponent href={url}>
                <IconComponent>
                    <Icon path={icon}
                        size={0.9}
                        color="#8F99A8" />
                </IconComponent>
                <Label>{name}</Label>
            </LinkComponent>
        </ItemContainer>
    );
};
