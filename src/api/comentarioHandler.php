<?php
    require_once('require.php'); 
    $comObj = new Comentario();
    if(isset($_POST['logUsuario']) && isset($_POST['comentarioTextarea']) && isset($_POST['noPost'])){
        $us = $_POST['logUsuario'];
        $coment = $_POST['comentarioTextarea'];
        $noPost = $_POST['noPost'];
        if($comObj->comentarPost($us,$coment,$noPost)){
            $j[0] =  "<small className='mensagemSucesso'>Comentario efetuado!</small>";
            echo json_encode($j);
        }
    }

    if(isset($_POST['exibirComentarioPost'])){
        $post = $_POST['exibirComentarioPost'];
        echo json_encode($comObj->exibirComentarios($post));
    }
?>