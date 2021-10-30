require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);

console.log(process.env.HOST_FRONT_END);

const io = require('socket.io')(server, {
	cors: {
		origin: process.env.HOST_FRONT_END,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['authorization'],
	},
});
const socketIO = require('./socket');

const db = require('./config/db');
const cors = require('./config/cors');
const route = require('./routes');
const port = process.env.PORT || 6060;

// Connect db
db.connect();

//Start socket
socketIO.start(io);

app.use(cors.config());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

route(app);

server.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`),
);

module.exports = app;
