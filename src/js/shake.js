let addToCartButton = document.getElementById("addToCart");


//Eventlistener
function shake() {
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

shake();

