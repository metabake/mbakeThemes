$(document).ready(function () {
    // are we running in native app or in a browser?
    window.isphone = false;
    if (document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    console.log('phonegap?', window.isphone);
    if (window.isphone) { // file is a browser
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

// check if promises supports in browser
if (!window.Promise) {
    depp.define({
        'hasPromise': [
            'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js',
            'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js'
        ]
    });
} else  {
    depp.define({
        'hasPromise': ''
    });
    depp.done('hasPromise');
}

depp.define({
    'cssJs': [
        '#axios'
        , 'https://cdn.jsdelivr.net/npm/js-offcanvas@1.2.6/dist/_js/js-offcanvas.pkgd.js'
        
        , 'https://cdn.jsdelivr.net/npm/fuse.js@3.3.0/dist/fuse.min.js'
        , ROOT + 'assets/js/ui.js'
        
        , 'https://cdn.jsdelivr.net/npm/paginationjs@2.1.4/dist/pagination.min.js'
        
        , 'https://cdn.jsdelivr.net/npm/blueimp-load-image@2.19.0/js/load-image.all.min.js'
        
        , '/assets/3rd/jquery.disableAutoFill.js'
    ],
    'style': [
        '#cssJs'
        , ROOT + 'assets/css/spectreBottom.css'
    ],
    'fonts': [
        '#style'
        , 'css!https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i'
    ]
});

function onDeviceReady() { // nothing will work before this
    console.log('deviceready!');
    // depp.done('device');
}

// function cssLoaded() {// called by the style sheet in layout
//     depp.done('css');
// }

// depp.require(['css', 'device', 'cssJs'], function () {
//     depp.done('style');
// })

let _scSz = true
function setupUserSzSc() {
    $(window).scroll(function () {
        _scSz = true
    })
    $(window).resize(function () {
        _scSz = true
    })
}//()

// usage: ////////////////////////////////////////////////////////////////////
depp.require(['fonts'], function () {// 'show' page, ex: unhide
    setupUserSzSc()

    $('.delayShowing').removeClass('delayShowing') // show

    setInterval(function () {
        if (_scSz) {
            _scSz = false
            if (typeof userSzSc !== "undefined") userSzSc()
        }
    }, 150)

    console.log('style done', Date.now() - _start)
})//ready

// util: /////////////////////////////////////////////////////////////////////
function getUrlVars() {
    var vars = [], hash
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=')
        vars.push(hash[0])
        vars[hash[0]] = hash[1]
    }
    return vars
}

function inView(el) { // is element in viewport
    //special bonus for jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    )
}
