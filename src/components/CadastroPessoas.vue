<template>
    <div class="container">
      <h2>Cadastro de Pessoas</h2>
  
      <div class="content-container">
        <h3>Pesquisa</h3>
        <div class="pesquisa-content">
          <input type="text" v-model="filtros.nome" placeholder="Nome" required />
          <input type="text" v-model="filtros.cpf" placeholder="CPF" required />
          <button :disabled="!filtros.nome && !filtros.cpf">Filtrar</button>
          <button class="adicionar" @click="abrirModal">
            <span>+</span> Adicionar
          </button>
        </div>
  
        <div class="table-container">
          <table>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Opções</th>
            </tr>
            <tr v-for="(pessoa, index) in pessoas" :key="index" :class="{ 'linha-cinza': index % 2 === 0 }">
              <td>{{ pessoa.nome }}</td>
              <td>{{ pessoa.cpf }}</td>
              <td>{{ pessoa.email }}</td>
              <td class="opcoes">
                <button @click="toggleOpcoes(index)">▾</button>
                <div v-if="opcaoAtiva === index" class="dropdown">
                  <button @click="editarPessoa(pessoa)">Editar</button>
                  <button @click="excluirPessoa(index)">Excluir</button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="modalAberto" class="modal">
        <InserirDadosPessoa @fechar="fecharModal" />
      </div>
    </div>
  </template>
  
  <script>
  import InserirDadosPessoa from './InserirDadosPessoa.vue';
  
  export default {
    components: {
      InserirDadosPessoa,
    },
    data() {
      return {
        filtros: {
          nome: '',
          cpf: '',
        },
        pessoas: [
          { nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@email.com' },
          { nome: 'Maria Oliveira', cpf: '987.654.321-00', email: 'maria@email.com' },
          { nome: 'Carlos Souza', cpf: '456.789.123-00', email: 'carlos@email.com' },
        ],
        opcaoAtiva: null,
        modalAberto: false,
      };
    },
    methods: {
      toggleOpcoes(index) {
        this.opcaoAtiva = this.opcaoAtiva === index ? null : index;
      },
      editarPessoa(pessoa) {
        alert(`Editar: ${pessoa.nome}`);
      },
      excluirPessoa(index) {
        this.pessoas.splice(index, 1);
      },
      abrirModal() {
        this.modalAberto = true;
      },
      fecharModal() {
        this.modalAberto = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 90%;
    height: 90vh;
    margin: 20px auto;
    background: #e4e4e6;
    padding: 20px;
    border-radius: 8px;
  }
  
  h2 {
    text-align: left;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-left: 10px;
  }
  
  .content-container {
    height: 87%;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
  }
  
  .pesquisa-content {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    margin-left: 10px;
    align-items: center;
  }
  
  .pesquisa-content input {
    width: 550px;
    padding: 10px;
    border-radius: 3px;
  }
  
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  button:not(:disabled) {
    background: #007bff;
    color: white;
  }
  
  .adicionar {
    background: green;
    color: white;
    display: flex;
    align-items: center;
    gap: 13px;
    margin-left: 26rem;
  }
  
  .table-container {
    margin: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .linha-cinza {
    background-color: #f2f2f2;
  }
  
  .opcoes {
    position: relative;
  }
  
  .opcoes button {
    background: none;
    border: none;
    font-size: 18px;
    color: black;
    background: #1683f8;
  }
  
  .dropdown {
    position: absolute;
    top: 30px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .dropdown button {
    display: block;
    width: 100%;
    padding: 5px;
    text-align: left;
    border: none;
    background: none;
  }
  
  .dropdown button:hover {
    background: #f1f1f1;
  }
  
  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  