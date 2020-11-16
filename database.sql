create user arrayweb@localhost;
create schema arrayweb;

grant all privileges on arrayweb.* to arrayweb@localhost;
use arrayweb;

create table users (
  userid varchar(15) not null primary key,            -- 유저 이름
  passwd varchar(64) not null,                        -- 유저 비번
  pwsalt varchar(8) not null,                         -- 비번 솔트값
  nicknm varchar(30) not null,                        -- 유저 닉네임
  ismebr boolean default 0 not null,                  -- 팀원 유/무
  avatar text default '/assets/default.png' not null, -- 유저 프사
  cretAt timestamp default current_timestamp not null -- 유저 가입일
);
