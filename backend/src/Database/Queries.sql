

CREATE dATABASE Products



CREATE TABLE ProductTable(id VARCHAR(50) , 
product_name VARCHAR(300), product_desc VARCHAR(300) , price INT)


select * FROM  ProductTable


CREATE PROCEDURE getProducts 
AS
BEGIN
Select * from ProductTable
END
EXEC  getProducts

ALTER PROCEDURE getProduct(@id VARCHAR(50))
AS
BEGIN
Select * from ProductTable WHERE id =@id
END


CREATE PROCEDURE createProduct (@id VARCHAR(50), @product_name VARCHAR(300) , @product_desc VARCHAR(1000), @price INT)
AS
BEGIN
INSERT INTO ProductTable(id,product_name,product_desc,price)
VALUES(@id,@product_name, @product_desc, @price)
END


CREATE PROCEDURE updateProduct (@id VARCHAR(50), @product_name VARCHAR(300) , @product_desc VARCHAR(1000), @price INT)
AS
BEGIN

UPDATE ProductTable SET product_name =@product_name , product_desc=@product_desc ,price=@price WHERE id =@id
END


CREATE PROCEDURE deletProduct(@id VARCHAR(50))
AS
BEGIN
DELETE FROM ProductTable WHERE id = @id

END
