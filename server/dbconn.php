<?php
$server = "localhost";
$name = "root";
$pssword = "1234";
$db = "webrollingtetrisdb";

define('HOST', '127.0.0.1');
define('USUARIO', 'root');
define('SENHA', '1234');
define('DB', 'webrollingtetrisdb');

$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');

try {
    $conn = new PDO("mysql:host=$server;dbname=$db", $name, $pssword);
     
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception
}

catch (PDOException $e){
    echo "Erro ao conectar: " . $e->getMessage();
}
