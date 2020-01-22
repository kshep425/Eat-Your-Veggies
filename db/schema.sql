CREATE DATABASE veggies_db;
USE veggies_db;
CREATE TABLE veggies(
    veg_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    veg_name VARCHAR(80),
    veg_state BOOLEAN DEFAULT FALSE
);