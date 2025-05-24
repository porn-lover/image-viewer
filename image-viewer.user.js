// ==UserScript==
// @name         Image viewer
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @namespace    http://tampermonkey.net/
// @version      2025-05-24
// @description  skip the hassle
// @author       porn-lover
// @match        https://fastpic.org/view/*
// ==/UserScript==

(function() {
    'use strict';

    var urls = {
        'fastpic.org': {element: '.img-a img', attr: 'src'}
    };

    const intervalTime = 100; // 100 milliseconden
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
