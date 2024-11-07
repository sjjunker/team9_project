import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import setBreadcrumbs from "./breadcrumbs";
import checkoutProcess from "./checkoutProcess.mjs";

setBreadcrumbs("", 0);
loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
    .querySelector("#zip")
    .addEventListener(
        "blur",
        checkoutProcess.calculateOrderTotal.bind(checkoutProcess)
    );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    checkoutProcess.checkout(e.target);
    // setLocalStorage("so-cart", []);
});