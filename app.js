const builder = require('botbuilder');
const restify = require('restify');
const apiairecognizer = require('api-ai-recognizer');
const getQuestions = require('./dialogs/getQuestions');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Rodando em: %s', server.url);
});

const connector = new builder.ChatConnector({
    appId: 'id',
    appPassword: 'id'
});

server.post('/api/messages', connector.listen());

const recognizer = new apiairecognizer("API AI KEY");
const intents = new builder.IntentDialog({
    recognizers: [recognizer]
});

const bot = new builder.UniversalBot(connector);

bot.library(getQuestions);
bot.dialog('/', intents);