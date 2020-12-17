function verifyUserInput() {
  invalid = false;
  var form = document.forms["signupForm"];
  if (form["name"].value == null || form["name"].value == "") {
    alert("Nome é necessário");
    invalid = true;
  }

  if (form["email"].value == null || form["email"].value == "") {
    alert("Email é necessário");
    invalid = true;
  }

  if (form["birthday"].value == null || form["birthday"].value == "") {
    alert("Nascimento é necessário");
    invalid = true;
  }

  if (form["cpf"].value == null || form["cpf"].value == "") {
    alert("CPF é necessário");
    invalid = true;
  }

  if (form["phone"].value == null || form["phone"].value == "") {
    alert("Telefone é necessário");
    invalid = true;
  }

  if (form["userName"].value == null || form["userName"].value == "") {
    alert("Usuário é necessário");
    invalid = true;
  }

  if (form["password"].value == null || form["password"].value == "") {
    alert("Senha é necessário");
    invalid = true;
  }

  if (!invalid) saveUserOnDB();

  return true;
}

function saveUserOnDB() {
  var form = document.forms["signupForm"];
  var user = new FormData();
  user.append("name", form["name"].value);
  user.append("email", form["email"].value);
  user.append("birthday", form["birthday"].value);
  user.append("cpf", form["cpf"].value);
  user.append("phone", form["phone"].value);
  user.append("userName", form["userName"].value);
  user.append("password", form["password"].value);
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/cadastro.php";
  http.open("POST", url, true);
  console.log(http);
  http.onreadystatechange = function () {};
  http.send(user);
  http.onload = function () {
    console.log(http);
    if (http.status == 200) {
      alert("Usuário cadastrado!");
      window.location.href = "index.html";
    }
    if (http.status == 500) {
      alert("Erro ao realizar o cadastro, tente novamente!");
    }
  };
}
