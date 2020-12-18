<?php
if (isset($_POST['btnAlterar'])) {
    $userName = $_POST['name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "UPDATE user Set userName = '$userName', phone = '$telephone' , email = '$email', password = '$password' Where ";
    $result = mysqli_query($conexao, $query);
}
?>