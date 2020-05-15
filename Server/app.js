const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const propertyRoutes = require('./routes/properties');
const userRoutes = require('./routes/users');
const checklistRoutes = require('./routes/checklist')

mongoose.connect(process.env.MONGO_LOCAL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'Options') {
		res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH, DELETE,GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/properties', propertyRoutes);
app.use('/user', userRoutes);
app.use('/checklist',checklistRoutes)

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
