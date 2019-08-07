"use strict";

const TOTAL_SESSIONS = "totalSessions";
const TOTAL_SESSION_TIME = "totalSessionTime";
const TOTAL_TABS = "totalTabsOpen";

chrome.windows.onCreated.addListener(function() {
    storeNewSession()
});

chrome.tabs.onCreated.addListener(function(tab) {
    incrementKeyByValue(`tabs${tab.windowId}`, 1);
})

chrome.windows.onRemoved.addListener(function(windowId) {
    console.log(`removing window ${windowId}`);
    storeStats(windowId);
})

chrome.runtime.onInstalled.addListener(function() {
    storeNewStats();
    storeNewSession();
});

function storeNewStats() {
    storeKey(TOTAL_SESSIONS, 0);
    storeKey(TOTAL_SESSION_TIME, 0);
    storeKey(TOTAL_TABS, 0);
}


function storeStats(windowId) {
    incrementKeyByValue(TOTAL_SESSIONS, 1);
    chrome.storage.local.get([`startTime${windowId}`], function(data) {
        var sessionStartTime = new Date(parseInt(data[`startTime${windowId}`]))
        var sessionTime = (new Date()).getTime() - sessionStartTime
        incrementKeyByValue(TOTAL_SESSION_TIME, sessionTime);
        removeKey(`startTime${windowId}`);
    });
    chrome.storage.local.get([`tabs${windowId}`], function(data) {
        incrementKeyByValue(TOTAL_TABS, data[`tabs${windowId}`])
        removeKey(`tabs${windowId}`);
    });
}

function storeNewSession() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        console.log(`New session with windowId ${tabs[0].windowId}`);
        var sessionStartTime = (new Date()).getTime();
        storeKey(`startTime${tabs[0].windowId}`, sessionStartTime);
        storeKey(`tabs${tabs[0].windowId}`, tabs.length);
    });
}

function incrementKeyByValue(key, value) {
    chrome.storage.local.get([key], function(data) {
        var key_count = data[key];
        if (key_count === undefined) key_count = 0;
        console.log(`Fetched count of ${key_count} for key ${key}`);
        storeKey(key, key_count + value);
    });
}

function storeKey(key, value) {
    chrome.storage.local.set({[key]: value}, function() {
        console.log(`Stored ${value} for key ${key}`);
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