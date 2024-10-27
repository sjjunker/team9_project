import { getLocalStorage } from "./utils.mjs";

const addToCartButton = document.getElementById("addToCart");
const superscriptDiv = document.createElement("div");
let cartIconDiv = document.createElement("div");

//Set superscriptDiv class
superscriptDiv.className = "superscript";

//get number of items in cart
function calculateItems() {
  let cart = getLocalStorage("so-cart");
  let count = 0;
  cart.forEach((item) => {
    count += item.amount;
  });
  return count;
}

//Set initial cart amount if not zero
let storageCount = calculateItems();

if (storageCount > 0) {
  superscriptDiv.innerText = `${storageCount}`;
}

//Listen for adding items to cart
if (addToCartButton != null) {
  addToCartButton.addEventListener("click", () => {
    setTimeout(() => {
      storageCount = calculateItems();
      superscriptDiv.innerText = `${storageCount}`;
    }, 500);
  });
}

//Listen for removing items from cart
//Add listener to each button
export function decrementSuperscript() {
  if (document.querySelector(".delete_button") != null) {
    let cart = getLocalStorage("so-cart");

    cart.forEach((item) => {
      let deleteButton = document.getElementById(`button${item.Id}`);

      deleteButton.addEventListener("click", () => {
        setTimeout(() => {
          storageCount = calculateItems();
          superscriptDiv.innerText = `${storageCount}`;
        }, 500);
      });
    });
  }
}
decrementSuperscript();

//Listen for item quantity change
export function plusMinusSuperscript() {
  if (document.querySelector(".delete_button") != null) {
    let cart = getLocalStorage("so-cart");

    cart.forEach((item) => {
      const minusButton = document.getElementById(`Mbutton${item.Id}`);
      const plusButton = document.getElementById(`Pbutton${item.Id}`);

      //Minus button
      minusButton.addEventListener("click", () => {
        setTimeout(() => {
          storageCount = calculateItems();
          superscriptDiv.innerText = `${storageCount}`;
        }, 500);
      });

      //Plus button
      plusButton.addEventListener("click", () => {
        setTimeout(() => {
          storageCount = calculateItems();
          superscriptDiv.innerText = `${storageCount}`;
        }, 500);
      });
    });
  }
}
plusMinusSuperscript();

//Listen for the load event, wait one second, then search for the cart selector
document.addEventListener("DOMContentLoaded", () => {
  //get the cart icon containing div
  setTimeout(() => {
    cartIconDiv = document.querySelector(".cart");
    cartIconDiv.appendChild(superscriptDiv);
  }, 500);
});
