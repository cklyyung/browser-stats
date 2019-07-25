let counter = document.getElementById('counter');

chrome.storage.local.get(['startTime'], function(data) {
    const savedTime = new Date(parseInt(data.startTime));
    console.log("Fetched start time of " + savedTime);
    startTimer(savedTime);
});

function startTimer(startTime) {

    var update = 500;
    
    setInterval(function () {

      var currentTime = new Date();

      var timeElapsed = (currentTime - startTime) / 1000;

      var hours = ~~(timeElapsed / (60 * 60));
      var minutes = ~~(timeElapsed / 60);
      var seconds = ~~(timeElapsed % 60);
      
      // display
      counter.innerHTML 
        = format(hours) + ":" + format(minutes) + ":" + format(seconds);
    }, update);
  }
  
  function format(num) {
    return num < 10 ? "0" + num : num;
  }
