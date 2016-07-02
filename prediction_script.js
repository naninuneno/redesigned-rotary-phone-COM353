function random_number(num) {  // New function called random_number that takes one parameter, num (or a number)
  // Get a random number between 0 and a passed-in number
  var num = num || 4  // If no number passed in, default to 4
  return Math.floor(Math.random() * num); // Round the answer down (floor) of a random number between 0 and 1 and multiply it by a number. Then return a value and exit the function.
}

function mash_choice() {  // New function called mash_choice that doesn't take any parameters 
  // Since MASH is a special case, give it its own list
  var mash = [' but it was ruled a disqualification!', ' and went on to win the championship!', ' but they were caught cheating!', ' with both hands tied behind their back'];  // The array of choices to pick from 
  var randomNum = random_number(4);  // Use the above function to get a number between 0 and 4
  return mash[randomNum];  // Return the list item the random number function just picked and exit the function 
}

function get_answer(category) { 
  // Get a random answer from the available answers in a given category
  var choices = [];  // A blank array to hold the user provided answer  
  var selector = 'input[name="' + category + '"]';  // Build a CSS selector for the blanks in our passed in category 
  var inputs = document.querySelectorAll(selector);  // Get all of the inputs that match our selector 
  var answer;  

  for (var i = 0; i < inputs.length; i++) {  // Begin a for loop that will run through the code. i++ = add one to the counter which is "i"
    answer = inputs[i].value;  // Get the input with the index value of the counter and get the value ie. if they typed in dog, you get back "dog" 
    if (answer !== '') {  // If answer doesn't equal a blank... !== means doesn't equal 
      choices.push(answer); //...add it to the end of the list 
    }
  }
  return choices[random_number(choices.length)];   // Pick and return a random choice choice.length = number of answers the user provided in that category 
}

function fill_in_answers(answers) {
  var outputString = answers.participant1 + " challenges " + answers.participant2 + " to " + answers.activity + " resulting in a " + answers.outcome + " for " + answers.participant1 + answers.mash;
  var outcome = document.querySelector('#output');
  outcome.innerText = outputString;
}

// this function is called when the form is submitted
function handle_submission(evt) {
  evt.preventDefault();  // Stop the form from reloading the page 
  evt.stopPropagation();  // Stop the form from reloading the page

  // Build up our answers object
  var answers = {
    'mash': mash_choice(),
    'participant1': get_answer('participant'),
    'participant2': get_answer('participant'),
    'activity': get_answer('activity'),
    'outcome': get_answer('outcome')
  }
  // Fill in the answers
  fill_in_answers(answers);

  var answer_div = document.querySelector('#output');
}

// (1) Start Here: Find the form on the page and attach a handler for when it's submitted
var form = document.querySelector('#prediction-form'); 
// When the form is submitted, call the function handle_submission  
form.addEventListener('submit', handle_submission);  