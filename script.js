// Get the signup and signin forms
const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

// Get the error message element
const errorMessage = document.getElementById('error-message');

// Define a function to handle the signup form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the username, email, and password from the form
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate the input fields
  if (username === '' || email === '' || password === '') {
    errorMessage.textContent = 'Please fill out all fields';
    return;
  }

  // Create a new user object
  const user = {
    username,
    email,
    password
  };

  // Send a POST request to the server to create a new user
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // If the user was created successfully, redirect to the signin page
    window.location.href = '/signin';
  })
  .catch((error) => {
    console.error(error);
    errorMessage.textContent = 'Error creating user';
  });
});

// Define a function to handle the signin form submission
signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the username and password from the form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validate the input fields
  if (username === '' || password === '') {
    errorMessage.textContent = 'Please fill out all fields';
    return;
  }

  // Send a POST request to the server to authenticate the user
  fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // If the user was authenticated successfully, redirect to the dashboard
    window.location.href = '/dashboard';
  })
  .catch((error) => {
    console.error(error);
    errorMessage.textContent = 'Error authenticating user';
  });
});
