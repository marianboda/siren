DROP TABLE IF EXISTS scrapes;
DROP TABLE IF EXISTS posts;
CREATE TABLE scrapes (id INTEGER PRIMARY KEY UNIQUE NOT NULL, webpage TEXT, lastpage INT) WITHOUT ROWID;
CREATE TABLE posts (id INTEGER PRIMARY KEY ASC, title TEXT, content TEXT, date TEXT, link TEXT, postid TEXT WITHOUT ROWID);

INSERT INTO scrapes (id, webpage) VALUES (1, "thesirenssound");
