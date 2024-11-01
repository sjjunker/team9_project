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
}

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
  </li>`;
}
