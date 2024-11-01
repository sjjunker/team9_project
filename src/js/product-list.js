import { productList, recommendedProducts } from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { getProductsByCategory } from "./externalServices.mjs";
import setBreadcrumbs from "./breadcrumbs";

//Load page depending on whether it is called via link
let category = getParam("search");
if (category == null) {
  category = getParam("category");
}

productList(".product-list", category);
let title = document.querySelector("h2");
title.innerHTML = category;
recommendedProducts();

loadHeaderFooter();

//Set breadcrumbs
async function breadcrumbs() {

  let products = await getProductsByCategory(category);

  let productQuantity = products.length;
  let capitalizedCategory = category.charAt(0).toUpperCase() + category.substring(1);
  setBreadcrumbs(capitalizedCategory, productQuantity);
}
breadcrumbs();
