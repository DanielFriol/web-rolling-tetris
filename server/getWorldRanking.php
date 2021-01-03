<?php
include('dbconn.php');
session_start();
if (isset($_GET)) {
    $querySet = $conn->query("SET @row_number = 0;");
    $queryinsrt = $conn->query(
        "SELECT (@row_number:=@row_number + 1) AS position, g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.userName FROM $db.gamehistory as g 
        INNER JOIN $db.user as us on us.id = g.userId
        order by pointsAchieved desc limit 10;"
    );
    $bestPlays = [];
    while ($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)) {
        array_push($bestPlays, $row);
    }
    echo json_encode($bestPlays);
}
