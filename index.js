var zooplaTrello = require('zoopla-trello');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

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

app.get('/', (req, res) => {
	res.render('index', {trelloAppKey: process.env.TRELLO_APP_KEY});
});

app.post('/_submit', bodyParser.urlencoded({extended: false}), (req, res, next) => {
	zooplaTrello(req.body.property, {
		applicationKey: process.env.TRELLO_APP_KEY,
		listId: req.body.list,
		userToken: req.body.auth,
	})
	.then(card => res.json(card))
	.catch(next);
})

app.listen(3000);
