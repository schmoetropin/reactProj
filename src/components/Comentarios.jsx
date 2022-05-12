import React from 'react';
const ROOT = 'http://'+window.location.hostname+'/workspace/my-app/src';
const comentH = ROOT+'/api/comentarioHandler.php';
export default class Comentarios extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            comentarios: []
        });
        var post = this.props.post;
        this.exibirComentarios(post);
    }

    exibirComentarios(post){
        var fd = new FormData();
        fd.append('exibirComentarioPost',post);
        fetch(comentH,{
            method:'POST',
            body:fd
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            this.setState({comentarios: respJson});
        });
    }

    enviarComentarioFormulario(e){
        e.preventDefault();
        var post = this.props.post;
        var form = document.getElementById('comentarioForm'+post);
        var formD = new FormData(form);
        formD.append('logUsuario',this.props.logUsuario);
        formD.append('noPost',post);
        fetch(comentH,{
            method: 'POST',
            body: formD
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            document.getElementById('comentariosErroMensagemDiv').style.display = 'block';
            document.getElementById('fundoOpacoMessErro').style.display = 'block';
            document.getElementById('comentarioTextarea'+post).value = '';
            document.getElementById('comentariosErro').innerHTML = respJson;
            this.exibirComentarios(post);
        });
    }

    render(){
        return(
            <div className="Comentarios" key={this.props.post}>
                {this.formularioComentar(this.props.logUsuario)}
                <h6 className="h5">Comentarios:</h6>
                {this.state.comentarios.map(
                    row=>
                    <div className="cometarioPost" key={row.id}>
                        <div className="informacoesUsuario">
                            <h6 className="h5">{row.postadoPor}</h6>
                            <div className="fotoPerfilCometario">
                                <img src={require('../'+row.fotoPostadoPor).default} alt="" />
                            </div>                            
                        </div>
                        <div className="comentarioConteudo">
                            <p>{row.comentario}</p>
                            <small>{row.dataComentario}</small>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    formularioComentar(logUsuario){
        if(logUsuario){
            var post = this.props.post;
            return(
                <div style={{margin:'10px 0 20px 0'}}>
                    <form onSubmit={this.enviarComentarioFormulario.bind(this)} id={"comentarioForm"+post} method="POST">
                        <div className="mb-3">
                            <textarea name="comentarioTextarea" id={"comentarioTextarea"+post} placeholder="Faca seu comentario aqui..." className="form-control"rows="3"></textarea>
                        </div>
                        <input type="submit" name={"enviarComentario"+post} value="Comentar" className="btn btn-primary btn-lg" />
                    </form>
                </div>
            );
        }
    }
};