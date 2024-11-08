import renderCartContents from "./shoppingCart.mjs";
import { renderWishListContents } from "./shoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import setBreadcrumbs from "./breadcrumbs";

setBreadcrumbs("", 0);
loadHeaderFooter();
renderCartContents();
renderWishListContents();
