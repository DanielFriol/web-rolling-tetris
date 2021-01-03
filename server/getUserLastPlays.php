<?php
include('dbconn.php');
session_start();
if (isset($_GET)) {
    $id = $_SESSION['id'];
    $queryinsrt = $conn->query("SELECT g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.name FROM gamehistory as g 
    INNER JOIN user as us on us.id = g.userId
    where g.userId = '$id' order by id desc limit 5;");
    // $plays = $queryinsrt->execute();
    $plays = [];
    while($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)){
        array_push($plays, $row);
    }
    echo json_encode($plays);
}
