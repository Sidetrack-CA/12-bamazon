DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

use bamazon;
CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_qty INT(11) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ('laptop', 'electronics', 1200.00, 0), ('stuffed cat', 'toys', 13.99, 0), ('toothbrush', 'toiletries', 2.85, 0), ('cordless phone', 'electronics', 69, 0),('hair brush', 'toiletries', 8.99, 0), ('scrabble game', 'toys', 24.99, 0), ('cell phone charger', 'electronics', 49.00, 0),('t-shirt', 'clothing', 23.00, 0),('socks', 'clothing', 12.99, 0),('basketball', 'toys', 17.99, 0);
