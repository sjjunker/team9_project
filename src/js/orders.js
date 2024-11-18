import { loadHeaderFooter } from "./utils.mjs";
import currentOrders from "./currentOrders.mjs";
import { checkLogin } from "./auth.mjs";

loadHeaderFooter();

const token = checkLogin();
currentOrders("#order-table", token);
