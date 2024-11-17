const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(orderObject) {
  //create custom options object
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderObject),
  };

  //Stringify and pass to fetch using url
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function signUp(cred) {
  //create custom options object
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cred),
  };

  //Stringify and pass to fetch using url
  return await fetch(baseURL + "users/", options).then(convertToJson);
}


//Login credentials
export async function loginRequest(credentials) {
  //create custom options object
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };

  //Stringify and pass to fetch using url
  const response = fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

//Get orders from server
export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}