let templateFile = await fetch("./component/Film/template.html");
let template = await templateFile.text();


let Film = {};

Film.format = function (obj) {
  let html = template;
  html = html.replace("{{hFilm}}", obj.title);
  return html;
};

Film.formatMany = function (films) {
    let html = "";
    for (const r of films) {
      html = html + Film.format(r);
    }
    return html;
  };

export { Film };
