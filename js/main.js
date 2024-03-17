// Select elements
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const links = document.querySelectorAll('a');
const menuItems = document.querySelectorAll('.menu');
const dots = document.querySelectorAll('.menu .dot');
const sections = document.querySelectorAll('section');

menuItems.forEach(menuItem => {
    menuItem.style.display = "none";
});


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
    menuItems.forEach(menuItem => {
        menuItem.style.display = "";
    });

    function updateActiveClass() {
        dots.forEach(item => item.classList.remove('active'));
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition === 0) {
            menuItems.forEach(menuItem => {
                menuItem.animate({
                    opacity: "0",
                    right: "0px"
                }, { duration: 500, fill: "forwards" });
            });
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
    
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(menuItem => {
                        menuItem.animate({
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
    

    updateActiveClass();

    window.addEventListener('scroll', updateActiveClass);

    dots.forEach(item => {
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
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    })
})

const hiddenLeftElements = document.querySelectorAll('.hiddenLeft');
const hiddenDownElements = document.querySelectorAll('.hiddenDown');
hiddenLeftElements.forEach((el) => observer.observe(el));
hiddenDownElements.forEach((el) => observer.observe(el));


// var hasTouchScreen = false;

// var UA = navigator.userAgent;
//         hasTouchScreen = (
//             /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
//             /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
//         ); 

// if (hasTouchScreen) {
//     console.log("ok")
// }
