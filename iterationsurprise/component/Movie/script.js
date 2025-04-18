let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();


// let templateFile2 = await fetch("./component/Movie/templateFav.html");
// let templateFav = await templateFile2.text();


let Movie = {};

Movie.format = function(movie, isFavorisPage = false) {
  let html = template;
  html = html.replace("{{title}}", movie.name);
  html = html.replace("{{imgs}}", movie.image);
  html = html.replace("{{handler}}", `C.handlerInfo(${movie.id})`);
  
  if (isFavorisPage) {
    html = html.replace("{{handlerFavoris}}", `C.removeFavoris(${movie.id})`);
  } else {
    html = html.replace("{{handlerFavoris}}", `C.handlerAddFavoris(${movie.id})`);
  }

  return html;
};

Movie.formatMany = function(movies, isFavorisPage = false) {
  let html = "";
  for (const r of movies) {
    html = html + Movie.format(r, isFavorisPage);
  }
  return html;
};

export { Movie };
