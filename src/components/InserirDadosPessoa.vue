<template>
    <div class="modal-overlay" @click.self="$emit('fechar')">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Dados da Pessoa</h2>
          <button class="close-button" @click="$emit('fechar')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <!-- Linha 1 -->
            <div class="form-group nome">
              <label>Nome Completo</label>
              <input type="text" v-model="pessoa.nome" class="input" required />
            </div>
  
            <div class="form-group email">
              <label>E-mail</label>
              <input type="email" v-model="pessoa.email" class="input" required />
            </div>
  
            <!-- Linha 2 -->
            <div class="form-group tipoPessoa">
              <label>Tipo de Pessoa</label>
              <select v-model="pessoa.tipoPessoa" class="input">
                <option value="FISICA">Pessoa Física</option>
                <option value="JURIDICA">Pessoa Jurídica</option>
              </select>
            </div>
  
            <div class="form-group cpfcnpj">
              <label v-show="pessoa.tipoPessoa === 'FISICA'">CPF*</label>
              <input
                v-show="pessoa.tipoPessoa === 'FISICA'"
                type="text"
                :value="pessoa.cpf"
                @input="pessoa.cpf = formatarCPF($event.target.value)"
                class="input"
                :required="pessoa.tipoPessoa === 'FISICA'"
                maxlength="14"
                inputmode="numeric"
              />

              <label v-show="pessoa.tipoPessoa === 'JURIDICA'">CNPJ*</label>
              <input
                v-show="pessoa.tipoPessoa === 'JURIDICA'"
                type="text"
                :value="pessoa.cnpj"
                @input="pessoa.cnpj = formatarCNPJ($event.target.value)"
                class="input"
                :required="pessoa.tipoPessoa === 'JURIDICA'"
                maxlength="18"
                inputmode="numeric"
              />
            </div>

            <div class="form-group cep">
              <label>CEP</label>
              <input
                type="text"
                :value="pessoa.cep"
                @input="pessoa.cep = formatarCEP($event.target.value)"
                class="input"
                required
                maxlength="9"
                inputmode="numeric"
                @blur="buscarCep"
              />
            </div>
  
            <div class="form-group endereco">
              <label>Endereço</label>
              <input type="text" v-model="pessoa.endereco" class="input" disabled />
            </div>
  
            <!-- Linha 3 -->
            <div class="form-group logradouro">
              <label>Logradouro</label>
              <input type="text" v-model="pessoa.endereco" class="input" disabled />
            </div>
  
            <div class="form-group bairro">
              <label>Bairro</label>
              <input type="text" v-model="pessoa.bairro" class="input" disabled />
            </div>
  
            <!-- Linha 4 -->
            <div class="form-group cidade">
              <label>Cidade</label>
              <input type="text" v-model="pessoa.cidade" class="input" disabled />
            </div>
  
            <div class="form-group uf">
              <label>UF</label>
              <select v-model="pessoa.estado" class="input" disabled>
                <option>{{ pessoa.estado }}</option>
              </select>
            </div>
          </div>
  
          <div class="form-actions">
            <button class="btn-primary" @click.prevent="salvarPessoa">Gravar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        pessoa: {
          nome: "",
          email: "",
          tipoPessoa: "FISICA",
          cpf: "",
          cnpj: "",
          cep: "",
          endereco: "",
          bairro: "",
          cidade: "",
          estado: "",
        },
      };
    },
    methods: {
      async buscarCep() {
        if (this.pessoa.cep.length === 9) {
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${this.pessoa.cep}/json/`);
            if (!response.data.erro) {
              this.pessoa.endereco = response.data.logradouro;
              this.pessoa.bairro = response.data.bairro;
              this.pessoa.cidade = response.data.localidade;
              this.pessoa.estado = response.data.uf;
            }
          } catch (error) {
            console.error("Erro ao buscar CEP:", error);
          }
        }
      },
      async salvarPessoa() {
        try {
          await axios.post("http://localhost:8080/pessoas", this.pessoa);
          alert("Pessoa cadastrada com sucesso!");
        } catch (error) {
          console.error("Erro ao salvar pessoa:", error);
        }
      },
      formatarCPF(valor) {
        valor = valor.replace(/\D/g, '') 
        if (valor.length > 11) valor = valor.slice(0, 11)
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        return valor
      },
      formatarCNPJ(valor) {
        valor = valor.replace(/\D/g, '')
        if (valor.length > 14) valor = valor.slice(0, 14)
        valor = valor.replace(/^(\d{2})(\d)/, '$1.$2')
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2')
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2')
        return valor
      },
      formatarCEP(valor) {
        valor = valor.replace(/\D/g, '')
        if (valor.length > 8) valor = valor.slice(0, 8)
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
        return valor
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
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
  
  .modal-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 900px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  
  .form-grid {
    display: grid;
    grid-template-areas:
      "nome nome email email"
      "tipoPessoa cpfcnpj cep endereco"
      "logradouro logradouro bairro bairro"
      "cidade cidade uf uf";
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  .nome         { grid-area: nome; }
  .email        { grid-area: email; }
  .tipoPessoa   { grid-area: tipoPessoa; }
  .cpfcnpj      { grid-area: cpfcnpj; }
  .cep          { grid-area: cep; }
  .endereco     { grid-area: endereco; }
  .logradouro   { grid-area: logradouro; }
  .bairro       { grid-area: bairro; }
  .cidade       { grid-area: cidade; }
  .uf           { grid-area: uf; }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }

  .cpfcnpj label {
    min-height: 20px;
  }
  
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  </style>
  