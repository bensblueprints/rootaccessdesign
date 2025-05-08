// Registration form handler for meetup events
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registration-form');
  
  if (registrationForm) {
    registrationForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(registrationForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const experience = formData.get('experience');
      const expectations = formData.get('expectations');
      
      // Show loading state
      const submitButton = registrationForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Registering...';
      
      try {
        // In a real implementation, this would send data to a server
        // For now, we'll simulate a server response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const formContainer = document.querySelector('.registration-form-container');
        const successMessage = document.createElement('div');
        successMessage.className = 'registration-success';
        successMessage.innerHTML = `
          <div class="success-icon"><i class="fas fa-check-circle"></i></div>
          <h3>Registration Successful!</h3>
          <p>Thanks for registering, ${name}! We've sent a confirmation email to ${email}.</p>
          <p>We look forward to seeing you at Supanich Condo this Friday at 6:30 PM.</p>
          <p>Please remember to bring your laptop and download Cursor before the event.</p>
        `;
        
        // Hide the form and show success message
        registrationForm.style.display = 'none';
        formContainer.appendChild(successMessage);
        
        // Store registration in local storage for demo purposes
        const registrations = JSON.parse(localStorage.getItem('meetupRegistrations') || '[]');
        registrations.push({
          name,
          email,
          phone,
          experience,
          expectations,
          date: new Date().toISOString()
        });
        localStorage.setItem('meetupRegistrations', JSON.stringify(registrations));
        
      } catch (error) {
        console.error('Registration error:', error);
        alert('Sorry, there was an error processing your registration. Please try again.');
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
  
  // Update registration count if element exists
  const registrationCount = document.getElementById('registration-count');
  if (registrationCount) {
    const registrations = JSON.parse(localStorage.getItem('meetupRegistrations') || '[]');
    const maxSeats = 20; // Maximum number of seats
    const remainingSeats = Math.max(0, maxSeats - registrations.length);
    
    registrationCount.textContent = remainingSeats;
    
    // Update styling if seats are running low
    if (remainingSeats < 5) {
      registrationCount.classList.add('seats-limited-count');
    }
  }
}); 