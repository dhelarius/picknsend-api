require('dotenv').config();
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 3001
const app = express();

const ds = require('./config/mongodb')(db);
require('./config/express')(app, null, db);

ds.createAndSaveUser({
    name: 'Darío Jiménez',
    age: 30,
    favoriteFoods: ['Rice','Vegetables','Onion']
  }, () => {
    console.log('Usuario creado!');
});

const server = app.listen(port, () => {
	if(app.get('env') === 'test') return

	console.log(`Picknsend app started on port ${port}`)
})

server.on('close', () => {
	console.log('Closed express server')
})