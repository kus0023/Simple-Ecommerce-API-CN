# Simple-Ecommerce-API-CN
Backend Test: Ecommerce API - Very basic level

### Baisc requirement
1. mongoDB
2. node
3. git

## Project setup
1. clone the project from git
> git clone \<git-url>

> cd \<new-folder>

2. run below commant to install the dependencies

>npm install

3. Run the server

>npm start

Server will start on port 3000 on localhost

## API enpoints

1. Get the products
>GET /api/v1/products

2. create the product
>POST /api/v1/products/create

```
Body: JSON
{
    "product":{
        "name": "example",
        "quantity": 10
    } 
}
```
3. delete the product
>DELETE /api/v1/products/:id

4. update the quantity
> POST /api/v1/products/:id/update_quantity/?number=20

```
No body required
Desc: It will increament or decreament the quantity of product by number, only if the resultant quantity is greater that 0.

You can provide positive or negate number.
```

Thankyou.