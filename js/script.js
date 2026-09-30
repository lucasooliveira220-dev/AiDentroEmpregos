var candidato = document.getElementById('candidato');
var empresa = document.getElementById('empresa');
var cep = candidato.querySelector('#cep');
var cepEmpresa = empresa.querySelector('#cepEmpresa');
var celular = candidato.querySelector('#celular');
var cpf = candidato.querySelector('#cpf');
var cidade = candidato.querySelector('#cidade');
var bairro = candidato.querySelector('#bairro');
var uf = candidato.querySelector('#uf');
var logradouro = candidato.querySelector('#logradouro');

[celular, cpf, cep, cepEmpresa].forEach(function (campo) {
    campo.addEventListener('input', function () {
        campo.value = campo.value.replace(/\D/g, '').slice(0, campo.maxLength);
    });
});

function configurarValidacaoCep(campoCep, endereco, aoValidar) {
    campoCep.addEventListener('input', function () {
        campoCep.setCustomValidity('');
        campoCep.classList.remove('is-invalid', 'is-valid');
        Object.values(endereco).forEach(function (campo) {
            campo.value = '';
        });
    });

    campoCep.addEventListener('blur', async function () {
        var cepLimpo = campoCep.value;

        if (!cepLimpo) {
            return;
        }

        if (cepLimpo.length !== 8) {
            campoCep.setCustomValidity('Informe um CEP com 8 números.');
            campoCep.classList.add('is-invalid');
            campoCep.classList.remove('is-valid');
            campoCep.reportValidity();
            return;
        }

        campoCep.setCustomValidity('Consultando CEP...');
        campoCep.classList.remove('is-invalid', 'is-valid');

        try {
            var resposta = await fetch('https://viacep.com.br/ws/' + cepLimpo + '/json/');
            if (!resposta.ok) {
                throw new Error('Não foi possível consultar o CEP.');
            }

            var dados = await resposta.json();
            if (campoCep.value !== cepLimpo) {
                return;
            }
            if (dados.erro) {
                throw new Error('CEP não encontrado. Confira os números e tente novamente.');
            }

            endereco.cidade.value = dados.localidade;
            endereco.bairro.value = dados.bairro;
            endereco.uf.value = dados.uf;
            endereco.logradouro.value = dados.logradouro;
            campoCep.setCustomValidity('');
            campoCep.classList.add('is-valid');
            campoCep.classList.remove('is-invalid');

            if (aoValidar) {
                aoValidar();
            }
        } catch (erro) {
            if (campoCep.value !== cepLimpo) {
                return;
            }
            campoCep.setCustomValidity(erro.message);
            campoCep.classList.add('is-invalid');
            campoCep.classList.remove('is-valid');
            campoCep.reportValidity();
        }
    });
}

configurarValidacaoCep(cep, {
    cidade: cidade,
    bairro: bairro,
    uf: uf,
    logradouro: logradouro
}, validarCadastro);

configurarValidacaoCep(cepEmpresa, {
    cidade: empresa.querySelector('#cidadeEmpresa'),
    bairro: empresa.querySelector('#bairroEmpresa'),
    uf: empresa.querySelector('#ufEmpresa'),
    logradouro: empresa.querySelector('#logradouroEmpresa')
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
    var btnCadastrar = candidato.querySelector('#btnCadastrar');

    if (cidade.value != "") {
        btnCadastrar.classList.remove('disabled');
    } else {
        btnCadastrar.classList.add('disabled');
    }
}