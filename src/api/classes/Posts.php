<?php
    class Posts extends Conexao{
        private $usObj;
        public function __construct(){
            $this->usObj = new Usuario();
        }

        public function excluirPost($us, $post){
            if($this->usObj->checarLogin($us)){
                $query = $this->con()->prepare("SELECT arquivo FROM posts WHERE id='$post'");
                $query->execute();
                $row = $query->fetch(PDO::FETCH_ASSOC);
                $arquivo = $row['arquivo'];
                unlink(__DIR__.'/../../'.$arquivo);
                $this->deletarTodosComentariosPost($post);
                $query = $this->con()->prepare("DELETE FROM posts WHERE id='$post'");
                if($query->execute())
                    return true;
                return false;
            }
            echo 'usuário não encontrado';
            return false;
        }

        private function deletarTodosComentariosPost($post){
            $query = $this->con()->prepare("DELETE FROM comentarios WHERE noPost='$post'");
            $query->execute();
        }

        public function getLikesRecebidos($v){
            $query = $this->con()->prepare("SELECT * FROM posts WHERE id='$v'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['likesRecebidos'];
        }

        public function setLikesRecebidos($id, $valor){
            $query = $this->con()->prepare("UPDATE posts SET likesRecebidos='$valor' WHERE id='$id'");
            $query->execute();
        }

        public function getComentarios($v){
            $query = $this->con()->prepare("SELECT * FROM posts WHERE id='$v'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['comentarios'];
        }

        public function setComentarios($id, $valor){
            $query = $this->con()->prepare("UPDATE posts SET comentarios='$valor' WHERE id='$id'");
            $query->execute();
        }
    };
?>