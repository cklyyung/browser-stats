'use strict';

chrome.windows.onCreated.addListener(function() {
    storeCurrentTime();
});

function storeCurrentTime() {
    var currentTime = new Date();
    chrome.storage.local.set({startTime: currentTime.getTime()}, function() {
    console.log("Saved session start time of " + currentTime);
    });
}