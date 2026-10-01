const cnpj = document.getElementById('cnpj');
const cep = document.getElementById('cep');
var cidade = document.querySelector('#cidade');
var bairro = document.querySelector('#bairro');
var logradouro = document.querySelector('#logradouro');
var uf = document.querySelector('#uf');

var cepEmpresa = document.querySelector('#cepEmpresa');
var cidadeEmpresa = document.querySelector('#cidadeEmpresa');
var bairroEmpresa = document.querySelector('#bairroEmpresa');
var logradouroEmpresa = document.querySelector('#logradouroEmpresa');
var ufEmpresa = document.querySelector('#ufEmpresa');
var razaoSocial = document.querySelector('#razaoSocial');

cep.addEventListener('focusout', async function () {
    const cepLimpo = cep.value.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        alert("Cep inválido");
        return;
    }

    var url = 'https://viacep.com.br/ws/' + cepLimpo + '/json/';
    var consulta = await fetch(url);
    var dados = await consulta.json();

    if (dados.erro) {
        alert("cep inválido");
        return;
    }

    cidade.value = dados.localidade;
    bairro.value = dados.bairro;
    logradouro.value = dados.logradouro;
    uf.value = dados.uf;

    validarCadastro();
});

cnpj.addEventListener('focusout', async function () {
    var cnpjLimpo = cnpj.value.replace(/\D/g, "");
  

    if (cnpjLimpo.length !== 14) {
        alert("CNPJ inválido");
        return;
    }

    var url = 'https://publica.cnpj.ws/cnpj/' + cnpjLimpo;
    var consulta = await fetch(url);
    var dados = await consulta.json();

    if (!consulta.ok) {
        alert("CNPJ inválido");
        return;
    }
    razaoSocial.value = dados.razao_social;
    cidadeEmpresa.value = dados.estabelecimento.cidade.nome;
    bairroEmpresa.value = dados.estabelecimento.bairro;
    logradouroEmpresa.value = dados.estabelecimento.logradouro;
    ufEmpresa.value = dados.estabelecimento.estado.sigla;
    cepEmpresa.value = dados.estabelecimento.cep;
    console.log(dados);
});

function validarCadastro() {
    var btnCadastrar = document.getElementById('btnCadastrar');

    if (cidade.value != "") {
        btnCadastrar.classList.remove('disabled');
    } else {
        btnCadastrar.classList.add('disabled');
    }
}