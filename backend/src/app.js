const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./services/DatabaseConnection')();

// Controllers
const AuthController = require('./controllers/AuthController')(db);

// Middlewares
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

server.listen(8011);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthController);

app.use(ErrorMiddleware);

require('./controllers/ChatController')(io, db);
