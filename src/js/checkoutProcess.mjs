import { getLocalStorage, alertMessagge } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.amount
        };
    });
    return simplifiedItems;
}

const checkoutProcess = {
    itemTotal: 0,
    shipping: 0.00,
    addShipping: 2.00,
    tax: 0.0,
    orderTotal: 0.0,
    storageKey: "",
    selector: "",
    list: [],

    init: function (storageKey, selector) {
        this.storageKey = storageKey;
        this.selector = selector;
        this.list = getLocalStorage(storageKey);

        this.calculateItemSummary();
    },

    calculateItemSummary: function () {
        const summaryElement = document.querySelector(
            this.selector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.selector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;

        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice * item.amount);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    },

    calculateOrderTotal: function () {

        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        );
        this.displayOrder();
    },

    displayOrder: function () {
        const shipping = document.querySelector(this.selector + " #shipping");
        shipping.innerText = "$" + this.shipping.toFixed(2);

        const tax = document.querySelector(this.selector + " #tax");
        tax.innerText = "$" + this.tax.toFixed(2);

        const orderTotalParagraph = document.querySelector(this.selector + " #orderTotal");
        orderTotalParagraph.innerText = "$" + (this.orderTotal).toFixed(2);
    },

    checkout: async function (form) {
        const json = formDataToJSON(form);

        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const res = await checkout(json);
            console.log(res);
        } catch (err) {
            alertMessagge(err);
        }
    },
};

export default checkoutProcess;
