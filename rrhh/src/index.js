const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const multer = require('multer');

const { database } = require('./keys');
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'image'),
	filename: (req, file, cb) => {
		cb(null, req.params.id + path.extname(file.originalname));
	}
});

// inicializacion
const app = express();
require('./lib/passport');

// configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(session({
	secret: 'perico',
	resave: false,
	saveUninitialized: false,
	store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
	storage: storage,
	dest: path.join(__dirname, 'image'),
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null,true);
		}
		cb("Error archivo no soportado");
	}
}).single('file'));

// variables globales
app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	app.locals.message = req.flash('message');
	app.locals.user = req.user;
	next();
});

// rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/workers', require('./routes/workers'));
app.use('/trainings', require('./routes/trainings'));

// public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'image')));

// inicializacion servidor
app.listen(app.get('port'), ()=>{
	console.log('Servidor en el puerto', app.get('port'));
});
