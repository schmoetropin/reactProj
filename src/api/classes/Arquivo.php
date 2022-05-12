<?php
    class Arquivo {
        private $errMens = [];
        private $tiposArquivos = ['image/jpg','image/jpeg','image/png','video/mp4',];
        private $tamanhoArquivo = 5000000;
        public function checarArquivo($arquivo){
            $tipo = $this->tipoArquivo($arquivo);
            $tamanho = $this->tamanhoArquivo($arquivo);
            $erro = $this->erroArquivo($arquivo);
            if($tipo && $tamanho && $erro)
                return $tipo;
            return false;
        }

        public function getMensagemErro(){
            return $this->$errMens;
        }

        private function tipoArquivo($arquivo){
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo,$arquivo['tmp_name']);
            finfo_close($finfo);
            if(in_array($mime, $this->tiposArquivos))
                return $mime;
            array_push($this->errMens, $this->erros(0));
            return false;
        }

        private function tamanhoArquivo($arquivo){
            $tamanho = $arquivo['size'];
            if($tamanho > $this->tamanhoArquivo){
                array_push($this->errMens, $this->erros(1));
                return false;
            }
            return true;
        }

        private function erroArquivo($arquivo){
            $erro = $arquivo['error'];
            if($erro){
                array_push($this->errMens, $this->erros(2));
                return false;
            }
            return true;
        }

        private function erros($v){
            $erro = [
        /*0*/   '*Extencao do arquivo nao permitida.<br />',
        /*1*/   '*Tamanho do arquivo nao permitido.<br />',
        /*2*/   '*O arquivo possui erros.<br />'
            ];
            return $erro[$v];
        }
    };
?>