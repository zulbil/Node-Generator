const fs            = require('fs');
const mongoose      = require('mongoose');
const commander     = require('commander');
const inquirer      = require('inquirer');

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
    default: 'String',
    filter: function(val) {
      return val.toLowerCase();
    }
  }, 
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Do you want to add another property ? (just hit enter for YES)',
    default: true
  }
];

var output = [];

function ask() {
  inquirer.prompt(questions).then(answers => {
    var answer = {property: answers.property, type: answers.type }; 
    output.push(answer);
    if (answers.askAgain) {
      ask();
    } else {
      console.log(JSON.stringify(output, undefined, 2));
    }
  });
}

ask();