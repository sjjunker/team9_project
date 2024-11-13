import { loadHeaderFooter, alertMessage, removeAllAlerts} from "./utils.mjs";
import { signUp } from "./externalServices.mjs";

loadHeaderFooter();
document.querySelector('#signup').addEventListener('click', async (e) => {
  e.preventDefault();
  let name = document.querySelector('#name');
  let address = document.querySelector('#address');
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  try {
    const res = await signUp({ name, address, email, password });
    console.log(res);
    location.assign("/singup/success.html");
  } catch (err) {
    // get rid of any preexisting alerts.
    removeAllAlerts();

    for (let message in err.message) {
      alertMessage(err.message[message]);
    }

    console.log(err);
  }
});
