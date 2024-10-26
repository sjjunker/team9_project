import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

var product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId)
  if (product != null) {
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addProductToCart);
  }
  else {
    document.querySelector('#productNameWithoutBrand').innerText = "Error";
    document.querySelector('#productDescriptionHtmlSimple').innerText = "Product does not exist";
    document.querySelector('#addToCart').remove();
  }
}

function addProductToCart() {
  // Retrieve the existing cart from localStorage, ensure it's an array or default to an empty array
  let cart = JSON.parse(localStorage.getItem("so-cart"));

  // Check if cart is not an array, reset to an empty array if needed
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart array or add to existing.
  const productId = getParam("product");
  const hy = cart.find((item) => item.Id === productId);
  if (hy != null) {
    hy.amount += 1;
  } else {
    product.amount = 1;
    cart.push(product);
  }


  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

function renderProductDetails() {
  document.querySelector('#productName').innerText = product.Name;
  document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
  document.querySelector('#product-image-small').srcset = product.Images.PrimarySmall;
  document.querySelector('#product-image-medium').srcset = product.Images.PrimaryMedium;
  document.querySelector('#product-image-large').src = product.Images.PrimaryLarge;
  document.querySelector('#product-image-large').alt = product.Name;
  document.querySelector('#productFinalPrice').innerText = `$${product.FinalPrice}`;

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    document.querySelector('#productdiscountPrice').innerHTML = `
    <span style="text-decoration: line-through; color: grey">$${product.SuggestedRetailPrice}</span>
    Save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}
  `;
  }
  else {
    document.querySelector('#productdiscountPrice').innerText = ""
  }

  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
}
