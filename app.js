// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let subtitulo = document.querySelector('p');
// subtitulo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto)
let tentativas = 0;
let chute;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function telaInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

telaInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    if (chute == numeroSecreto) {
        palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('h1', 'Acertou!');
        exibirTexto('p', `Você precisou de ${tentativas} ${palavraTentativa} para acertar o número secreto.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
     } else if (chute > numeroSecreto) {
        exibirTexto('h1', 'Continue tentando!');
        exibirTexto('p', `O número secreto é menor que o número escolhido. Essa foi sua ${tentativas}ª tentativa.`);
        limparCampo();
     } else if (chute < numeroSecreto) {
        exibirTexto('h1', 'Continue tentando!');
        exibirTexto('p', `O número secreto é maior que o número escolhido. Essa foi sua ${tentativas}ª tentativa.`);
        limparCampo();
     }
    }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    if (numeroLimite == listaDeNumerosSorteados.length) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    tentativas = 0;
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo();
    telaInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}