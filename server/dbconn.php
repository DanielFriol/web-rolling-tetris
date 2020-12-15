<?php
$server = "localhost";
$name = "root";
$pssword = "1234";
$conn = new PDO("mysql:host=$server;dbname=webrollingtetrisdb", $name, $pssword);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
