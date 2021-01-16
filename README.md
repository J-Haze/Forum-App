## Justin's Forum App
Online Forum where users can post articles and pictures. 
Users can comment on other's posts, and can edit or delete their own posts.

MERN Stack, deployed on Heroku

🔗 **Live preview** of the app is [here](https://justins-forum.herokuapp.com/).

### Purpose: ###
Showcase my ability to create a full stack application. The app utilizes a MERN stack and a RESTful API.

🔗 **API** can be accessed [here](https://justins-forum-api.herokuapp.com/).

### API Documentation
* Base URL: [https://justins-forum-api.herokuapp.com/](https://justins-forum-api.herokuapp.com/)

| Method        | Endpoint       | Usage |Parameters| 🔒 |
| ------------- |:-------------| :-----|----| ---|
| GET      | / | Get all posts | |  |
| GET      | /user | Get current user | | ✅ |
| POST      | /user/log-in      |   Log in in as user |username*, password*, confirm-password*|
| POST | /user/new      |    Sign up as a user |username*, password*|
| GET | /user/posts |Get all posts from current user | | ✅|
| GET | /user/:userid/posts |Get all posts from specific user | | |
| GET | /post | Get all posts | |
| POST | /post/new | Create new post |title*, content*| ✅|
| GET | /post/:postid | Get specific post |  | |
| PUT | /post/:postid | Edit a post |title*, content*| ✅|
| DELETE | /post/:postid | Delete a post |title*, content*| ✅|
| PUT | /post/:postid/publish | Publish a post |  | ✅|
| PUT | /post/:postid/unpublish | Unpublish a post |  | ✅|
| GET | /post/:postid/comments | Get all comments on a post | |
| POST | /post/:postid/comment | Comment on a post |text*| ✅|
| DELETE | /post/:postid/:commentid | Delete a comment |  | ✅|
| PUT | /post/:postid/:commentid/unpublish | Unpublish a comment |  | ✅|

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

