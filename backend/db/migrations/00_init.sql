
DROP TABLE IF EXISTS groceries;

CREATE TABLE groceries (
  id INT GENERATED ALWAYS AS IDENTITY,
  item VARCHAR(30),
  quantity SMALLINT
);

INSERT INTO groceries (item, quantity) VALUES ('apple', 5);
INSERT INTO groceries (item, quantity) VALUES ('banana', 3);