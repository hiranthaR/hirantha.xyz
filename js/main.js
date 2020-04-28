var promptId = 0;

$(document).ready(() => initialize());

async function hydraAttackAnim() {
  var consoleDisplay = document.getElementById("console-display");

  consoleDisplay.innerHTML = "$ Initializing hydra attack";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack.";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack..";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack...";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack.";
  await sleep(250);
  consoleDisplay.innerHTML = "$ Initializing hydra attack..";
  await sleep(300);
  consoleDisplay.innerHTML +=
    "</br>$ Executing hydra attack...</br>$ hydra -l hirantha -P passlist.txt ssh://hirantha.xyz";
  await sleep(800);
  consoleDisplay.innerHTML += "</br>$ Attack Succuess!";
  await sleep(100);
  consoleDisplay.innerHTML += "</br>$ Hail, you are in the system now..";

  var anonymous = `</br></br></br></br></br><center>
    '##:::::'##:'########:'##::::::::'######:::'#######::'##::::'##:'########:</br>
     ##:'##: ##: ##.....:: ##:::::::'##... ##:'##.... ##: ###::'###: ##.....::</br>
     ##: ##: ##: ##::::::: ##::::::: ##:::..:: ##:::: ##: ####'####: ##:::::::</br>
     ##: ##: ##: ######::: ##::::::: ##::::::: ##:::: ##: ## ### ##: ######:::</br>
     ##: ##: ##: ##...:::: ##::::::: ##::::::: ##:::: ##: ##. #: ##: ##...::::</br>
     ##: ##: ##: ##::::::: ##::::::: ##::: ##: ##:::: ##: ##:.:: ##: ##:::::::</br>
    . ###. ###:: ########: ########:. ######::. #######:: ##:::: ##: ########:</br>
    :...::...:::........::........:::......::::.......:::..:::::..::........::</br>                                                                
 </center>`;
  consoleDisplay.innerHTML += anonymous;
  await sleep(1600);
}

async function initialize() {
  // animate hydra attack once for a session
  if (sessionStorage.getItem("animated") !== "animated") {
    await hydraAttackAnim();
    sessionStorage.setItem("animated", "animated");
  }

  var consoleDisplay = document.getElementById("console-display");

  await fetch("./main.json")
    .then((data) => data.text())
    .then(function (json) {
      var main = JSON.parse(json);

      var consoleDisplayInnerHtml = `Welcome to the console of ${main.first_name}'s Laptop.<br>
      Type 'lscmd' for list down all commands available to use.Type 'help' for help.
      <br>
      Date: <span id="date"></span> Time: <span id="time"></span>
      <br>
      <br>
      example: <br>
      user info
      <div style="display: flex;" id="console-prompt-line-0">
        <span class="console-prompt-uname">${main.username}</span><span class="console-prompt-host">@${main.hostname}</span>:~$
        <input type="text" class="console-prompt" id="console-prompt">
      </div>
    </div>`;

      consoleDisplay.innerHTML = consoleDisplayInnerHtml;

      // display click focus to input
      $("#console-display").on("click", function () {
        $("#console-prompt").focus();
      });

      addEventListenerForConsolePrompt();
      setFocusToPrompt();
    });

  // set time and date
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth() + 1;
  var d = n.getDate();
  var day = n.getDay();

  var sec = n.getSeconds();
  var min = n.getMinutes();
  var hh = n.getHours() > 12 ? n.getHours() - 12 : n.getHours();
  var ampm = n.getHours() > 12 ? "PM" : "AM";
  document.getElementById("date").innerHTML =
    days[day] + " " + d + " " + months[m] + " " + y;
  document.getElementById("time").innerHTML =
    hh + ":" + min + ":" + sec + " " + ampm;
}

async function handlePrompt() {
  var consoleDisplay = document.getElementById("console-display");
  var consolePrompt = document.getElementById("console-prompt");
  var consolePromptLine = document.getElementById(
    "console-prompt-line-" + promptId
  );
  var displayHtml = consoleDisplay.innerHTML;
  var oldPromptLine = consolePromptLine.innerHTML + consolePrompt.value;
  displayHtml = displayHtml.replace(consolePromptLine.innerHTML, oldPromptLine);
  displayHtml = displayHtml.replace(consolePrompt.outerHTML, "");
  consoleDisplay.innerHTML = displayHtml;
  await handleCommand(consolePrompt.value.trim());
  var newPromptLine = consolePromptLine.outerHTML.replace(
    "console-prompt-line-" + promptId,
    "console-prompt-line-" + ++promptId
  );
  consoleDisplay.innerHTML += newPromptLine;
  addEventListenerForConsolePrompt();
  setFocusToPrompt();
}

function setFocusToPrompt() {
  document.getElementById("console-prompt").focus();
}

function addEventListenerForConsolePrompt() {
  document
    .getElementById("console-prompt")
    .addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        handlePrompt();
      }
    });
}

function showErrorCmd(command) {
  var consoleDisplay = document.getElementById("console-display");
  consoleDisplay.innerHTML +=
    "bash: " + command.split(" ")[0] + ": command not found";
}

function showLscmd() {
  var consoleDisplay = document.getElementById("console-display");
  var commands = "";

  commands +=
    "GNU bash, version 5.0.11(1)-release (x86_64-pc-linux-gnu) These shell commands are defined internally.  Type `help' to see this help</br></br>";

  commands += "<table>";
  commands += createRow("user info", "display user's information");
  commands += createRow("user contacts", "display user's Contact details");
  commands += createRow("show projects", "display user's projects");
  commands += createRow("open github", "open the user's github account");
  commands += createRow("open facebook", "open the user's facebook account");
  commands += createRow("lscmd", "display all commands available");
  commands += createRow("clear", "clear the console");
  commands += createRow("help", "display help");

  commands += "</table>";

  consoleDisplay.innerHTML += commands;
}

async function handleCommand(command) {
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
      await userInfo();
      break;
    case "user contacts":
      await userContacts();
      break;
    case "help":
      help();
      break;
    case "show projects":
      projects();
      break;
    case "open github":
      await openGithub();
      break;
    case "open facebook":
      await openFacebook();
      break;
    default:
      showErrorCmd(command);
      break;
  }
}

function clear() {
  var consoleDisplay = document.getElementById("console-display");
  consoleDisplay.innerHTML = "";
}

function userInfo() {
  return fetch("./main.json")
    .then((data) => data.text())
    .then(function (json) {
      var main = JSON.parse(json);
      var consoleDisplay = document.getElementById("console-display");
      var userInfo = "";

      userInfo += "information about logged user</br></br>";
      userInfo += `<table style="width:100%">`;
      userInfo += createRow("Name", main.user.name);
      userInfo += createRow("Age", main.user.age);
      userInfo += createRow("Current Location", main.user.location);
      userInfo += createRow("Home Town", main.user.homeTown);
      userInfo += createRow(
        "Mobile number",
        `<a href="callto:${main.contacts.mobileHref}">${main.contacts.mobileText}</a>`
      );
      userInfo += createRow(
        "Email",
        `<a href="mailto:${main.contacts.email}">${main.contacts.email}</a>`
      );
      userInfo += "</table>";

      consoleDisplay.innerHTML += userInfo;
    });
}

function createRow(key, value) {
  return `<tr><td>${key}</td><td>- ${value}</td></tr>`;
}

function userContacts() {
  return fetch("./main.json")
    .then((data) => data.text())
    .then(function (json) {
      var main = JSON.parse(json);
      var consoleDisplay = document.getElementById("console-display");
      var userContacts = "";

      userContacts +=
        "Information about logged user's contact details</br></br>";
      userContacts += `<table style="width:100%">`;
      userContacts += createRow("Address", main.contacts.address);
      userContacts += createRow(
        "Mobile number",
        `<a href="callto:${main.contacts.mobileHref}">${main.contacts.mobileText}</a>`
      );
      userContacts += createRow(
        "Email",
        `<a href="mailto:${main.contacts.email}">${main.contacts.email}</a>`
      );
      userContacts += createRow(
        "Facebook",
        ` <a href="https://www.facebook.com/sahanhirantha" target="blank">https://www.facebook.com/sahanhirantha (Hirantha)</a>`
      );
      userContacts += createRow(
        "Github",
        ` <a href="https://www.github.com/hiranthaR" target="blank">https://www.github.com/hiranthaR (hiranthaR)</a>`
      );
      userContacts += `</table></br>`;
      consoleDisplay.innerHTML += userContacts;
    });
}

function help() {
  var consoleDisplay = document.getElementById("console-display");
  consoleDisplay.innerHTML += "Welcome to Hirantha's Laptop.</br>";
  consoleDisplay.innerHTML += "Console version: 5.7.26-1+b1 (Debian)</br>";
  consoleDisplay.innerHTML +=
    "This console will help you to observe about the owner of this Laptop</br></br>";
  consoleDisplay.innerHTML +=
    "Type 'lscmd' for list down all commands available in this console</br></br>";
}

function projects() {
  var consoleDisplay = document.getElementById("console-display");
  var projects = "";

  projects += "There are some projects of Hirantha.</br></br>";

  projects += "<table>";
  projects += createRow(
    `<a href="/projects/?project=treflor" target="blank">Project Treflor</a>`,
    " Project Treflor - ultimate hikers guide"
  );
  projects += createRow(
    ` <a href="/projects/?project=json-to-dart" target="blank">Json to Dart</a>`,
    "Json to dart vs code extension"
  );

  projects += "</table>";

  consoleDisplay.innerHTML += projects;
}

async function openGithub() {
  var consoleDisplay = document.getElementById("console-display");
  consoleDisplay.innerHTML += "Opening github profile...</br>";
  await sleep(200);
  window.open("https://www.github.com/hiranthaR", "_blank").focus();
  consoleDisplay.innerHTML += "Github profile opened...</br></br>";
}

async function openFacebook() {
  var consoleDisplay = document.getElementById("console-display");
  consoleDisplay.innerHTML += "Opening facebook profile...</br>";
  await sleep(200);
  window.open("https://www.facebook.com/sahanhirantha", "_blank").focus();
  consoleDisplay.innerHTML += "Facebook profile opened...</br></br>";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
