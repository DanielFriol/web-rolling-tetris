function getUser() {
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/getUser.php";
  http.open("GET", url, true);
  http.send();
  http.onload = function () {
    if (http.status == 200) {
      var user = JSON.parse(http.response);
      document.getElementById("name").value = user.name;
      document.getElementById("phone").value = user.phone;
      document.getElementById("email").value = user.email;
    } else if (http.status == 500) {
      window.location.href = "index.html";
      alert("Erro ao buscar usuário, tente novamente!");
      window.location.href = "../jogo.html";
    } else if (http.status == 400) {
      window.location.href = "./index.html";
    }
  };
}
