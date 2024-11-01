import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

var product = {};
var imageArray = [];

export default async function productDetails(productId) {
  product = await findProductById(productId);
  if (product != null) {
    fillImageArray();
    renderProductDetails();
    sliderControls();
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

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    document.querySelector('#productdiscountPrice').innerHTML = `
    <span style="text-decoration: line-through; color: grey">$${product.SuggestedRetailPrice}</span>
    Save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}
  `;
  }
  else {
    document.querySelector('#productdiscountPrice').innerText = "";
  }

  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
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