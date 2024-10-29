import { productList } from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { getData } from "./productData.mjs";
import setBreadcrumbs from "./breadcrumbs";

//Load page depending on whether it is called via link
let category = getParam("category");
if (category != null) {
  productList(".product-list", category);

  let title = document.querySelector("h2");
  title.innerHTML = category;
}

loadHeaderFooter();

//Set breadcrumbs
async function breadcrumbs() {
  let products = await getData(category);
  console.log(products);
  let capitalizedCategory =
    category.charAt(0).toUpperCase() + category.substring(1);
  let productQuantity = products.length;
  console.log(productQuantity);
  setBreadcrumbs(capitalizedCategory, productQuantity);
}
breadcrumbs();
