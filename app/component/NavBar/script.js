let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

// NavBar.format = function (hAbout, hHome) {
//   let html = template;
//   html = html.replace("{{hAbout}}", hAbout);
//   return html;
// };

NavBar.format = function (hHome) {
  let html = template;
  html = html.replace("{{hHome}}", hHome);
  return html;
};

export { NavBar };
