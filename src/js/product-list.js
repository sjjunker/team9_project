import { productList } from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

//Load page depending on whether it is called via link
let category = getParam("category");
if (category != null) {
  productList(".product-list", category);

  let title = document.querySelector("h2");
  title.innerHTML = category;
}

loadHeaderFooter();
