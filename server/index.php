<?php
  require_once('./server/dbconn.php');

    if (isset($_POST['btnEntrar'])) {
      $userName = $_POST['name'];
      $password = $_POST['password'];

      $query = "SELECT * FROM user WHERE userName ='$userName' AND password = '$password'";
      $result = $queryinrt->exec($query);
        
      $num_rows = mysql_num_rows($result);
       
    if ($num_rows == 1){ 
        
       /*echo"<script language='javascript' type='text/javascript'>
               window.location.href='jogo.html';
             </script>";*/
       }
    }else{
        /*echo"<script language='javascript' type='text/javascript'>
               alert ('Usuário ou Senha incorreta !');
             </script>";*/
    }
?>
