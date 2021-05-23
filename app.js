const inquirer = require('inquirer');
const fs = require('fs');

//calls upon the src page-template.js file for the generate page function
const generatePage = require("./src/page-template.js");

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
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when:({confirmAbout}) =>{
                if(confirmAbout){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        
      ]);

  };
 
//Add new project function
const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
  
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project? (Required)',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('You need to enter a project name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('You need to enter a project description!');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)',
          validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('You need to enter a project GitHub link!');
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
        }
      ])
      .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };

  //the answer object is returned as a promise
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./dist/index.html', pageHTML, err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Page created! Check out index.html in this directory to see it!');
      
        fs.copyFile('./src/style.css', './dist/style.css', err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Style sheet copied successfully!');
        });
      });
  });
 