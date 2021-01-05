<?php
include('dbconn.php');
session_start();
if (!$_SESSION['id']) {
    header("HTTP/1.1 401 UNAUTHORIZED");
}


if (isset($_GET)) {
    $id = $_SESSION['id'];
    $queryinsrt = $conn->query("SELECT g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.name FROM gamehistory as g 
    INNER JOIN user as us on us.id = g.userId
    where g.userId = '$id' order by id desc;");
    // $plays = $queryinsrt->execute();
    $plays = [];
    while ($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)) {
        array_push($plays, $row);
    }
    echo json_encode($plays);
}
