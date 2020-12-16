<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />

    <link rel="stylesheet" href="assets/css/index.css" />
    <link rel="stylesheet" href="assets/css/main.css" />

    <title>Primeira Página</title>
  </head>

  <body>
     <div>
      <?php
      session_start();
      require_once('./server/dbconn.php');
      ?>

      <?php
      if (isset($_POST['btnEntrar'])) {
        $userName = $_POST['name'];
        $password = $_POST['password'];

       $query = "SELECT * FROM user WHERE userName ='$userName' AND password = '$password'";
       $result = $queryinrt->exec($query);
       
       /*echo"<script language='javascript' type='text/javascript'>
               window.location.href='jogo.html';
             </script>";*/
      }
      ?>
    </div>
    
    <div class="principal">
      <h1>Entre para Jogar</h1>
      <div class="forms">
        <form action="Jogo.html">
          <table>
            <tbody>
              <tr>
                <td><label>Usuário:</label></td>
                <td><input type="text" id="usuário" class="ml-1" /></td>
              </tr>

              <tr>
                <td><label>Senha:</label></td>
                <td>
                  <input type="password" id="senha" class="mt-2 ml-1" />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" name = "btnEntrar" class="mt-2">Entrar</button>

          <p>Não possui cadastro? <a href="Cadastro.php"> Cadastre-se</a>!</p>
        </form>
      </div>
    </div>
  </body>
</html>
