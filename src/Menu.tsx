import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkProps, Item, Link } from './Item'
import Notification from './Notification';

import { mdiKeyStar, mdiKeyPlus, mdiSquareRoundedBadgeOutline, mdiChartLine } from '@mdi/js';


const MenuContainer = styled.ul`
    margin: 0;
    padding: 0;
`

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

const Menu = () => {

  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [customLinks, setCustomLinks] = useState<LinkProps[]>([])

  const init = async () => {
    // requesting an update
    const response = await chrome.runtime.sendMessage({ action: "request_update" });
    // get the whole store as a result
    // therefore only updating the custom_links
    setCustomLinks(response.custom_links)
  }

  // this function runs once at the beginning
  useEffect(() => {
    // add update listener for potential updates from the background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action == "update_client") {
        setCustomLinks(request.payload.store.custom_links)
      }
      return true;
    })
    // request an update from background.js
    init();
  }, [])


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

  const tpa_url = "/workspace/module/view/latest/ri.workshop.main.module.d3646394-3d64-469d-ba46-cb77d78ada44"
  const resource_queue = "/workspace/report/ri.report.main.report.3784a752-4b98-42c7-bfda-f02dba42f7dd"

  return (
    <div>
      <MenuContainer>
        <Item icon={mdiKeyStar} name="Copy Session Token" callback={copySessionToken} />
        <Item icon={mdiKeyPlus} name="Copy Development Token" callback={copyDevelopmentToken} />
        <Link icon={mdiSquareRoundedBadgeOutline} name="Third Party Apps" url={tpa_url} />
        <Link icon={mdiChartLine} name="Global Resource Queue" url={resource_queue} />
        {
          customLinks.length > 0 ? customLinks.map((link) => <Link icon={mdiSquareRoundedBadgeOutline} name={link.name} url={link.url} />) : ""
        }
      </MenuContainer>


      <Notification message={popupMessage} open={showPopup} closePopup={closePopup} />

    </div>
  );
};

export default Menu;