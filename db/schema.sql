CREATE DATABASE bookmarks_db;

/* this is how i connect to a database*/
USE bookmarks_db;

CREATE TABLE categories(
    id INT NOT NULL AUTO_INCREMENT, /* NOT NULL means that this column can not be empty, and it is called a constraint */
    catName VARCHAR(255),
url VARCHAR(255),
    PRIMARY KEY(id) /* if you don't do line 11, you get an error */
);

CREATE TABLE subCategories(
    id INT NOT NULL AUTO_INCREMENT, /* NOT NULL means that this column can not be empty, and it is called a constraint */
    parent_id int,
 name VARCHAR(255),
    PRIMARY KEY(id) /* if you don't do line 11, you get an error */
);

CREATE TABLE recentlyAdded(
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255),
    PRIMARY KEY(id) 
);
INSERT INTO categories (catName) VALUES ('books'), ('food'),('baby'), ('work');