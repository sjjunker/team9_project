import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { loadAlerts } from "./alerts.js";

// Call the function to load and display alerts
document.addEventListener("DOMContentLoaded", () => {
  loadAlerts();
});

loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);
window.addEventListener("resize", () => {
  productDetails(productId);
});
