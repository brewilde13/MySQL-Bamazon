-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (255),
    department_name VARCHAR (255),
    price INTEGER (11),
    stock_quantity INTEGER (11),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Face Wash", "Skin Care", 12, 250),
("Face Moisturizer", "Skin Care", 8, 200),
("Red Lipstick", "Beauty", 16, 100),
("Blush", "Beauty", 7, 125),
("Hair Brush", "Hair Care", 8, 300),
("Shampoo", "Hair Care", 4, 500),
("Conditioner", "Hair Care", 4, 500),
("Greek Yogurt", "Food", 6, 250),
("Pore Strips", "Skin Care", 13, 75),
("Assorted Cheese and Cracker Tray", "Food", 15, 100);