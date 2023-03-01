export type LinkProps = {
    name: string,
    url: string
}

export type Store = {
    custom_links: LinkProps[],
    custom_hosts: string[],
    token_manager: {
        dev_token_state: boolean,
        dev_token_ttl: number,
        session_token_state: boolean
    },
    code_guard: {
        state: boolean,
        scan_interval: number
    }
}

export const initial_store: Store = {
    custom_links: [],
    custom_hosts: [],
    token_manager: {
        dev_token_state: true,      // true = enabled, false = disabled
        dev_token_ttl: 5 * 60,      // set default to 5 min
        session_token_state: true   // true = enabled, false = disabled
    },
    code_guard: {
        state: false,
        scan_interval: 1000
    }
}

export const load_store = async () => {
    const response = await chrome.storage.sync.get(null);
    if (JSON.stringify(response) === "{}") {
        await save_store(initial_store);
    }
    return {
        custom_links: response.custom_links,
        custom_hosts: response.custom_hosts,
        token_manager: {
            ...response.token_manager
        },
        code_guard: {
            ...response.code_guard
        }
    }
}

export const save_store = async (s: Store) => {
    try {
        // save everything to storage
        await chrome.storage.sync.set(s);
    } catch (e) {
        console.warn(e);
    }
};

export const reset_store = async () => {
    try {
        // save everything to storage
        await chrome.storage.sync.set({});
        console.log("Reset store")
        await chrome.storage.sync.set(initial_store);
        console.log(initial_store)
    } catch (e) {
        console.warn(e);
    }
}