"use strict";

const script = document.createElement("script");
script.setAttribute("type", "module");
//script.setAttribute("src", chrome.runtime.getURL("content.js"));
const head =
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement;
head.insertBefore(script, head.lastChild);

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    console.log("dark");
    chrome.runtime.sendMessage({ scheme: "dark" });
} else {
    console.log("light");
    chrome.runtime.sendMessage({ scheme: "light" });
}
