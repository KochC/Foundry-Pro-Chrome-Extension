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
const load_config = async () => {
    // load everything from store
    console.log("load_config");
    const response = await chrome.storage.sync.get(null);
    console.log("store", response);

    // check if the store is still empry
    if (JSON.stringify(response) === "{}") {
        // if empty, we save the initial state
        save_config(store);
    } else {
        // if not empry, we set is as new store
        store = response;
    }
    // send update to all connected clients
    update_client();
};

const save_config = async (s) => {
    // save everything to storage
    await chrome.storage.sync.set(s);
};

const update_client = () => {
    // this only updates the tabs, not the popup
    console.log("send update to clients");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "update_client", payload: { store } },
            function (response) {}
        );
    });
};

chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome Extension loading...");
    load_config();

    chrome.storage.onChanged.addListener(load_config);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action != undefined) {
            if (request.action == "add_link") {
                // add link to store
                store.custom_links.push(request.payload);
                // save store
                save_config(store);
                // return new store
                sendResponse(store);
            } else if (request.action == "reset_links") {
                // delete all links
                store.custom_links = [];
                // save store
                save_config(store);
                // return new store
                sendResponse(store);
            } else if (request.action == "delete_link") {
                store.custom_links = store.custom_links.filter(
                    (item) => item.name !== request.name
                );
                // save store
                save_config(store);
                // return new store
                sendResponse(store);
            } else if (request.action == "request_update") {
                // this can happen from the popup and the content
                // load config
                load_config();
                // send the whole store
                sendResponse(store);
            }
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
        return true;
    });
});
