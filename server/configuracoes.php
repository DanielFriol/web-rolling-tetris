<?php
include('dbconn.php');
session_start();

if (!$_SESSION['id']) {
  header("HTTP/1.1 400 UNAUTHORIZED");
}


if (isset($_POST['btnAlterar'])) {
  $name = $_POST['name'];
  $telephone = $_POST['phone'];
  $email = $_POST['email'];
  $id = $_SESSION['id'];

  if (!empty($password)) {
    $password = $_POST['password'];
    $query = "UPDATE user Set name = '$name', phone = '$telephone' , email = '$email', password = '$password' where user.id = '$id'";
  } else {
    $query = "UPDATE user Set name = '$name', phone = '$telephone' , email = '$email' where user.id = '$id'";
  }

  $queryinsrt = $conn->prepare($query);
  $result = $queryinsrt->execute();
  $num_rows = $queryinsrt->rowCount();
  // $result = mysqli_query($conexao, $query);

  // $num_rows = mysqli_affected_rows($conexao); /*Verificar lógica depois*/

  if ($num_rows == 1) {
    echo "<script language='javascript' type='text/javascript'>
              alert('Alteração realizada com sucesso !');
              window.location.href='../jogo.html';
            </script>";
  }
  if (empty($userName) || $userName == null) {
    echo "<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Nome de Usuário !');
              window.location.href='../configuracoes.html;
             </script>";
  }
  if (empty($telephone) || $telephone == null) {
    echo "<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Telefone !');
              window.location.href='../configuracoes.html;
             </script>";
  }
  if (empty($email) || $email == null) {
    echo "<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Email !');
              window.location.href='../configuracoes.html;
            </script>";
  }
  if (empty($password) || $password == null) {
    echo "<script language='javascript' type='text/javascript'>
              alert ('Falta preencher a Senha !');
              window.location.href='../configuracoes.html;
           </script>";
  }
}
