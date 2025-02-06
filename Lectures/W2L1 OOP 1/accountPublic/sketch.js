/**
 * The User class below has only public attributes and methods. Notice that 
 * the keyPressed function modifies the usernames and passwords of all users
 */

/** @type {Map<string, User>} */
const allUsers = new Map();
let usernameInput, passwordInput, signupButton, loginButton;

function setup() {
    createCanvas(400, 300);
    setupInputs();
}

function draw() {} // not technically needed

function keyPressed() {
    // console.log("updating all users")
    // for (const [key, user] of allUsers) {
    //     user.username = "newUser";
    //     user.password = 123456;
    // }
}

/**
 * Event handler for the sign up button. Attempts to create a new 
 * user with the provided username and password.
 */
function signUp() {
    const username = usernameInput.value();
    const pwd = passwordInput.value();
    if (username.length === 0 || pwd.length === 0) {
        alert("Username / password can't be empty!");
    }
    else if (allUsers.has(username)) {
        alert("User exists! Try a different username.");
    } else {
        const user = new User(username, pwd);
        allUsers.set(username, user);
        alert("Account created! Please login.");
        // clear the inputs
        usernameInput.value("");
        passwordInput.value("");
    }
}


/**
 * Event handler for the log in button. Attempts to log in an existing user
 */
function logIn() {
    const username = usernameInput.value();
    const pwd = passwordInput.value();
    if (!allUsers.has(username)) {
        alert("User not found!");
    } else {
        const user = allUsers.get(username);
        if (user.tryLogin(username, pwd)) {
            alert("You are logged in!");
            // clear the inputs
            usernameInput.value("");
            passwordInput.value("");
        } else {
            alert("Incorrect password! Try again.");
        }
    }
}


/**
 * Creates the input fields for the form.
 */
function setupInputs() {
    usernameInput = createInput("Username");
    passwordInput = createInput("Password");
    signupButton = createButton("Sign Up");
    loginButton = createButton("Login");
    const main = select("main");
    usernameInput.parent(main);
    passwordInput.parent(main);
    signupButton.parent(main);
    loginButton.parent(main);
    usernameInput.size(300, 36);
    passwordInput.size(300, 36);
    signupButton.size(80, 36);
    loginButton.size(55, 36);
    usernameInput.position(50, 100);
    passwordInput.position(50, 150);
    signupButton.position(212, 200);
    loginButton.position(302, 200);
    signupButton.mouseClicked(signUp);
    loginButton.mouseClicked(logIn);
}


/**
 * Represents a basic user name
 */
class User {
    username;
    password;

    /**
     * Creates a new User.
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }


    /**
     * Attempts to log in this user with the given password
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} True if the password matches and the user is logged in, false otherwise
     */
    tryLogin(username, password) {
        return username === this.username && password === this.password;
    }
}