<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    include('classes/Conexao.php');
    include('classes/ChecarVariaveis.php');
    include('classes/Registrar.php');
    include('classes/Usuario.php');
    include('classes/Arquivo.php');
    include('classes/Posts.php');
    include('classes/CriarPosts.php');
    include('classes/ExibirPosts.php');
    include('classes/Comentario.php');
?>