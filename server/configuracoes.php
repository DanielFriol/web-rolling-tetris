<?php
if (isset($_POST['btnAlterar'])) {
    $userName = $_POST['name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "UPDATE user Set userName = '$userName', phone = '$telephone' , email = '$email', password = '$password' /*Colocar a condição do WHERE*/";
    $result = mysqli_query($conexao, $query);

    $num_rows = mysqli_affected_rows($result); /*Verificar lógica depois*/

    if ($num_rows == 1){
        echo"<script language='javascript' type='text/javascript'>
              alert('Alteração realizada com sucesso !');
              window.location.href='../jogo.html';
            </script>";

    }if (empty($userName) || $userName == null){
        echo"<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Nome de Usuário !');
             </script>";
    
    }if (empty($telephone) || $telephone == null){
        echo"<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Telefone !');
             </script>";
    
    }if (empty($email) || $email == null){
            echo"<script language='javascript' type='text/javascript'>
              alert ('Falta preencher o Email !');
            </script>";
    
    }if (empty($password) || $password == null){
            echo"<script language='javascript' type='text/javascript'>
              alert ('Falta preencher a Senha !');
           </script>";
    }
}
?>
