import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

var product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId)
  if (product != null) {
    renderProductDetails();
  }
  else {
    document.querySelector('#productNameWithoutBrand').innerText = "Error";
    document.querySelector('#productDescriptionHtmlSimple').innerText = "Product does not exist";
    document.querySelector('#addToCart').remove();
  }
  document.getElementById("addToCart").addEventListener("click", addProductToCart(product));
}

function addProductToCart(product) {
  // Retrieve the existing cart from localStorage, ensure it's an array or default to an empty array
  let cart = JSON.parse(localStorage.getItem("so-cart"));

  // Check if cart is not an array, reset to an empty array if needed
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart array
  cart.push(product);

  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

function renderProductDetails() {
  document.querySelector('#productName').innerText = product.Name;
  document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
  document.querySelector('#productImage').src = product.Image;
  document.querySelector('#productImage').alt = product.Name;
  document.querySelector('#productFinalPrice').innerText = product.FinalPrice;
  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
}
