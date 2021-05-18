const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');

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

  const promptUser =()=>{
    //also known as the question object; identify the name, type and question message   
    return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name (Required)?',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
        },
        {
            type: 'input',
            name:'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                  return true;
                } else {
                  console.log('Please enter your GitHUb username!');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
          },
      ]);

  };

//Add new project function
const promptProject = portfolioData =>{
    
    //If there is no 'projects' array property, create one
    if (!portfolioData.projects){
    //Array to store project data to help make multiple projects
    portfolioData.projects = [];
    }


    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectnameInput => {
                if (projectnameInput) {
                  return true;
                } else {
                  console.log("Please enter your Project's name!");
                  return false;
                }
              }
          }, 
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
          }, 
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          }, 
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHUb link to your project. (Required)'
            validate: githubLinkInput => {
                if (githubLinkInput) {
                  return true;
                } else {
                  console.log('Please enter your GitHub for the project.');
                  return false;
                }
              }
          }, 
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          },
        ])

        .then(projectData => {
            portfolioData.projects.push(projectData)
            
            if(projectData.confirmAddProject){
                return promptProject(portfolioData);
            }
            else{
                return portfolioData;
            }
          })      
          
};
  
  //the answer object is returned as a promise
  promptUser()
  .then(promptProject)
  .then(portfolioData =>{
      console.log(portfolioData);
    });
