var zooplaTrello = require('zoopla-trello');
var express = require('express');
var multipart = require('connect-multiparty');
var logger = require('morgan');
var favicon = require('serve-favicon');

var app = express();
app.engine('handlebars', require('express-handlebars')({
	helpers: {
		stringify(thing) {
			return JSON.stringify(thing);
		}
	}
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
	res.render('index', {trelloAppKey: process.env.TRELLO_APP_KEY});
});

app.post('/_submit', multipart(), (req, res, next) => {
	zooplaTrello(req.body.property, {
		applicationKey: process.env.TRELLO_APP_KEY,
		googleMapsKey: process.env.GOOGLE_API_KEY,
		listId: req.body.list,
		userToken: req.body.auth,
	})
	.then(card => res.json(card))
	.catch(error => {
		res.status(400);
		res.json({error: error.message});
	});
})

app.listen(3000);
