'use strict';

chrome.windows.onCreated.addListener(function() {
    storeNewSession()
});

chrome.tabs.onCreated.addListener(function(tab) {
    incrementTabCount(tab.windowId);
})

chrome.windows.onRemoved.addListener(function(windowId) {
    removeKey(`startTime${windowId}`);
    removeKey(`tabs${windowId}`);
})

chrome.runtime.onInstalled.addListener(function() {
    storeNewSession();
});

function storeNewSession() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        storeCurrentTime(tabs[0].windowId);
        storeTabCount(tabs[0].windowId, tabs.length);
    });
}

function storeCurrentTime(windowId) {
    var currentTime = new Date();
    chrome.storage.local.set({[`startTime${windowId}`]: currentTime.getTime()}, function() {
        console.log(`Saved session start time of ${currentTime} to window ${windowId}`);
    });
}

function incrementTabCount(windowId) {
    chrome.storage.local.get([`tabs${windowId}`], function(data) {
        var tab_count = data[`tabs${windowId}`];
        if (tab_count === undefined) tab_count = 0
        console.log(`Fetched old tab count of ${tab_count} for window ${windowId}`);
        storeTabCount(windowId, tab_count + 1);
    });
}

function storeTabCount(windowId, tab_count) {
    chrome.storage.local.set({[`tabs${windowId}`]: tab_count}, function() {
        console.log(`Stored tab count ${tab_count} to window ${windowId}`);
    });
}

function removeKey(key) {
    console.log(`Removing ${key}`)
    chrome.storage.local.remove([key],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       });
}