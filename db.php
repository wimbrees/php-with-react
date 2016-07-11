<?php 

$pdo = new PDO ("mysql:host=localhost; dbname=test", "root", "");
$pdo->exec("SET CHARACTER SET utf8");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'DELETE':
        $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
        $sql = $pdo->prepare("DELETE FROM peliculas WHERE id = ?");
        $idToDelete = $request[0];
        $sql->execute(array($idToDelete));
        echo getMovies($pdo);
        break;
    case 'POST': 
        extract($_POST);
        $sql = $pdo->prepare("INSERT INTO peliculas (id, titulo, duracion) VALUES (NULL, ?, ?)");
        $sql->execute(array($titulo, $duracion));    
        echo getMovies($pdo);
        break;
    case 'GET': 
        echo getMovies($pdo);
}

function getMovies($pdo) {
    $sql = $pdo->prepare("SELECT * FROM peliculas");
    $ok = $sql->execute();

    if($ok) {
        $datos = $sql->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($datos);
    }   
}

?>