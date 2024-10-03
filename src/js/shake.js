let addToCartButton = document.getElementById("addToCart");
let cartIcon = document.querySelector(".cart");

//Eventlistener
addToCartButton.addEventListener("click", () => {
    cartIcon.classList.add('apply-shake');
});

//TODO: Add script to product_pages/index.html when completed with team
//<script src="../js/shake.js" defer></script>