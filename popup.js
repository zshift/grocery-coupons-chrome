const storeURLs = new Map([
    ["https://coupons.winndixie.com/coupons/", "winndixie"],
    ["https://www.publix.com/savings/digital-coupons", "publix"]
]);

function log(msg) {
    chrome.runtime.getBackgroundPage(bg => {
        bg.console.log("popup.js: " + msg);
    });
}

function main() {
    // Add event listeners once the DOM has fully loaded by listening for the
    // `DOMContentLoaded` event on the document, and adding your listeners to
    // specific elements when it triggers.
    document.addEventListener('DOMContentLoaded', function () {
        storeURLs.forEach((store, url) => {
            // Add buttons and click handlers for each store.
            const button = document.createElement('button');
            button.textContent = store;
            button.addEventListener('click', openStore(url));
            document.body.appendChild(button);
        })
    });
}

function openStore(url) {
    return function () {
        // Create listener to know when tab is done loading.
        // Must be done before creating the tab for fast-loading pages.
        // ^^ Just a guess, don't wanna find out later.
        chrome.runtime.getBackgroundPage(bg => {
            const log = bg.console.log;

            // Open a new tab.
            chrome.tabs.create({ url: url }, tab => {
                log(`opened tab ${JSON.stringify(tab)}`)
                // Capture the new tab's ID;
                tabId = tab.id;
            });
        });
    }
}

main();