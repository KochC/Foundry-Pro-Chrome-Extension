chrome.runtime.onInstalled.addListener(() => {
    console.log("Foundry Pro Chrome Extension");

    chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
            // registering a active client and showing it in the icon
            if (request.action != undefined) {
                if (request.action == "register") {
                    chrome.action.setBadgeText(
                        { text: "ON", tabId: sender.tab.id },
                        (r) => {
                            console.log(r);
                        }
                    );
                }
                return false;
            }

            if (request.schema != undefined) {
                if (request.scheme == "light") {
                    chrome.action.setIcon({
                        path: {
                            128: "icon/icon128_light.png",
                            48: "icon/icon48_light.png",
                            16: "icon/icon16_light.png",
                        },
                    });
                } else if (request.schema == "dark") {
                    chrome.action.setIcon({
                        path: {
                            128: "icon/icon128_dark.png",
                            48: "icon/icon48_dark.png",
                            16: "icon/icon16_dark.png",
                        },
                    });
                }
            }
        }
    );
});
