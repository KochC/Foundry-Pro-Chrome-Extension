import React from 'react';
import styled from 'styled-components';
import Item from './Item'

const Row = styled.li`
    padding: 2px;
    background: green;
`

const MenuContainer = styled.ul`
    margin: 0;
    padding: 0;
`

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('element clicked');
  };

const Menu = () => {
  return (
    <MenuContainer>
        <Item name="Global Resource Queue" callback={handleClick} />
        <Item name="Copy Session Token" callback={handleClick} />
        <Item name="Copy Development Token" callback={handleClick}/>
    </MenuContainer>
  );
};

export default Menu;