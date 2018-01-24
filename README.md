# Manaccounting-api
The api for the Manaccounting app.

## Api

* localhost:3000/api/user/login (POST) -> authenticates the user (it returns the token). You have to provide the "email" and the "password".

* localhost:3000/api/user/:Id (GET) -> get a specific user by his Id.
* localhost:3000/api/user/register (POST) -> create a user
* localhost:3000/api/user/register/IsEmailAvailable (POST) -> provide an email, and it will tell you if the email is available.
* localhost:3000/api/user/:Id (PATCH) -> edit a specific user by his Id.
* localhost:3000/api/user/:Id (DELETE) -> delete a specific user by his Id.

* localhost:3000/api/product/:Id (GET) -> get a specific product by his Id.
* localhost:3000/api/product (POST) -> create a product
* localhost:3000/api/product/:Id (PATCH) -> edit a specific product by his Id.
* localhost:3000/api/product/:Id (DELETE) -> delete a specific product by his Id

* localhost:3000/api/products (GET) -> get all products

* localhost:3000/api/order (POST) -> create an order, and create the invoice pdf.