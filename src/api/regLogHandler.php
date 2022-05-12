<?php
    require_once('require.php');
    $reg = new Registrar();
    $us = new Usuario();
    
    // Registro
    if(isset($_POST['regNome']) && 
       isset($_POST['regEmail']) && 
       isset($_POST['regSenha']) && 
       isset($_POST['regSenha2'])){
        $nome = $_POST['regNome'];
        $email = $_POST['regEmail'];
        $senha = $_POST['regSenha'];
        $senha2 = $_POST['regSenha2'];
        $reg->registro($nome,$email,$senha,$senha2);
    }

    // Login
    if(isset($_POST['logEmail']) && isset($_POST['logSenha'])){
        $email = $_POST['logEmail'];
        $senha = $_POST['logSenha'];
        echo $reg->login($email,$senha);
    }

    //Checar se usuario existe
    if(isset($_POST['checarLogin'])){
        $checLog = $_POST['checarLogin'];
        if(!$us->checarLogin($checLog)){
            $j = ['mensagem'=> 'usuario nao existe!'];
            echo json_encode($j);
        }else{
            $j = ['mensagem'=> 'usuario existe!'];
            echo json_encode($j);
        }
    }

    if(isset($_POST['dadosUsuario'])){
        $u = $_POST['dadosUsuario'];
        $usuario = $us->checarLogin($u);
        $j = [
            'nome'=> $us->getNome($usuario),
            'email'=> $us->getEmail($usuario),
            'dataRegistro'=> $us->getDataRegistro($usuario),
            'fotoPerfil'=> $us->getFotoPerfil($usuario),
            'comentarios'=> $us->getComentarios($usuario)
        ];
        echo json_encode($j);
    }
?>