function getAllInfo() {
  getUserWorldRanking();
  getWorldRanking();
}

function getUserWorldRanking() {
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/getUserCurrentWorldRanking.php";
  http.open("GET", url, true);
  http.send();
  http.onload = function () {
    if (http.status == 200) {
      var userBestPlay = null;
      if (http.response) {
        userBestPlay = JSON.parse(http.response);
      }
      if (userBestPlay) {
        var table = document.getElementById("userBestPlay");
        var row = table.insertRow(1);
        var position = row.insertCell(0);
        var user = row.insertCell(1);
        var points = row.insertCell(2);
        var level = row.insertCell(3);
        position.innerHTML = userBestPlay.position;
        user.innerHTML = userBestPlay.userName;
        points.innerHTML = userBestPlay.pointsAchieved;
        level.innerHTML = userBestPlay.levelAchieved;
      }
    }
  };
}

function getWorldRanking() {
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/getWorldRanking.php";
  http.open("GET", url, true);
  http.send();
  http.onload = function () {
    if (http.status == 200) {
      var bestPlays = null;
      if (http.response) {
        bestPlays = JSON.parse(http.response);
      }
      if (bestPlays && bestPlays.length > 0) {
        var table = document.getElementById("bestPlaysTable");
        for (var x = 0; x < bestPlays.length; x++) {
          var row = table.insertRow(x + 1);
          var position = row.insertCell(0);
          var user = row.insertCell(1);
          var points = row.insertCell(2);
          var level = row.insertCell(3);
          position.innerHTML = bestPlays[x].position;
          user.innerHTML = bestPlays[x].userName;
          points.innerHTML = bestPlays[x].pointsAchieved;
          level.innerHTML = bestPlays[x].levelAchieved;
        }
      }
    }
  };
}
