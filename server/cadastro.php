<?php
require_once('./dbconn.php');
// echo $_POST; 
$name = $_POST['name'];
$birthday = $_POST['birthday'];
$cpf = $_POST['cpf'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$userName = $_POST['userName'];
$password = $_POST['password'];
$query = "INSERT into user (name, cpf,birthday, phone,userName, email, password) VALUES (?,?,?,?,?,?,?)";
$queryinsrt = $conn->prepare($query);
$result = $queryinsrt->execute([$name, $cpf, $birthday, $phone, $userName, $email, sha1($password)]);
return $result;
