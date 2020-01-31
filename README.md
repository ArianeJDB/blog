# ROCK|BLOG. Full Stack MEVN project

This is my first MEVN project and I'm very prouf of it! 🤗
It's a blog that I've been doing while I was in classes (Node.js, Express, MongoDB, Vue.js). So, eveything I was learning, I was implementing in this project.


## ℹ️ So, this is what I was asked to do (translated from spanish):

A blog with persistence and API REST
 

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

If you want a copy of this project you need to have Node and MongoDB installed (my versions Node v13.6.0
and MongoDB shell version v3.6.3 ) and then:

1. Clone the repo.
2. Execute `npm install`
3. Run backend with `npm start` in one terminal
4. Run frontend with `npm run serve` in another one

Enjoy! and Im open to receive any suggestion. Be nice please, Im a baby junior👶

## THANK YOU 🤗

# ROCK|BLOG. Proyecto Full Stack MEVN
Este es mi primer proyecto con MEVN y estoy muy ogullosa de lo que he hecho! 🤗
Es un blog que he estado haciendo a medida que he ido aprendiendo Node.js, MongoDB y Vue.js.


## ℹ️ Esto es lo que se me ha pedido hacer (copio y pego):

Se desea implementar un servicio para la gestión de un blog con persistencia y API REST.

### Functionalidad

 Las entradas del blog podrán tener comentarios y para evitar la publicación de aquellos que puedan ser ofensivos, el servicio deberá incluir internamente un validador.

Las entidades de información que deberá gestionar el blog son:

#### Post:
Cada entrada contiene los siguientes campos: Nombre del autor, Nickname del autor, Titulo, Texto, Lista de comentarios.

#### Comment:
Cada comentario contiene los siguientes campos: Nickname del autor del comentario, Contenido, Fecha del comentario.
#### OffensiveWord:
Cada palabra tendrá asociada un campo “level” indicando la gravedad de la palabra de 1 a 5.

### API REST endpoints

#### Entradas y comentarios
    * Recuperación de todas las entradas (sin comentarios)
    * Recuperación de una entrada (con comentarios)
    * Creación de una nueva entrada (sin comentarios)
    * Borrado de una entrada existente (con todos sus comentarios)
    *Modificación de una entrada existente (se actualizará toda la información de la misma, excepto sus comentarios)
    *Adición de un nuevo comentario a una entrada
    *Modificación de un comentario existente
    *Borrado de un comentario existente en una entrada

#### Palabras ofensivas:
    *Creación, listado, borrado y modificación de una palabra ofensiva.

👀 Si el comentario que se intenta incorporar contiene alguna de las palabras ofensivas registradas en la BBDD, el comentario no se podrá crear. La petición REST será rechazada con un código de error y se devolverá un JSON con información sobre la palabra ofensiva (o palabras) y su nivel. Las palabras ofensivas estarán almacenadas en la BBDD. Si al arrancar la aplicación se detecta que no hay palabras ofensivas en la BBDD, la aplicación deberá insertar un juego de palabras por defecto.


### Control de usuarios

La aplicación tiene que permitir varios tipos de usuarios:

#### Autenticados: Admin:
Los usuarios de tipo admin podrán realizar cualquier operación de la API REST.

#### Autenticados: Publisher: 
Los usuarios de tipo publisher podrán:
    *Crear entradas del blog. 
    *Borrar y modificar únicamente las entradas que hayan creado ellos.
    *Borrar comentarios de sus entradas.
    *Añadir comentarios a otras entradas.

#### No autenticado:
Podrán consultar información pero no podrán añadir comentarios ni añadir posts.

Cualquier usuario podrá registrarse en la aplicación y se le asignará el rol de “publisher”.  Para ello, se creará un endpoint de creación de usuarios. Para simplificar la implementación, un usuario no se puede borrar ni modificar.

#### Authentication:

El mecanismo de autenticación de usuarios puede ser Basic Auth + Tokens JWT

### UI:
Se deberá crear una interfaz de usuario con Vue que cumpla con las siguientes directrices:
    *Estará implementada con Vuetify
    *La vista principal tendrá un listado con el título de cada uno de los posts
    *Cada título será un link que navegará a una página con el contenido del post
    *La página de contenido del post mostrará su contenido y sus comentarios
    *En función del tipo de usuario, la interfaz mostrará los componentes gráficos que permitan realizar todas las operaciones que tengan disponibles en la API REST (crear posts, crear comentarios, borrar comentarios…)
    *Permitirá el registro de nuevos usuarios

### Aspectos técnicos:
La aplicación backend estará dividida en, al menos, 4 módulos Node: 
    *app.js: Tendrá el servidor Express. 
    *controller.js: Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.
    *repository.js: Módulo que contendrá el código de acceso a la base de datos.
    *validator.js: Validador que verifica que el comentario no contiene ninguna palabra ofensiva.

### Persistencia:
La persistencia se implementará con MongoDB de forma obligatoria. Se podrán usar el driver oficial Mongo o el ODM Mongoose.


### Control de calidad
Se deberán implementar diferentes tipos de tests para controlar la calidad de la aplicación:
#### Backend: Tests unitarios
Tests unitarios del validador con Jest. Estos tests, ya que son unitarios, no deberán acceder a la bbdd real. Es decir, hay que crear un doble del módulo que permite acceder a la base de datos. La funcionalidad que debería verificarse en los tests es:
    * Comentario con palabras ofensivas: Con este test se debe verificar que si el comentario tiene una palabra ofensiva, se debe generar el error correspondiente. 
    * Comentario sin palabras ofensivas: Con este test se debe verificar que si el comentario no tiene palabras ofensivas debe obtenerse una validación OK.

#### Tests de sistema
Tests de sistema de la API REST. Se deberán verificar algunas de las operaciones disponibles en la API REST:
    *Crear un post
    *Añadir un comentario con palabras ofensivas
    *Añadir un comentario sin palabras ofensivas

#### Tests de sistema (e2e) de las operaciones más relevantes:
    *Crear un post
    *Añadir un comentario con palabras ofensivas
    *Añadir un comentario sin palabras ofensivas

Los tests se podrán implementar con cualquier tecnología (Selenium, Cypress, puppeteer…)

Si quieres una copia de este proyecto tienes que tener instalado Node y MongoDB (mis versiones Node v13.6.0
and MongoDB shell version v3.6.3 ) y luego:

1. Clónate el repo.
2. Ejecuta `npm install`
3. Corre el back con `npm start` en una terminal
4. Corre el front con `npm run serve` en otra

Enjoy! Estoy abierta a recibir cualquier comentari y sugerencia pero, be nice! recuerda que soy una  baby junior👶

## THANK YOU 🤗