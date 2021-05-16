const profileDataArgs = process.argv.slice(2, process.argv.lenght);


const printProfileData = profileDataArr => {
    // This...
    for (let i = 0; i < profileDataArr.length; i += 1) {
      console.log(profileDataArr[i]);
    }
    
    //To show the differences and similarities of forEach loop and for loop
    console.log('================');
  
    // Is the same as this...
    profileDataArr.forEach(profileItem => console.log(profileItem));//used arrow function to make the code cleaner and more concise as there is only one action
  };

printProfileData(profileDataArgs);
