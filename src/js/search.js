import { renderListWithTemplate } from "./utils.mjs";
import { productCardTemplate } from "./productList.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

//Listen for the load event, wait one second, then search for the form
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    let searchInput = new URLSearchParams(window.location.search).get("search");

    if (searchInput != null) {
      productList(searchInput);
    }
  }, 1000);
});

//Render the list of products
async function productList(searchInput) {
  const element = document.querySelector(".product-list");
  let products = await getProducts(searchInput);
  let Allproducts = products;

  renderListWithTemplate(productCardTemplate, element, products);

  //Sort by name
  const sortName = document.querySelector(".sort-name");
  const sortPrice = document.querySelector(".sort-price");

  sortName.addEventListener("click", () => {
    Allproducts.sort((a, b) =>
      a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
    );
    renderListWithTemplate(productCardTemplate, element, products);
  });

  //Sort by price
  sortPrice.addEventListener("click", () => {
    Allproducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
    renderListWithTemplate(productCardTemplate, element, products);
  });
}

//Search for the name of the product, return an array of products
//TODO: find the correct URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

async function getProducts(productName) {
  const responseTents = await fetch(baseURL + `products/search/tents`);
  const responseBackpacks = await fetch(baseURL + `products/search/backpacks`);
  const responseHammocks = await fetch(baseURL + `products/search/hammocks}`);
  const responseSBags = await fetch(baseURL + `products/search/sleeping-bags`);

  const dataTents = await convertToJson(responseTents);
  const dataBackpacks = await convertToJson(responseBackpacks);
  const dataHammocks = await convertToJson(responseHammocks);
  const dataSBags = await convertToJson(responseSBags);

  const resultsTents = dataTents.Result;
  const resultsBackpacks = dataBackpacks.Result;
  const resultsHammocks = dataHammocks.Result;
  const resultsSBags = dataSBags.Result;

  let filteredResultsTents = resultsTents.filter((result) =>
    result.Name.toLowerCase().includes(productName.toLowerCase())
  );
  let filteredResultsBackpacks = resultsBackpacks.filter((result) =>
    result.Name.toLowerCase().includes(productName.toLowerCase())
  );
  let filteredResultsHammocks = resultsHammocks.filter((result) =>
    result.Name.toLowerCase().includes(productName.toLowerCase())
  );
  let filteredResultsSBags = resultsSBags.filter((result) =>
    result.Name.toLowerCase().includes(productName.toLowerCase())
  );

  let filteredResults = filteredResultsBackpacks.concat(
    filteredResultsHammocks,
    filteredResultsSBags,
    filteredResultsTents
  );

  return filteredResults;
}
