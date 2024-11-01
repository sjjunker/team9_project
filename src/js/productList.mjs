// TODO: filter our list of products to just the 4 we need.

import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from './utils.mjs';

export async function productList(selector, category) {
  const element = document.querySelector(selector);

  const products = await getProductsByCategory(category);

  let Allproducts = products;

  renderListWithTemplate(productCardTemplate, element, products);

  //Sort by name
  const sortName = document.querySelector(".sort-name");
  const sortPrice = document.querySelector(".sort-price");

  sortName.addEventListener("click", () => {
    Allproducts.sort((a, b) => {
      return a.NameWithoutBrand.localeCompare(b.NameWithoutBrand);
    })
    renderListWithTemplate(productCardTemplate, element, products);
  });

  //Sort by price
  sortPrice.addEventListener("click", () => {
    Allproducts.sort((a, b) => {
      return a.FinalPrice - b.FinalPrice;
    });
    renderListWithTemplate(productCardTemplate, element, products);
  });

  // Displays the modal details of the products quickly on the product list page.
  element.addEventListener("click", (event) => {
    if (event.target.classList.contains("view_button")) {
      
      const modalContent = event.target.closest(".product-card").querySelector(".modal");
      modalContent.style.display = "block";
      
      const closeButton = modalContent.querySelector(".close-btn");


      closeButton.addEventListener("click", () => {
        modalContent.style.display = "none";
      });
    }
  });
}

//render products to list
export function productCardTemplate(product) {
  let discount = Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice * 100));

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <picture>
        <source srcset="${product.Images.PrimarySmall}" media="(max-width: 500px)">
        <source srcset="${product.Images.PrimaryMedium}" media="(max-width: 1000px)">
        <img src="${product.Images.PrimaryLarge}"
        alt="Image of ${product.Name}"
      />
    <picture>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice} ~${discount}% off</p></a>

    <button class="view_button">Details</button>
    <div class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <div class="logo">
          <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
          <a href="../index.html"> Sleep<span class="highlight">Outside</span></a>
          </div>
        <img src="${product.Images.PrimarySmall}" alt="Image of ${product.Name}"/>
        <h2>${product.Brand.Name}</h2>
        <p>${product.NameWithoutBrand}</p>
        <p>$${product.FinalPrice}</p>
        <p>Save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}</p>
        <p>${product.Colors[0].ColorName}</p>
        <p>${product.DescriptionHtmlSimple}</p>
      </div>
    </div>
  </li>`;
}

export async function recommendedProducts() {
  //Get each category
  const tentProducts = await getProductsByCategory("tents");
  const backpackProducts = await getProductsByCategory("backpacks");
  const hammockProducts = await getProductsByCategory("hammocks");
  const sleepingBagProducts = await getProductsByCategory("sleeping-bags");

  //Compile into one array
  const allProducts = [...tentProducts, ...backpackProducts, ...hammockProducts, ...sleepingBagProducts];

  //Get random indecies
  const totalProducts = allProducts.length;

  let index1 = Math.floor(Math.random() * totalProducts);
  let index2 = Math.floor(Math.random() * totalProducts);
  let index3 = Math.floor(Math.random() * totalProducts);

  let productOne = allProducts[index1];
  let productTwo = allProducts[index2];
  let productThree = allProducts[index3];

  //Make array of random products
  const randomProducts = [];
  randomProducts.push(productOne);
  randomProducts.push(productTwo);
  randomProducts.push(productThree);

  //Render to document
  const recommendedList = document.getElementById("recommended-product-list");
  renderListWithTemplate(productCardTemplate, recommendedList, randomProducts);
}
