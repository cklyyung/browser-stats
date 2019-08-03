let sessionTimer = document.getElementById("session_timer");
let tabCounter = document.getElementById("tab_counter");
var savedTime;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var windowId = tabs[0].windowId;
    console.log(windowId);
    chrome.storage.local.get([`startTime${windowId}`], function(data) {
        savedTime = new Date(parseInt(data[`startTime${windowId}`]));
        console.log(`Fetched start time of ${savedTime}`);
        updateSessionTimer();
        updateTabCounter(windowId);
    });
});

function updateSessionTimer() {
    timeElapsed = calculateTimeElapsed(savedTime);
    updateTimerDisplay(timeElapsed);
    setTimeout(updateSessionTimer, 500);
  }

function calculateTimeElapsed(startTime) {
    var currentTime = new Date();
    return (currentTime - startTime) / 1000;
}

function updateTimerDisplay(timeElapsed) {
    var hours = ~~(timeElapsed / (60 * 60));
    var minutes = ~~(timeElapsed / 60);
    var seconds = ~~(timeElapsed % 60);
    sessionTimer.innerHTML = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function format(num) {
    return num < 10 ? "0" + num : num;
}

function updateTabCounter(windowId) {
    chrome.storage.local.get([`tabs${windowId}`], function(data) {
        var tab_count = data[`tabs${windowId}`];
        tabCounter.innerHTML = tab_count
    });
}
