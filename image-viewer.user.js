// ==UserScript==
// @name         Image viewer
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @namespace    http://tampermonkey.net/
// @version      2025-06-04h
// @description  skip the hassle
// @author       porn-lover
// @match        *://*.fastpic.org/view/*
// @match        *://*.imgbox.com/*
// @match        *://*.imagebam.com/view/*
// @match        *://*.pixhost.to/show/*
// @match        *://*.postimg.cc/*
// ==/UserScript==

(function() {
    'use strict';

    var urls = {
        'fastpic.org': {element: 'a.btn-outline-secondary', attr: 'src', url_regex: {from:['&dl=1'], to:['']}},
        'imagebam.com': {element: 'img.main-image', attr: 'src', continue: {element: '[data-shown="inter"]', action: "var date = new Date();date.setTime(date.getTime() + (6 * 60 * 60 * 1000));var expires = \"; expires=\" + date.toUTCString();document.cookie = \"nsfw_inter=1\" + expires + \"; path=/\";window.location.reload();"}},
        'imgbox.com': {element: 'img#img', attr: 'src'},
        'pixhost.to': {element: 'img#image', attr: 'src'},
        'postimg.cc': {element: 'img#main-image', attr: 'src'},
    };

    const intervalTime = 50; // 50 milliseconden
    const stopTime = 5000;    // 5 seconden
    const obj = urls[window.location.hostname.replace(/^www\./, '')];
    if (obj === undefined) {
        return;
    }
    
    const myInterval = setInterval(() => {
        if($(obj.element).length) {
            let newLocation = $(obj.element).attr(obj.attr);
            if(obj.url_regex) {
                newLocation = newLocation.replace(obj.url_regex.from[0], obj.url_regex.to[0]);
            }
            window.location = newLocation;
        }
        
        if(obj.continue !== undefined && $(obj.continue.element).length) {
            eval(obj.continue.action);
        }
    }, intervalTime);

    setTimeout(() => {
        clearInterval(myInterval);
    }, stopTime);
    
})();
