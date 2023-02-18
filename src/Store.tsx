export type LinkProps = {
    name: string,
    url: string
}

export type Store = {
    custom_links: LinkProps[],
    custom_hosts: string[]
}

export const initial_store: Store = {
    custom_links: [],
    custom_hosts: []
}

export const load_store = async () => {
    const response = await chrome.storage.sync.get(null);
    if (JSON.stringify(response) === "{}") {
        await save_store(initial_store);
    }
    return {
        custom_links: response.custom_links,
        custom_hosts: response.custom_hosts
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