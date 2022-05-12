import React from 'react';

export default class Posts extends React.Component{
    render(){
        return(
            <div className="Posts">
                {this.criarNovoPostBotao(this.props.logUsuario)}
                {this.novoPostForm(this.props.logUsuario)}
            </div>
        );
    }

    postar(e){
        e.preventDefault();
        var form = document.getElementById('formPost');
        var formD = new FormData(form);
        var arquivo = document.getElementById('postArquivo');
        if(arquivo.files[0] && arquivo.files){
            if(arquivo.length > 0)
                formD.append('postArquivo',arquivo.files);
        }
        this.props.postar(formD);
    }

    criarNovoPostBotao(logUs){
        if(logUs){
            var separar = logUs.split('&&');
            var tipo = separar[1];
            tipo = tipo.substr(0,32);
            if(tipo === 'c4ca4238a0b923820dcc509a6f75849b'){
                return(
                    <button onClick={()=> this.exibirNovoPostForm()} className="btn btn-danger btn-lg botaoCriarPost">
                        Novo post
                    </button>
                );
            }
        }
    }

    novoPostForm(logUs){
        if(logUs){
            var separar = logUs.split('&&');
            var tipo = separar[1];
            tipo = tipo.substr(0,32);
            if(tipo === 'c4ca4238a0b923820dcc509a6f75849b'){
                return(
                    <div id="criarPostDiv" className="formPadrao formPost">
                        <h2 className="h2">Novo post</h2>
                        <div id="postMensagens" style={{color:'#F44336', fontSize:'12px', height:'55px'}}></div>
                        <form onSubmit={this.postar.bind(this)} id="formPost" method="POST" encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Titulo</label>
                                <input name="postTitulo" id="postTitulo" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Titulo..." required />
                            </div>
                            <div id="previsualizacaoMidia" className="previsualizacaoMidia"></div>
                            <div className="form-group">
                                <label htmlFor="postArquivo">Midia</label><br />
                                <input onChange={this.previsualisarMidia.bind(this)} id="postArquivo" name="postArquivo" id="postArquivo" type="file" className="form-control-file"/>
                                <small onClick={()=> this.limparInputFile()} className="btn btn-danger btn-sm">Limpar</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Conteudo</label>
                                <textarea name="postConteudo" id="postConteudo" className="form-control" rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary botaoFormularioPadrao botaoEnviar">Postar</button>
                        </form>
                        <button onClick={()=> this.esconderNovoPostForm()} className="btn btn-danger botaoFormularioPadrao botaoCancelar">Cancelar</button>
                    </div>
                );
            }
        }
    }

    exibirNovoPostForm(){
        document.getElementById('criarPostDiv').style.display = 'block';
        document.getElementById('fundoOpaco').style.display = 'block';
        document.querySelector('body').style.overflow = 'hidden';
    }

    esconderNovoPostForm(){
        document.getElementById('criarPostDiv').style.display = 'none';
        document.getElementById('fundoOpaco').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    }

    limparInputFile(){
        document.getElementById('postArquivo').value = '';
        document.getElementById('previsualizacaoMidia').innerHTML = '';
    }

    previsualisarMidia(e){
        var prevDiv = document.getElementById('previsualizacaoMidia');
        var tipo = e.target.files[0].type;
        var tipoPermitido = null;
        if(tipo === 'image/jpeg' || tipo === 'image/jpg' || tipo === 'image/png'){
            tipoPermitido = '1';
            prevDiv.innerHTML = "<img id='prevMidia' />";
        }else if(tipo === 'video/mp4'){
            tipoPermitido = '1';
            prevDiv.innerHTML = "<video id='prevMidia' controls autoplay mute></video>";
        }else
            prevDiv.innerHTML = "<p class='mensagemErro'>*Extenção não suportada.</p>";
        var previsualisacao = document.getElementById('prevMidia');
        if(tipoPermitido)
            previsualisacao.src = URL.createObjectURL(e.target.files[0]);/*
        previsualisacao.onload() = function(){
            URL.revokeObjectURL(previsualisacao.src);
        }*/
    }
};