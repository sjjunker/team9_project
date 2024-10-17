import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import renderCartContents from "./shoppingCart.mjs"
import { loadHeaderFooter } from "./utils.mjs"
loadHeaderFooter();





//Attach eventListener to the delete-button
function deleteItem() {
  //Grab localstorage
  const cartItems = getLocalStorage("so-cart");

  //Add listener to each button
  cartItems.forEach((item, index) => {
    const deleteButton = document.getElementById(`button${item.Id}`);

    deleteButton.addEventListener("click", () => {
      const cartWithoutItem = cartItems.filter((item) => item != cartItems[index]);
      setLocalStorage("so-cart", cartWithoutItem);
      renderCartContents();
    })
  })
}




renderCartContents();
