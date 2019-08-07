const TOTAL_SESSIONS = "totalSessions";
const TOTAL_SESSION_TIME = "totalSessionTime";
const TOTAL_TABS = "totalTabsOpen";

let sessionsOpened = document.getElementById("total_sessions");
let totalSessionTime = document.getElementById("total_session_time");
let totalTabsOpened = document.getElementById("total_tabs_opened");
let clearButton = document.getElementById("clear_button");

setStatDisplays();

clearButton.addEventListener('click', function() {
    clearStats();
    setStatDisplays();
  })

function setStatDisplays() {
    setTotalSessions();
    setTotalSessionTime();
    setTotalTabs();
}

function setTotalSessions() {
    chrome.storage.local.get([TOTAL_SESSIONS], function(data) {
        numSessions = data[TOTAL_SESSIONS];
        if (numSessions == undefined) numSessions = 0;
        sessionsOpened.innerHTML = numSessions
    });
}

function setTotalSessionTime() {
    chrome.storage.local.get([TOTAL_SESSION_TIME], function(data) {
        sessionTime = data[TOTAL_SESSION_TIME];
        if (sessionTime == undefined) sessionTime = 0;
        updateTotalSessionTime(sessionTime / 1000);
    });
}

function setTotalTabs() {
    chrome.storage.local.get([TOTAL_TABS], function(data) {
        totalTabs = data[TOTAL_TABS];
        if (totalTabs == undefined) totalTabs = 0;
        totalTabsOpened.innerHTML = totalTabs
    });
}

function updateTotalSessionTime(time) {
    var hours = ~~(time / (60 * 60));
    var minutes = ~~(time / 60);
    var seconds = ~~(time % 60);
    totalSessionTime.innerHTML = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function format(num) {
    return num < 10 ? "0" + num : num;
}

function clearStats() {
    removeKey(TOTAL_SESSIONS);
    removeKey(TOTAL_SESSION_TIME);
    removeKey(TOTAL_TABS);
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