<?php
    class Registrar extends Conexao{
        private $checVar;
        public function __construct(){
            $this->checVar = new ChecarVariaveis();
        }

        public function registro($nom, $em, $se, $se2){
            $nome = $this->checVar->checarNome($nom);
            $email = $this->checVar->checarEmail($em);
            $senha = $this->checVar->checarSenha($se, $se2);
            if($nome && $email && $senha){
                $nomeUnico = $this->criarNomeUnico($nome);
                $this->inserirDados($nome, $email, $senha, $nomeUnico);
            }else
                echo json_encode($this->checVar->getMensagenErro());
        }

        public function login($em, $se){
            $query = $this->con()->prepare("SELECT * FROM usuario WHERE email='$em' AND senha='$se'");
            $query->execute();
            if($query->rowCount() > 0){
                $row = $query->fetch(PDO::FETCH_ASSOC);
                $email = md5($row['email']);
                $id = md5($row['id']);
                $nomeUnico = md5($row['nomeUnico']);
                $tipoUsuario = md5($row['tipoUsuario']);
                $logUs = 'c3o2'.$email.'em47'.$id.'9ird'.$nomeUnico.'nu0&&'.$tipoUsuario.'tu7r';
                $i = [
                    'logUs'=> $logUs
                ];
                return json_encode($i);
            }else
                return $this->erros(0);
        }

        private function inserirDados($nome, $email, $senha, $nomeUnico){
            $foto = 'images/imagemPerfilPadrao.png';
            $query = $this->con()->prepare("INSERT INTO usuario(nome, email, senha, nomeUnico, fotoPerfil) VALUES(:nome, :email, :senha, :nomeUnico, :fotoPerfil)");
            $arr = [
                ':nome'=> $nome,
                ':email'=> $email,
                ':senha'=> $senha,
                ':nomeUnico'=> $nomeUnico,
                ':fotoPerfil'=> $foto
            ];
            if(!$query->execute($arr)){
                echo json_encode($j[0] = $this->erros(1));
                return false;
            }
            echo json_encode($j[0] = $this->erros(2));
            return true;
        }

        private function criarNomeUnico($nome){
            $caracteresProibidos = ['@','&','*','+','.',',','\'','"',':',' ','\\','/','=','-','_','¨','%','$','#','!','<','>','^','~',';','?','[',']','{','}','(',')','´','`'];
            $nomeU = str_replace($caracteresProibidos,'',$nome);
            $nomeU = strtolower($nomeU);
            $nomeUnico = '**'.$nomeU.'**';
            $query = $this->con()->prepare("SELECT nomeUnico FROM usuario WHERE nomeUnico='$nomeUnico'");
            $query->execute();
            $i=0;
            while($query->rowCount() > 0){
                $nomeUnico = '**'.$nomeU.$i.'**';
                $query = $this->con()->prepare("SELECT nomeUnico FROM usuario WHERE nomeUnico='$nomeUnico'");
                $query->execute();
                $i++;
            }
            return $nomeUnico;
        }

        private function erros($v){
            $erro = [
        /*0*/   '*Usuario nao encontrado.<br />',
        /*1*/   '*ERRO, nao foi possivel completar o registro.<br />',
        /*2*/   'Conta registrada com sucesso!<br />'
            ];
            return $erro[$v];
        }
        
    };
?>