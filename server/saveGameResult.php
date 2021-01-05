<?php
require_once('./dbconn.php');
session_start();
if (!$_SESSION['id']) {
    header("HTTP/1.1 401 UNAUTHORIZED");
}



if (isset($_POST)) {
    $pointsAchieved = $_POST['pointsAchieved'];
    $levelAchieved = $_POST['levelAchieved'];
    $durationTime = $_POST['durationTime'];
    $id = $_SESSION['id'];
    $query = "INSERT into gamehistory (userId, pointsAchieved,levelAchieved, durationTime) VALUES (?,?,?,?)";
    $queryinsrt = $conn->prepare($query);
    $result = $queryinsrt->execute([$id, $pointsAchieved, $levelAchieved, $durationTime]);
}
