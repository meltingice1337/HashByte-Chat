# HashByte-Chat

# backend

#### How to start
- install NodeJS
- `npm i -g nodemon`
- set cwd to `backend/` and run `npm start`

#### Technologies
- NodeJS (environment for running javascript similar to JVR/JVM on desktop)  https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5
- npm (a package manager to install frameworks and libraries kind of like gradle or maven for java) https://docs.npmjs.com/about-npm/
- Express (framework aka library for dealing with http requests used for loggin/register) https://expressjs.com/
- Socket.IO (framework for dealing with websockets aka real time communication used for chat) https://socket.io/
- lowdb (local database (kind of like a txt file) using the JSON format and without needing to run a server like mysql/mongo in order to work) https://github.com/typicode/lowdb
- uuid (library used to generate random long unique identifiers used for creating tokens) https://github.com/kelektiv/node-uuid
- bcrypt (library used to generate and verify password hashes) https://github.com/dcodeIO/bcrypt.js#readme
- shortid (library used for creating id's used for identyfing database entities) https://github.com/dylang/shortid


#### Database
- the server uses `lowdb` as database, you don't need any external app to run it as it will be stored locally in the `database/db.json`

### REST Api documentation
- `POST /auth/register`
  - Body: `{username: 'user', password: '123'}` (usernames are unique)
  - Responses: 
    - Status Code: `422` Body: `{status: 422, message: 'Invalid Params'}` (in case username and password are not sent with the request)
    - Status Code: `409` Body: `{status: 409, message: 'User Already Existent'}` (in case a user with the same username already exists)
    - Status Code: `200` Body: `{id: '1231ndsa', username: 'user'}` (if everything went ok, the newly created user will be returned)
- `POST /auth/login`
  - Body: `{username: 'user', password: '123'}`
  - Responses:
    - Status Code: `422` Body: `{status: 422, message: 'Invalid Params'}` (in case username and password are not sent with the request)
    - Status Code: `403` Body: `{status: 403, message: 'Authentication Error'}` (in case username and/or password are not correct)
    - Status Code: `200` Body: `{token: '338c5427-4f0a-4025-af7a-f83fe79e9c3f'}` (if everything went ok a token will be returned that will be used in the chat)
    
### Socket IO Api Event Documentation  
You can go to `backend/src/index.html` to see a working client example.
- When connecting to the server socket send the token receivied upon login as a query parameter.
- `EMIT connectedUsers`
  - Uppon a user connecting to the server, a list will the names of all the users will be send on
  - Data e.g: `['alin', 'raul']`
- `ON message`
  - This is where the client will use `emit('message', data)` to send a message to the other users
  - Data e.g: `'this is a message'` 
- `EMIT message`
  - This is where the client will receive messages from other users.
  - Data e.g: `{user: 'alin', message: 'This is a message'}`
- `EMIT userConnected`
  - Whenever a new user is connected, all the other users will receive the name of the new user connected
  - Data e.g: `{user: 'alin'}`
- `EMIT userDisconnected`
  - Whenever a user disconnected, all the other users will receive the name of the new user that disconnected
  - Data e.g: `{user: 'alin'}`
