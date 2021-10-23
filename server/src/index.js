const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const http = require('http');

const server = http.createServer(app);

const route = require('./routes');
const cors = require('./config/cors');
const db = require('./config/db');
const port = process.env.PORT || 6060;

// connect db
db.connect();

app.use(cors.config());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

route(app);

server.listen(port, () =>
	console.log(`App listening at http://localhost:${port}`),
);

module.exports = app;
