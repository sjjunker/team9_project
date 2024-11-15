import { getLocalStorage } from "./utils.mjs";

let addToCartButton;

if (document.body.id == "wishList") {
  //Wishlist page
  let wishlist = getLocalStorage("so-wishlist");

  wishlist.forEach((product) => {
    addToCartButton = document.getElementById(product.Id);
    shake(addToCartButton);
  });
} else {
  //All other pages
  addToCartButton = document.getElementById("addToCart");
  shake(addToCartButton);
}

//Eventlistener
function shake(addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    let cartIcon = document.querySelector(".cart");
    cartIcon.classList.add("apply-shake");

    setTimeout(() => {
      if (cartIcon.classList.contains("apply-shake")) {
        cartIcon.classList.remove("apply-shake");
      }
    }, 5000);
  });
}
