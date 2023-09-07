import inquirer from "inquirer";

async function login() {
  const credentials = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
    },
  ]);

  try {
    const url = 'http://localhost:3000/login'; // Adjust the URL accordingly

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const user = await response.json();
    if (response.status === 200  && user.length !== 0 ) {
      // Successful login, return the response
      return response;
    } else {
      // Invalid credentials, display an error message
      console.error('Invalid username or password. Please try again.');
      return null; // Return null to indicate login failure
    }
  } catch (error:any) {
    console.error('An error occurred:', error.message);
    return null; // Return null to indicate login failure
  }
}
  
  async function signup() {
    const userInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Choose a username:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Choose a password:',
      },
    ]);
  
    
    try {
        // Construct the request data
        const user = {
            username: await userInfo.username,
            password: await userInfo.password
          };
        const requestData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        };
    
        // Make the HTTP POST request using the fetch API
        const response = await fetch('http://localhost:3000/signup', requestData); // Adjust the URL accordingly
        
        return response
       
      } catch (error:any) {
        console.error('An error occurred:', error.message);
      }
  
    console.log('Account created successfully!');
  }

  async function BrowseMovies(){
    try {
        
        const response = await fetch('http://localhost:3000/movies'); // Adjust the URL accordingly
        let movies  = await response.json()
        console.log(movies)
       
      } catch (error:any) {
        console.error('An error occurred:', error.message);
      }
  }
  async function searchMovies() {

    const userInfo = await inquirer.prompt([
        {
            type: 'input',
            name: 'movieName',
            message: 'Enter Movie Name',
        }
    ]);
    const movieName = await userInfo.movieName;
    try {

    const url = `http://localhost:3000/movie/${movieName}`; // Adjust the URL accordingly

    const response = await fetch(url);
      const movieData = await response.json();
      const selectedMovie = movieData.rows[0];

      const movieObject = {
        id: selectedMovie[0],
        Title: selectedMovie[1],
        genre: selectedMovie[2],
      };
      
      console.log(movieObject);
}
    catch (error:any) {
        console.error('An error occurred:', error.message);
    }
}

async function displayMovieOptions() {
  console.log('Welcome to the Online Movie Store!');

  while (true) { // Infinite loop
    const choices = ['Browse Movies', 'Search Movies', 'Logout'];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices,
      },
    ]);

    switch (action) {
      case 'Browse Movies':
        await BrowseMovies();
        break;
      case 'Search Movies':
        await searchMovies();
        break;
      case 'Logout':
        console.log('Logout successful!'); // Provide feedback to the user
        return; // Exit the function, effectively ending the movie options
    }
  }
}


async function main() {
  let user = null;

  while (true) {
    if (!user) {
      console.log('Please log in or sign up:');
      const loginOrSignup = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Choose an option:',
          choices: ['Login', 'Signup', 'Exit'],
        },
      ]);

      if (loginOrSignup.choice === 'Login') {
        user = await login();
      } else if (loginOrSignup.choice === 'Signup') {
        user = await signup();
      } else if (loginOrSignup.choice === 'Exit') {
        console.log('Goodbye!');
        process.exit(0);
      }
    } else {
      // User is logged in, display movie-related options
      await displayMovieOptions();

      // After logging out from movie options, reset the user variable
      user = null;
    }
  }
}

main();