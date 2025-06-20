const roles = [
    'Software Developer',
    'Web Developer',
    'Flutter Developer',
    'Python Enthusiast'
];
let roleIndex = 0;
let charIndex = 0;
let typing = true;
const typedRole = document.getElementById('typed-role');
const cursor = document.querySelector('.cursor');

function typeRole() {
    if (typing) {
        if (charIndex < roles[roleIndex].length) {
            typedRole.textContent += roles[roleIndex][charIndex];
            charIndex++;
            setTimeout(typeRole, 80);
        } else {
            typing = false;
            setTimeout(typeRole, 1200);
        }
    } else {
        if (charIndex > 0) {
            typedRole.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeRole, 40);
        } else {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 400);
        }
    }
}

// Scroll-in animation for sections
function animateOnScroll() {
    const sections = document.querySelectorAll('.scroll-in-left, .scroll-in-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-in classes to all main sections (including about, but not hero)
    const allSections = Array.from(document.querySelectorAll('main > section, .about'));
    let left = true;
    allSections.forEach((section) => {
        if (section.classList.contains('hero')) return;
        section.classList.add(left ? 'scroll-in-left' : 'scroll-in-right');
        left = !left;
    });

    typeRole();
    animateOnScroll();

    // Scroll-in animation for sections
    const sections = document.querySelectorAll('.scroll-in-left, .scroll-in-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));

    // Fallback: after 2 seconds, force all sections to visible if not already shown
    setTimeout(() => {
        document.querySelectorAll('.scroll-in-left, .scroll-in-right').forEach(section => {
            if (!section.classList.contains('show')) {
                section.classList.add('show');
            }
        });
    }, 2000);

    // Smooth scroll for top navigation
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}); 