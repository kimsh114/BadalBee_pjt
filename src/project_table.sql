create table userInfo_tbl (
user_id 		varchar(20) primary key,
user_pw 		varchar(20) not null,
user_name 		varchar(20) not null,
user_email 		varchar(20),
user_address 	varchar(50) not null,
user_phone 		varchar(20) not null
);

create table board_tbl (
board_num 			int auto_increment primary key,
board_title 		varchar(500) not null,
board_writer 		varchar(20) not null,
board_content 		varchar(500) not null,
board_location 		varchar(50) not null,
board_date 			datetime default current_timestamp,
board_storeId		bigint,
board_time			int not null
);

create table storeInfo_tbl (
store_id 				bigint primary key,
store_pw 				varchar(30) not null,
store_name 				varchar(30) not null,
store_pname 			varchar(30) not null,
store_phone 			varchar(30) not null,
store_category			varchar(20)	not null,
store_address			varchar(255) not null,
store_operationHour		varchar(255) not null,
store_closedDay			varchar(255) not null,
store_deliveryFee 		int	not null
);

CREATE TABLE menu_tbl (
menu_id				int auto_increment PRIMARY KEY,
menu_storeId		bigint,
menu_name			varchar(255) NOT NULL unique key,
menu_price			int	NOT NULL,
menu_pictureUrl		text NULL
); 

CREATE TABLE order_tbl (
order_id			int auto_increment PRIMARY KEY,
order_menuName		text(20) NOT NULL,
order_userId		varchar(20)	NOT NULL,
order_boardNum 		int,
order_price			int	NOT NULL
);

create table comment_tbl (
comment_num       int auto_increment primary key,
comment_boardNum	int,
comment_name     varchar(20) NOT NULL,
comment_content   varchar(500),
comment_price    int NOT NULL,
comment_userId	varchar(20)
);

CREATE TABLE Mypage_tbl (
mypage_num      int auto_increment PRIMARY KEY,
mypage_date    datetime default current_timestamp,
mypage_userId    varchar(20) NOT NULL,
mypage_nickname  varchar(20) NOT NULL,
mypage_menuName    varchar(20) NOT NULL,
mypage_price     int NOT NULL
);
alter table storeinfo_tbl add `store_miniPrice` int(20) not null after `store_deliveryFee`; 

DELETE FROM userinfo_tbl WHERE user_Id = '12345123';

select * from userinfo_tbl;
select * from board_tbl;
select * from storeInfo_tbl;
select * from menu_tbl;
select * from order_tbl;
select * from comment_tbl;
select * from mypage_tbl;

alter table order_tbl add foreign key (order_userId) references userinfo_tbl(user_id) on delete cascade;
alter table menu_tbl add foreign key (menu_storeId) references storeinfo_tbl(store_id) on delete cascade;
alter table board_tbl add foreign key (board_storeId) references storeinfo_tbl(store_id) on delete cascade;
alter table board_tbl add foreign key (board_writer) references userinfo_tbl(user_id) on delete cascade;
alter table comment_tbl add foreign key (comment_boardNum) references board_tbl(board_num) on delete cascade;
alter table mypage_tbl add foreign key (mypage_userId) references userinfo_tbl(user_id) on delete cascade;