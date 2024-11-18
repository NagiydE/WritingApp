document.addEventListener('DOMContentLoaded', () => {
  // this is to make a a temporary user ID if not already stored:
  let temporaryUserId = localStorage.getItem('temporaryUserId');
  if (!temporaryUserId) {
      temporaryUserId = `tempUser_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('temporaryUserId', temporaryUserId);
  }

      // Add a listener for navigating to the gallery
  console.log('Temporary User ID:', temporaryUserId);
    // Add a listener for navigating to the gallery
    const galleryButton = document.getElementById('galleryButton');
    if (galleryButton) {
        galleryButton.addEventListener('click', () => {
            window.location.href = `/gallery?temporaryUserId=${temporaryUserId}`;
        });
    }

  // this adds temporaryUserId to forms so that their work is saved, but no authentication required and then navigates to the gallery.
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      if (!form.querySelector('input[name="temporaryUserId"]')) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'temporaryUserId';
          input.value = temporaryUserId;
          form.appendChild(input);
      }
  });
});
