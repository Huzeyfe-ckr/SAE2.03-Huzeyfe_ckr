import { Movie } from "../Movie/script.js";
import { DataMovie } from "../../data/dataMovie.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();




let MovieCategory = {};

MovieCategory.format = function(category,movies) {
    let html = template;
    html = html.replace("{{category}}", category);
  
    let html1 = Movie.formatMany(movies );
    html = html.replace("{{movies}}", html1);
    return html
};

MovieCategory.formatMany = async function(categories) {
    let html = "";
    const select = document.getElementById('profile-select');
    const selectedOption = select ? select.selectedOptions[0] : null;
    
    for (const obj of categories) {
        let movies;
        if (!selectedOption || selectedOption.value === "") {
            // Si aucun profil n'est sélectionné, afficher tous les films
            movies = await DataMovie.requestMovieCategory(obj.id, null);
        } else {
            // Si un profil est sélectionné, filtrer par âge
            const datedenaissance = selectedOption.getAttribute('data-dob');
            movies = await DataMovie.requestMovieCategory(obj.id, datedenaissance);
        }
        
        if (Array.isArray(movies) && movies.length > 0) {
            html += MovieCategory.format(obj.name, movies);
        }
    }
    return html;
};
export { MovieCategory };
