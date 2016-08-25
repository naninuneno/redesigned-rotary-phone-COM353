var iteration = 0;
var link = document.getElementById("boxer-link");
var img = document.getElementById("boxer-img");

setInterval(function() {
	changeImg(iteration++);
}, 3000);

function changeImg(itr) {
	if (itr == 0) {
		img.src = "images/mayweather-1.png";
		link.href = "https://en.wikipedia.org/wiki/Floyd_Mayweather_Jr."
	} else if (itr == 1) {
		img.src = "images/tyson-1.png";
		link.href = "https://en.wikipedia.org/wiki/Mike_Tyson"
	} else if (itr == 2) {
		img.src = "images/pacquiao-1.png";
		link.href = "https://en.wikipedia.org/wiki/Manny_Pacquiao"
		// reset iteration for next loop
		iteration = 0;
	}
}