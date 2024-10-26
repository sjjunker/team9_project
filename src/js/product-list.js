import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

let category = getParam("category");
productList(".product-list", category);

let title = document.querySelector("h2");
title.innerHTML = category;

loadHeaderFooter();
