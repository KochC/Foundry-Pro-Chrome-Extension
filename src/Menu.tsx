import React, { useState } from 'react';
import styled from 'styled-components';
import Item from './Item'
import Notification from './Notification';

import { mdiKeyStar, mdiKeyPlus } from '@mdi/js';

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


const get_session_key = () => {
  var nameEQ = "PALANTIR_TOKEN=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      var value = c.substring(nameEQ.length, c.length);
      return value;
    }
  }
  return "";
}

const create_dev_token = () => {
  return $.ajax({
    type: "POST",
    url: "/multipass/api/tokens",
    headers: {
      Authorization: "Bearer " + get_session_key(),
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      description: "short-live-dev-token",
      name: "short-live-dev-token",
      secondsToLive: 5 * 60,
    }),
    success: (data) => {
      navigator.clipboard.writeText(data.access_token);
      return data.access_token
    },
    error: (err) => {
      console.log("ERROR:");
      console.log(err);
      return "";
    },
  });
};

const Menu = () => {

  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")


  const openPopup = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const copySessionToken = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const key = get_session_key();
    if (key !== "") {
      navigator.clipboard.writeText(key);
      openPopup("Session token copied to clipboard!");
    } else {
      openPopup("Something went wrong...");
    }
  };

  const copyDevelopmentToken = (event: React.MouseEvent<HTMLAnchorElement>) => {

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + get_session_key(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "short-live-dev-token",
        name: "short-live-dev-token",
        secondsToLive: 5 * 60,
      })
    };

    fetch("/multipass/api/tokens", requestOptions)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        navigator.clipboard.writeText(result);
        openPopup("Development token copied to clipboard!");
      },
        (error) => {
          openPopup("Something went wrong...");
        }
      )
  }

  return (
    <div>
      <MenuContainer>
        <Item icon={mdiKeyStar} name="Copy Session Token" callback={copySessionToken} />
        <Item icon={mdiKeyPlus} name="Copy Development Token" callback={copyDevelopmentToken} />
      </MenuContainer>


      <Notification message={popupMessage} open={showPopup} closePopup={closePopup} />

    </div>
  );
};

export default Menu;