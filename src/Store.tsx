
import { create } from "zustand"
import { saveToChromeStore } from "./chrome_store"
import { version } from "./version"

export interface TokenManagerSettings {
    dev_token_state: boolean;
    dev_token_ttl: number;
    session_token_state: boolean;
    current_session_token: string | null;
}

export interface CodeGuardSettings {
    state: boolean;
    scan_interval: 1000;
    regex: RegExp | null;
}

export interface CustomLink {
    name: string,
    url: string
}

export interface Settings {
    version: string;
    ready: boolean,
    custom_links: CustomLink[];
    custom_hosts: string[];
    token_manager: TokenManagerSettings;
    code_guard: CodeGuardSettings;
}

export const initial_settings: Settings = {
    version: version,
    ready: false,
    custom_links: [],
    custom_hosts: [],

    token_manager: {
        dev_token_state: true,      // true = enabled, false = disabled
        dev_token_ttl: 5 * 60,      // set default to 5 min
        session_token_state: true,  // true = enabled, false = disabled
        current_session_token: null,
    },

    code_guard: {
        state: false,
        scan_interval: 1000,
        regex: /("[a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*")/g
    }
}

export interface SettingsState {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    setVersion: (version: string) => void;
    addCustomHost: (host: string) => void;
    removeCustomHost: (host: string) => void;
    setSessionToken: (token: string) => void;
    toggleCodeGuardState: () => void;
    addCustomLink: (link: CustomLink) => void;
    removeCustomLink: (link: CustomLink) => void;
    toggleSessionTokenState: () => void;
    toggleDevTokenState: () => void;
    setDevTokenTTL: (ttl: number) => void;
    initialize: (settings: Settings) => void;
}

export const useStore = create<SettingsState>((set) => ({
    settings: initial_settings,
    setSettings: (settings: Settings) => {
        set((state) => ({
            settings: {
                ...settings,
            }
        }))
    },
    setVersion: (version: string) => {
        set((state) => ({
            settings: {
                ...state.settings,
                version: version
            }
        }))
    },
    addCustomHost: (host: string) => {
        set((state) => ({
            settings: {
                ...state.settings,
                custom_hosts: [...state.settings.custom_hosts, host]
            }
        }))
    },
    removeCustomHost: (host: string) => {
        set((state) => ({
            settings: {
                ...state.settings,
                custom_hosts: state.settings.custom_hosts.filter((h) => h !== host)
            }
        }))
    },
    setSessionToken: (token: string) => {
        set((state) => ({
            settings: {
                ...state.settings,
                token_manager: {
                    ...state.settings.token_manager,
                    current_session_token: token
                }
            }
        }))
    },
    toggleCodeGuardState: () => {
        set((state) => ({
            settings: {
                ...state.settings,
                code_guard: {
                    ...state.settings.code_guard,
                    state: !state.settings.code_guard.state
                }
            }
        }))
    },
    addCustomLink: (link: CustomLink) => {
        set((state) => ({
            settings: {
                ...state.settings,
                custom_links: [...state.settings.custom_links, link]
            }
        }))
    },
    removeCustomLink: (link: CustomLink) => {
        set((state) => ({
            settings: {
                ...state.settings,
                custom_links: state.settings.custom_links.filter((i) => i.name !== link.name)
            }
        }))
    },
    toggleSessionTokenState: () => {
        set((state) => ({
            settings: {
                ...state.settings,
                token_manager: {
                    ...state.settings.token_manager,
                    session_token_state: !state.settings.token_manager.session_token_state
                }
            }
        }))
    },
    toggleDevTokenState: () => {
        set((state) => ({
            settings: {
                ...state.settings,
                token_manager: {
                    ...state.settings.token_manager,
                    dev_token_state: !state.settings.token_manager.dev_token_state
                }
            }
        }))
    },
    setDevTokenTTL: (ttl: number) => {
        set((state) => ({
            settings: {
                ...state.settings,
                token_manager: {
                    ...state.settings.token_manager,
                    dev_token_ttl: ttl
                }
            }
        }))
    },
    initialize: (settings: Settings) => {
        set((state) => ({
            settings: {
                ...settings,
                ready: true
            }
        }))
    }
}))

const state_change_callback = (current: SettingsState, previous: SettingsState) => {
    saveToChromeStore(current, previous)
}
const subscriber = useStore.subscribe(state_change_callback)