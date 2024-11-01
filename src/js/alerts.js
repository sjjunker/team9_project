export async function loadAlerts() {
  try {
    // Fetch alerts.json
    const response = await fetch("../json/alerts.json");

    // Verify fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON data
    const alerts = await response.json();

    // Checks for alerts
    if (alerts.length === 0) {
      console.log("No alerts to display.");
      return;
    }

    // Create the <section> element
    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    // Loop through each alert and build the <p> element
    alerts.forEach((alert) => {
      const alertParagraph = document.createElement("p");
      alertParagraph.textContent = alert.message;
      alertParagraph.style.backgroundColor = alert.background;
      alertParagraph.style.color = alert.color;
      alertParagraph.style.padding = "10px";
      alertParagraph.style.margin = "5px 0";
      alertParagraph.style.borderRadius = "4px";
      alertSection.appendChild(alertParagraph);
    });

    // Prepending to main element
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.prepend(alertSection);
    } else {
      console.error("<main> element not found in the document.");
    }
  } catch (error) {
    console.error("Error loading alerts:", error);
  }
}
