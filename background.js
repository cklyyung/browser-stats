'use strict';

chrome.windows.onCreated.addListener(function(window) {
    storeCurrentTime(window.id);
});

chrome.windows.onRemoved.addListener(function(window) {
    chrome.storage.local.remove([`startTime${window.id}`],function(){
        var error = chrome.runtime.lastError;
           if (error) {
               console.error(error);
           }
       })
})

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        storeCurrentTime(tabs[0].windowId);
    });
});

function storeCurrentTime(windowId) {
    var currentTime = new Date();
    chrome.storage.local.set({[`startTime${windowId}`]: currentTime.getTime()}, function() {
        console.log(`Saved session start time of ${currentTime} to window ${windowId}`);
    });
}