let templateFile = await fetch("./component/ProfilForm/template.html");
let template = await templateFile.text();

let ProfilForm = {};

ProfilForm.format = function (handler) {
  let html = template;
  html = html.replace("{{handler}}", handler);
  return html;
};

export { ProfilForm };