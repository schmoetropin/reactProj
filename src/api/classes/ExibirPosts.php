<?php
    class ExibirPosts extends Conexao{
        private $usObj;
        public function __construct(){
            $this->usObj = new Usuario();
        }
        public function exibirTodosPosts($post = null){
            if($post)
                $query = $this->con()->prepare("SELECT * FROM posts WHERE titulo LIKE '%$post%' ORDER BY id DESC");
            else
                $query = $this->con()->prepare("SELECT * FROM posts ORDER BY id DESC");
            $query->execute();
            $j = []; $i = 0;
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $postadoPor = $this->usObj->getNome($row['postadoPor']);
                $j[$i] = [
                    'id'=> $row['id'],
                    'titulo'=> $row['titulo'],
                    'conteudo'=> $row['conteudo'],
                    'mime'=> $row['mime'],
                    'arquivo'=> $row['arquivo'],
                    'likesRecebidos'=> $row['likesRecebidos'],
                    'comentarios'=> $row['comentarios'],
                    'postadoPor'=> $postadoPor,
                    'dataCriacao'=> $row['dataCriacao']
                ];
                $i++;
            }
            return $j;
        }
    };
?>