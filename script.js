const randomizeMainColor = () => {
    const randomColor = `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`;
    document.documentElement.style.setProperty('--main-color', `rgb(${randomColor}`);
    document.documentElement.style.setProperty('--main-color-40', `rgba(${randomColor}, 0.4)`);
    document.documentElement.style.setProperty('--main-color-80', `rgba(${randomColor}, 0.8)`);
}

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

const newsletterConfirmation = document.querySelector('.newsletter-confirmation');
const contactConfirmation = document.querySelector('.contact-confirmation');

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_hejqo4q', 'template_dtlmxwe', this)
      .then(() => {
        contactConfirmation.style.display = 'block'; 
        setTimeout(() => {
            contactConfirmation.style.display = 'none'; 
        }, 10000);
      }, (err) => {
        alert('Erreur : ' + JSON.stringify(err));
      });
  });

document.getElementById('contact-newsletter').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_hejqo4q', 'template_a23dyfc', this)
      .then(() => {
        newsletterConfirmation.style.display = 'block'; 
        setTimeout(() => {
            newsletterConfirmation.style.display = 'none'; 
        }, 10000);
      }, (err) => {
        alert('Erreur : ' + JSON.stringify(err));
      });
});  

const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
let isMenuOpen = false;

burger.addEventListener('click', () => {
if (!isMenuOpen) {
    navLinks.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable scrolling

    anime({
    targets: navLinks,
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad'
    });

    isMenuOpen = true;
} else {
    anime({
    targets: navLinks,
    translateY: [0, -50],
    opacity: [1, 0],
    duration: 400,
    easing: 'easeInQuad',
    complete: () => {
    navLinks.style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling
    }
    });

    isMenuOpen = false;
}
});


// Animation for the tilt effect on cards
const cards = document.querySelectorAll('.tilt');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        anime({
        targets: card,
        rotateX,
        rotateY,
        duration: 300,
        easing: 'easeOutQuad'
        });
    });

    card.addEventListener('mouseleave', () => {
        anime({
        targets: card,
        rotateX: 0,
        rotateY: 0,
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
        });
    });
});

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && isMenuOpen) {
            anime({
                targets: navLinks,
                translateY: [0, -50],
                opacity: [1, 0],
                duration: 400,
                easing: 'easeInQuad',
                complete: () => {
                    navLinks.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
            isMenuOpen = false;
        }
    });
});