<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "cakir4");
define("DBLOGIN", "cakir4");
define("DBPWD", "cakir4");




function getAllMovies(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, name, image from Movie";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}


function addMovie($name, $year, $length, $description, $director, $id_category, $image, $trailer, $min_age){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "INSERT INTO Movie (name,year,length,description,director,id_category,image,trailer,min_age) VALUES (:name,:year,:length,:description,:director,:id_category,:image,:trailer,:min_age)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie le paramètre à la valeur
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':director', $director);
    $stmt->bindParam(':id_category', $id_category);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);
    // $stmt->bindParam(':category', $category);
    // $stmt->bindParam(':title', $title);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}


function getInfosMovies($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, image, description, director, year, length, Category.name AS category_name, min_age, trailer 
    FROM Movie 
    INNER JOIN Category ON Movie.id_category = Category.id 
    WHERE Movie.id = :id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getCategories(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name FROM Category";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}


function getMovieCategories($category, $datedenaissance = null){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    
    // Si datedenaissance n'est pas définie, sélectionner tous les films de la catégorie
    if ($datedenaissance == null) {
        $sql = "SELECT Movie.*, Category.name AS category 
                FROM Movie 
                JOIN Category ON Movie.id_category = Category.id 
                WHERE Category.id = :category
                ORDER BY Movie.name ASC";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':category', $category);
    } else {
        // Sinon, filtrer par la date de naissance directement
        $sql = "SELECT Movie.*, Category.name AS category 
                FROM Movie 
                JOIN Category ON Movie.id_category = Category.id 
                WHERE Category.id = :category 
                AND Movie.min_age <= :datedenaissance";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':datedenaissance', $datedenaissance);
    }
    
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}


function addProfil($name, $image, $datedenaissance) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    
    $sql = "INSERT INTO Profil (name, image, datedenaissance) 
            VALUES (:name, :image, :datedenaissance)";

    $stmt = $cnx->prepare($sql);

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':datedenaissance', $datedenaissance);

    $stmt->execute();
    $res = $stmt->rowCount();
    return $res; // Retourne le nombre de lignes affectées par l'opération
}



function getAllProfiles() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, image, datedenaissance FROM Profil";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}



function addNewProfil($Nom, $Age, $file, $id) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    // Modification de la requête SQL pour faire un UPDATE au lieu d'un INSERT
    $sql = "UPDATE Profil 
            SET name = :name, 
                datedenaissance = :datedenaissance, 
                image = :image 
            WHERE id = :id";

    $stmt = $cnx->prepare($sql);

    // Ajout du paramètre id
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':name', $Nom, PDO::PARAM_STR);
    $stmt->bindParam(':datedenaissance', $Age, PDO::PARAM_INT);
    $stmt->bindParam(':image', $file, PDO::PARAM_STR);

    $stmt->execute();
    return $stmt->rowCount();
}


function removefavoris($user, $movie)
    {
        $cnx = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, DBLOGIN, DBPWD);
        $sql = 'DELETE FROM Likes WHERE id_user = :id_user AND id_movie = :id_movie';
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id_user', $user);
        $stmt->bindParam(':id_movie', $movie);
        $stmt->execute();
        return $stmt->rowCount();
    }




function addFavoris($user, $movie) {
    $cnx = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, DBLOGIN, DBPWD);

    // Vérifier si le favori existe déjà
    $check_sql = "SELECT COUNT(*) FROM Favoris WHERE id_user = :user AND id_movie = :movie";
    $check_stmt = $cnx->prepare($check_sql);
    $check_stmt->bindParam(':user', $user);
    $check_stmt->bindParam(':movie', $movie);
    $check_stmt->execute();
    
    if ($check_stmt->fetchColumn() > 0) {
        return 0; // Le favori existe déjà
    }

    // Ajouter le nouveau favori
    $sql = 'INSERT INTO Favoris (id_user, id_movie) VALUES (:user, :movie)';
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':user', $user);
    $stmt->bindParam(':movie', $movie);
    $stmt->execute();
    
    return $stmt->rowCount();
}



function getFavoris($user_id) {
    $cnx = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, DBLOGIN, DBPWD);
    
    $sql = "SELECT m.* 
            FROM Movie m 
            JOIN Favoris f ON m.id = f.id_movie 
            WHERE f.id_user = :user_id
            ORDER BY m.name ASC";
            
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    
    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $result ? $result : [];
}




function deleteFavoris($id_movie, $id_user) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    $sql = "DELETE FROM Favoris WHERE id_movie = :id_movie AND id_user = :id_user";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_movie', $id_movie, PDO::PARAM_INT);
    $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);

    $stmt->execute();
    return $stmt->rowCount() > 0;
}

function getMovieAvant() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
  
    $sql = "SELECT id, name, image, description 
    FROM Movie 
    WHERE miseenavant = '1'";
  
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
  
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }



function searchMovies($keyword) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
  
    $sql = "SELECT id, name, image, min_age 
            FROM Movie 
            WHERE name LIKE :keyword
            OR year LIKE :keyword
            OR director LIKE :keyword
            ORDER BY name ASC";
  
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':keyword', '%' . $keyword . '%', PDO::PARAM_STR);
    $stmt->execute();
  
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}