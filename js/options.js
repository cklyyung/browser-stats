const TOTAL_SESSIONS = "totalSessions";
const TOTAL_SESSION_TIME = "totalSessionTime";
const TOTAL_TABS = "totalTabsOpen";

let sessionsOpened = document.getElementById("total_sessions");
let totalSessionTime = document.getElementById("total_session_time");
let totalTabsOpened = document.getElementById("total_tabs_opened");

chrome.storage.local.get([TOTAL_SESSIONS], function(data) {
    numSessions = data[TOTAL_SESSIONS];
    sessionsOpened.innerHTML = numSessions
});

chrome.storage.local.get([TOTAL_SESSION_TIME], function(data) {
    session_time = data[TOTAL_SESSION_TIME];
    updateTotalSessionTime(session_time / 1000);
});

chrome.storage.local.get([TOTAL_TABS], function(data) {
    totalTabs = data[TOTAL_TABS];
    totalTabsOpened.innerHTML = totalTabs
});

function updateTotalSessionTime(time) {
    var hours = ~~(time / (60 * 60));
    var minutes = ~~(time / 60);
    var seconds = ~~(time % 60);
    totalSessionTime.innerHTML = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function format(num) {
    return num < 10 ? "0" + num : num;
}