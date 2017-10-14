const builder = require('botbuilder');
const library = new builder.Library('playQuiz');
const sleep = require('system-sleep');

library.dialog('start', [

    (session) => {
        session.send('Este é um simples jogo, onde você tem deve ser sincero !' + 
        '\n\n' + 'Aqui as perguntas vão correndo para que você tenha uma visão geral delas ');
        builder.Prompts.choice(session, 'Aperte para começar', 'Começar', {listStyle: builder.ListStyle.button});
    },
    (session, result) => {

        data = session.userData.resposta;
        for (var i in data){
            session.send(data[i].value);
            sleep(10000);
        }
    }
]).cancelAction('cancel', null, { matches: /^parar/i })

module.exports = library