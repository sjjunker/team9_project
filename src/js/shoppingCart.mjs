import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

//Show cart items to screen
export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  displayTotal(cartItems);
  deleteItem();
}

//Cart total
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");

//Compute the cart total
function totalCost(cartItems) {
  let total = 0;

  if (!cartItems.length > 0) {
    cartFooter.style.display = "none";
  } else {
    cartFooter.style.display = "block";

    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
  }

  return total;
}

//Display cart total to screen
function displayTotal(cartItems) {
  const sum = totalCost(cartItems);

  cartTotal.textContent = sum.toFixed(2);
}


//Create the HTML list of items
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button type="button" class="delete_button" id="button${item.Id}"><span data-id=${item.Id}>X</span></button>
</li>`;

  return newItem;
}
