# HashByte-Chat

# backend

#### How to start
- install NodeJS
- `npm i -g nodemon`
- set cwd to `backend/` and run `npm start`

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
  - This is where the client will use `emit(`message', data)` to send a message to the other users
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
