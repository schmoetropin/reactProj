import React from 'react';
import Head from './Head.jsx';
import Posts from './Posts.jsx';
import ExibirPosts from './ExibirPosts.jsx';
const ROOT = 'http://'+window.location.hostname+'/workspace/my-app/src';
const regLogH = ROOT+'/api/regLogHandler.php';
const postH = ROOT+'/api/postHandler.php';
const nomeCookie = 'fc666eeacbcd578fd83b2b5b61cf5393';
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            posts: [],
            logUs: ''
        });
        this.exibirTodosPosts(null);
        this.postar.bind(this);
        var log = this.getCookie(nomeCookie);
        if(log){
            this.state.logUs = log;
            this.checarLogin(this.state.logUs);
            if(this.state.logUs !== log){
                document.cookie = nomeCookie+'=;Sat, 1 Jul 1970 00:00:00 GMT;path=/';
                window.location.href = '/';
            }
        }
    }

    exibirTodosPosts(form){
        if(form)
            var fd = new FormData(form);
        else{    
            var fd = new FormData();
            fd.append('exibirTodosPosts','sim');
        }
        fetch(postH,{
            method:'POST',
            body: fd
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            this.setState({posts: respJson});
        });
    }

    regLogCliente(form,tipo){
        var formd = new FormData(form);
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function (aEvt) {
            if (xml.readyState == 4 && xml.status == 200){
                if(tipo === 'registro'){
                    var data;
                    if(this.responseText === 'Conta registrada com sucesso!<br />'){
                        var string = JSON.parse(this.responseText).join();
                        data = string.replace(',','');
                    }else
                        data = JSON.parse(this.responseText);
                    document.getElementById('registroMensagens').innerHTML = data;
                    document.getElementById('regNome').value = '';
                    document.getElementById('regEmail').value = '';
                    document.getElementById('regSenha').value = '';
                    document.getElementById('regSenha2').value = '';
                }else{
                    if(this.responseText === "*Usuario nao encontrado.<br />")
                        document.getElementById('loginMensagens').innerHTML = this.responseText;
                    else{
                        var login = JSON.parse(this.responseText);
                        const dia  = new Date();
                        dia.setTime(dia.getTime()+(3*24*60*60*1000));
                        let expira = ';expires'+dia.toUTCString()+';';
                        document.cookie = nomeCookie+'='+login.logUs+expira+'path=/';
                        document.getElementById('loginDiv').style = 'none';
                        document.getElementById('fundoOpaco').style = 'none';
                        window.location.href = '/';
                    }
                }
            }else
                console.log("Erro");
        };
        xml.open('POST',regLogH);
        xml.send(formd);
    }

    logout(){
        document.cookie = nomeCookie+'=;Sat, 1 Jul 1970 00:00:00 GMT;path=/';
        window.location.href = '/';
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') 
                c = c.substring(1);
            if (c.indexOf(name) === 0) 
                return c.substring(name.length, c.length);
        }
        return "";
    }

    checarLogin(log){
        var fd = new FormData();
        fd.append('checarLogin',log);
        fetch(regLogH,{
            method:'POST',
            body: fd
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            if(respJson.mensagem === 'usuario nao existe!'){
                document.cookie = nomeCookie+'=;Sat, 1 Jul 1970 00:00:00 GMT;path=/';
                window.location.href = '/';
            }
        });
    }

    postar(formD){
        var us = this.getCookie(nomeCookie);
        formD.append('usuario',us);
        fetch(postH,{
            method: 'POST',
            body: formD
        })
        .then(resp=> resp.json())
        .then(respJson=>{
            console.log(respJson);
            if(respJson){
            var string = respJson.join();
            var data = string.replace(',','');
            document.getElementById('PostErroMensagemDiv').style.display = 'block';
            document.getElementById('PostFundoMessErro').style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';
            document.getElementById('PostErro').innerHTML = data;
            document.getElementById('postTitulo').value = '';
            document.getElementById('postArquivo').value = '';
            document.getElementById('postConteudo').value = '';
            document.getElementById('previsualizacaoMidia').innerHTML = '';
            if(respJson[0] === 'Post criado com sucesso!<br />')
                window.location.href='/';}
        });
    }

    deletarPost(post){
        var us = this.getCookie(nomeCookie);
        var formData = new FormData();
        formData.append('usuario', us);
        formData.append('deletarPost', post);
        fetch(postH, {
            method: 'POST',
            body: formData
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            document.getElementById('PostErroMensagemDiv').style.display = 'block';
            document.getElementById('PostFundoMessErro').style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';
            document.getElementById('PostErro').innerHTML = respJson;
            this.exibirTodosPosts(null);
        });
    }

    render(){
        return(
            <>
                <Head
                    logUsuario = {this.state.logUs}
                    regLogCliente = {this.regLogCliente.bind(this)}
                    logout = {this.logout}
                    pesquisa = {this.exibirTodosPosts.bind(this)}
                />
                <Posts 
                    logUsuario = {this.state.logUs}
                    postar = {this.postar.bind(this)}
                />
                <ExibirPosts
                    logUsuario = {this.state.logUs}
                    posts = {this.state.posts}
                    deletarPost = {this.deletarPost.bind(this)}
                />
                <div id="PostErroMensagemDiv" className="divMensagemErro">
                    <div id="PostErro" className="mensagemErro"></div>
                    <button onClick={() => this.fecharDeletarPostMes()} className="btn btn-danger btn-sm">Ok</button>
                </div>
                <div id="PostFundoMessErro" className="fundoOpacoMessErro"></div>
            </>
        );
    };

    fecharDeletarPostMes(){
        document.getElementById('PostErroMensagemDiv').style.display = 'none';
        document.getElementById('PostFundoMessErro').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    }
};