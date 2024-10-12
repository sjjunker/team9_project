// TODO: filter our list of products to just the 4 we need.

import { getData } from "./productData.mjs";
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(selector, category) {
    const element = document.querySelector(selector);

    const products = await getData(category);

    renderListWithTemplate(productCardTemplate, element, products);
}

function productCardTemplate(product) {
  let discount = Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice * 100));

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice} ~${discount}% off</p></a>
  </li>`;
}
