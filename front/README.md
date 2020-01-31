# ROCK|BLOG. Full Stack MEVN project

This is my first MEVN project and I'm very prouf of it! 🤗
It's a blog that I've been doing while I was in classes (Node.js, Express, MongoDB, Vue.js). So, eveything I was learning, I was implementing in this project.


## ℹ️ So, this is what I was asked to do:

A blod with persistence and API REST
 

### Functionality

Posts can hace comments and to avoid offenses, the service has to include a validator.

#### Post:
Each post contains: username, nickname, title, text and the list of its coments.

#### Comments:
Each comment contains: nickname, text and date

#### OffensiveWords:
Each word should have a level (severity level) from 1 to 5.


### API REST endpoints

#### Posts and comments:
    * Get all posts (without comments)
    * Get one post (with its comments)
    * Create a new post (without comments)
    * Delete a post (with all its comments)
    * Edit a post (only the content of the post, not its comments)
    * Create new comment into a post
    * Edit a comment
    * Delete a comment

#### Offensive Words:
    * Create a new offensive word
    * Get all offensive words
    * Get one offensive word
    * Edit an offensive word
    * Delete an offensive word

👀 If the comment contains one (or more) of the offensive words registered in DDBB, the request will be rejected with a `403 Forbidden error` and will return a JSON with the information of the offensive words contained. 
If when start the app there are no offensive words stored in the DDBB, the app should insert some default words.


### Users managment:

The app should have many types of users:

#### Authenticated: Admin:
    Admin users can do any API REST operation.

#### Authenticated: Publisher:
    Publisher users could:
    * Create a new post
    * Delete and Edit only their own posts
    * Delete comments of their posts
    * Add comments to another posts
#### NON Authenticated:
    * ONlY can get the posts, but for other actios, they have to be registered

Any user that get registered has a "publisher" role, so: there's another `endpoint for registration`.
And, of course, another `endpoint for login`.

If when the app starts there's no admin registered, it will insert a default one.

#### Authentication:
Will be implemented with `Basic Auth + JWT`

### UI:
It has to be implemented with VUE.js and:
    * Vuetify
    * Principal view should have a list of post's titles
    * Each title will have a link that shows a new view with the post content
    * This page content should show the content itself and its comments
    * Depending on the user role, the graffic components can variate.

### Tecnical aspects:
Should have `at least` 4 modules:
    * app.js: with Express server
    * controller.js: API REST methods
    * router.js: implemented with express
    * reppsitory.js: access to DDBB (with MongoDB)
    * validator.js: to verify offensive words contained in the comments.
    * postman.js: with at least one example of each enpoint


### QA:
Should have 3 types of tests:


#### Unit test:
Test the validator with `Jest`:
    * Test a comment with offensive words
    * Test a cpmment without offensive words

#### System test:
Test the API REST methods:  
    * Test create a new post
    * Test add a comment with offensive words
    * Test add a comment without offensive words


#### End2end test:
With Cypress.io:
    * Test create a new post
    * Test add a comment with offensive words
    * Test add a comment without offensive words


## THIS WAS TRANSLATED BY ME, SORRY FOR THE MISTAKES / SPANISH BELOW ##

If you want a copy of this project:

1. Clone the repo.
2. Execute `npm install`
3. Run backend with `npm start` in one terminal
4. Run frontend with `npm run serve` in another one

Enjoy! and Im open to receive any suggestion.

## THANK YOU 


