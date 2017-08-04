$(document).ready(function() {
  //converts second count to a mm:ss string for display
  function convertMinutes(timer) {
    var mins = String(Math.floor(timer / 60));
    var secs = String(timer - mins * 60);
    if (mins.length < 2) {
      mins = "0" + mins;
    }
    if (secs.length < 2) {
      secs = "0" + secs;
    }
    return mins + ":" + secs;
  }

  function tick() {
    //only act if the clock is running
    if (running) {
      //clear the timer
      $("#idle").empty();
      //working state
      if (working) {
        workTimer -= 1;
        if (workTimer > 0) {
          $("#idle").append("<p>" + convertMinutes(workTimer) + "</p>");
        } else {
          //switch to break state if timer is up
          bell.play();
          working = false;
          workTimer = workLen;
          $("#status").empty().append("<p>Break</p>");
          $("#idle").append("<p>" + convertMinutes(breakTimer) + "</p>");
        }
      } else {
        //break state
        breakTimer -= 1;
        if (breakTimer > 0) {
          $("#idle").append("<p>" + convertMinutes(breakTimer) + "</p>");
        } else {
          //switch to working state if timer is up
          bell.play();
          working = true;
          breakTimer = breakLen;
          $("#status").empty().append("<p>Working</p>");
          $("#idle").append("<p>" + convertMinutes(workTimer) + "</p>");
        }
      }
    }
  } //end of tick()

  var running = false;
  var working = false;
  var workLen;
  var breakLen;
  var workTimer;
  var breakTimer;
  var bell = new Audio("http://soundbible.com/grab.php?id=1506&type=mp3");

  //60000 ms in one minute
  $("#start").click(function() {
    //only act if not running
    if (!running) {
      running = true;
      working = true;
      //get number of seconds in work and break sessions
      workLen = parseInt($("input[name=timer]").val()) * 60;
      breakLen = parseInt($("input[name=break]").val()) * 60;
      //set the timers that will decrement
      workTimer = workLen;
      breakTimer = breakLen;
      //set initial status message and timer
      $("#status").empty().append("<p>Working</p>");
      $("#idle").empty().append("<p>" + convertMinutes(workTimer) + "</p>");

      //perform a check every second
      var secondCheck = setInterval(tick, 1000);

      $("#stop").click(function() {
        clearInterval(secondCheck);
        running = false;
        $("#idle").empty();
        $("#status").empty();
      });
    }
  }); //end of start click()
});
