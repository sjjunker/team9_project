import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  displayTotal(cartItems);
}

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
</li>`;

  return newItem;
}

const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");

function totalCost(cartItems) {
  if (!cartItems.length) {
    cartFooter.style.display = "none";
  } else {
    cartFooter.style.display = "block";

    let total = 0;

    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });

    return total;
  }
}

function displayTotal(cartItems) {
  const sum = totalCost(cartItems);

  cartTotal.textContent = sum.toFixed(2);
}

renderCartContents();
