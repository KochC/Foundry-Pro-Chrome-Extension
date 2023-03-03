import { Settings, SettingsState, initial_settings } from "./Store";
import { version } from "./version";

// This function loads the data from Chrome's sync storage, which is used to store data
// that should be synchronized across all devices that the user is logged in to.
export const load_store = (): Promise<Settings> => {
    return new Promise<Settings>((resolve, reject) => {
        if (chrome.storage === undefined) {
            resolve(initial_settings);
        } else {
            chrome.storage.sync.get(null, (response) => {
                if (typeof response === "object" && response !== null) {
                    const s = response as Settings;
                    if (
                        s != undefined &&
                        s.version !== undefined &&
                        s.version === version
                    ) {
                        resolve(s);
                    } else {
                        //console.log(
                        //    "Storage Version out of date! Auto upgrade!"
                        //);
                        resolve(initial_settings);
                    }
                } else {
                    chrome.storage.sync.clear(() => {
                        //console.log(
                        //    "Error reading store. Returning initial state!"
                        //);
                        resolve(initial_settings);
                    });
                }
            });
        }
    });
};

// This function saves the given store object to Chrome's sync storage, which is used to
// store data that should be synchronized across all devices that the user is logged in to.
export const save_store = async (s: Settings): Promise<void> => {
    // console.log(s);
    return new Promise((resolve, reject) => {
        // Save the given store object to sync storage using the chrome.storage.sync API.
        if (chrome.storage === undefined) {
            resolve();
        } else {
            chrome.storage.sync.set(s, () => {
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve();
            });
        }
    });
};

// This function resets the store to its initial state by clearing the sync storage and
// saving the initial store object to it.
export const reset_store = async () => {
    if (chrome.storage === undefined) {
        return;
    } else {
        try {
            // Clear the sync storage by saving an empty object to it using the chrome.storage.sync API.
            await chrome.storage.sync.clear();

            // Save the initial store object to sync storage using the chrome.storage.sync API.
            await chrome.storage.sync.set(initial_settings);
            // console.log(initial_settings);
        } catch (e) {
            // If there was an error while resetting the store, log a warning message
            // to the console with the error details.
            console.warn(e);
        }
    }
};

// Declare an empty array of Settings objects
let settings_queue: Settings[] = [];

// Declare a variable to store a timer that can be used to repeat a function call over time or null if the interval is not set
let queue_interval: NodeJS.Timer | null = null;

// Define a function that writes the settings from the settings_queue to the store
const writeSettingsToStore = async () => {
    // Check if there are any settings in the queue
    if (settings_queue.length > 0) {
        // Remove the first element from the settings_queue and save it to the store
        await save_store(settings_queue.shift()!);
        // Log a message to indicate that the settings have been saved to the store
        // console.log("Saved to store");
    }
    // Check if the queue is empty and the interval is set
    if (settings_queue.length === 0 && queue_interval !== null) {
        // Clear the interval
        clearInterval(queue_interval);
        // Set the queue_interval to null
        queue_interval = null;
        // Log a message to indicate that the queue is going to sleep
        // console.log("Queue is going to sleep");
    }
};

// Define a function that adds settings to the settings_queue
const addSettingsToSave = (settings: Settings) => {
    // Add the settings to the settings_queue
    settings_queue.push(settings);
    // Check if the settings_queue is not empty and the interval is not set
    if (settings_queue.length > 0 && queue_interval == null) {
        // Log a message to indicate that the queue is waking up
        // console.log("Queue is waking up");
        // Set an interval to repeatedly call the writeSettingsToStore function with a delay of 100ms
        queue_interval = setInterval(writeSettingsToStore, 100);
    }
};

// Export a function that saves the settings to the Chrome store
export const saveToChromeStore = (
    state: SettingsState,
    prevState: SettingsState
) => {
    if (state.settings.ready) {
        // Add the current settings to the settings_queue
        addSettingsToSave(state.settings);
    }
};
