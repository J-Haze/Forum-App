## Justin's Forum App
Online Forum where users can post articles and pictures. 
Users can comment on other's posts, and can edit or delete their own posts.

MERN Stack, deployed on Heroku

🔗 **Live preview** of the app is [here](https://justins-forum.herokuapp.com/).

### Purpose: ###
Showcase my ability to create a full stack application. The app utilizes a MERN stack and a RESTful api.

API can be accessed [here](https://justins-forum-api.herokuapp.com/).

### API Documentation
* Base URL: [https://justins-forum-api.herokuapp.com/](https://justins-forum-api.herokuapp.com/)

| Method        | Endpoint       | Usage |  Parameters| 🔒 |
| ------------- |:-------------| :-----|----| ---|
| GET      | / | Get all posts | |  |

| GET      | /user | Get current user | | ✅ |
| POST      | /user/login      |   Logins in user | username*, email*, password* |
| POST | /user/signup      |    Sign up user | username*, password* |
| GET | /user/blogs |Get users blogs | | ✅|
| GET | /blogs | Get all blogs | |
| POST | /blogs | Post a blog | title*, text* | ✅|
| GET | /blogs/:id | Get a specific blog | |
| DELETE | /blogs/:id | Delete a blog| | ✅|
| PUT | /blogs/:id | Update a blog| | ✅|
| POST | /blogs/:id/comment | Post a comment on a blog| author*, text*|

*required (\*)*




### Features: ###

* App makes it easy for shoppers to purchase items
  * Shoppers can search for products and easily add them to their cart
  * Shoppers can purchase items in their cart, using PayPal Secure Checkout
* Filter items by various categories, and price
* Search for items using the searchbar
* Click on items to visit the Product Detail Page and view specifics about the product
* Easily accessible shopping cart where shopper can see their collection of items ready to purchase
* User authentication allows for user specific carts, purchase history, and admin privledges
* Users with admin access can upload new products to the site, using the Upload Product Page
* Shoppers can easily view their purchase history
* Demo Page displays a clothing store, but can easily be adapted to any type of product

### Built With: ###

* ReactJS
* JavaScript
* NodeJS
* ExpressJS
* MongoDB
* HTML/CSS
* Heroku Hosting

### Pictures: ###

#### Main Page: ####
![Image of App](./images/Readme1.png)
#### Post Page: #### 
![Image of App2](./images/Readme2.png)
#### User specific page: #### 
![Image of App3](./images/Readme3.png)
#### Create new posts: #### 
![Image of App4](./images/Readme4.png)
![Image of App5](./images/Readme5.png)
#### Edit your posts: #### 
![Image of App6](./images/Readme6.png)
#### User Authentication: #### 
![Image of App8](./images/Readme8.png)
#### Sign up: #### 
![Image of App7](./images/Readme7.png)

