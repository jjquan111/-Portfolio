// Smooth Scrolling
const navLinks = document.querySelectorAll('nav ul.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in on Scroll (Intersection Observer)
const sections = document.querySelectorAll('section');

const fadeInOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
};

const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeInOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    fadeInOnScroll.observe(section);
});

// Highlight Active Section in Navbar
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (
            targetSection.offsetTop <= scrollPos + 100 &&
            targetSection.offsetTop + targetSection.offsetHeight > scrollPos + 100
        ) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// Adding Styles Dynamically
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .navbar a.active {
        color: #f4a261;
        font-weight: bold;
        text-shadow: 0 2px 5px rgba(244, 162, 97, 0.5);
    }

    .parallax {
        position: relative;
        z-index: -1;
    }
`;
document.head.appendChild(style);
