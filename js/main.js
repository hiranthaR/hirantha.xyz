function initFunctions() {
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
  var minute = now.getMinutes();
  var ampm = now.getHours() < 12 ? 'AM' : 'PM';

  var date = `${day} ${month} ${now.getDate()} ${hour}:${minute} ${ampm}`;

  document.getElementById('time').innerText = date;
}

updateClock();
initFunctions();
