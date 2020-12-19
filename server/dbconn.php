<?php
$server = "localhost";
$name = "root";
$pssword = "1234";
$db = "webrollingtetrisdb";

try {
    $conn = new PDO("mysql:host=$server;dbname=$db", $name, $pssword, array(PDO::MYSQL_ATTR_FOUND_ROWS => true));

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // set the PDO error mode to exception
} catch (PDOException $e) {
    echo "Erro ao conectar: " . $e->getMessage();
}
