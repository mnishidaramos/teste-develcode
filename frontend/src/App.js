import React, { useState } from 'react';
import api from './services/api';

//Estilos
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

//Assets
import logo from './assets/logo-Develcode.png';

function App() {
  const [usuarios, setUsuarios] = useState([]); //Lista de usuários
  const [codigo, setCodigo] = useState();
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState();
  const [foto, setFoto] = useState({});

  //Função que busca a lista de usuarios no backend
  function getUsuarios(){
    api.get('usuarios').then(response => {
      setUsuarios(response.data);
    });
  }

  //Função disparada ao carregar uma imagem no input do form
  function handleInputImage(e){ 
    let file = e.target.files[0];
    
    if(file){
      const reader = new FileReader();
      
      reader.onload = _handlerReaderLoader.bind(this);
      
      reader.readAsBinaryString(file);
    }
  }
  const _handlerReaderLoader = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setFoto(btoa(binaryString));
  }

  //Função disparada quando o usuário clica no botão editar de um item da lista
  //Ela passa as informações do elemento a ser editado para os devidos inputs
  function handleEditarUsuario (usuario) {
    const {codigo, nome, dataNascimento, foto} = usuario;
    setCodigo(codigo);
    setNome(nome);
    setDataNascimento((new Date(dataNascimento)).toISOString().substr(0,10));
    setFoto(foto);
  }
  
  //Disparada quando o botão Limpar no formulário é clicado
  function handleFormReset() {
    setCodigo(null);
    setNome(null);
    setDataNascimento(null);
    setFoto(null);
  }
  
  //Disparada quando clicar no botão de remover foto
  function handleRemoveFoto(){
    setFoto(null);
  }

  //Disparada quando o botão Salvar no formulário é clicado
  async function handleFormSubmit(e) {
    e.preventDefault();
    let response = ''; //Variável de resposta do backend
    if(window.confirm('Você tem certeza que deseja salvar este usuário?')){
      if(codigo !== null && codigo !== ''){
        response = await api.put('usuarios/' + codigo, {
          nome: nome,
          dataNascimento: dataNascimento,
          foto: foto
        });
      } else {
        response = await api.post('usuarios', {
          codigo: null,
          nome: nome,
          dataNascimento: dataNascimento,
          foto: foto
        });
      }

      if(response.status.toString().startsWith('2')){
        //Chama novamente a função para exibir todos os usuários
        getUsuarios();
        //Limpa o form de usuários
        handleFormReset();
      } else {
        alert("Ocorreu um erro ao salvar este usuário");
      }
    }
  }

  //Disparada quando o botão Excluir é clicado e confirmada a ação de exclusão
  async function handleFormDelete(){
    if(window.confirm('Você tem certeza que deseja deletar este usuário?')){
      const response = await api.delete('usuarios/' + codigo);
      
      if(response.status.toString().startsWith('2')){
        //Chama novamente a função para exibir todos os usuários
        getUsuarios();
        //Limpa o form de usuários
        handleFormReset();
      } else {
        alert("Ocorreu um erro ao excluir este usuário");
      }
    }
  }

  return (
    <>
      {/* 
        Barra de navegação 
        */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <span className="navbar-brand">
          <img src={logo} alt="" width='95' height='58'/> <br/>
          <span className="aling-center">Develcode</span>
        </span>
        <h3 className="sessao">Gerenciamento de usuários</h3>
      </nav>
      
      {/* 
        Cabeçalho da tabela de usuários 
        */}
      <div className="container mt-3">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item flex-fill list-group-item-primary list-item-usuario">Código</li>
          <li className="list-group-item flex-fill list-group-item-primary list-item-usuario">Nome</li>
          <li className="list-group-item flex-fill list-group-item-primary list-item-usuario">Data de Nascimento</li>
          <li className="list-group-item flex-fill list-group-item-primary list-item-usuario">Foto</li>
          <li className="list-group-item flex-fill list-group-item-primary list-item-usuario"></li>
        </ul>

        {/* 
          Conteúdo da tabela, populado automaticamente 
          */}
        {usuarios.map(usuario =>
          <ul className="list-group list-group-horizontal" key={usuario.codigo}>
            <li className="list-group-item flex-fill list-item-usuario">{usuario.codigo}</li>
            <li className="list-group-item flex-fill list-item-usuario">{usuario.nome}</li>
            <li className="list-group-item flex-fill list-item-usuario">{(new Date(usuario.dataNascimento)).toISOString().substr(0,10)}</li>
            <li className="list-group-item flex-fill list-item-usuario"><img className="img-thumbnail" src={`data:image/(png|jpg|jpeg);base64,${usuario.foto}`}   width="100" height="100" alt="" /></li>
            <li className="list-group-item flex-fill list-item-usuario">
              <button className="btn btn-primary" onClick={() => handleEditarUsuario(usuario)}>Editar</button>
            </li>
          </ul>
          )
        }
        <button className="btn btn-primary" id="btnExibeUsuarios" onClick={getUsuarios}>Exibir usuários</button>
      </div>
      

      {/* 
        Container para a edição dos usuários 
        */}
      <div className="container mt-3 col-md-3">
        <div className="card">
          <div className="card-header text-white bg-primary">
            Formulário
          </div>
          <div className="card-body">
            <form onReset={handleFormReset} onSubmit={handleFormSubmit}>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                    <input placeholder="Código" className="form-control" readOnly type="number" defaultValue={codigo} onChange={event => setCodigo(event.target.valueAsNumber)}/>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                  <input placeholder="Nome" className="form-control" type="text" defaultValue={nome} onChange={event => setNome(event.target.value)}/>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                  <input placeholder="Data de Nascimento" className="form-control" min="1900-01-01" type="date" defaultValue={dataNascimento} onChange={event => setDataNascimento(event.target.valueAsDate)}/>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={handleInputImage} accept="image/*" />
                    <label className="custom-file-label" htmlFor="validatedCustomFile">Foto</label>
                  </div>
                  <button type="button" class="btn btn-light form-control" onClick={handleRemoveFoto}>Remover</button>
                  <figcaption class="figure-caption">Prévia:</figcaption>
                  <div id="fotoPreview">
                    <img className="img-thumbnail" src={`data:image/(png|jpg|jpeg);base64,${foto}`} maxWidth="200" maxHeight="200" alt="" />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                    <button type="submit" className="btn btn-primary float-right">Salvar</button>
                    <button type="reset" className="btn btn-info float-left">Limpar</button>
                </div> 
              </div>
              <div className="d-flex justify-content-center">
                <div className="form-group col-md-12">
                    <button type="button" className="btn btn-danger" onClick={handleFormDelete}>Excluir</button>
                </div> 
              </div>
            </form>
          </div>
        </div>
    </div>

  </>
  );
}

export default App;