// Create modal structure
document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
      <div id="registerModal" class="modal">
        <div class="modal-content">
          <span class="close-btn" id="closeModal">&times;</span>
          <div class="logo">
            <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
            <a href="index.html">Sleep<span class="highlight">Outside</span></a>
          </div>
          <h2>Join SleepOutside!</h2>
          <p>Register with us and be entered for a chance to win amazing outdoor gear!</p>
          <button class="register-btn" id="registerNow">Register Now</button>
        </div>
      </div>
    `;
  
    // Insert modal into the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  
    const modal = document.getElementById('registerModal');
    const closeModal = document.getElementById('closeModal');
    const registerNow = document.getElementById('registerNow');
  
    // Check if first visit
    if (!localStorage.getItem('visited')) {
      modal.style.display = 'block';
    }
  
    // X button to close
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      localStorage.setItem('visited', 'true');
    });
  
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
        localStorage.setItem('visited', 'true');
      }
    });
  });
  