// ==UserScript==
// @name         Image viewer
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @namespace    http://tampermonkey.net/
// @version      2026-08-08b
// @description  skip the hassle
// @author       porn-lover
// @match        *://*.fastpic.org/view/*
// @match        *://*.imgbox.com/*
// @match        *://*.imagebam.com/view/*
// @match        *://*.pixhost.to/show/*
// @match        *://*.postimg.cc/*
// @grant        GM_cookie
// ==/UserScript==

(function() {
    'use strict';

    const urls = {
        'fastpic.org': { 
            element: 'a.btn-outline-secondary', 
            attr: 'href', 
            replace: [/&dl=1/g, ''] 
        },
        'imagebam.com': { 
            element: 'img.main-image', 
            attr: 'src', 
            continue: {
                element: '[data-shown="inter"]', 
                action: () => {
                    GM_cookie('set', {
                        url: window.location.href,
                        name: 'nsfw_inter',
                        value: '1',
                        expirationDate: Math.floor(Date.now() / 1000) + (6 * 60 * 60)
                    }, (error) => {
                        if (!error) {
                            window.location.reload();
                        } else {
                            console.error('Cookie zetten mislukt via GM_cookie:', error);
                        }
                    });
                }
            }
        },
        'imgbox.com':  { element: 'img#img', attr: 'src' },
        'pixhost.to':  { element: 'img#image', attr: 'src' },
        'postimg.cc':  { element: 'img#main-image', attr: 'src' },
    };

    const host = window.location.hostname.replace(/^www\./, '');
    const obj = urls[host];
    if (!obj) return;

    const checkAndRedirect = () => {
        const $elem = $(obj.element);
        if ($elem.length) {
            let newLocation = $elem.attr(obj.attr);
            if (newLocation) {
                if (obj.replace) {
                    newLocation = newLocation.replace(obj.replace[0], obj.replace[1]);
                }
                window.location.href = newLocation;
                return true;
            }
        }

        if (obj.continue && $(obj.continue.element).length) {
            obj.continue.action();
            return true;
        }
        return false;
    };

    // Voer direct een check uit zodra DOM klaar is
    if (!checkAndRedirect()) {
        // Indien het element nog niet geladen is, luister dynamisch naar DOM-wijzigingen
        const observer = new MutationObserver((_, obs) => {
            if (checkAndRedirect()) {
                obs.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
        
        // Safety timeout om te stoppen met kijken na 5 seconden
        setTimeout(() => observer.disconnect(), 5000);
    }
})();
