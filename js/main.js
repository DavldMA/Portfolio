window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        if (document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    });
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    // cursorOutline.style.left = `${posX}px`
    // cursorOutline.style.top = `${posY}px`

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
})