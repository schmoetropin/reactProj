import React from 'react';
const ROOT = 'http://'+window.location.hostname+'/workspace/my-app/src';
const regLogH = ROOT+'/api/regLogHandler.php';
export default class Perfil extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            us: []
        }
        this.getUsuario(this.props.usuario);
    }

    getUsuario(us){
        var formD = new FormData();
        formD.append('dadosUsuario',us);
        fetch(regLogH,{
            method:'POST',
            body: formD
        })
        .then(resp=>resp.json())
        .then(respJson=>{
            this.setState({us: respJson});
        });
    }

    render(){
        var us = this.state.us;
        var imagem;
        if(us.fotoPerfil)
            imagem = '../'+us.fotoPerfil;
        else
            imagem = '../images/imagemPerfilPadrao.png';
        return(
            <div id="Perfil" className="Perfil">
                <button onClick={()=> this.fecharPerfil()} className="btn btn-danger btn-sm botaoFecharPerfil">Fechar</button>
                    <figure className="figure fotoUsuario">
                    {/*    <img src={require(imagem).default} alt="perfilImagem" className="figure-img img-fluid rounded imagemDePerfil" /><br />*/}
                        <button className="invisibleInput"><img src={require('../images/edit-16.png').default} alt="botaoEditar" /></button>
                        <figcaption className="figure-caption">A caption for the above image.</figcaption>
                    </figure>
                    <div className="descricaoUsuario">
                        <h5 className="h5">
                            {us.nome}
                            <button className="invisibleInput">
                                <img src={require('../images/edit-16.png').default} alt="botaoEditar" />
                            </button>
                        </h5>
                        <ul>
                            <li>
                                Email: {us.email} 
                                <button className="invisibleInput">
                                    <img src={require('../images/edit-16.png').default} alt="botaoEditar" />
                                </button>
                            </li>
                            <li>Cometarios: {us.comentarios}</li>
                            <li>Data registro: {us.dataRegistro}</li>
                        </ul>
                    </div>
            </div>
        );
    }

    fecharPerfil(){
        var perfil = document.getElementById('Perfil');
        var funO = document.getElementById('fundoPerfil');
        perfil.style.display='none';
        funO.style.display='none';
        document.querySelector('body').style.overflow = 'auto';
    }
};