import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadAlerts } from './alerts.js';

// Call the function to load and display alerts
document.addEventListener('DOMContentLoaded', () => {
  loadAlerts();
});

const productId = getParam("product");
productDetails(productId);
