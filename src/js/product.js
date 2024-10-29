import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { loadAlerts } from "./alerts.js";
import { findProductById } from "./productData.mjs";
import setBreadcrumbs from "./breadcrumbs.js";

loadHeaderFooter();

// Call the function to load and display alerts
document.addEventListener("DOMContentLoaded", () => {
  loadAlerts();
});

//Load product details
const productId = getParam("product");
productDetails(productId);
window.addEventListener("resize", () => {
  productDetails(productId);
});

//Set breadcrumbs
const product = await findProductById(productId);
let category = product.Category;
category = category.charAt(0).toUpperCase() + category.substring(1);
setBreadcrumbs(category, []);
