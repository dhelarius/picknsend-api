require('dotenv').config();
const express = require('express');
const passport = require('passport');
const db = require('./db');

const port = process.env.PORT || 3001
const app = express();

const ds = require('./config/mongodb')(db);
require('./config/passport')(passport, ds);
require('./config/express')(app, passport, db);
const routes = require('./config/routes')(app, passport, ds);
const secureRoutes = require('./config/secure-routes')(require('./app/users/middlewares/account')(ds), ds);

app.use('/api', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);

const server = app.listen(port, () => {
	if(app.get('env') === 'test') return

	console.log(`Picknsend app started on port ${port}`)
})

server.on('close', () => {
	console.log('Closed express server')
})