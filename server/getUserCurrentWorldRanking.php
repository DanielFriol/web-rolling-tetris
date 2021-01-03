<?php
include('dbconn.php');
session_start();
if (isset($_GET)) {
    $querySet = $conn->query("SET @row_number = 0;");
    $queryinsrt = $conn->query(
        "SELECT (@row_number:=@row_number + 1) AS position, g.id, g.userId, g.levelAchieved, g.pointsAchieved, g.durationTime, us.userName FROM $db.gamehistory as g 
        INNER JOIN $db.user as us on us.id = g.userId
        group by userId order by pointsAchieved desc;"
    );
    $userBestPlay = [];
    while ($row = $queryinsrt->fetch(PDO::FETCH_ASSOC)) {
        if ($row["userId"] == $_SESSION["id"]) {
            echo json_encode($row);
        }
    }
}
