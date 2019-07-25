'use strict';

var currentTime = new Date();
chrome.storage.local.set({startTime: currentTime.getTime()}, function() {
  console.log("Saved session start time of " + currentTime);
});
