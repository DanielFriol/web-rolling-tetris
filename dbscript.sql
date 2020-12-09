create database webrollingtetrisdb;

use webrollingtetrisdb;

create table User (
	id bigint primary key auto_increment,
    name varchar(80) not null,
    cpf varchar(11) unique not null,
    birthday datetime not null,
    phone varchar(11) not null, 
    userName varchar(30) not null unique,
    email varchar(50) not null unique, 
    password varchar(120) not null
);


create table GameHistory (
	id bigint primary key auto_increment, 
    userId bigint not null,
    pointsAchieved bigint not null, 
    levelAchieved int not null, 
    durationTime decimal not null,
    
    foreign key (userId) references User(id)
)
