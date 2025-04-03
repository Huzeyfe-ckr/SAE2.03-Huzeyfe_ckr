
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "..";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataFilm = {};

 /**
     * Fetches data from the server based on the specified day.
     *
     * @param {string} week - The week parameter to be sent to the server.
     * @param {string} day - The day parameter to be sent to the server.
     * @returns The response from the server.
     * 
     * DataFilm.request permet de récupérer des données depuis le serveur.
     * Elle prend en paramètre une semaine (1, 2, ..., 52) et un jour (lundi mardi...)
     * renvoie les données contenues dans la réponse du serveur (data).
     */
DataFilm.request = async function(week, day){
    // fetch permet d'envoyer une requête HTTP à l'URL spécifiée. 
    // L'URL est construite en concaténant HOST_URL à "/server/script.php?direction=" et la valeur de la variable dir. 
    // L'URL finale dépend de la valeur de HOST_URL et de dir.
    let answer = await fetch(HOST_URL + "/server/script.php?todo=read&semaine=" + week + "&jour=" + day);
    // answer est la réponse du serveur à la requête fetch.
    // On utilise ensuite la méthode json() pour extraire de cette réponse les données au format JSON.
    // Ces données (data) sont automatiquement converties en objet JavaScript.
    let data = await answer.json();
    // Enfin, on retourne ces données.
    return data;
}

/* C'EST QUOI async/await ?
    
   Il y a des instructions qui prennent du temps sans qu'on puisse prédire combien.
   fetch (et answer.json() ) en font partie.
   Il n'est en effet pas possible de savoir combien de temps le serveur prendra à nous répondre.
   Peut-être même qu'il est en panne et ne répondra pas du tout !
   Le mot clé await permet de dire à javascript qu'il faut ATTENDRE la réponse du serveur avant de 
   poursuivre l'exécution du code (sinon on va vouloir lire les données avant de les avoir reçues).
   Et pour pouvoir utiliser await, il faut ajouter le mot clé async à la fonction.

*/

export {DataFilm};