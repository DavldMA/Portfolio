const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
var links = document.querySelectorAll('a');

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        if (document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    });
});



window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
})

document.addEventListener('DOMContentLoaded', function() {
    

    function addHoverClass() {
        cursorOutline.classList.add('cursor-outline-hover');
    }

    function removeHoverClass() {
        cursorOutline.classList.remove('cursor-outline-hover');
    }

    links.forEach(function(link) {
        link.addEventListener('mouseover', addHoverClass);
        link.addEventListener('mouseout', removeHoverClass);
    });
});