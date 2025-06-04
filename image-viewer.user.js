// ==UserScript==
// @name         Image viewer
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @namespace    http://tampermonkey.net/
// @version      2025-06-04
// @description  skip the hassle
// @author       porn-lover
// @match        https://fastpic.org/view/*
// @match        https://imgbox.com/*
// @match        https://imagebam.com/view/*
// @match        https://pixhost.to/show/*
// @match        https://postimg.cc/*
// ==/UserScript==

(function() {
    'use strict';

    var urls = {
        'fastpic.org': {element: '.img-a img', attr: 'src'},
        'imagebam.com': {element: 'img.main-image', attr: 'src'},
        'imgbox.com': {element: 'img#img', attr: 'src'},
        'pixhost.to': {element: 'img#image', attr: 'src'},
        'postimg.cc': {element: 'img#main-image', attr: 'src'},
    };

    const intervalTime = 50; // 100 milliseconden
    const stopTime = 5000;    // 5 seconden
    const obj = urls[window.location.hostname];

    const myInterval = setInterval(() => {
        if($(obj.element).length) {
            window.location = $(obj.element).attr(obj.attr);
        }
    }, intervalTime);

    setTimeout(() => {
        clearInterval(myInterval);
    }, stopTime);
    
})();
