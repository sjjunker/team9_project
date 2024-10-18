import { getLocalStorage } from "./utils.mjs";

const addToCartButton = document.getElementById("addToCart");
const superscriptDiv = document.createElement("div");
let cartIconDiv = document.createElement("div");

//Set superscriptDiv class
superscriptDiv.className = "superscript";

//get number of items in cart
let cart = getLocalStorage("so-cart");
let storageCount = cart.length;

//Set initial cart amount if not zero
if (storageCount > 0) {
  superscriptDiv.innerText = `${storageCount}`;
}

//Listen for adding items to cart
if (addToCartButton != null) {
  addToCartButton.addEventListener("click", () => {
    storageCount += 1;
    superscriptDiv.innerText = `${storageCount}`;
  });
}

//Listen for removing items from cart
//Add listener to each button
if (document.querySelector(".delete_button") != null) {
  cart.forEach((item) => {
    let deleteButton = document.getElementById(`button${item.Id}`);

    deleteButton.addEventListener("click", () => {
      storageCount -= 1;
      superscriptDiv.innerText = `${storageCount}`;
    });
  });
}

//Listen for the load event, wait one second, then search for the cart selector
document.addEventListener("DOMContentLoaded", () => {
  //get the cart icon containing div
  setTimeout(() => {
    cartIconDiv = document.querySelector(".cart");
    cartIconDiv.appendChild(superscriptDiv);
  }, 500);
});
