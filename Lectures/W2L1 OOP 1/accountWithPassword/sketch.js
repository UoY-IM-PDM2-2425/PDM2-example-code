/**
 * The User class below has only public attributes and methods. Try adding 
 * a user using the form, then change their log in info from the browser 
 * console.
 */

/** @type {Map<string, User>} */
const allUsers = new Map();
let usernameInput, passwordInput, signupButton, loginButton;

function setup() {
    createCanvas(400, 300);
    setupInputs();
}

function draw() {} // not technically needed


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
 * Represents a basic user account
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
        this.#password = new Password(password);
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
        return username === this.#username && this.#password.isEqualTo(password);
    }


    /**
     * Attempts to change the user's password. If the new password meets minimum requirements,
     * the password will be updated and the method will return true. If the password does not meet 
     * minimum requirements, the user's password will not be changed and the method will return false.
     * @param {string} newPassword 
     * @returns {boolean} True if the password is successfully updated, false if not
     */
    trySetPassword(newPassword) {
        return this.#password.changePassword(newPassword);
    }
}


/**
 * Represents a password. Includes static utility methods for password operations.
 */
class Password {
    static #minLength = 8;
    static #maxLength = 12;
    static #specialCharacters = new Set(["@", "!", "$", "&", "#"]);
    static #numSpecial = 2;

    // The only instance variable
    #password;

    /**
     * Creates a new Password
     * @param {string} pwd The text of the password
     */
    constructor(pwd) {
        // TODO: check validity
        this.#password = pwd;
    }


    /**
     * Attempts to the change the password value
     * @param {string} newPassword The new password
     * @returns {boolean} True if the password is changed, false if not
     */
    changePassword(newPassword) {
        if (Password.meetsRequirements(newPassword)) {
            this.#password = newPassword;
            return true;
        }
        return false;
    }


    /**
     * Checks if this password text is equal to the given value
     * @param {string} value The text to compare
     * @returns {boolean} True if this password matches the value, false otherwise.
     */
    isEqualTo(value) {
        return this.#password === value;
    }

    /**
     * Checks if a string meets the password security requirements
     * @param {string} newPassword A potential password
     * @returns {boolean} True if the password meets the security requirements, false if not.
     * @static
     */
    static meetsRequirements(newPassword) {
        // Check the password meets length requirements, if not, return false
        if (newPassword.length < Password.#minLength || newPassword.length > Password.#maxLength) {
            return false;
        }
        for (const character of newPassword) {
            if (Password.#specialCharacters.has(character)) {
                // Meets requirements
                return true; 
            }
        }
        return false; // Does not meet special character requirements
    }


    /**
     * Generates a random password string that meets security requirement
     * @returns {string} A password string
     * @static
     */
    static generateRandom() {
        let characters = [];
        const specialList = Array.from(Password.#specialCharacters);
        for (let i = 0; i < Password.#numSpecial; i++) {
            const specialIndex = Password.#randomInt(0, specialList.length - 1);
            characters.push(specialList[specialIndex]);
        }
        while (characters.length < Password.#maxLength) {
            const UPPER_A = 65;
            const UPPER_Z = 91;
            const LOWER_A = 97;
            const LOWER_Z = 122;
            let randomCharCode;
            if (characters.length % 2 === 0) {
                randomCharCode = Password.#randomInt(UPPER_A, UPPER_Z);
            } else {
                randomCharCode = Password.#randomInt(LOWER_A, LOWER_Z);
            }
            characters.push(String.fromCharCode(randomCharCode));
        }
        characters = shuffle(characters);
        return characters.join(""); // Convert the array to a string
    }


    /**
     * Helper method
     * @param {number} min The smallest possible value
     * @param {number} max The largest possible value (inclusive)
     * @returns {number}
     * @static
     */
    static #randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}