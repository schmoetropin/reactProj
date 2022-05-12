<?php
    class CriarPosts extends Conexao{
        private $checVar;
        private $checArq;
        private $usObj;
        private $errMess = [];
        public function __construct(){
            $this->checVar = new ChecarVariaveis();
            $this->checArq = new Arquivo();
            $this->usObj = new Usuario();
        }
        
        public function criarPost($us,$tit,$arquivo,$cont){
            if($usuario = $this->usObj->checarLogin($us)){
                $titulo = $this->checVar->checarTitulo($tit);
                $conteudo = $this->checVar->checarConteudo($cont);
                if($titulo && $conteudo){
                    if($arquivo){
                        $arquivoTest = $this->checArq->checarArquivo($arquivo);
                        if($arquivoTest){
                            if($arquivoTest == 'video/mp4')
                                $extencao = str_replace('video/','',$arquivoTest);
                            else
                                $extencao = str_replace('image/','',$arquivoTest);
                            $titArqivo = strtolower(str_replace(' ','',$titulo));
                            $pasta = 'uploads/';
                            $novoArquivo = $pasta.date('Y-m-d_H:i:s').'_'.uniqid().uniqid().'_'.$titArqivo.'.'.$extencao;
                            if(!$this->inserirValores($usuario,$titulo,$novoArquivo,$conteudo,$extencao)){
                                array_push($this->errMess, $this->erros(1));
                                echo json_encode($this->errMess);
                                return false;
                            }
                            if(!$this->moverArquivo($arquivo,$novoArquivo)){
                                array_push($this->errMess, $this->erros(2));
                                echo json_encode($this->errMess);
                                return false;
                            }
                            array_push($this->errMess, $this->erros(3));
                            echo json_encode($this->errMess);
                            return true;
                        }
                        echo json_encode($this->checArq->getMensagemErro());
                        return false;
                    }else{
                        $semArquivo = 'nenhum';
                        if(!$this->inserirValores($usuario,$titulo,$semArquivo,$conteudo,$semArquivo)){
                            array_push($this->errMess, $this->erros(1));
                            echo json_encode($this->errMess);
                            return false;
                        }
                        array_push($this->errMess, $this->erros(3));
                        echo json_encode($this->errMess);
                        return true;
                    }
                }
                echo json_encode($this->checVar->getMensagenErro());
                return false;
            }
            array_push($this->errMess, $this->erros(0));
            echo json_encode($this->errMess);
            return false;
        }

        private function inserirValores($postadoPor,$titulo,$arquivo,$conteudo,$mime){
            $query = $this->con()->prepare("INSERT INTO posts(titulo,conteudo,mime,arquivo,postadoPor) VALUES(:titulo,:conteudo,:mime,:arquivo,:postadoPor)");
            $arr = [
                ':titulo'=> $titulo,
                ':conteudo'=> $conteudo,
                ':mime'=> $mime,
                ':arquivo'=> $arquivo,
                ':postadoPor'=> $postadoPor
            ];
            if($query->execute($arr))
                return true;
            return false;
        }

        private function moverArquivo($arquivo,$novoArquivo){
            $root = __DIR__.'/../../';
            if(move_uploaded_file($arquivo['tmp_name'],$root.$novoArquivo))
                return true;
            return false;
        }

        private function erros($v){
            $erro = [
    /*0*/       '*Usuario nao encontrado.<br />',
    /*1*/       '*Erro ao inserir dados no banco de dados.<br />',
    /*2*/       '*Erro ao fazer o upload.<br />',
    /*3*/       'Post criado com sucesso!<br />'
            ];
            return $erro[$v];
        }
    };
?>