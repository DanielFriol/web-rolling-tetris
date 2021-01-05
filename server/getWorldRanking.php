<?php
include('dbconn.php');
session_start();
if (!$_SESSION['id']) {
    header("HTTP/1.1 400 UNAUTHORIZED");
}


  
if (isset($_GET)) {
    $querySet = $conn->query("SET @row_number = 0;");
    $queryinsrt = $conn->query(
        "SELECT g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.userName FROM $db.gamehistory as g 
        INNER JOIN $db.user as us on us.id = g.userId
        where g.id = (select id from gamehistory where userId = g.userId order by pointsAchieved desc limit 1)
        group by userId order by pointsAchieved desc limit 10;"
    );
    $bestPlays = [];
    $counter = 1;
    while ($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)) {
        $row["position"] = $counter;
        array_push($bestPlays, $row);
        $counter++;
    }
    echo json_encode($bestPlays);
}
