function getSelectValue(formname, selectname) {
	var menu = document[formname][selectname];
	var selectedItem = menu.selectedIndex;
	return menu.options[selectedItem].value;
}

// practical 12 exercise 1
var form = document["12ex1-form"];
form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();

	var correctAnswers = [ "3", "2", "2" ];
	var score = 0;

	// add 1 to score for any answer that is correct
	score += (getSelectValue("12ex1-form", "12ex1-q1") == correctAnswers[0]) ? 1 : 0;
	score += (getSelectValue("12ex1-form", "12ex1-q2") == correctAnswers[1]) ? 1 : 0;
	score += (getSelectValue("12ex1-form", "12ex1-q3") == correctAnswers[2]) ? 1 : 0;

	document.getElementById("12ex1-output").innerHTML = score;
}

// practical 12 ex 3
var mySlides = new Array();
var myCaptions = new Array();
loadSlideshow();
var slidenumber = 1;
var totalslides = mySlides.length - 1;

function loadSlideshow() {
	mySlides[1] = new Image();
	mySlides[2] = new Image();
	mySlides[3] = new Image();
	mySlides[4] = new Image();
	mySlides[5] = new Image();

	mySlides[1].src = "images/cool-kid-1.jpg";
	mySlides[2].src = "images/cool-kid-2.gif";
	mySlides[3].src = "images/cool-kid-3.jpg";
	mySlides[4].src = "images/cool-kid-4.gif";
	mySlides[5].src = "images/cool-dude-5.jpg";

	// apologies for these
	myCaptions[1] = "Really cool kid";
	myCaptions[2] = "Wow";
	myCaptions[3] = "Absolute legend";
	myCaptions[4] = "Another cool kid";
	myCaptions[5] = "Harold showing he's down with the kids";
}

var slideshowForm = document["slidecontrols"];
slideshowForm.onsubmit = function(e) {
	e.preventDefault();
}
slideshowForm["Previous Slide"].onclick = function() {
	showSlide("previous");
}
slideshowForm["Next Slide"].onclick = function() {
	showSlide("next");
}

function showSlide(direction) {
    if (direction == "next") {
        (slidenumber == totalslides) ? slidenumber = 1 : slidenumber++;
    } else {
        (slidenumber == 1) ? slidenumber = totalslides : slidenumber--; 
    }
    if (document.images) {
        document.slideframe.src = mySlides[slidenumber].src;
        document.slidecontrols.caption.value = myCaptions[slidenumber];
        document.getElementById("currentslide").innerHTML = slidenumber;
    }
}