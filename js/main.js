// Utility function to select elements
function selectElements(selector) {
    return document.querySelectorAll(selector);
}

// Utility function to animate elements
function animateElement(element, properties, options) {
    element.animate(properties, options);
}

// Utility function to handle cursor movement
function handleCursorMove(e) {
    const { clientX: posX, clientY: posY } = e;
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    animateElement(cursorOutline, {
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
}

// Utility function to handle click events
function handleClick() {
    const cursorOutline = document.querySelector(".cursor-outline");
    cursorOutline.classList.add("expand");

    setTimeout(() => {
        cursorOutline.classList.remove("expand");
    }, 500);
}

// Utility function to handle hover effects
function handleHoverEffect(add) {
    return function () {
        const cursorOutline = document.querySelector(".cursor-outline");
        cursorOutline.classList.toggle('cursor-outline-hover', add);
    };
}

// Utility function to update active class based on scroll position
function updateActiveClass() {
    const dots = selectElements('.menu .dot');
    const menuItems = selectElements('.menu');
    const sections = selectElements('section');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    dots.forEach(item => item.classList.remove('active'));

    if (scrollPosition === 0) {
        menuItems.forEach(menuItem => {
            animateElement(menuItem, {
                opacity: "0",
                right: "0px"
            }, { duration: 500, fill: "forwards" });
        });
    } else {
        menuItems.forEach(menuItem => {
            menuItem.style.display = "";
        });
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(menuItem => {
                    animateElement(menuItem, {
                        opacity: "1",
                        right: "100px"
                    }, { duration: 500, fill: "forwards" });
                });
                const menuItem = document.querySelector(`.menu .dot[data-section="${section.id}"]`);
                if (menuItem) menuItem.classList.add('active');
            }
        });
    }
}

// Utility function to handle scroll to section on dot click
function handleDotClick(event) {
    event.preventDefault();
    const targetSection = document.querySelector(this.getAttribute('href'));
    if (this.getAttribute('href') == "#header") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetSection) {
        const scrollToPosition = targetSection.offsetTop;
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
        this.classList.add('active');
    }
}

// Event listeners setup
document.addEventListener("mousemove", handleCursorMove);
document.addEventListener('click', handleClick);

document.addEventListener('DOMContentLoaded', () => {
    const links = selectElements('a');
    links.forEach(link => {
        link.addEventListener('mouseover', handleHoverEffect(true));
        link.addEventListener('mouseout', handleHoverEffect(false));
    });

    const dots = selectElements('.menu .dot');
    dots.forEach(item => {
        item.addEventListener('click', handleDotClick);
    });

    updateActiveClass();
    window.addEventListener('scroll', updateActiveClass);
});

// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
});

const hiddenLeftElements = selectElements('.hiddenLeft');
const hiddenDownElements = selectElements('.hiddenDown');
hiddenLeftElements.forEach((el) => observer.observe(el));
hiddenDownElements.forEach((el) => observer.observe(el));

const hiddenRightElements = selectElements('.hiddenRight');
hiddenRightElements.forEach((el) => observer.observe(el));

// Loader handling
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        if (document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    });
});

function changeText(gmailAddress) {
    navigator.clipboard.writeText(gmailAddress)
        .then(() => {
            var textElement = document.getElementById('contactText');
            textElement.textContent = 'Email Copied';
            textElement.classList.add('fade-animation');

            setTimeout(function() {
                textElement.classList.remove('fade-animation');
            }, 1000);

            setTimeout(function() {
                textElement.textContent = 'Contact Me';
            }, 500);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}



// Touch screen detection (commented out as per original code)
// var hasTouchScreen = false;
// var UA = navigator.userAgent;
// hasTouchScreen = (
//     /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
//     /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
// ); 

// if (hasTouchScreen) {
//     console.log("ok")
// }
