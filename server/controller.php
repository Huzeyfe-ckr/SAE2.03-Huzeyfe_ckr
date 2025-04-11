<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");



function readMoviesController(){
    $movies = getAllMovies();
    return $movies;

}

function addMoviesController(){
 
        // PREMIERE VERIFICATION : LES PARAMETRES EXISTENT ET SONT NON VIDES
        // Vérification du paramètre 'semaine' 
        $name = $_REQUEST['name'];
        $year = $_REQUEST['year'];
        $length = $_REQUEST['length'];
        $description = $_REQUEST['description'];
        $director = $_REQUEST['director'];
        $id_category = $_REQUEST['categorie'];
        $image = $_REQUEST['image'];
        $trailer = $_REQUEST['trailer'];
        $min_age = $_REQUEST['min_age'];


        $ok = addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age);
        if($ok!=0){
            return "Le film $name a correctement été ajouté à la base de donnée";
        }
        else{
            return "Une erreur est survenue";
        }
    }


    function readInfosMoviesController(){
        // Récupération des paramètres de la requête
        $id = $_REQUEST['id'] ;
        $movie = getInfosMovies($id);
        if ($movie !=0) {
            return $movie ;
        }
        else{
           return "Erreur : Tous les champs doivent être remplis.";
        };
    } 




    function readCategoriesController() {
        // Récupération des catégories
        $categories = getCategories();
        if ($categories !=0) {
            return $categories;
        }
        else{
            return "Erreur lors de la récupération des films de la catégorie $category";
         };
    }
    


    
    function readMovieCategoryController() {
        $id = $_REQUEST['id'];
        $datedenaissance = $_REQUEST['datedenaissance'];
        
        $movies = getMovieCategories($id, $datedenaissance);
        
        if ($movies != 0) {
            return $movies;
        } else {
            return "La catégorie de ces films n'a pas été récupérée";
        }
    }



    function addProfilController(){
        $name = $_REQUEST['name'] ;
        $image = $_REQUEST['image']  ;
        $datedenaissance = $_REQUEST['datedenaissance']  ;
    
        if (empty($name) || empty($image) || empty($datedenaissance)) {
            return "Erreur : Tous les champs doivent être remplis.";
        }
    
    
        $ok = addProfil($name, $image, $datedenaissance);
        if ($ok != 0){
            return "L'utilisateur $name a été ajouté avec succès !";
        } else {
            return "Erreur lors de l'ajout de l'utilisateur $name !";
        }
    }
    
    function readProfilesController() {
        $profiles = getAllProfiles();
        return $profiles;


    
}



function addNewProfilController() {
    try {
        if (empty($_REQUEST['Nom'])) {
            return "Erreur : Le Nom est obligatoire.";
        }
        
        if (empty($_REQUEST['Age'])) {
            return "Erreur : L'Age est obligatoire.";
        }
        
        $Nom = $_REQUEST['Nom'];
        $Age = $_REQUEST['Age'];
        $file = "default-avatar.png";

        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = "./images/";
            $filename = basename($_FILES['file']['name']);
            if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir . $filename)) {
                $file = $filename;
            }
        }

        $ok = addProfil($Nom, $Age, $file);
        return $ok ? "Profil ajouté avec succès" : "Erreur lors de l'ajout du profil";
    } catch (Exception $e) {
        return "Erreur: " . $e->getMessage();
    }
}

