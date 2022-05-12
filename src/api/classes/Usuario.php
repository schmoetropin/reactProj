<?php
    class Usuario extends Conexao{
        public function checarLogin($log){
            $query = $this->con()->prepare("SELECT id, email, nomeUnico, tipoUsuario FROM usuario");
            $query->execute();
            $j = [];
            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $email = md5($row['email']);
                $id = md5($row['id']);
                $nomeUnico = md5($row['nomeUnico']);
                $tipoUsuario = md5($row['tipoUsuario']);
                $logUs = 'c3o2'.$email.'em47'.$id.'9ird'.$nomeUnico.'nu0&&'.$tipoUsuario.'tu7r';
                $j[$row['id']] = $logUs;
            }
            if(in_array($log, $j))
                return array_search($log,$j);
            return false;
        }
        
        public function getNome($us){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE id='$us'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['nome'];
        }

        public function getFotoPerfil($us){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE id='$us'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['fotoPerfil'];
        }

        public function getEmail($us){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE id='$us'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['email'];
        }

        public function getComentarios($v){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE id='$v'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['comentarios'];
        }

        public function getDataRegistro($v){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE id='$v'");
            $query->execute();
            $row = $query->fetch(PDO::FETCH_ASSOC);
            return $row['dataRegistro'];
        }

        public function setComentarios($id, $valor){
            $query = $this->con()->prepare("UPDATE usuario SET comentarios='$valor' WHERE id='$id'");
            $query->execute();
        }

    };
?>