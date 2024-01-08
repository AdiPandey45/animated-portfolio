gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function circleFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (e) {
        document.querySelector(".circle").style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(${xscale},${yscale})`;

    })
}
var timeout;
circleFollower();
var tl = gsap.timeline();

document.querySelectorAll(".at").forEach(function (link) {
    gsap.set(link.querySelector(".fa-arrow-right"), { rotate: -30 });

    link.addEventListener("mouseenter", function () {
        gsap.to(link.querySelector(".fa-arrow-right"), {
            rotate: 0,
            ease: Expo.easeInOut
        });
    });

    link.addEventListener("mouseleave", function () {
        gsap.to(link.querySelector(".fa-arrow-right"), {
            rotate: -30,
            ease: Expo.easeInOut
        });
    });
});
document.querySelectorAll(".at1").forEach(function (link) {
    gsap.set(link.querySelector(".fa-arrow-right"), { rotate: -30 });

    link.addEventListener("mouseenter", function () {
        gsap.to(link.querySelector(".fa-arrow-right"), {
            rotate: 0,
            ease: Expo.easeInOut
        });
    });

    link.addEventListener("mouseleave", function () {
        gsap.to(link.querySelector(".fa-arrow-right"), {
            rotate: -30,
            ease: Expo.easeInOut
        });
    });
});


function chapta() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (e) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, Math.abs(e.x - xprev));
        yscale = gsap.utils.clamp(.8, 1.2, Math.abs(e.y - yprev));

        xprev = e.x;
        yprev = e.y;

        circleFollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector(".circle").style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(1,1)`;

        }, 100)

    })
}
chapta();


tl.from(".nav", {
    delay:1.7,
    opacity: 0,
    duration: 1,
    y: -200, ease: Expo.easeInOut
}).to("#boundingelem", {
   
    y: 0,
    stagger: 0.3,
    duration: 1,
    ease: Expo.easeInOut
}).from(".alllink", {

    opacity: 0,
    ease: Expo.easeInOut

})


var xprev = 0;
var diffx = 0;
document.querySelectorAll(".plug").forEach(function (elem) {
    elem.addEventListener("mousemove", function (e) {
        

        var diffy = (e.clientY) - elem.getBoundingClientRect().top;
        diffx = e.clientX - xprev
        xprev = e.clientX;

        var xrot = gsap.utils.clamp(-25, 25, diffx);

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diffy,
            duration: .5,
            left: e.clientX,
            rotate: xrot
        });
    });
});
document.querySelectorAll(".plug").forEach(function (elem) {
    elem.addEventListener("mouseleave", function (e) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            top:0
        })
    })
})
function loader() {
    var a = 0;
    setInterval(function () {
        var hehe = document.querySelector(".loader");

        a = a + Math.floor(Math.random() * 16.5);
        hehe.innerText = `${a}%`;
        if (a < 100) {

            hehe.innerText = `${a}%`;
        }
        else {
            a = 100;
            hehe.innerText = `${a}%`;
        }

    }, 140)
}
loader();

gsap.to(".loader", {
    top: "-100vh",
    onstart: loader(),
    delay: "1.9"
})
document.querySelectorAll(".plug").forEach(function(elem) {
    var xprev = 0;
    var xscale = 1;
  
    elem.addEventListener("mousemove", function(e) {
        clearTimeout(timeout);

        var diffx =Math.abs(e.clientX - xprev);
        

        var diffy = Math.abs(e.clientY - elem.getBoundingClientRect().top);

        xscale = gsap.utils.clamp(0.8,1.2,diffx); 
     
        xprev = e.clientX;
        timeout = setTimeout(function() {
            elem.querySelector(".view").style.transform = `scale(1,1)`;
        }, 100);

        gsap.to(elem.querySelector(".view"), {
            opacity: 1,
            ease: Expo.easeOut, // Use the correct easing format
            top: diffy + 120,
            duration: 0.5,
            left: e.clientX + 210,
            scaleX: xscale,
            
        });
    });
});

document.querySelectorAll(".plug").forEach(function (elem) {



    elem.addEventListener("mouseleave", function (e) {
        xprev = e.clientX;
        gsap.to(elem.querySelector(".view"), {
            opacity: 0,
            ease: Power3,
            
        })

    })
})


document.querySelector(".at").addEventListener("mouseenter", function () {
        gsap.to(".at .line", {
            opacity: 1,
            ease: Expo.easeInOut
        });
    });

document.querySelector(".at").addEventListener("mouseleave", function () {
        gsap.to(".at .line", {
            opacity: 0,
            
            ease: Expo.easeInOut
        });
    });
    document.querySelector(".at1").addEventListener("mouseenter", function () {
        gsap.to(".at1 .line", {
            opacity: 1,
            
            ease: Expo.easeInOut
        });
    });
    document.querySelector(".at1").addEventListener("mouseleave", function () {
        gsap.to(".at1 .line", {
            opacity: 0,
            
            ease: Expo.easeInOut
        });
    });

    document.querySelector(".menu").addEventListener("mouseenter",function(){
        gsap.to(".menu .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".menu").addEventListener("mouseleave",function(){
        gsap.to(".menu .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".dribble").addEventListener("mouseenter",function(){
        gsap.to(".dribble .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".dribble").addEventListener("mouseleave",function(){
        gsap.to(".dribble .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".insta").addEventListener("mouseenter",function(){
        gsap.to(".insta .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".insta").addEventListener("mouseleave",function(){
        gsap.to(".insta .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".twitter").addEventListener("mouseenter",function(){
        gsap.to(".twitter .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".twitter").addEventListener("mouseleave",function(){
        gsap.to(".twitter .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".linkedin").addEventListener("mouseenter",function(){
        gsap.to(".linkedin .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".linkedin").addEventListener("mouseleave",function(){
        gsap.to(".linkedin .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".comment").addEventListener("mouseenter",function(){
        gsap.to(".subs .line",{
            opacity:1,
            ease:Expo.easeInOut,

        })
    })
    document.querySelector(".comment").addEventListener("mouseleave",function(){
        gsap.to(".subs .line",{
            opacity:0,
            ease:Expo.easeInOut,

        })
    })
    document.querySelectorAll(".comment").forEach(function (link) {
        gsap.set(link.querySelector(".fa-arrow-right"), { rotate: -30 });
    
        link.addEventListener("mouseenter", function () {
            gsap.to(link.querySelector(".fa-arrow-right"), {
                rotate: 0,
                ease: Expo.easeInOut
            });
        });
    
        link.addEventListener("mouseleave", function () {
            gsap.to(link.querySelector(".fa-arrow-right"), {
                rotate: -30,
                ease: Expo.easeInOut
            });
        });
    });
    
    gsap.from(".cyn, .me", {
        opacity: 0,
        y:-200,
        duration:1,
        ease: Expo.easeInOut,
        scrollTrigger: {
            trigger: ".page3",
            start:"top 70%" ,// Adjust as needed
            scroller: ".main",
        }
    });
    
gsap.from(".subs",{
    opacity:0,
    y:-200,
    duration:1,
    ease:Expo.easeInOut,
    scrollTrigger:{
        trigger:".page3",
        scroller:".main",
        start:"top 20%",
        
    }
}
)