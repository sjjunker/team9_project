import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

//Get redirect parameter
let redirect = getParam("redirect");

//Login event listener
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login({ email, password }, redirect);
});
