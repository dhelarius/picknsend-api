const winston = require('winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./');

const mode = process.env.NODE_ENV || 'development'

module.exports = (app, passport, db) => {
    let log = 'dev'
	if (mode !== 'development') {
		log = {
			stream: {
				write: message => winston.info(message)
			}
		}
	}

    if (mode !== 'test') app.use(morgan(log));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(methodOverride(function (req) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			var method = req.body._method
			delete req.body._method
			return method
		}
	}))

    app.use(session({
        secret: config.session_secret,
        store: MongoStore.create({
            mongoUrl: db.uri,
            //touchAfter: 24 * 3600
        }),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}