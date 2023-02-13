chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension loading...");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.scheme != "dark") {
            chrome.action.setIcon({
                path: {
                    128: "icon/icon128_light.png",
                    48: "icon/icon48_light.png",
                    16: "icon/icon16_light.png",
                },
            });
        } else {
            chrome.action.setIcon({
                path: {
                    128: "icon/icon128_dark.png",
                    48: "icon/icon48_dark.png",
                    16: "icon/icon16_dark.png",
                },
            });
        }
    });
});
