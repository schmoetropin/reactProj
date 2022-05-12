<?php
    class ChecarVariaveis extends Conexao{
        private $errMess = [];
        public function checarNome($nom){
            $nome = strip_tags($nom);
            $nomeTest = $this->testarVariavelVazia($nome,'input');
            if(!$nomeTest){
                array_push($this->errMess, $this->erros(0));
                return false;
            }
            if(strlen($nome) < 4 || strlen($nome) > 20){
                array_push($this->errMess, $this->erros(1));
                return false;
            }
            return $nome;
        }
        
        public function checarTitulo($tit){
            $titulo = strip_tags($tit);
            $tituloTest = $this->testarVariavelVazia($titulo,'input');
            if(!$tituloTest){
                array_push($this->errMess, $this->erros(2));
                return false;
            }
            if(strlen($titulo) < 5 || strlen($titulo) > 90){
                array_push($this->errMess, $this->erros(3));
                return false;
            }
            return $titulo;
        }
        
        public function checarConteudo($con){
            $conteudo = strip_tags($con);
            $conteudoTest = $this->testarVariavelVazia($conteudo,'textarea');
            if(!$conteudoTest){
                array_push($this->errMess, $this->erros(4));
                return false;
            }
            if(strlen($conteudo) < 2){
                array_push($this->errMess, $this->erros(5));
                return false;
            }
            return $conteudo;
        }

        public function checarEmail($em){
            $email = strip_tags($em);
            $email = filter_var($email, FILTER_SANITIZE_EMAIL);
            if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
                array_push($this->errMess, $this->erros(6));
                return false;
            }
            $query = $this->con()->prepare("SELECT email FROM usuario WHERE email='$email'");
            $query->execute();
            if($query->rowCount() > 0){
                array_push($this->errMess, $this->erros(7));
                return false;
            }
            return $email;
        }

        public function checarSenha($se, $se2){
            $senha = strip_tags($se);
            $senha2 = strip_tags($se2);
            if($senha !== $senha2){
                array_push($this->errMess, $this->erros(8));
                return false;
            }
            if(strlen($senha) < 6 || strlen($senha) > 20){
                array_push($this->errMess, $this->erros(9));
                return false;
            }
            return $senha;
        }

        public function getMensagenErro(){
            return $this->errMess;
        }
        
        private function testarVariavelVazia($var, $tipo){
            if($tipo == 'input'){
                $input = str_replace(' ','',$var);
                if($input == '')
                    return false;
                return true;
            }else{
                $textarea = preg_replace('/\s+/','',$var);
                if($textarea == '')
                    return false;
                return true;
            }
        }

        private function erros($val){
            $erros = [
        /*0*/    '*O nome nao pede estar vazio.<br />',
        /*1*/    '*Nome precisa estar entre 4 e 20 caracteres.<br />',
        /*2*/    '*O titulo nao pede estar vazio.<br />',
        /*3*/    '*Titulo precisa estar entre 5 e 90 caracteres.<br />',
        /*4*/    '*O conteudo nao pode estar vazio.<br />',
        /*5*/    '*Conteudo precisa ter pelo menos 2 caracteres.<br />',
        /*6*/    '*Email nao e valido.<br />',
        /*7*/    '*Este email ja esta registrado.<br />',
        /*8*/    '*As senhas nao sao iguais.<br />',
        /*9*/    '*A senha precisa estar entre 6 e 20 caracteres.<br />'
            ];
            return $erros[$val];
        }
    };
?>