const inquirer = require('inquirer');

/* const fs = require('fs');
const generatePage = require('./src/page-template');


//calls upon the src page-template.js file for the generate page function
const generatePage = require("./src/page-template.js");

const pageHTML = generatePage(name, github);


fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});
 */

inquirer
  //also known as the question object; identify the name, type and question message 
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  //the answer object is returned as a promise
  .then(answers => console.log(answers));
