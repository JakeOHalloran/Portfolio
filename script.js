
// the animation logic for the welcome message
function typeIntro() {
  let textToAnimate = document.getElementsByClassName("animationText")[0];
	let letterIndex = 0; // represents the index of the current letter to be 'typed'
	let fixedSentanceChar = 0;
	let interval = setInterval(frame, 100);
	let finishAnimation = false;
	let changeSentance = false;
	let delay = 0;

	const sentance = "Hey, im Jake O'Hallroan,"; // first half of sentance (with a 'mistake')
	const sentanceFixed = "oran, welcome to my site!"; // second half of sentance (without the 'mistake')

	function frame() {
		if (delay >= 18) { // dont start the animation immediately
      if (finishAnimation) { // are we ready to stop the typing animation?
        clearInterval(interval); // stop 'typing'
      } else {
        if (letterIndex > 28) { // the 'typing' animation for the first half of sentance has finished
          if (!changeSentance) { // animate getting rid of the mistakes and finishing the second half of sentance
            textToAnimate.innerText = sentance.substring(0, textToAnimate.innerText.length - 1);

            if (letterIndex === 33) { // mistakes removed by time we are at this index
              changeSentance = true;
              delay = 20; // wait just a bit before resuming the 'typing'
            }
          } else { // 'animate' typing out the correct ending
            textToAnimate.appendChild(document.createTextNode(sentanceFixed.charAt(fixedSentanceChar)));

            if (fixedSentanceChar === 24) { // sentance fixed by now, stop the 'typing'
              finishAnimation = true;
            } else { fixedSentanceChar++; }
          }
        } else { // type out next character in the first half of the sentance
          textToAnimate.appendChild(document.createTextNode(sentance.charAt(letterIndex)));
        }

        letterIndex++;
      }
    }

    delay++;
  }
}


$(document).ready(function() {

	typeIntro(); // play welcome animation

});