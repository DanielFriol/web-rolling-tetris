<?php
include('dbconn.php');
session_start();

if (isset($_GET)) {
    $id = $_SESSION['id'];
    $queryinsrt = $conn->query("select * from user where user.id = '$id'");
    $user = $queryinsrt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($user);
}
