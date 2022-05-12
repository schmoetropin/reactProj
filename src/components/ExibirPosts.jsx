import React from 'react';
import ExibirPost from './ExibirPost.jsx';

export default class ExibirPosts extends React.Component{
    render(){
        return(
            <div className="ExibirPosts">
                {this.props.posts.map(row=>
                    <div key={'d'+row.id} style={{position:'relative'}}>
                        <div className="card postPadrao" key={'post_'+row.id}>
                            <div className="arquivoDiv">{this.arquivoMime(row.mime,row.arquivo)}</div>
                            <div className="card-body">
                                <h5 className="card-title">{row.titulo}</h5>
                                <div className="conteudoDiv"><p className="card-text">{row.conteudo}</p></div>
                                <button onClick={()=> this.exibirPost(row.id)} className="btn btn-primary">Exibir Post</button><br />
                                <small>
                                    <ul>
                                        <li>Postado Por: {row.postadoPor}</li>
                                        <li>Comentarios: {row.comentarios}</li>
                                        <li>Likes: {row.likesRecebidos}</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                        <ExibirPost
                            id = {row.id}
                            titulo = {row.titulo}
                            arquivo = {row.arquivo}
                            mime = {row.mime}
                            conteudo = {row.conteudo}
                            postadoPor = {row.postadoPor}
                            comentarios = {row.comentarios}
                            likesRecebidos = {row.likesRecebidos}
                            logUsuario = {this.props.logUsuario}
                            deletarPost = {this.props.deletarPost.bind(this)}
                        />
                    </div>
                )}
                <div id="comentariosErroMensagemDiv" className="divMensagemErro">
                    <div id="comentariosErro" className="mensagemErro"></div>
                    <button onClick={() => this.fecharComErrMensDiv()} className="btn btn-danger btn-sm">Ok</button>
                </div>
                <div id="fundoOpacoMessErro" className="fundoOpacoMessErro"></div>
            </div>
        );
    }

    arquivoMime(mime,arquivo){
        if(mime === 'mp4'){}
        if(mime === 'jpeg' || mime === 'png' || mime === 'jpg'){
            return <img src={require('../'+arquivo).default} alt="post imagem" />
        }
    }

    exibirPost(val){
        document.getElementById('ExibirPost'+val).style.display = 'block';
        document.getElementById('fundoOpaco').style.display = 'block';
        document.querySelector('body').style.overflow = 'hidden';
    }

    fecharComErrMensDiv(){
        document.getElementById('comentariosErroMensagemDiv').style.display = 'none';
        document.getElementById('fundoOpacoMessErro').style.display = 'none';
    }
};