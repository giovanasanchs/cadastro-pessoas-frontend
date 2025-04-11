# 📌 CRUD de Cadastro de Pessoas

Este projeto é uma solução desenvolvida para o desafio técnico proposto. O objetivo é criar uma aplicação web com um **CRUD completo** para o **cadastro de pessoas**, utilizando **Vue para o front-end** e **Java para o back-end**. Os dados serão persistidos em **banco de dados MySQL**.

> 💻 **Desenvolvido um CRUD completo, com funcionalidades de criação, leitura, atualização e exclusão de cadastro de pessoas, utilizando boas práticas de desenvolvimento e integração com uma API externa para preenchimento automático de endereço.**

---

## 🔗 Repositório do Backend

Este projeto possui uma API backend desenvolvida em **Java**.  
Acesse o repositório clicando no link abaixo:

👉 [cadastro-de-pessoas-backend](https://github.com/giovanasanchs/cadastro-pessoas-backend)

---

## 🚀 Funcionalidades Implementadas

- ✅ Criação de pessoa com dados obrigatórios (nome, e-mail, tipo de pessoa)  
- ✅ Edição de cadastro de pessoa  
- ✅ Exclusão de cadastro com confirmação  
- ✅ Validação de CPF e CNPJ  
- ✅ Máscara para CPF, CNPJ e CEP  
- ✅ Preenchimento automático do endereço com consulta à API ViaCEP  
- ✅ Interface de cadastro simples e intuitiva

---

## ✨ Funcionalidades Extras (Opcionais Adicionadas)

- ✨ Validação adicional para campos de CPF e CNPJ com feedback visual  
- ✨ Máscaras dinâmicas que alteram conforme o tipo de pessoa selecionado  
- 🔎 Filtros para consulta de cadastro por nome ou CPF

---

## 🧱 Estrutura do Formulário

O formulário de cadastro de pessoas está estruturado com os seguintes campos:

| Campo              | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| **Nome**           | Campo obrigatório para o nome completo da pessoa.                         |
| **E-mail**         | Campo obrigatório com validação de formato de e-mail.                     |
| **Tipo de Pessoa** | Seleção entre **Pessoa Física** ou **Pessoa Jurídica**.                   |
| **CPF**            | Exibido apenas para Pessoa Física. Deve ter máscara e validação.          |
| **CNPJ**           | Exibido apenas para Pessoa Jurídica. Deve ter máscara e validação.        |
| **CEP**            | Campo obrigatório com máscara e validação.                                |
| **Endereço**       | Preenchido automaticamente via API (ex: ViaCEP). Somente leitura.         |
| **Número**         | Campo obrigatório para o número do endereço.                              |
| **Bairro**         | Preenchido automaticamente via CEP. Somente leitura.                      |
| **Cidade**         | Preenchida automaticamente via CEP. Somente leitura.                      |
| **Estado**         | Preenchido automaticamente via CEP. Somente leitura.                      |

---

## 🧑‍💻 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) Framework e servidor para desenvolvimento
- [Axios](https://axios-http.com/ptbr/) para manipulação de requisição HTTPS 
- **API ViaCEP** para preenchimento automático do endereço  

---

## 📂 Organização dos Arquivos

```bash
📁 src
├── 📁 assets           → Ícones, imagens e estilos globais
├── 📁 js               → Scripts JavaScript para interação com a API e validações
├── 📁 css              → Estilos globais e específicos do formulário
├── 📁 views            → Tela principal com formulário de cadastro
├── App.html            → Componente raiz
└── main.js             → Ponto de entrada da aplicação
```
## 🧪 Como Executar o Projeto Localmente

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/cadastro-de-pessoas-frontend.git

# Acesse a pasta do projeto
cd cadastro-de-pessoas-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

A aplicação estará disponível em http://localhost:5173 ou porta indicada no terminal.

```
