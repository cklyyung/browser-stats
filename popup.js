let counter = document.getElementById('counter');
var savedTime;
chrome.storage.local.get(['startTime'], function(data) {
    savedTime = new Date(parseInt(data.startTime));
    console.log("Fetched start time of " + savedTime);
    startTimer();
});

function startTimer() {
    timeElapsed = calculateTimeElapsed(savedTime)
    updateCounter(timeElapsed)
    setTimeout(startTimer, 500)
  }

function calculateTimeElapsed(startTime) {
    var currentTime = new Date();

    return (currentTime - startTime) / 1000;
}

function updateCounter(timeElapsed) {
    var hours = ~~(timeElapsed / (60 * 60));
    var minutes = ~~(timeElapsed / 60);
    var seconds = ~~(timeElapsed % 60);
    counter.innerHTML = format(hours) + ":" + format(minutes) + ":" + format(seconds);
}

function format(num) {
    return num < 10 ? "0" + num : num;
}
