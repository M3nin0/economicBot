const builder = require('botbuilder');
const library = new builder.Library('final');
const getQuestions = require('./getQuestions');
const playQuiz = require('./playQuiz');

library.library(playQuiz);

let opt1 = 'Pesquisar por pergunta específica';
let opt2 = 'Ver as respostas';
let opt3 = 'Jogar o quiz';
let opt4 = 'Por enquanto está ok';

library.dialog('question', [
    (session) => {
        builder.Prompts.choice(session,'O que deseja fazer agora ?', [opt1, opt2, opt3, opt4], {listStyle: builder.ListStyle.button});
    },
    (session, result) => {
        resposta = result.response.entity;
        if (resposta === opt1){
            session.beginDialog('getQuestions:getPerguntas');
        } else if (resposta === opt2){
            session.beginDialog('getQuestions:getResposta');
        } else if (resposta === opt3) {
            session.beginDialog('playQuiz:start');
        } else if (resposta === opt4){
            session.send('Okay');
        }
    }
])

module.exports = library