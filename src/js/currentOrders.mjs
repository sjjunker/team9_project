import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
    try {
        let orders = await getOrders(token);
        console.log(orders);
        const parent = document.querySelector(`${selector} tbody`);
        parent.innerHTML = orders.map(orderTemplate).join("");
    } catch (err) {
        console.log(err);
    }
}

function orderTemplate(order) {
    let orderItems = order.items;

    if (orderItems == null) {
        orderItems = [];
    }

    return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${orderItems.length}</td>
  <td>${order.orderTotal}</td></tr>`;
}