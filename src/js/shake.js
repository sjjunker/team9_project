let addToCartButton = document.getElementById("addToCart");
let cartIcon = document.querySelector(".cart");

//Eventlistener
addToCartButton.addEventListener("click", () => {
    cartIcon.classList.add('apply-shake');
});