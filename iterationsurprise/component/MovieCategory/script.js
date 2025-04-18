import { Movie } from "../Movie/script.js";
import { DataMovie } from "../../data/dataMovie.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();




let MovieCategory = {};

MovieCategory.format = function(category, movies, categoryId) {
    let html = template;
    html = html.replace(/\{\{category\}\}/g, category);
    html = html.replace(/\{\{categoryId\}\}/g, categoryId);
    html = html.replace("{{movies}}", Movie.formatMany(movies));
    return html;
};

MovieCategory.formatMany = async function(categories) {
    let html = "";
    for (const obj of categories) {
        const movies = await DataMovie.requestMovieCategory(obj.id);
        if (movies.length > 0) {
            html += MovieCategory.format(obj.name, movies, obj.id);
        }
    }
    return html;
};


MovieCategory.formatMany = async function(categories) {
    let html = "";
    const select = document.getElementById('profile-select');
    const selectedOption = select ? select.selectedOptions[0] : null;
    
    for (const obj of categories) {
        let movies;
        // Gestion du filtrage par âge selon le profil sélectionné
        if (!selectedOption || selectedOption.value === "") {
            movies = await DataMovie.requestMovieCategory(obj.id, null);
        } else {
            const datedenaissance = selectedOption.getAttribute('data-dob');
            movies = await DataMovie.requestMovieCategory(obj.id, datedenaissance);
        }
        
        // Vérification et formatage des films
        if (Array.isArray(movies) && movies.length > 0) {
            html += MovieCategory.format(obj.name, movies, obj.id);
        }
    }
    return html;
};
export { MovieCategory };
