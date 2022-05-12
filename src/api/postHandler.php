<?php
    require_once('require.php'); 
    $cPost = new CriarPosts();
    $exPo = new ExibirPosts();
    $posObj = new Posts();

    // Criar novo post
    if(isset($_POST['postTitulo']) && isset($_POST['postConteudo']) && isset($_POST['usuario'])){
        $usuario = $_POST['usuario'];
        $titulo = $_POST['postTitulo'];
        $arquivo = $_FILES['postArquivo'];
        $conteudo = $_POST['postConteudo'];
        if($arquivo['size'] > 0){
            $cPost->criarPost($usuario,$titulo,$arquivo,$conteudo);
        }else
            $cPost->criarPost($usuario,$titulo,null,$conteudo);
    }

    // Exibir todos os posts
    if(isset($_POST['exibirTodosPosts']))
        echo json_encode($exPo->exibirTodosPosts(null));

    // Exibir pesquisa
    if(isset($_POST['exibirPesquisa'])){
        $post = $_POST['exibirPesquisa'];
        echo json_encode($exPo->exibirTodosPosts($post));
    }

    // Deletar post
    if(isset($_POST['usuario']) && isset($_POST['deletarPost'])){
        $us = $_POST['usuario'];
        $post = $_POST['deletarPost'];
        if($arquivo = $posObj->excluirPost($us, $post))
            echo json_encode($j[0] = 'Post excluido');
        else
            echo json_encode($j[0] = 'Post não pôde excluido');
    }
?>