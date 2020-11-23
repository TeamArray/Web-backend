create user arrayweb@localhost;
create schema arrayweb;

grant all privileges on arrayweb.* to arrayweb@localhost;
use arrayweb;

create table users (
  userid varchar(15) not null primary key,                   -- 유저 이름
  passwd varchar(64) not null,                               -- 유저 비번
  pwsalt varchar(08) not null,                               -- 비번 솔트값
  nicknm varchar(30) not null,                               -- 유저 닉네임
  ismebr boolean     default 0                     not null, -- 팀원 유/무
  avatar text        default '/assets/default.png' not null, -- 유저 프사
  cretAt timestamp   default current_timestamp     not null  -- 유저 가입일
);

create table posts (
  postid    int         not null primary key,               -- 포스트 식별 아이디
  title     varchar(50) not null,                           -- 포스트 제목
  author    varchar(15) not null,                           -- 작성자 유저 이름
  content   text        not null,                           -- 포스트 내용
  boardid   int         default 0                 not null, -- 보드 식별 아이디
  isnotify  boolean     default 0                 not null, -- 공지 여/부
  createdAt timestamp   default current_timestamp not null  -- 포스트 작성일
);

create table comments (
  postid    int         not null primary key,               -- 댓글 식별 아이디
  author    varchar(15) not null,                           -- 작성자 유저 이름
  content   text        not null,                           -- 댓글 내용
  postsid   int         not null,                           -- 게시글 식별 아이디
  createdAt timestamp   default current_timestamp not null  -- 댓글 작성일
);
