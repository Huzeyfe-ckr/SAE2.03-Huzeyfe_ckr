let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();


let Movie = {};

Movie.format = function(movie) {
  let html = template;
  html = html.replace("{{title}}", movie.name);
  html = html.replace("{{imgs}}", movie.image);
  html = html.replace(
    "{{handler}}",
    `C.handlerInfo(${movie.id})`);
  return html;
};

Movie.formatMany = function(movies) {
    let html = "";
    for (const r of movies) {
      html = html + Movie.format(r);
    }
    return html;
  };

export { Movie };
