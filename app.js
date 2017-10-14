const builder = require('botbuilder');
const restify = require('restify');
const apiairecognizer = require('api-ai-recognizer');
const getQuestions = require('./dialogs/getQuestions');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('No ar em: %s', server.url);
});

const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages', connector.listen());
const bot = new builder.UniversalBot(connector);
const recognizer = new apiairecognizer("");
const intents = new builder.IntentDialog({
    recognizers: [recognizer]
});

bot.library(getQuestions);
bot.dialog('/', intents);

intents.matches('boasVindas', function(session, results) {
    let fulfillment = builder.EntityRecognizer.findEntity(results.entities, 'fulfillment')
    if (fulfillment) {
        session.beginDialog('getQuestions:/')
    } 
})