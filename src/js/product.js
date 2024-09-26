import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  const cartList = JSON.parse(localStorage.getItem("so-cart")) || [];

  cartList.push(product);
  
  setLocalStorage("so-cart", cartList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
const cartButton = document.getElementById("addToCart")

cartButton.addEventListener("click", addToCartHandler);
