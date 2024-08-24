// const { json } = require("express");

$(document).ready(function($){
    "use strict";

    jQuery(".menu-toggle").click(function(){
        jQuery(".main-navigation").toggleClass("toggled");
    });
    jQuery(".header-menu ul li a").click(function(){
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger:"body",
        start: "30px top",
        end :"bottom bottom",

        onEnter:()=>myFunction(),
        onLeaveBack :() =>myFunction(),


        
    });

    function myFunction(){
        elementFirst.classList.toggle('sticky_head');
        }

        var scene=$(".js-parallax-scene").get(0);
        var parallaxInstance =new Parallax(scene);
 });