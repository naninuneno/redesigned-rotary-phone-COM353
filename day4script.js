function displayText(element, inputtext) {
	element.innerHTML = inputtext;
}

// practical 7 exercise 6
var practical7ex6form = document.getElementById("7ex6-form");
practical7ex6form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();
	var submissionDetails = e.target;
	var name = submissionDetails[0].value;

	// practical 8 exercise 3
	if (name == null || name == "") {
		alert("Please enter your name!");
		return;
	}

	var uni = submissionDetails[1].value;
	var campus = submissionDetails[2].value;
	var course = submissionDetails[3].value;
	var text = name + ", welcome to my website! <br> You're a " + course + " student in " + uni + " at " + campus;
	displayText(document.getElementById("7ex6-output"), text);
}

// practical 8 exercise 1
var practical8ex1form = document.getElementById("8ex1-form");
practical8ex1form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();
	var submissionDetails = e.target;
	var countUpTo = submissionDetails[0].value;
	var text = "";
	text += "Start the counting: <br>";
	for (var i = 1; i <= countUpTo; i++) {
		text += "Counter i = " + i + "<br>";
	}
	text += "Counting is completed!";
	displayText(document.getElementById("8ex1-output"), text);	
}

// practical 8 exercise 2
var practical8ex2btn = document.getElementById("8ex2-btn");
practical8ex2btn.onclick = function() {
	var campuses = [ "Belfast",  "Coleraine", "Jordanstown", "Magee" ];
	var courses = [ "Software Engineering", "Computer Science", "Interactive Multimedia Design", "Information Communication Technology" ];
	
	var text = "<b>Campuses:</b> <br>";
	var i = 0;
	while (i < campuses.length) {
		text += campuses[i] + "<br>";
		i++
	}
	text += "<b>Courses:</b> <br>";
	for (i = 0; i < courses.length; i++) {
		text += courses[i] + "<br>";
	}

	displayText(document.getElementById("8ex2-output"), text);
}

// practical 8 exercise 3 grades
var practical8ex3form = document.getElementById("8ex3-form");
practical8ex3form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();
	var submissionDetails = e.target;

	// fields for adding validation messages
	mark1validationField = document.getElementById("mark1-validation");
	mark2validationField = document.getElementById("mark2-validation");
	mark3validationField = document.getElementById("mark3-validation");
	mark4validationField = document.getElementById("mark4-validation");
	validationFields = [ mark1validationField, mark2validationField, mark3validationField, mark4validationField ];

	// clear down any validation text that may be present since last form submission that is no longer applicable
	for (var i = 0; i < validationFields.length; i++) {
		validationFields[i].innerHTML = "";
	}
	// clear down result each form submission in case of any new validation errors
	document.getElementById("8ex3-output").innerHTML = "";

	// set false if any field fails validation
	var validSubmission = 
		numericFieldValidation(submissionDetails[0].value, 0, 100, mark1validationField) &
		numericFieldValidation(submissionDetails[1].value, 0, 100, mark2validationField) &
		numericFieldValidation(submissionDetails[2].value, 0, 100, mark3validationField) &
		numericFieldValidation(submissionDetails[3].value, 0, 100, mark4validationField);
	if (!validSubmission) {
		// don't do any further evaluation if invalid entry found
		return;
	}

	var mark1 = parseFloat(submissionDetails[0].value);
	var mark2 = parseFloat(submissionDetails[1].value);
	var mark3 = parseFloat(submissionDetails[2].value);
	var mark4 = parseFloat(submissionDetails[3].value);

	var avg = (mark1 + mark2 + mark3 + mark4) / 4;
	var grade;
	var remark;
	if (avg >= 90) {
		grade = "an A";
		remark = "Outstanding!";
	} else if (avg >= 80) {
		grade = "a B";
		remark = "Very good!";
	} else if (avg >= 70) {
		grade = "a C";
		remark = "Fairly good!";
	} else if (avg >= 60) {
		grade = "a D";
		remark = "Doing okay!";
	} else {
		grade = "an E"
		remark = "Need to work much harder!";
	}
	var text = "You got " + grade;
	if (grade == "E") {
		text += ", failed";
	}
	text += ", your average mark is " + avg;
	text += "<br> " + remark;
	displayText(document.getElementById("8ex3-output"), text);
}

function isNumber(n) {
	return !isNaN(parseFloat(n));
}

function numericFieldValidation(value, lowerbound, upperbound, validationField) {
	// don't validate numeric entry if empty
	if (!nonemptyFieldValidation(value, validationField)) {
		return;
	}

	if (!isNumber(value)) {
		validationField.innerHTML = "Please enter a numeric value";
		return false;
	} else if (parseFloat(value) < lowerbound) {
		validationField.innerHTML = "Please enter a value greater than " + lowerbound;
		return false;
	} else if (parseFloat(value) > upperbound) {
		validationField.innerHTML = "Please enter a value lesser than " + upperbound;
		return false;
	}
	return true;
}

function nonemptyFieldValidation(value, validationField) {
	if (value == null || value == "") {
		validationField.innerHTML = "Please enter a value";
		return false;	
	}
	return true;
}

