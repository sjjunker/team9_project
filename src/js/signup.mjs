import { loadHeaderFooter, alertMessage, removeAllAlerts } from "./utils.mjs";
import { signUp } from "./externalServices.mjs";

loadHeaderFooter();
document.querySelector('#signup').addEventListener('click', async (e) => {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let address = document.querySelector('#address').value;
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

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
