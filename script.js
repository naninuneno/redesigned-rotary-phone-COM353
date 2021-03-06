// set nightmode on page load based on if local storage has value for it
initializeNightmode();

var cssOn = true;

document.getElementById("css-toggle").onclick = function() {toggleCss()};
document.getElementById("nightmode-toggle").onclick = function() {toggleNightmode()};

function toggleCss() {
    for (i = 0; i < document.styleSheets.length; i++) {
        if (cssOn) {
            document.styleSheets.item(i).disabled=true;
        } else {
            document.styleSheets.item(i).disabled=false;
        }
    }

    cssOn = !cssOn;
}

function initializeNightmode() {
    var nightmodeOn = localStorage.getItem('nightmode');
    var nightmodeEl = document.getElementById('nightmode-style');

    if (nightmodeOn != null && nightmodeEl != null) {
        nightmodeEl.removeAttribute('disabled');
    }
}

function toggleNightmode() {
    // use local storage to store the value of nightmode so it persists across pages
    var nightmodeOn = localStorage.getItem('nightmode');

    if (nightmodeOn == null) {
        document.getElementById('nightmode-style').removeAttribute('disabled');
        localStorage.setItem("nightmode", "true");
    } else {
        document.getElementById('nightmode-style').setAttribute('disabled', '');
        localStorage.removeItem("nightmode");
    }
}