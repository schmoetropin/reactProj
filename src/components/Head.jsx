import React from 'react';
import Perfil from './Perfil';
export default class Head extends React.Component{
    registrarUsuario(e){
        e.preventDefault();
        var form = document.getElementById('registroUsuario');
        this.props.regLogCliente(form,'registro');
    }

    loginUsuario(e){
        e.preventDefault();
        var form = document.getElementById('loginUsuario');
        this.props.regLogCliente(form,'login');
    }

    logoutUsuario(){
        this.props.logout();
    }

    pesquisar(e){
        e.preventDefault();
        var form = document.getElementById('pesquisaForm');
        this.props.pesquisa(form);
    }

    render(){
        return(
            <div className="Head">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"fixed", top: 0, left: 0, width: "100%", zIndex:'99'}}>
                    <a className="navbar-brand" href="/" style={{marginLeft:'1%'}}>Blog</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <form onSubmit={this.pesquisar.bind(this)} id="pesquisaForm" className="navbar-text" style={{marginLeft:'5%'}}>
                            <input name="exibirPesquisa" className="invisibleInput" type="text" placeholder="Pesquise por um post aqui..." />
                            <button className="invisibleInput"><img src={require("../images/search-13-16.png").default} alt="searchI" /></button>
                        </form>
                        <ul className="navbar-nav mr-auto" style={{position:"absolute", right:"10px"}}>
                            {this.ulLoginHeader(this.props.logUsuario)} 
                        </ul>
                    </div>
                </nav>
                {this.loginDiv()}
                {this.registroDiv()}
                <div id="fundoOpaco" className="fundoOpaco"></div>
                <div style={{marginTop:"65px"}}></div>
            </div>
        );
    }

    ulLoginHeader(logUs){
        if(logUs){
            return(
                <>
                    <li className="nav-item">
                        <button onClick={()=> this.exibirPerfil()} className="invisibleInput" style={{marginRight:"5px"}}>
                            Perfil
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick = {this.logoutUsuario.bind(this)} className="invisibleInput" style={{marginRight:"5px"}}>
                            Logout
                        </button>
                    </li>
                    <Perfil
                        usuario={this.props.logUsuario}
                    />
                    <div id="fundoPerfil" className="fundoOpaco"></div>
                </>
            );
        }else{
            return(
                <>
                    <li className="nav-item" style={{marginRight:"5px"}}>
                        <button onClick={()=> this.exibirRegistroLogin('login')} className="invisibleInput">
                            Login
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={()=> this.exibirRegistroLogin('registro')} className="invisibleInput" style={{marginRight:"5px"}}>
                            Registrar
                        </button>
                    </li>
                </>
            );
        }
    }

    registroDiv(){
        return(
            <div id="registroDiv" className="formPadrao formRegistro">
                <h2 className="h2">Registro</h2>
                <div id="registroMensagens" style={{color:'#F44336', fontSize:'12px', height:'55px'}}></div>
                <form id="registroUsuario" onSubmit={this.registrarUsuario.bind(this)}>
                    <div className="mb-3">
                        <label htmlFor="regNome" className="form-label">Nome de usuario</label>
                        <input type="text" name="regNome" className="form-control" id="regNome" aria-describedby="emailHelp" placeholder="Nome..." required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="regEmail" className="form-label">Endereço de email</label>
                        <input type="email" name="regEmail" className="form-control" id="regEmail" aria-describedby="emailHelp" placeholder="Email..." required />
                        <div id="emailHelp" className="form-text">Nunca enviaremos seu email a ninguem.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="regSenha" className="form-label">Senha</label>
                        <input type="password" name="regSenha" className="form-control" id="regSenha" placeholder="Senha..." required />
                        <input type="password" name="regSenha2" className="form-control" id="regSenha2" placeholder="Confirmar senha..." style={{marginTop:'1%'}} required />
                    </div>
                    <button type="submit" className="btn btn-primary botaoFormularioPadrao botaoEnviar">Registrar</button>
                </form>
                <button onClick={()=> this.esconderRegistroLogin('registro')} className="btn btn-danger botaoFormularioPadrao botaoCancelar">
                    Cancelar
                </button>
            </div>
        );
    }

    loginDiv(){
        return(
            <div id="loginDiv" className="formPadrao formLogin">
                <h2 className="h2">Login</h2>
                <div id="loginMensagens" style={{color:'#F44336', fontSize:'12px', height:'20px'}}></div>
                <form id="loginUsuario" onSubmit={this.loginUsuario.bind(this)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Endereço de email</label>
                        <input type="email" name="logEmail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email..." required />
                        <div id="emailHelp" className="form-text">Nunca enviaremos seu email a ninguem.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" name="logSenha" className="form-control" id="exampleInputPassword1" placeholder="Senha..." required />
                    </div>
                    <button type="submit" className="btn btn-primary botaoFormularioPadrao botaoEnviar">Login</button>
                </form>
                <button onClick={()=> this.esconderRegistroLogin('login')} className="btn btn-danger botaoFormularioPadrao botaoCancelar">
                    Cancelar
                </button>
            </div>
        );
    }

    exibirRegistroLogin(val){
        var regD = document.getElementById('registroDiv');
        var logD = document.getElementById('loginDiv');
        var funO = document.getElementById('fundoOpaco');
        if(val === 'registro'){
            regD.style.display='block';
            funO.style.display='block';
            document.querySelector('body').style.overflow = 'hidden';
        }else{
            logD.style.display='block';
            funO.style.display='block';
            document.querySelector('body').style.overflow = 'hidden';
        }
    }

    esconderRegistroLogin(val){
        var regD = document.getElementById('registroDiv');
        var logD = document.getElementById('loginDiv');
        var funO = document.getElementById('fundoOpaco');
        if(val === 'registro'){
            regD.style.display='none';
            funO.style.display='none';
            document.querySelector('body').style.overflow = 'auto';
        }else{
            logD.style.display='none';
            funO.style.display='none';
            document.querySelector('body').style.overflow = 'auto';
        }    
    }

    exibirPerfil(){
        var perfil = document.getElementById('Perfil');
        var funO = document.getElementById('fundoPerfil');
        perfil.style.display='block';
        funO.style.display='block';
        document.querySelector('body').style.overflow = 'hidden';
    }
};