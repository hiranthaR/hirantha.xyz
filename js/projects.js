$(document).ready(() => initialize());

async function initialize() {
  var url = new URL(window.location.href);
  var projectName = url.searchParams.get("project");

  fetch("./projects.json")
    .then((data) => data.text())
    .then(function (json) {
      var project = JSON.parse(json)[projectName];

      document.title = project.title;
      document.getElementById("logo").src = project.logo.link;
      document.getElementById("logo").style.width = project.logo.width;
      document.getElementById("logo").style.height = project.logo.height;

      project.links.forEach((element) => {
        document.getElementById("links-panel").innerHTML += `
        <a href="${element.link}" target="blank">
        <button class="links-panel-btn">
        <i class="fa ${element.fa_class}"></i> ${element.name}
        </button></a>`;
      });

      document.getElementById("description").innerHTML = project.description;
    });
}
