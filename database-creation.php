<?php
try {
    $server = "localhost";
    $name = "root";
    $password = "1234";
    $db = "webrollingtetrisdb";


    $conn = new PDO("mysql:host=$server;dbname=$db", $name, $password, array(PDO::MYSQL_ATTR_FOUND_ROWS => true));
    $userTableQuery = "CREATE TABLE IF NOT EXISTS User (
            id bigint primary key auto_increment,
            name varchar(80) not null,
            cpf varchar(11) unique not null,
            birthday varchar(10) not null,
            phone varchar(11) not null,
            userName varchar(30) not null unique,
            email varchar(50) not null unique,
            password varchar(120) not null
            )";
    $conn->exec($userTableQuery);

    $gameHistoryTableQuery = "CREATE TABLE IF NOT EXISTS GameHistory (
            id bigint primary key auto_increment,
            userId bigint not null,
            pointsAchieved bigint not null,
            levelAchieved int not null,
            durationTime decimal not null,
            foreign key (userId) references User(id)
            )";
            
    $conn->exec($gameHistoryTableQuery);

    echo "Tabelas criadas com sucesso!";

} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
