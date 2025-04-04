<template>
    <div class="container">
      <h2>Cadastro de Pessoas</h2>
  
      <div class="content-container">
        <h3>Pesquisa</h3>
        <div class="pesquisa-content">
          <input type="text" v-model="filtros.nome" placeholder="Nome" />
  
          <input
            type="text"
            v-model="filtros.cpf"
            v-maska="{ mask: mascaraCpfOuCnpj }"
            placeholder="CPF ou CNPJ"
            />
  
          <button :disabled="!filtros.nome && !filtros.cpf" @click="filtrarPessoas">
            Filtrar
          </button>
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
            <tr
              v-for="(pessoa, index) in pessoas"
              :key="index"
              :class="{ 'linha-cinza': index % 2 === 0 }"
            >
              <td>{{ pessoa.nome }}</td>
              <td>{{ pessoa.cpf || pessoa.cnpj }}</td>
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

      <!-- Modal de edição -->
      <div v-if="modalAberto === 'editar'" class="modal">
        <EditarDadosPessoa :pessoa="pessoaSelecionada" @fechar="fecharModal" @atualizado="buscarPessoas" />
      </div>

      <!-- Modal de confirmação de exclusão -->
      <ConfirmarExclusao
        v-if="confirmarExclusao"
        :pessoa="pessoaParaExcluir"
        @confirmar="confirmarExclusaoPessoa"
        @cancelar="cancelarExclusao"
      />

    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import InserirDadosPessoa from './InserirDadosPessoa.vue'
  import EditarDadosPessoa from './EditarDadosPessoa.vue'
  import ConfirmarExclusao from './ConfirmarExclusao.vue'
  
  export default {
    components: {
      InserirDadosPessoa,
      EditarDadosPessoa,
      ConfirmarExclusao,
    },
    data() {
      return {
        filtros: {
        nome: '',
        cpf: '',
        },
        pessoas: [],
        opcaoAtiva: null,
        modalAberto: false,
        pessoaSelecionada: null,
        confirmarExclusao: false,
        pessoaParaExcluir: null,
        indiceParaExcluir: null,
      }
    },
    computed: {
        mascaraCpfOuCnpj() {
            const onlyNumbers = this.filtros.cpf.replace(/\D/g, '')
            return onlyNumbers.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
        },
    },
    methods: {
      toggleOpcoes(index) {
        this.opcaoAtiva = this.opcaoAtiva === index ? null : index
      },
      editarPessoa(pessoa) {
        this.pessoaSelecionada = pessoa
        this.modalAberto = 'editar' 
      },
      excluirPessoa(index) {
        this.pessoaParaExcluir = this.pessoas[index]
        this.indiceParaExcluir = index
        this.confirmarExclusao = true
      },
      async confirmarExclusaoPessoa() {
        try {
            await axios.delete(`http://localhost:8080/pessoas/${this.pessoaParaExcluir.id}`)
            this.pessoas.splice(this.indiceParaExcluir, 1)
            this.confirmarExclusao = false
            this.pessoaParaExcluir = null
            this.indiceParaExcluir = null
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error)
            alert('Erro ao excluir a pessoa. Tente novamente.')
        }
      },
      cancelarExclusao() {
        this.confirmarExclusao = false
        this.pessoaParaExcluir = null
        this.indiceParaExcluir = null
      },
      abrirModal() {
        this.modalAberto = true
      },
      fecharModal() {
        this.modalAberto = false
        this.pessoaSelecionada = null
        this.buscarPessoas()
      },
      async buscarPessoas() {
        try {
          const response = await axios.get('http://localhost:8080/pessoas')
          this.pessoas = response.data
        } catch (error) {
          console.error('Erro ao buscar pessoas:', error)
        }
      },
      async filtrarPessoas() {
        try {
          const params = {}
          if (this.filtros.nome) params.nome = this.filtros.nome
          if (this.filtros.cpf) params.cpf = this.filtros.cpf
  
          const response = await axios.get('http://localhost:8080/pessoas', { params })
          this.pessoas = response.data
        } catch (error) {
          console.error('Erro ao filtrar pessoas:', error)
        }
      },
    },
    mounted() {
      this.buscarPessoas()
    },
  }
  </script>
  
  <style scoped>
  .container {
    width: 90%;
    height: 90vh;
    margin: 20px auto;
    background: #eeeeef;
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
    padding: 10px 13px;
    font-size: 15px;
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
    color: white;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 10px 13px;
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
    color: white;
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
    padding: 10px 12px;
    text-align: left;
    border: none;
    background: none;
    color: black;
  }
  
  .dropdown button:hover {
    background: #f1f1f1;
  }
  
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
  