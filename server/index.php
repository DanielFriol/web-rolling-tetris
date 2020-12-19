<?php
  session_start();
  include('dbconn.php');

    if (isset($_POST['btnEntrar'])) {
      $userName = $_POST['name'];
      $password = sha1($_POST['password']);
      $query = "select * from user where userName ='$userName' and password = '$password'";
      $queryinsrt = $conn->query("select * from user where userName ='$userName' and password = '$password'");
      $user = $queryinsrt->fetch();
      $num_rows = $queryinsrt->rowCount();
       
    if ($num_rows == 1){
        $_SESSION['id']=$user['id'];
       echo"<script language='javascript' type='text/javascript'>
             window.location.href='../jogo.html';
            </script>";

    }else if ((empty($userName) || $userName == null) && (empty($password) || $password == null)){
        echo"<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Nome de Usuário e Senha !');
              window.location.href='../index.html';
            </script>";

    }else if (empty($userName) || $userName == null){
        echo"<script language='javascript' type='text/javascript'>
               alert ('Falta preencher o Nome de Usuário !');
               window.location.href='../index.html';
             </script>";

    }else if (empty($password) || $password == null){
        echo"<script language='javascript' type='text/javascript'>
               alert ('Falta preencher a Senha !');
               window.location.href='../index.html';
             </script>";

    }else{
        echo"<script language='javascript' type='text/javascript'>
               alert ('Usuário ou Senha incorreta !');
               window.location.href='../index.html';
             </script>";
    }}
