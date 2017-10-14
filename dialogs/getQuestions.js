const builder = require('botbuilder');
const fs = require('fs');
const library = new builder.Library('getQuestions');
const playQuiz = require('./playQuiz');
const final = require('./final');
const utils = require('./utils');

library.library(playQuiz);
library.library(final);

let perguntas = []
let resposta = []

let yes = 'Sim';
let not = 'Não';
let opt1 = 'Perguntas';
let opt2 = 'Respostas';
let opt3 = 'Quiz';
let opt4 = 'Ver todas as perguntas';
let opt5 = 'Insira o número da pergunta';
let opt6 = 'Todas as respostas';
let opt7 = 'Buscar resposta específica';


function parseData(){
    // Pegando os dados do json
    var content = fs.readFileSync('./dados/data.json');
    var jsonData = JSON.parse(content);

    for (var i in jsonData.economics.quests){
        
        perguntas.push({
            key: jsonData.economics.quests[i].num,
            value: 'Pergunta n° ' + jsonData.economics.quests[i].num + '\n\n' + jsonData.economics.quests[i].pergunta
        });
        
        resposta.push({
            key: jsonData.economics.quests[i].num,
            value: 'Pergunta: n° ' + jsonData.economics.quests[i].num + '\n\n' + jsonData.economics.quests[i].pergunta + '\n\n' + 'Resposta: ' + jsonData.economics.quests[i].resposta
        })
    }
} 
library.dialog('getPerguntas', [

    (session) => {
        builder.Prompts.choice(session, 'Escolha uma das opções', [opt4, opt5], { listStyle: builder.ListStyle.button });
    }, 
    (session, result) => {
        resultado = result.response.entity;
        if (resultado === opt4){
            for (var i in perguntas)
                session.send(perguntas[i].value);
            session.replaceDialog('final:question');
        } else if (resultado === opt5)
            builder.Prompts.number(session, 'Insira o número da pergunta');   
    },
    (session, result) => {
        if (utils.verifyNumber(result.response) != -1) {
            for (var i in perguntas)
                if (perguntas[i].key === result.response)
                    session.send(perguntas[i].value);
        } else 
            session.send('Vish! Número invalido!');
        session.replaceDialog('final:question');
    }
])

library.dialog('getResposta', [
    (session) => {
        builder.Prompts.choice(session, 'O que você deseja visualizar ?', [opt6, opt7], {listStyle: builder.ListStyle.button});
    }, 
    (session, result) => {
        resultado = result.response.entity;
        if (resultado === opt6){
            for (var i in resposta)
                session.send(resposta[i].value);
            session.replaceDialog('final:question');
        } else if (resultado === opt7) 
            builder.Prompts.number(session, 'Diz ai o número da pergunta');
    },
    (session, result) => {
        if (utils.verifyNumber(result.response) != -1){
            for (var i in resposta)
                if (resposta[i].key === result.response)
                    session.send(resposta[i].value);
        } else 
            session.send('Opa! Este número não vale!');
        session.replaceDialog('final:question');
    }
])

library.dialog('not', [
    (session) => {
        session.send('Falou então! Até mais');
    }
])

library.dialog('yes', [
    (session) => {
        
        // Chamando função para recuperar as informações
        parseData();

        // Salvando as informações no acesso do usuário
        session.userData.perguntas = perguntas;
        session.userData.resposta = resposta;

        builder.Prompts.choice(session, 'Escolha uma das opções', [opt1, opt2, opt3], { listStyle: builder.ListStyle.button });
    },
    (session, result) => { 
        if (result.response.entity === opt1)
            session.replaceDialog('getQuestions:getPerguntas');
        else if (result.response.entity === opt2)
            session.replaceDialog('getQuestions:getResposta');
    }
])

library.dialog('/', [

    (session) => {
        builder.Prompts.choice(session, 'Opa beleza! Deseja consultar alguma questão de economia ?', [yes, not], { listStyle: builder.ListStyle.button });
    },
    (session, rest) => {
        if (rest.response.entity === 'Sim')
            session.replaceDialog('getQuestions:yes');
        else
            session.replaceDialog('getQuestions:not');
    }
])
module.exports = library