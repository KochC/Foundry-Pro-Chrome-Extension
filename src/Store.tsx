
const STORE_VERSION = 1
// `LinkProps` is an interface that defines the shape of an object representing a custom link
// added by the user. It has two properties: `name` and `url`, both of which are strings.
export type LinkProps = {
    name: string,
    url: string
}


// `Store` is an interface that defines the shape of the main store object used in the extension.
// It has four properties:
// - `custom_links` is an array of objects that conform to the `LinkProps` interface, representing
//   the custom links added by the user.
// - `custom_hosts` is an array of strings, representing the custom hosts added by the user.
// - `token_manager` is an object that stores settings related to the management of API access
//   tokens. It has three properties:
//   - `dev_token_state` is a boolean that determines whether or not the extension should use a
//     developer token.
//   - `dev_token_ttl` is the time-to-live of the developer token, in seconds.
//   - `session_token_state` is a boolean that determines whether or not the extension should use
//     a session token.
// - `code_guard` is an object that stores settings related to the code guard feature of the
//   extension. It has two properties:
//   - `state` is a boolean that determines whether or not the code guard feature is enabled.
//   - `scan_interval` is the time interval (in milliseconds) at which the code guard should scan
//     the code for potentially malicious or unauthorized activities.
export type Store = {
    version: number,
    custom_links: LinkProps[],
    custom_hosts: string[],
    token_manager: {
        dev_token_state: boolean,
        dev_token_ttl: number,
        session_token_state: boolean,
        session_token: {
            token: string | null,
            valid_until: Date | null,
        }
    },
    code_guard: {
        state: boolean,
        scan_interval: number
    }
}


// This is the initial store object, which serves as a template for creating a new store object.
// It is of the type `Store`, which is an interface that defines the structure of the store object.
export const initial_store: Store = {
    version: STORE_VERSION,

    // The `custom_links` property is an array of custom link objects that the user can add to the
    // extension. Each custom link object has a `title` and a `url` property.
    custom_links: [],

    // The `custom_hosts` property is an array of custom host objects that the user can add to the
    // extension. Each custom host object has a `host` property.
    custom_hosts: [],

    // The `token_manager` property is an object that stores settings related to the management of
    // API access tokens. It has three properties: `dev_token_state`, `dev_token_ttl`, and
    // `session_token_state`. `dev_token_state` is a boolean that determines whether or not the
    // extension should use a developer token. `dev_token_ttl` is the time-to-live of the developer
    // token, in seconds. `session_token_state` is a boolean that determines whether or not the
    // extension should use a session token.
    token_manager: {
        dev_token_state: true,      // true = enabled, false = disabled
        dev_token_ttl: 5 * 60,      // set default to 5 min
        session_token_state: true,  // true = enabled, false = disabled
        session_token: {
            token: null,
            valid_until: null
        },
    },

    // The `code_guard` property is an object that stores settings related to the code guard feature
    // of the extension. It has two properties: `state` and `scan_interval`. `state` is a boolean
    // that determines whether or not the code guard feature is enabled. `scan_interval` is the
    // time interval (in milliseconds) at which the code guard should scan the code for potentially
    // malicious or unauthorized activities.
    code_guard: {
        state: false,
        scan_interval: 1000
    }
}


// This function loads the data from Chrome's sync storage, which is used to store data
// that should be synchronized across all devices that the user is logged in to.
export const load_store = (): Promise<Store> => {
    return new Promise<Store>((resolve, reject) => {
        chrome.storage.sync.get(null, (response) => {
            console.log("Loaded", response);
            if (typeof response === 'object' && response !== null) {
                const s = response as Store;
                if (s.version !== undefined && s.version === STORE_VERSION) {
                    resolve(s);
                } else {
                    console.warn("Storage Version out of date! Auto upgrade!");
                    reset_store()
                    reject(new Error("Storage Version out of date!"));
                }
            } else {
                chrome.storage.sync.clear(() => {
                    console.warn("Error reading store. Returning initial state!")
                    resolve(initial_store);
                });
            }
        });
    });
};

// This function saves the given store object to Chrome's sync storage, which is used to
// store data that should be synchronized across all devices that the user is logged in to.
export const save_store = async (s: Store): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Save the given store object to sync storage using the chrome.storage.sync API.
        console.log("Saving", s)
        chrome.storage.sync.set(s, () => {
            console.log("Saved", s)
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        })
    });
};


// This function resets the store to its initial state by clearing the sync storage and
// saving the initial store object to it.
export const reset_store = async () => {
    try {
        // Clear the sync storage by saving an empty object to it using the chrome.storage.sync API.
        await chrome.storage.sync.clear();
        console.log("Reset store");

        // Save the initial store object to sync storage using the chrome.storage.sync API.
        await chrome.storage.sync.set(initial_store);
        console.log(initial_store);
    } catch (e) {
        // If there was an error while resetting the store, log a warning message
        // to the console with the error details.
        console.warn(e);
    }
};
