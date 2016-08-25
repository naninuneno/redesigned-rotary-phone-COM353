// practical 9 exercise 1
var practical9ex1form = document.getElementById("9ex1-form");
practical9ex1form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();

	// fields for adding validation messages
	fnameValidationField = document.getElementById("fname-validation");
	snameValidationField = document.getElementById("sname-validation");
	ageValidationField = document.getElementById("age-validation");
	marriedValidationField = document.getElementById("married-validation");
	validationFields = [ fnameValidationField, snameValidationField, ageValidationField, marriedValidationField ];

	// clear down any validation text that may be present since last form submission that is no longer applicable
	for (var i = 0; i < validationFields.length; i++) {
		validationFields[i].innerHTML = "";
	}
	// clear down result each form submission in case of any new validation errors
	document.getElementById("9ex1-output").innerHTML = "";

	var submissionDetails = e.target;
	var fname = submissionDetails[0].value;
	var sname = submissionDetails[1].value;
	var age = submissionDetails[2].value;
	var maritalStatus;

	var maritalStatuses = document.getElementsByName('marital-status');
	for (var i = 0; i < maritalStatuses.length; i++) {
		if (maritalStatuses[i].checked) {
			maritalStatus = maritalStatuses[i].value;
		}
	}

	// set false if any field fails validation
	var validSubmission = 
		textFieldValidation(submissionDetails[0], fname, fnameValidationField) &
		textFieldValidation(submissionDetails[1], sname, snameValidationField) &
		numericFieldValidation(age, 0, 100, ageValidationField) &
		nonemptyFieldValidation(maritalStatus, marriedValidationField);
	if (!validSubmission) {
		// don't do any further evaluation if invalid entry found
		return;
	}

	age = parseInt(age);
	var married = maritalStatus == "married";

	var insuranceClass;
	if (age >= 30) {
		if (married) {
			insuranceClass = "Class 1";
		} else {
			insuranceClass = "Class 2";
		}
	} else {
		if (married) {
			insuranceClass = "Class 3";
		} else {
			insuranceClass = "Class 4";
		}
	}

	var text = "Insurance class: " + insuranceClass;
	document.getElementById("9ex1-output").innerHTML = text;
}

// practical 9 exercise 3
var practical9ex3form = document.getElementById("9ex3-form");
practical9ex3form.onsubmit = function(e) {
	/* prevent from actually submitting / refreshing the page */
	e.preventDefault();
	var submissionDetails = e.target;

	// fields for adding validation messages
	nameValidationField = document.getElementById("name-validation");
	emailValidationField = document.getElementById("email-validation");
	phoneValidationField = document.getElementById("phone-validation");
	bookValidationField = document.getElementById("book-validation");

	validationFields = [ nameValidationField, emailValidationField, phoneValidationField, bookValidationField ];
	// clear down any validation text that may be present since last form submission that is no longer applicable
	for (var i = 0; i < validationFields.length; i++) {
		validationFields[i].innerHTML = "";
	}

	// set false if any field fails validation
	validAll(submissionDetails);
}

function validName(submissionDetails) {
	return textFieldValidation(submissionDetails[0], submissionDetails[0].value, nameValidationField);
}

function validNo() {
  if (!document.userSurvey.phone.value) {
    window.alert("Phone number missing. Please enter a valid phone number to continue.");
    document.userSurvey.phone.focus();
    return false;
  } else {
    var numbersOnly = "";
    var chars = "";
    var phoneNo = document.userSurvey.phone.value;
    for (i = 0; i < phoneNo.length; i++) {
      chars = phoneNo.substring(i,i+1);

      if (chars >= "0" && chars <= "9") {
        numbersOnly = numbersOnly + chars;
      } 
    }
    if (numbersOnly.length != 13) {
      window.alert("Incorrect phone number format.You must enter 13 numbers.");
      document.userSurvey.focus();
      return false;
    } else {
      var areacode = numbersOnly.substring(0,2);
      var leading0 = numbersOnly.substring(2,3);
      var exchange = numbersOnly.substring(3,5);
      var ext1 = numbersOnly.substring(5,9);
      var ext2 = numbersOnly.substring(9);
      var newNumber =( "+" + areacode + " " +"(" + leading0 + ")" + exchange + " " + ext1 + "-" + ext2);
      document.userSurvey.phone.value = newNumber;
      return true;
    }
  }
}

function validEmail() {
  if (!document.userSurvey.email.value) {
    window.alert("E-mail Address missing. Please enter a valid E-mail address to continue.");
    document.userSurvey.email.focus();
    return false;
  } else {
    var emailAddress = document.userSurvey.email.value;
    var atLoc = emailAddress.indexOf("@", 1);
    var dotLoc = emailAddress.indexOf(".", atLoc+2);
    var len = emailAddress.length;
    if (atLoc > 0 && dotLoc > 0 && len > dotLoc+2) {
      return true;
    } else {
      alert("Invalid E-mail address! Please enter your e-mail address again.");
      document.userSurvey.email.focus();
      return false;
    }
  }
}

function validChoice() {
  var bookChoice = "";
  var books = "";
  for (i=0; i< 4; i++) {
    if (document.userSurvey['bookChoice'+i].checked) {
      bookChoice = document.userSurvey['bookChoice'+i].value;
      books = books +"\n"+ bookChoice; //"\n" output a newline
    }
  }
  if (books == "") {
    window.alert("You must select at least one book category.");
    return false;
  } else {
    var userName = document.userSurvey.userName.value;
    var email = document.userSurvey.email.value;
    var phoneNo = document.userSurvey.phone.value;
    
    document.userSurvey.textarea.innerHTML = 
    	"Name: " + userName + "\n" +
    	"Email: " + email + "\n" +
    	"Phone No: " + phoneNo + "\n" +
    	"Book Choice(s): " + books; 

    return true;
  }
}

function validAll(submissionDetails) {
	return validName(submissionDetails) & validEmail() & validNo() & validChoice();
}

function isNumber(n) {
	return !isNaN(parseFloat(n));
}

function isText(str) {
	return str.search(/^[a-zA-Z]+$/) != -1;
}

function numericFieldValidation(value, lowerbound, upperbound, validationField) {
	// don't validate numeric entry if empty
	if (!nonemptyFieldValidation(value, validationField)) {
		return false;
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

function textFieldValidation(field, value, validationField) {
	// don't validate text entry if empty
	if (!nonemptyFieldValidation(value, validationField)) {
		field.focus();
		return false;
	}

	if (!isText(value)) {
		field.focus();
		validationField.innerHTML = "Please enter a text value";
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