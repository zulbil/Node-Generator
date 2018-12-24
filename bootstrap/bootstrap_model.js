const inquirer      = require('inquirer');
const bootstrap     = require('./bootstrap'); 

function generateModel() {

console.log('This commands helps you to generate schema'); 
console.log('You need to answer those questions below to create that new schema'); 
console.log('\n'); 

const questions = [
  {
    type: 'input',
    name: 'model_name',
    message: "What's your model's name ?"
  },
  {
    type: 'input',
    name: 'property',
    message: "What's attribute you want to use ?"
  },
  {
    type: 'list',
    name: 'type',
    message: "What's type you want to assign him ? ",
    choices: ['Number', 'String', 'Date', 'Boolean'],
    default: 'String'
  }, 
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you want to add another property ? (just hit enter for YES)',
    default: true
  }
];

var output = {
  model_name: '', 
  properties: []
};

const questionsProp = [
  {
    type: 'input',
    name: 'property',
    message: "What's attribute you want to use ?"
  },
  {
    type: 'list',
    name: 'type',
    message: "What's type you want to assign him ? ",
    choices: ['Number', 'String', 'Date', 'Boolean'],
    default: 'String'
  }, 
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you want to add another property ? (just hit enter for YES)',
    default: true
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
    var answer = {property: answers.property, type: answers.type }; 
    output.model_name = (answers.model_name) ? answers.model_name : "" ; 
    output.properties.push(answer);
    if (answers.askAgain) {
      askProperty();
    } else {
      bootstrap.createModelFile(output); 
    }
  }).catch((err) => {
    console.log(err); 
  });
}

function askProperty() {
  inquirer.prompt(questionsProp).then(answers => {
    var answer = {property: answers.property, type: answers.type }; 
    output.properties.push(answer);
    if (answers.askAgain) {
      askProperty();
    } else {
      bootstrap.createModelFile(output); 
    }
  }).catch((err) => {
    console.log('Exist prompt', err); 
  });
}

ask();

}

module.exports = {
  generateModel
}