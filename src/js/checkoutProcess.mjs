import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    itemTotal: 0,
    shipping: 10.00,
    addShipping: 2.00,
    tax: 0,
    orderTotal: 0,
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
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;

        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal;
    },

    calculateOrderTotal: function () {
        this.tax = (this.itemTotal * 0.06);
        if (itemTotal > 1) {
            this.shipping += (itemTotal - 1) * addShipping;
        }
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        );
        this.displayOrder();
    },

    displayOrder: function () {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        shipping.innerText = "$" + this.shipping.toFixed(2);

        const tax = document.querySelector(this.outputSelector + " #tax");
        tax.innerText = "$" + this.tax.toFixed(2);

        const orderTotal = document.querySelector(this.selector + " #orderTotal");
        orderTotal.innerText = "$" + this.subTotal.toFixed(2);
    }
}

export default checkoutProcess;