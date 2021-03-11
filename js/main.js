function initFunctions() {
  updateClock();
  setInterval(updateClock, 1000);
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function updateClock() {
  var now = new Date();
  var day = days[now.getDay()];
  var month = months[now.getMonth()];
  var hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
  hour = hour == 0 ? 12 : hour;
  var minute =
    now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  var ampm = now.getHours() < 12 ? 'AM' : 'PM';

  var date = `${day} ${month} ${now.getDate()} ${hour}:${minute} ${ampm}`;

  document.getElementById('time').innerText = date;
}

document.addEventListener('DOMContentLoaded', function (event) {
  initFunctions();
  const logged = sessionStorage.getItem('logged');
  if (logged) {
    hideLoginPanel();
  }
});

function login() {
  sessionStorage.setItem('logged', true);
  hideLoginPanel();
}

function hideLoginPanel() {
  var loginContainer = document.getElementsByClassName('login-section');
  loginContainer[0].style.display = 'none';

  var allAppContainer = document.getElementsByClassName('apps-section');
  allAppContainer[0].style.display = 'flex';

  var logOutTab = document.getElementById('log-out');
  logOutTab.style.display = 'flex';

  showProfile();
}

function logOut() {
  sessionStorage.setItem('logged', true);
  closeDisplay();
  showLoginPanel();
}

function showLoginPanel() {
  var loginContainer = document.getElementsByClassName('login-section');
  loginContainer[0].style.display = 'flex';

  var allAppContainer = document.getElementsByClassName('apps-section');
  allAppContainer[0].style.display = 'none';

  var logOutTab = document.getElementById('log-out');
  logOutTab.style.display = 'none';
}

async function showProfile() {
  showDisplay();
  const contentPanel = document.getElementById('window-content');
  const profileContent = await fetch('../contents/profile.html');
  contentPanel.innerHTML = await profileContent.text();
}

function showDisplay() {
  var appsContainer = document.getElementsByClassName('apps-section');
  appsContainer[0].style.display = 'none';

  var displayContainer = document.getElementsByClassName('display');
  displayContainer[0].style.display = 'flex';
}

function closeDisplay() {
  var appsContainer = document.getElementsByClassName('apps-section');
  appsContainer[0].style.display = 'flex';

  var displayContainer = document.getElementsByClassName('display');
  displayContainer[0].style.display = 'none';
}
