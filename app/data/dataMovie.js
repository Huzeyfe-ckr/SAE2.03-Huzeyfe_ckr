
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~cakir4/SAE2.03-Huzeyfe_ckr";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};


DataMovie.request = async function(){
    // fetch permet d'envoyer une requête HTTP à l'URL spécifiée. 
    // L'URL est construite en concaténant HOST_URL à "/server/script.php?direction=" et la valeur de la variable dir. 
    // L'URL finale dépend de la valeur de HOST_URL et de dir.
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies" );
    // answer est la réponse du serveur à la requête fetch.
    // On utilise ensuite la méthode json() pour extraire de cette réponse les données au format JSON.
    // Ces données (data) sont automatiquement converties en objet JavaScript.
    let data = await answer.json();
    // Enfin, on retourne ces données.
    return data;
}

DataMovie.requestInfosMovies = async function (id) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=infomovies&id=" + id);
    let movie = await answer.json();
    return movie;
  };

DataMovie.requestCategory = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readcategories" );
    let data = await answer.json();
    return data;
  };

  DataMovie.requestMovieCategory = async function (idCategory, datedenaissance) {
    let url = HOST_URL + "/server/script.php?todo=readmoviecategory&id=" + idCategory;
    
    if (datedenaissance) {
        url += "&datedenaissance=" + datedenaissance;
    }
    
    let response = await fetch(url);
    let data = await response.json();
    return data;
};
export {DataMovie};