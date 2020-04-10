$(document).ready(() => initialize());

async function initialize() {
  var url = new URL(window.location.href);
  var projectName = url.searchParams.get("project");

  fetch("./projects.json")
    .then((data) => data.text())
    .then(function (json) {
      var project = JSON.parse(json)[projectName];

      document.title = project.title;
      document.getElementById("logo").src = project.logo;

      document.getElementById("github").href = project.github.link;
      document.getElementById("github").innerHTML = "  " + project.github.name;
    });
}
