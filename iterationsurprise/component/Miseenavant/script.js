let templateFile = await fetch("./component/Miseenavant/template.html");
let template = await templateFile.text();

const templateFile2 = await fetch("./component/Miseenavant/templateMovie.html");
const templateMovies = await templateFile2.text();


let Miseenavant = {};

Miseenavant.format = function (obj) {
  let html = template;
  let movieHTML = "";

  for (let m of obj) {
    let html = templateMovies;
    html = html.replace("{{name}}", m.name);
    html = html.replace("{{image}}", m.image);
    html = html.replace("{{desc}}", m.description);
    html = html.replace('{{onclick}}', `C.handlerInfo(${m.id})`);
    html = html.replaceAll('{{id}}', m.id);
    movieHTML += html;
  }
  
  html = html.replace("{{movies}}", movieHTML);
  return html;
};

export { Miseenavant };