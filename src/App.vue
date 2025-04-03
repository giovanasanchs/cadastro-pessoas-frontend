<template>
  <div>
    <h2>Cadastro de Pessoas</h2>
    <form @submit.prevent="salvarPessoa">
      <input type="text" v-model="pessoa.nome" placeholder="Nome" required />
      <input type="email" v-model="pessoa.email" placeholder="E-mail" required />

      <select v-model="pessoa.tipoPessoa">
        <option value="FISICA">Pessoa Física</option>
        <option value="JURIDICA">Pessoa Jurídica</option>
      </select>

      <input v-if="pessoa.tipoPessoa === 'FISICA'" v-mask="'###.###.###-##'" type="text" v-model="pessoa.cpf" placeholder="CPF" required />
      <input v-if="pessoa.tipoPessoa === 'JURIDICA'" v-mask="'##.###.###/####-##'" type="text" v-model="pessoa.cnpj" placeholder="CNPJ" required />

      <input type="text" v-mask="'#####-###'" v-model="pessoa.cep" placeholder="CEP" required @blur="buscarCep" />
      <input type="text" v-model="pessoa.endereco" placeholder="Endereço" disabled />
      <input type="text" v-model="pessoa.numero" placeholder="Número" required />
      <input type="text" v-model="pessoa.bairro" placeholder="Bairro" disabled />
      <input type="text" v-model="pessoa.cidade" placeholder="Cidade" disabled />
      <input type="text" v-model="pessoa.estado" placeholder="Estado" disabled />

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pessoa: {
        nome: '',
        email: '',
        tipoPessoa: 'FISICA',
        cpf: '',
        cnpj: '',
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    };
  },
  methods: {
    async buscarCep() {
      if (this.pessoa.cep.length === 9) {
        const response = await axios.get(`https://viacep.com.br/ws/${this.pessoa.cep}/json/`);
        if (!response.data.erro) {
          this.pessoa.endereco = response.data.logradouro;
          this.pessoa.bairro = response.data.bairro;
          this.pessoa.cidade = response.data.localidade;
          this.pessoa.estado = response.data.uf;
        }
      }
    },
    async salvarPessoa() {
      await axios.post('http://localhost:8080/pessoas', this.pessoa);
      alert('Pessoa cadastrada com sucesso!');
    }
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
