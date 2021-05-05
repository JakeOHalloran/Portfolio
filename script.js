// bring the user to the desired section gradually
function slideTo(location) {
	var element = document.querySelector(location);
  //element.scrollIntoView({ behavior: 'smooth'});
  
  const yOffset = -55; 
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({top: y, behavior: 'smooth'});
}

// the animation logic for the welcome message
function typeIntro() {
  let textToAnimate = document.getElementById("commandText");
	let letterIndex = 0; // represents the index of the current letter to be 'typed'
	let fixedCommandChar = 0;
	let interval = setInterval(frame, 175);
	let finishAnimation = false;
	let fixedTheCommand = false;

	const command = "./showWelocmeTe"; // first half of command (with a 'mistake')
	const commandFixed = "comeText"; // second half of command (without the 'mistake')

	function frame() {
    if (finishAnimation) { // are we ready to stop the typing animation?
      clearInterval(interval); // stop 'typing'
    } else {
      if (letterIndex > 14) { // the 'typing' animation for the first half of command has finished
        if (!fixedTheCommand) { // animate getting rid of the mistakes and finishing the second half of command
          textToAnimate.innerText = command.substring(0, textToAnimate.innerText.length - 1);

          if (letterIndex === 20) { // mistakes removed by time we are at this index
            fixedTheCommand = true;
          }
        } else { // 'animate' typing out the correct command ending
          textToAnimate.appendChild(document.createTextNode(commandFixed.charAt(fixedCommandChar)));

          if (fixedCommandChar === 7) { // command fixed by now, stop the 'typing'
            finishAnimation = true;
          } else { fixedCommandChar++; }
        }
      } else { // type out next character in the first half of the command
        textToAnimate.appendChild(document.createTextNode(command.charAt(letterIndex)));
      }

      letterIndex++;
    }
  }
}

// the animation has finished, show the 'results' of the 'command' in the 'terminal'
function runCommand() {
  document.getElementById("tempPrompt").style.display = "none";
  document.getElementById("commandResult").style.display = "block";
  document.getElementById("idlePrompt").style.display = "block";
}

// when user wants to view a different tabs content
function selectTab(project, tab, tabContent) {
  let projectElement = document.getElementById(project);
  let tabHeaderElement = projectElement.getElementsByClassName("tabHeader")[0]; // get the element that has the tab names
  tabHeaderElement.getElementsByClassName("activeTab")[0].classList.remove("activeTab"); // find which one is currently active, make it inactive
  tab.classList.add("activeTab"); // make the inactive tab active

  let tabBodyElement = projectElement.getElementsByClassName("tabBody")[0]; // get the element that has the tab content
  tabBodyElement.getElementsByClassName("activeContent")[0].classList.remove("activeContent"); // find which one is currently active, make it inactive

  document.getElementById(tabContent).classList.add("activeContent"); // make desired tab content visable
}

$(document).ready(function() {

  setTimeout(typeIntro, 1500);
  setTimeout(runCommand, 7000); // wait for animation to finish before 'executing' command

});