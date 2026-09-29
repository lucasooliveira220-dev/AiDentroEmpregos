var cep = document.getElementById('cep');
var cidade = document.querySelector('#cidade');
var bairro = document.querySelector('#bairro');
var logradouro = document.querySelector('#logradouro');

cep.addEventListener('focusout',async function(){
    var cepLimpo = cep.value.replace("-","");
    
    if(cep.value.length == 9){
        alert("Cep inválido");
        return;
    }
    var url = 'https://viacep.com.br/ws/'+cepLimpo+'/json/';
    var consulta = await fetch(url);
    var dados = await consulta.json();
    if(dados.erro){ 
        alert("cep inválido");
        return;
    }
    cidade.value = dados.localidade;
    bairro.value = dados.bairro;
    logradouro.value = dados.logradouro;


    validarCadastro();
});
function validarCadastro(){
    var btnCadastrar = document.getElementById('btnCadastrar');

    if(cidade.value != ""){
        btnCadastrar.classList.remove('disabled');
    }else{
        btnCadastrar.classList.add('disabled');
    }
}
