<template>
    <div class="modal-overlay" @click.self="$emit('cancelar')">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Confirmação</h2>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja excluir <strong>{{ pessoa.nome }}</strong>?</p>
          <div class="botoes">
            <button class="btn-cancelar" @click="$emit('cancelar')">Cancelar</button>
            <button class="btn-confirmar" @click="$emit('confirmar')">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pessoa: Object,
    },
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-container {
    background: white;
    padding: 20px;
    width: 400px;
    border-radius: 8px;
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 20px;
  }
  
  .modal-body p {
    margin: 20px 0;
    font-size: 16px;
  }
  
  .botoes {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .btn-cancelar {
    background: #ccc;
    color: #333;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirmar {
    background: #d9534f;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirmar:hover {
    background: #c9302c;
  }
  </style>
  