import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default async function wishListDetails() {
  renderWishListContents();


  if (document.body.id == "wishList") {
    deleteWishItem();
    addProductToCart();
    console.log("in the wish list");
  } else {
    document.getElementById("addToWishList").addEventListener("click", addProductToWishList);
  }

  console.log("past the if/else");
}

function addProductToCart() {
  //Grab localstorage
  const wishItems = getLocalStorage("so-wishlist");
  const cart = JSON.parse(localStorage.getItem("so-cart"));

  // Check if cart is not an array, reset to an empty array if needed
  if (!Array.isArray(cart)) {
    cart = [];
  }

  //Add listener to each button
  wishItems.forEach((product) => {
    const addButton = document.getElementById(product.Id);

    addButton.addEventListener("click", () => {
      // Add the new product to the cart array or add to existing.
      const hy = cart.find((item) => item.Id === product.Id);
      if (hy != null) {
        hy.amount += 1;
      } else {
        product.amount = 1;
        cart.push(product);
      }

      // Save the updated cart back to localStorage
      setLocalStorage("so-cart", cart);
    });
  });
}

export function renderWishListContents() {
  const wishItems = getLocalStorage("so-wishlist");
  const htmlWishItems = wishItems.map((item) => wishListItemTemplate(item));
  document.querySelector(".product-wish-list").innerHTML = htmlWishItems.join("");
}

function deleteWishItem() {
  //Grab localstorage
  const wishItems = getLocalStorage("so-wishlist");

  //Add listener to each button
  wishItems.forEach((item, index) => {

    const deleteButton = document.getElementById(`button-wishlist${item.Id}`);

    deleteButton.addEventListener("click", () => {
      console.log("Inside delete button");
      const wishListWithoutItem = wishItems.filter((item) => item != wishItems[index]);
      setLocalStorage("so-wishlist", wishListWithoutItem);
      renderWishListContents();
      deleteWishItem();
    });
  });
}

function wishListItemTemplate(item) {
  const newItem = `<li class="wishlist-card divider">
  <a href="#" class="wishlist-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <p class="card__name">${item.Name}</p>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <button id="${item.Id}"><span data-id="${item.Id}">Add to Cart</span></button>
  <p class="wishlist-card__price">$${item.FinalPrice}</p>
  <button type="button" class="wishlist-delete_button" id="button-wishlist${item.Id}"><span data-id=${item.Id}>X</span></button>
</li>`;

  return newItem;
}