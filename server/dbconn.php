<?php
$server = "localhost";
$name = "root";
$pssword = "1234";
$db = "webrollingtetrisdb";

try {
    $conn = new PDO("mysql:host=$server;dbname=$db", $name, $pssword);
     
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception
}

catch (PDOException $e){
    echo "Erro ao conectar: " . $e->getMessage();
}
