const breadcrumb = document.querySelector(".breadcrumbs");

export default function setBreadcrumbs(category, productQuanitity) {
  if (document.body.id == "cart") {
    breadcrumb.innerHTML = "Home &#8594; Cart";
  } else if (document.body.id == "checkout") {
    breadcrumb.innerHTML = "Home &#8594; Cart &#8594; Checkout";
  } else if (document.body.id == "product-pages") {
    breadcrumb.innerHTML = `Home &#8594; ${category}`;
  } else if (document.body.id == "product-list") {
    breadcrumb.innerHTML = `Home &#8594; ${category} &#8594; (${productQuanitity} items)`;
  } else if (document.body.id == "wishList") {
    breadcrumb.innerHTML = `Home &#8594; Cart &#8594; Wishlist`;
  }
}
