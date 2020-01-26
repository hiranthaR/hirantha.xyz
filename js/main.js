var isPausePrompt = true;
var promptId = 0;

// function promptUnderLine() {
//     if (isPausePrompt) return;
//     var consoleDisplay = document.getElementById("console-display");
//     if (consoleDisplay.innerText.slice(-1) === "_") {
//         consoleDisplay.innerHTML = consoleDisplay.innerText.substring(0, consoleDisplay.innerText.length - 2);
//     } else {
//         consoleDisplay.innerHTML = consoleDisplay.innerText + " _";
//     }
// }

// setInterval(promptUnderLine, 700);

// function pausePrompt() {
//     isPausePrompt = !isPausePrompt;
//     var consoleDisplay = document.getElementById("console-display");
//     if (consoleDisplay.innerText.slice(-1) === "_") {
//         consoleDisplay.innerHTML = consoleDisplay.innerText.substring(0, consoleDisplay.innerText.length - 2);
//     }
// }

addEventListenerForConsolePrompt()
setFocusToPrompt()
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var n = new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
var day = n.getDay();
document.getElementById("date").innerHTML = days[day] + " " + d + " " + months[m] + " " + y;

function handlePrompt() {
    var consoleDisplay = document.getElementById("console-display");
    var consolePrompt = document.getElementById("console-prompt");
    var consolePromptLine = document.getElementById("console-prompt-line-" + promptId);
    var displayHtml = consoleDisplay.innerHTML;
    var oldPromptLine = consolePromptLine.innerHTML + consolePrompt.value;
    displayHtml = displayHtml.replace(consolePromptLine.innerHTML, oldPromptLine);
    displayHtml = displayHtml.replace(consolePrompt.outerHTML, "");
    consoleDisplay.innerHTML = displayHtml;
    consoleDisplay.innerHTML += "sex";
    var newPromptLine = consolePromptLine.outerHTML.replace("console-prompt-line-" + promptId, "console-prompt-line-" + ++promptId);
    consoleDisplay.innerHTML += newPromptLine;
    addEventListenerForConsolePrompt();
    setFocusToPrompt();
}

function setFocusToPrompt() {
    document.getElementById("console-prompt").focus();
}

function addEventListenerForConsolePrompt() {
    document.getElementById("console-prompt").addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            handlePrompt()
        }
    });
}

showDate()