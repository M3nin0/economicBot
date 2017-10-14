const builder = require('botbuilder');
const library = new builder.Library('playQuiz');

library.dialog('notice', [
    (session) => {
        session.send('Este é um simples jogo, onde você tem deve ser sincero !');   
    }
])

library.dialog('start', [

])

module.exports = library