import { Movie } from "../Movie/script.js";

let templateFile = await fetch("./component/Favoris/template.html");
let template = await templateFile.text();

let Favoris = {};

Favoris.format = function(favoris) {
    if (!favoris || favoris.length === 0) {
        return "<p style='color: white; text-align: center; margin-top: 2rem;'>Aucun favori trouvé</p>";
    }

    let html = template;
    let moviesHtml = Movie.formatMany(favoris, true); // Ajout du paramètre true
    html = html.replace("{{movies}}", moviesHtml);
    return html;
};

export { Favoris };