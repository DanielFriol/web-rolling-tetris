<?php
include('dbconn.php');
session_start();
if (!$_SESSION['id']) {
    header("HTTP/1.1 401 UNAUTHORIZED");
}


  
if (isset($_GET)) {
    $queryinsrt = $conn->query(
        "SELECT g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.userName FROM $db.gamehistory as g 
        INNER JOIN $db.user as us on us.id = g.userId
        where g.id = (select id from gamehistory where userId = g.userId order by pointsAchieved desc limit 1)
        group by userId order by pointsAchieved desc;"
    );
    $userBestPlay = [];
    $counter = 1;
    while ($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)) {
        if ($row["userId"] == $_SESSION["id"]) {
            $row["position"] = $counter;
            echo json_encode($row);
        }
        $counter++;
    }
}
