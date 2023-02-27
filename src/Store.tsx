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
    }
}

export const initial_store: Store = {
    custom_links: [],
    custom_hosts: [],
    token_manager: {
        dev_token_state: true,      // true = enabled, false = disabled
        dev_token_ttl: 5 * 60,      // set default to 5 min
        session_token_state: true   // true = enabled, false = disabled
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
            dev_token_state: response.token_manager.dev_token_state,
            dev_token_ttl: response.token_manager.dev_token_ttl,
            session_token_state: response.token_manager.session_token_state
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
    } catch (e) {
        console.warn(e);
    }
}