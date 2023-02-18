/*
type LinkProps = {
    icon: string
    name: string,
    url: string
}

type store = {
    custom_links: LinkProps[]
}
*/

var store = {
    custom_links: [],
};
const load_config = async (send_update = true) => {
    try {
        // load everything from store
        const response = await chrome.storage.sync.get(null);

        // check if the store is still empry
        if (JSON.stringify(response) === "{}") {
            // if empty, we save the initial state
            save_config(store);
        } else {
            // if not empry, we set is as new store
            store = response;
        }
        // send update to all connected clients
        if (send_update) {
            update_client();
        }
    } catch (e) {
        console.warn(e);
    }
};

const save_config = async (s) => {
    try {
        // save everything to storage
        await chrome.storage.sync.set(s);
    } catch (e) {
        console.warn(e);
    }
};

const update_client = () => {
    // this only updates the tabs, not the popup
    const payload = {
        action: "update_client",
        payload: { store },
    };

    // update popup
    chrome.runtime.sendMessage(payload, (response) => {
        if (!chrome.runtime.lastError) {
            // everything good
        } else {
            error = chrome.runtime.lastError;
            // receiving end toes not exists, which is fine
        }
    });

    // update tabs
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            try {
                chrome.tabs.sendMessage(tabs[0].id, payload, (response) => {
                    if (!chrome.runtime.lastError) {
                        // everything good
                    } else {
                        error = chrome.runtime.lastError;
                        // receiving end toes not exists, which is fine
                    }
                });
            } catch (e) {
                console.warn(e);
            }
        }
    });
};

chrome.runtime.onInstalled.addListener(() => {
    console.log("Foundry Pro Chrome Extension");
    load_config(false);

    chrome.storage.onChanged.addListener(load_config);

    chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
            if (request.action != undefined) {
                if (request.action == "add_link") {
                    // add link to store
                    store.custom_links.push(request.payload);
                    // save store
                    save_config(store);
                    // return new store
                    return false;
                } else if (request.action == "reset_links") {
                    // delete all links
                    store.custom_links = [];
                    // save store
                    save_config(store);
                    // return new store
                    return false;
                } else if (request.action == "delete_link") {
                    store.custom_links = store.custom_links.filter(
                        (item) => item.name !== request.name
                    );
                    // save store
                    save_config(store);
                    // return new store
                    return false;
                } else if (request.action == "request_update") {
                    // this can happen from the popup and the content
                    // load config
                    load_config();
                    // close channel, because update will be send asynchronous
                    return false;
                }
            }

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
