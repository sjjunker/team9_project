import { setLocalStorage, getComments, saveComment, getParam, alertMessage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

var product = {};
var imageArray = [];

//Get single image container
const imageContainer = document.getElementById("pictureSize");
//Get image slider container/multiple images
const slidesContainer = document.querySelector("#slides");

export default async function productDetails(productId) {
    product = await findProductById(productId);
    if (product != null) {
        fillImageArray();
        renderProductDetails();
        sliderControls();
        document.getElementById("addToCart").addEventListener("click", addProductToCart);
        document.getElementById("addToWishList").addEventListener("click", addProductToWishList);
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
  alertMessage("Item Added");
}

//Render to the HTML Page
function renderProductDetails() {
  document.querySelector('#productName').innerText = product.Name;
  document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;

  if (screen.width > 1000 && imageArray.length > 1) {
    //Remove picture
    document.getElementById("pictureSize").style.display = "none";
    //Show Slides
    document.querySelector("#slides").style.display = "block";

    //Render slides
    const slide = document.querySelector("#slides-container");
    renderImages(slide);
  } else {
    //Remove slides
    document.querySelector("#slides").style.display = "none";
    //Show picture
    document.getElementById("pictureSize").style.display = "block";

    //Render picture
    document.querySelector('#product-image-small').srcset = product.Images.PrimarySmall;
    document.querySelector('#product-image-medium').srcset = product.Images.PrimaryMedium;
    document.querySelector('#product-image-large').src = product.Images.PrimaryLarge;
    document.querySelector('#product-image-large').alt = product.Name;
  }

  document.querySelector('#productFinalPrice').innerText = `$${product.FinalPrice}`;

  // Updated this section of code for discount flag and positioning it
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercentage = Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice * 100));
    document.querySelector('#productdiscountPrice').innerHTML = `
      <span style="text-decoration: line-through; color: grey">$${product.SuggestedRetailPrice}</span>
      Save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}
    `;

    // Create discount flag and add it
    const discountFlag = document.createElement("div");
    discountFlag.className = "discount-flag";
    discountFlag.innerText = `${discountPercentage}% OFF`;

    // Position flag depending on single or multi image container
    if (slidesContainer.style.display === "block") {
      const firstImageContainer = slidesContainer.querySelector(".slide:first-child");
      firstImageContainer.appendChild(discountFlag);
    } else {
      const imageLargeContainer = document.querySelector('#product-image-large').parentElement;
      imageLargeContainer.appendChild(discountFlag);
    }
  } else {
    document.querySelector('#productdiscountPrice').innerText = "";
  }

  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
  document.querySelector('#addToWishList').dataset.id = product.Id;
}

function addProductToWishList() {
    // Retrieve the existing wishlist from localStorage, ensure it's an array or default to an empty array
    let wishList = JSON.parse(localStorage.getItem("so-wishlist"));
    console.log(wishList);
    // Check if wishList is not an array, reset to an empty array if needed
    if (!Array.isArray(wishList)) {
        wishList = [];
    }

    // Add the new product to the wish list array or update existing.
    const wishListId = getParam("product");
    console.log(wishListId);
    const existingProduct = wishList.find((item) => item.Id === wishListId);
    if (existingProduct === undefined) {
        wishList.push(product); // Add product if it's not already in the wishlist
    }

    // Save the updated wish list back to localStorage
    setLocalStorage("so-wishlist", wishList);

}

//Fill the image array
function fillImageArray() {

    imageArray.push(product.Images.PrimaryExtraLarge);

    if (product.Images.ExtraImages != null) {
        product.Images.ExtraImages.forEach((image) => {
            imageArray.push(image);
        });
    }
}

//Add images to the unordered list
function renderImages(selector) {
    imageArray.forEach(image => {
        const listLi = document.createElement("li");
        listLi.className = "slide";

        //If extra image
        if (image.Src != null) {
            listLi.innerHTML =
                `<li>
<img class="slidePic"
src=${image.Src} 
alt=${image.Title}
/>
</li>`;
        } else {
            //If original image
            listLi.innerHTML =
                `<li>
<img class="slidePic"
src=${image} 
alt=${""}
/>
</li>`;
        }

        selector.appendChild(listLi);
    });
}

//Control the slider
function sliderControls() {
  const slidesContainer = document.getElementById("slides-container");
  const slide = document.querySelector(".slide");
  const prevButton = document.getElementById("slide-arrow-prev");
  const nextButton = document.getElementById("slide-arrow-next");

  nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
  });

  prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
  });
}



// This function creates comments secton
function renderCommentsSection(productId) {
  const commentsSection = document.getElementById('comments-section');

  if (commentsSection) {
    // Here is where I add form and comments
    commentsSection.innerHTML = `
      <h3>Customer Comments</h3>
      <hr>
      <ul id="comments-list"></ul>
      <h4>Add New Comment</h4>
      <form id="comment-form">
        <textarea id="comment-input" placeholder="Leave your comment here..." required></textarea>
        <button type="submit">Submit</button>
      </form>
    `;

    // Render existing comments
    renderComments(productId);

    document.getElementById('comment-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const commentInput = document.getElementById('comment-input');
      const newComment = commentInput.value.trim();

      if (newComment) {
        const userName = "Sleep Outside Customer";
        saveComment(productId, { user: userName, text: newComment });
        renderComments(productId);
        commentInput.value = '';
      }
    });
  }
}

// We render existing comments
function renderComments(productId) {
  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = '';

  // This gets comments for the given product ID
  const comments = getComments(productId);

  // If there are no comments, show a placeholder message
  if (comments.length === 0) {
    commentsList.innerHTML = `<p class="no-comments">No customer comments yet</p>`;
    return;
  }

  // Render existing comments
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${comment.user}:</strong>
      <p>${comment.text}</p>
      <hr>
    `;
    commentsList.appendChild(li);
  });
}


// This is called after product details are loaded
document.addEventListener('DOMContentLoaded', async () => {
  const productId = getParam("product");
  await productDetails(productId);

  renderCommentsSection(productId);
});
