const changeTheme = (theme) => {
    const body = document.body;

    if (theme === 'dark') {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_hejqo4q', 'template_dtlmxwe', this)
      .then(() => {
        alert('Message envoyé !');
      }, (err) => {
        alert('Erreur : ' + JSON.stringify(err));
      });
  });