import { productList } from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { getProductsByCategory } from "./externalServices.mjs";
import setBreadcrumbs from "./breadcrumbs";

//Load page depending on whether it is called via link
let category;
if (category != null) {
  category = getParam("category");
  productList(".product-list", category);

  let title = document.querySelector("h2");
  title.innerHTML = category;
} else {
  category = getParam("search");
}

loadHeaderFooter();

//Set breadcrumbs
async function breadcrumbs() {
  let products = await getProductsByCategory(category);
  let productQuantity = products.length;
  console.log(category);
  let capitalizedCategory = category.charAt(0).toUpperCase() + category.substring(1);
  setBreadcrumbs(capitalizedCategory, productQuantity);
}
breadcrumbs();

