document.querySelector("#newsletter form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      document.querySelector("#email").value = "";
    }
  });