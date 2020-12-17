<?php
  session_start();
  include('dbconn.php');

    if (isset($_POST['btnEntrar'])) {
      $userName = $_POST['name'];
      $password = $_POST['password'];

      $query = "select * from user where userName ='$userName' and password = '$password'";
      $result = mysqli_query($conexao, $query);
        
      $num_rows = mysqli_num_rows($result);
       
    if ($num_rows == 1){ 
        
       echo"<script language='javascript' type='text/javascript'>
              alert('Login realizado com sucesso !');
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
?>
