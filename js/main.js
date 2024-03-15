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
    return function() {
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

$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('.menu a').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
      console.log('click');
        
        $('.menu a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.menu a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}