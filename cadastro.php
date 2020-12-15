<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />

  <link rel="stylesheet" href="assets/css/cadastro.css" />
  <link rel="stylesheet" href="assets/css/main.css" />

  <title>Cadastro</title>
</head>

<body>
  <div>
    <?php
    require_once('./server/dbconn.php')
    ?>
    <?php
    if (isset($_POST['btnSubmit'])) {
      $name = $_POST['name'];
      $birthday = $_POST['birthday'];
      $cpf = $_POST['cpf'];
      $phone = $_POST['phone'];
      $email = $_POST['email'];
      $userName = $_POST['userName'];
      $password = $_POST['password'];
      $query = "INSERT into user (name, cpf,birthday, phone,userName, email, password) VALUES (?,?,?,?,?,?,?)";
      $result = $queryinrt->execute([$name, $cpf, $birthday, $phone, $userName, $email, md5($password)]);
    }
    ?>
  </div>

  <div class="principal">
    <h1>Cadastro</h1>
    <div class="forms">
      <form action="./cadastro.php" method="post">
        <table>
          <tbody>
            <tr>
              <td><label>Nome Completo:</label></td>
              <td><input name="name" type="text" class="ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>Data de Nascimento:</label>
              </td>
              <td><input name="birthday" type="text" class="mt-2 ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>CPF:</label>
              </td>
              <td><input name="cpf" type="text" class="mt-2 ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>Telefone:</label>
              </td>
              <td><input name="phone" type="text" class="mt-2 ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td><input name="email" type="email" class="mt-2 ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>Usuário:</label>
              </td>
              <td><input name="userName" type="text" class="mt-2 ml-1" /></td>
            </tr>

            <tr>
              <td>
                <label>Senha:</label>
              </td>
              <td><input name="password" type="password" class="mt-2 ml-1" /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" name="btnSubmit" class="mt-2">Cadastrar</button>
      </form>
    </div>
  </div>
</body>

</html>