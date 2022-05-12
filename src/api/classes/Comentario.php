<?php
    class Comentario extends Conexao{
        
        private $usObj;
        private $chec;
        private $postO;
        public function __construct(){
            $this->usObj = new Usuario();
            $this->chec = new ChecarVariaveis();
            $this->postO = new Posts();
        }

        public function comentarPost($us, $coment, $noPost){
            if($usuario = $this->usObj->checarLogin($us)){
                if($comentario = $this->chec->checarConteudo($coment)){
                    $query = $this->con()->prepare("INSERT INTO comentarios(comentario, noPost, postadoPor) VALUES(:comentario, :noPost, :postadoPor)");
                    $arr = [
                        ':comentario'=> $comentario,
                        ':noPost'=> $noPost, 
                        ':postadoPor'=> $usuario
                    ];
                    $numeroComentPost = $this->postO->getComentarios($noPost);
                    $numeroComentPost++;
                    $atualisarPost = $this->postO->setComentarios($noPost,$numeroComentPost);
                    $numeroComentUs = $this->usObj->getComentarios($usuario);
                    $numeroComentUs++;
                    $atualisarUs = $this->usObj->setComentarios($usuario,$numeroComentUs);
                    if($query->execute($arr))
                        return true;
                    return false;
                }
                echo json_encode($this->chec->getMensagenErro());
                return false;
            }
            return false;
        }

        public function exibirComentarios($post){
            $query = $this->con()->prepare("SELECT * FROM comentarios WHERE noPost='$post' ORDER BY id DESC");
            $query->execute();
            $j = []; $i = 0;
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $postadoPor = $this->usObj->getNome($row['postadoPor']);
                $fotoPostadoPor = $this->usObj->getFotoPerfil($row['postadoPor']);
                $j[$i] = [
                    'id'=> $row['id'],
                    'comentario'=> $row['comentario'],
                    'dataComentario'=> $row['dataCometario'],
                    'postadoPor'=> $postadoPor,
                    'fotoPostadoPor'=> $fotoPostadoPor,
                    'noPost'=> $row['noPost']
                ];
                $i++;
            }
            return $j;
        }
    };
?>