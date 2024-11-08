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