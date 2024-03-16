// Select elements
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const links = document.querySelectorAll('a');


function handleCursorMove(e) {
    const { clientX: posX, clientY: posY } = e;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
}

function handleClick() {
    cursorOutline.classList.add("expand");

    setTimeout(() => {
        cursorOutline.classList.remove("expand");
    }, 500);
}

function handleHoverEffect(add) {
    return function () {
        cursorOutline.classList.toggle('cursor-outline-hover', add);
    };
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        if (document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    });
});

window.addEventListener("mousemove", handleCursorMove);
document.addEventListener('click', handleClick);

document.addEventListener('DOMContentLoaded', () => {
    links.forEach(link => {
        link.addEventListener('mouseover', handleHoverEffect(true));
        link.addEventListener('mouseout', handleHoverEffect(false));
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu .dot');
    const sections = document.querySelectorAll('section');

    function updateActiveClass() {
        menuItems.forEach(item => item.classList.remove('active'));

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if(section.id == "header"){
                    //hide all dots
                }
                const menuItem = document.querySelector(`.menu .dot[data-section="${section.id}"]`);
                if (menuItem) menuItem.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveClass);

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
            const targetSection = document.querySelector(this.getAttribute('href'));
            if(this.getAttribute('href') == "#header") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else if (targetSection) {

                const scrollToPosition = targetSection.offsetTop;
                window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
                this.classList.add('active');
            }
        });
    });

    updateActiveClass();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// var hasTouchScreen = false;

// if ("maxTouchPoints" in navigator) {
//     hasTouchScreen = navigator.maxTouchPoints > 0;
// } else if ("msMaxTouchPoints" in navigator) {
//     hasTouchScreen = navigator.msMaxTouchPoints > 0;
// } else {
//     var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
//     if (mQ && mQ.media === "(pointer:coarse)") {
//         hasTouchScreen = !!mQ.matches;
//     } else if ('orientation' in window) {
//         hasTouchScreen = true; // deprecated, but good fallback
//     } else {
//         // Only as a last resort, fall back to user agent sniffing
//         var UA = navigator.userAgent;
//         hasTouchScreen = (
//             /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
//             /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
//         );
//     }
// }

// if (hasTouchScreen)
//     // Do something here. 
// }