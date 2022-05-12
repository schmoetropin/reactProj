<?php
    abstract class Conexao{
        protected function con(){
            try{
                $con = new PDO('mysql:host=127.0.0.1;dbname=reactJsDB','root','');
                return $con;
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }
    };
?>