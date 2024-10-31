import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    itemTotal: 0,
    shipping: 10.00,
    addShipping: 2.00,
    tax: .06,
    subTotal: 0,
    orderTotal: 0,
    storageKey: "",
    selector: "",
    list: [],

    init: function(storageKey, selector) {
        this.storageKey = storageKey;
        this.selector = selector;
        this.list = getLocalStorage(storageKey);
        this.calculateSubtotal();
        
    },

    calculateSubtotal: function()  {
        this.list.forEach(product => {
            this.subTotal += product.FinalPrice * product.amount

        });
        this.displayOrder();
    },

    calculateOrderTotal: function() {
        var taxTotal = subTotal + (subTotal * tax);
        if (itemTotal > 1) {
            shipping += (itemTotal - 1) * addShipping;
        }
        taxTotal += shipping;
    },

    caclculateItemTotal: function() {
        list.forEach(product => {
            itemTotal += product.quantity;
        });
    },

    displayOrder: function() {
        const orderTotal = document.querySelector(this.selector + " #cartTotal");
        orderTotal.innerText = "$" + this.subTotal;
    }
}

export default checkoutProcess;