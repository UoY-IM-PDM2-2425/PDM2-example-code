/** @type {Map<string, User>} */
const allUsers = new Map();
let usernameInput, passwordInput, signupButton, loginButton;

function setup() {
    createCanvas(400, 300);
    setupInputs();
}

function draw() {} // not technically needed


// function keyPressed() {
//     for (const [key, user] of allUsers) {
//         user.#username = "newUser";
//         user.#password = 123456;
//     }
// }


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
    #username;
    #password;

    /**
     * Creates a new User.
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    /**
     * Gets the username
     * @returns {string} The username
     */
    getUsername() {
        return this.#username;
    }

    /**
     * Attempts to log in this user with the given password
     * @param {string} username
     * @param {string} password 
     * @returns {boolean} True if the password matches and the user is logged in, false otherwise
     */
    tryLogin(username, password) {
        return username === this.#username && password === this.#password;
    }


    /**
     * Attempts to change the user's password. If the new password meets minimum requirements,
     * the password will be updated and the method will return true. If the password does not meet 
     * minimum requirements, the user's password will not be changed and the method will return false.
     * @param {string} newPassword 
     * @returns {boolean} True if the password is successfully updated, false if not
     */
    trySetPassword(newPassword) {
        const MIN_LENGTH = 8;
        const MAX_LENGTH = 12;
        const specialCharacters = new Set(["@", "!", "$", "&", "#"]);
        // Check the password meets length requirements, if not, return false and don't change the password
        if (newPassword.length < MIN_LENGTH || newPassword.length > MAX_LENGTH) {
            return false;
        }
        for (const character of newPassword) {
            if (specialCharacters.has(character)) {
                // Meets requirements
                this.#password = newPassword;
                return true; // Successfully changed
            }
        }
        return false; // Does not meet special character requirements
    }
}