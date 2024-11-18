import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(credentials, redirect = "/") {
    try {
        const token = await loginRequest(credentials);
        console.log(token);
        setLocalStorage(tokenKey, token);

        //Send home if no redirect provided
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);
    console.log(token);

    if (valid) {
        return token;
    } else {
        localStorage.removeItem(tokenKey);

        const location = window.location;
        window.location = `/login/index.html?redirect=${location.pathname}`;
    }
}

function isTokenValid(token) {
    if (token) {
        const decoded = jwtDecode(token);
        let currentDate = new Date();

        if (decoded.exp * 1000 < currentDate.getTime()) {
            //token expiration has passed
            console.log("Token expired.");
            return false;
        } else {
            // token not expired
            console.log("Valid token");
            return true;
        }
        //no token return false.
    } else return false;
}