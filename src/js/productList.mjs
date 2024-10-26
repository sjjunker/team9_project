import { getData } from "./productData.mjs";
import { renderListWithTemplate } from './utils.mjs';

export async function productList(selector, category) {
  const element = document.querySelector(selector);

  const products = await getData(category);

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
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice} ~${discount}% off</p></a>
  </li>`;
}
