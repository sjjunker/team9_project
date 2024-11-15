import wishListDetails from "./wishList.js";
import { loadHeaderFooter } from "./utils.mjs";
import setBreadcrumbs from "./breadcrumbs";

setBreadcrumbs("", 0);
loadHeaderFooter();
wishListDetails();
