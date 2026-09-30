var cep = document.getElementById('cep');
var celular = document.getElementById('celular');
var cpf = document.getElementById('cpf');
var cidade = document.querySelector('#cidade');
var bairro = document.querySelector('#bairro');
var uf = document.querySelector('#uf');
var logradouro = document.querySelector('#logradouro');

[celular, cpf, cep].forEach(function (campo) {
    campo.addEventListener('input', function () {
        campo.value = campo.value.replace(/\D/g, '').slice(0, campo.maxLength);
    });
});

cep.addEventListener('focusout', async function () {
    var cepLimpo = cep.value;

    if (cep.value.length !== 8) {
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
    uf.value = dados.uf
    logradouro.value = dados.logradouro;


    validarCadastro();
});

celular.addEventListener('focusout', async function () {
    var celularLimpo = cep.value.replace("-", "");
    const apiKey = '6a6156fda3e627246ac2150855e3ee3b';
    const numero = '5511999999999';

    if (celular.value.length == 11) {
        alert("Número inválido");
        return;
    }
    
    var url = 'https://viacep.com.br/ws/' + cepLimpo + '/json/';
    var consulta = await fetch(url);
    var dados = await consulta.json();

    fetch(`http://apilayer.net{apiKey}&number=${numero}`)
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                console.log(`Válido! País: ${data.country_name}, Operadora: ${data.carrier}`);
            } else {
                console.log('Número inválido.');
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
});

function validarCadastro() {
    var btnCadastrar = document.getElementById('btnCadastrar');

    if (cidade.value != "") {
        btnCadastrar.classList.remove('disabled');
    } else {
        btnCadastrar.classList.add('disabled');
    }
}