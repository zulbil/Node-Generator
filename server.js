const fs            = require('fs');
const mongoose      = require('mongoose');
const commander     = require('commander');
const inquirer      = require('inquirer');
const bootstrap     = require('./config/bootstrap'); 


mongoose.Promise    = global.Promise;

console.log('*****************************************');
console.log('* Welcome to the Node generator App *');
console.log('*****************************************');

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
  });
}

ask();
