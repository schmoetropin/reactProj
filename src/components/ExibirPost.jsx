import React from 'react';
import Comentarios from './Comentarios.jsx';

export default class ExibirPost extends React.Component{
    delPost(post){
        this.props.deletarPost(post);
    }

    render(){
        return(
            <>
                <div className="ExibirPost" id={"ExibirPost"+this.props.id} key={this.props.id}>
                    <input type="hidden" id="HIExibirPost" value={this.props.id} />
                    <button onClick={()=> this.fecharPost(this.props.id)} className="btn btn-danger btn-sm botaoFechar">Fechar</button>
                    <h1 className="h1 postTitulo">{this.props.titulo}</h1>
                    {this.arquivoMime(this.props.mime, this.props.arquivo)}
                    <p className="postConteudo">{this.props.conteudo}</p>
                    <Comentarios
                        post = {this.props.id}
                        logUsuario = {this.props.logUsuario}
                    />
                    <div style={{height:'40px'}}></div>
                </div>
                {this.botaoDeletarPost(this.props.logUsuario, this.props.id)}
            </>
        );
    }

    arquivoMime(mime,arquivo){
        if(mime === 'mp4'){}
        if(mime === 'jpeg' || mime === 'png' || mime === 'jpg'){
            return <img src={require('../'+arquivo).default} alt="post imagem" />
        }
    }

    fecharPost(val){
        document.getElementById('ExibirPost'+val).style.display = 'none';
        document.getElementById('fundoOpaco').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    }

    botaoDeletarPost(usuario, post){
        if(usuario){
            var separar = usuario.split('&&');
            var tipo = separar[1];
            tipo = tipo.substr(0,32);
            if(tipo === 'c4ca4238a0b923820dcc509a6f75849b'){
                return(
                    <button onClick={()=> this.delPost(post)} className="btn btn-danger btn-sm botaoDeletarPost">Deletar Post</button>
                );
            }
        }
    }
};