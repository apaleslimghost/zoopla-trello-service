var zooplaTrello = require('zoopla-trello');

exports.handler = function(event, context, callback) {
	zooplaTrello(event.property, {
		applicationKey: process.env.TRELLO_APP_KEY,
		userToken: process.env.TRELLO_USER_TOKEN,
		listId: process.env.TRELLO_LIST_ID,
	}).then(card => callback(null, card), callback);
};
