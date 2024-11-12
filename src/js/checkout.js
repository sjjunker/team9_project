import { loadHeaderFooter } from "./utils.mjs";
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

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  checkoutProcess.checkout(document.forms['checkout']);
});
