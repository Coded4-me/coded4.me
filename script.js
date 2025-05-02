const animatedElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const direction = entry.target.dataset.animateDirection || "left";
                const translateX = direction === "left" ? [-100, 0] : [100, 0];
                
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateX: translateX,
                    duration: 1000,
                    easing: "easeOutExpo",
                });
                observer.unobserve(entry.target); // Animate only once
            }
        });
    },
    {
        threshold: 0.1,
    }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_hejqo4q', 'template_dtlmxwe', this)
      .then(() => {
        alert('Message envoyé !');
      }, (err) => {
        alert('Erreur : ' + JSON.stringify(err));
      });
  });