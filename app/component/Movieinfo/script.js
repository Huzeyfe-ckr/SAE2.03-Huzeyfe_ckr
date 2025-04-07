let templateFile = await fetch("./component/Movieinfo/template.html");
let template = await templateFile.text();

let Movieinfo = {};

Movieinfo.format = function (movie) {
  let html = template;
  // console.log(movie); // debug
  html = html.replace('{{titre}}', movie.name);
  html = html.replace("{{image}}", movie.image);
  html = html.replace("{{desc}}", movie.description);
  html = html.replace("{{director}}", movie.director);
  html = html.replace("{{year}}", movie.year);
  html = html.replace("{{length}}", movie.length+"minutes");
  html = html.replace("{{category}}", movie.category);
  html = html.replace("{{age}}", movie.min_age);
  html = html.replace("{{url}}", movie.trailer);

  return html;
};

export { Movieinfo };