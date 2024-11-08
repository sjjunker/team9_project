import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { renderProductDetails } from "./productDetails.mjs";


var wishproduct = {};

export default async function wishListDetails(wishListId) {
    wishproduct = await findProductById(wishListId);
    if (wishproduct != null) {
      renderProductDetails();
      document.getElementById("addToWishList").addEventListener("click", addProductToWishList);
    }
    else {
      document.querySelector('#productNameWithoutBrand').innerText = "Error";
      document.querySelector('#productDescriptionHtmlSimple').innerText = "Product does not exist";
      document.querySelector('#addToWishList').remove();
    }
  }

  function addProductToWishList() {
    // Retrieve the existing wishlist from localStorage, ensure it's an array or default to an empty array
    let wishList = JSON.parse(localStorage.getItem("so-wishlist"));
  
    // Check if wishList is not an array, reset to an empty array if needed
    if (!Array.isArray(wishList)) {
      wishList = [];
    }
  
    // Add the new product to the wish list array or update existing.
    const wishListId = getParam("product");
    const existingProduct = wishList.find((item) => item.Id === wishListId);
    if (!existingProduct) {
      wishList.push(wishproduct); // Add product if it's not already in the wishlist
    }
  
    // Save the updated wish list back to localStorage
    setLocalStorage("so-wishlist", wishList);

}
