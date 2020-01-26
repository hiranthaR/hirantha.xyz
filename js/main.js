var isPausePrompt = true;
var promptId = 0;

$("#console-display").on("click",function(){
    $("#console-prompt").focus();
});

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

var sec = n.getSeconds()
var min = n.getMinutes()
var hh = n.getHours() > 12 ? n.getHours() - 12 : n.getHours();
var ampm = n.getHours() > 12 ? "PM" : "AM"
document.getElementById("date").innerHTML = days[day] + " " + d + " " + months[m] + " " + y;
document.getElementById("time").innerHTML = hh + ":" + min + ":" + sec + " " + ampm;

function handlePrompt() {
    var consoleDisplay = document.getElementById("console-display");
    var consolePrompt = document.getElementById("console-prompt");
    var consolePromptLine = document.getElementById("console-prompt-line-" + promptId);
    var displayHtml = consoleDisplay.innerHTML;
    var oldPromptLine = consolePromptLine.innerHTML + consolePrompt.value;
    displayHtml = displayHtml.replace(consolePromptLine.innerHTML, oldPromptLine);
    displayHtml = displayHtml.replace(consolePrompt.outerHTML, "");
    consoleDisplay.innerHTML = displayHtml;
    handleCommand(consolePrompt.value.trim());
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

function showErrorCmd(command) {
    var consoleDisplay = document.getElementById("console-display");
    consoleDisplay.innerHTML += "bash: " + command.split(" ")[0] + ": command not found";
}

function showLscmd() {
    var consoleDisplay = document.getElementById("console-display");
    consoleDisplay.innerHTML += "GNU bash, version 5.0.11\(1\)-release \(x86_64-pc-linux-gnu\) These shell commands are defined internally.  Type `help' to see this help</br></br>";
    consoleDisplay.innerHTML += "lscmd   - display all commands available</br>";
    consoleDisplay.innerHTML += "help    - display help</br>";
}

function handleCommand(command) {
    switch (command) {
        case "":
            break;
        case "lscmd":
            showLscmd();
            break;
        case "clear":
            clear();
            break;
        case "user info":
            userInfo();
            break;
        default:
            showErrorCmd(command);
            break;
    }
}

function clear(){
    var consoleDisplay = document.getElementById("console-display");
    consoleDisplay.innerHTML = "";
}

function userInfo(){
    var consoleDisplay = document.getElementById("console-display");
    consoleDisplay.innerHTML += "Infomation about logged user</br></br>";
    consoleDisplay.innerHTML += "First name: Hirantha</br>";
    consoleDisplay.innerHTML += "Last name: Rathnayake</br>";
    consoleDisplay.innerHTML += "Birthday: 1996-06-18</br>";
    consoleDisplay.innerHTML += "Address: Ginipenda, Kalugamuwa, Kurunegala, Sri Lanka</br>";
    consoleDisplay.innerHTML += "Mobile number: <a href=\"callto:0094712492630\">+94712492630</a></br>";
    consoleDisplay.innerHTML += "Email: <a href=\"mailto:mail@hirantha.xyz\">mail@hirantha.xyz</a></br>";
}