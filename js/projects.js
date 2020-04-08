$(document).ready(() => initialize());

async function initialize() {
  var url = new URL(window.location.href);
  var project = url.searchParams.get("project");
  document.title = project;

  document.getElementById("logo").src = project + "/logo.png";
}
