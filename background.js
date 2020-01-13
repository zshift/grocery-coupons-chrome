
let handlers = {
    'https://coupons.winndixie.com/coupons/': 'winndixie',
    'https://www.publix.com/savings/digital-coupons': 'publix'
}
let supportedSites = Object.keys(handlers);

let conditions = supportedSites.map(ss => 
    new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlEquals: ss}
    })
);

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions,
            actions: [ new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(() => {
    chrome.tabs.getSelected(undefined, tab => {
        chrome.tabs.executeScript({
            file: `clippers/${handlers[tab.url]}.js`
        })
    });
})