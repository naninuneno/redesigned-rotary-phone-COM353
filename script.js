document.getElementById("css-toggle").onclick = function() {toggleCss()};

function toggleCss() {
    for (i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets.item(i).disabled) {
            document.styleSheets.item(i).disabled=false;
        } else {
            document.styleSheets.item(i).disabled=true;
        }
    }
}