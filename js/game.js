// VARIÁVEIS DE CONTROLE DO JOGO
var perguntasFeitas = [];

// PERGUNTAS DO JOGO
let perguntas = [
    {
        pergunta: "Qual dessas linguagens não é considerada uma linguagem de programação?",
        respostas: ["PHP", "JavaScript", "C++", "HTML"],
        correta: "resp3"

    },
    {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1910", "1500", "1115", "2002"],
        correta: "resp1"

    },
    {
        pergunta: "Qual dos apóstolos traiu Jesus?",
        respostas: ["Pedro", "Tiago", "Judas", "Felipe"],
        correta: "resp2"

    },
    {
        pergunta: "Quantas Copas do Mundo o Brasil ficou de fora?",
        respostas: ["Uma", "Duas", "Nenhuma", "Três"],
        correta: "resp2"

    },
    {
        pergunta: "Qual o nome da história do filho que pediu a herança e foi embora?",
        respostas: ["Esqueceram de mim", "Filho Pródigo", "De volta pra casa", "Regresso"],
        correta: "resp1"

    },
    {
        pergunta: "O que significa a sigla HTML?",
        respostas: ["Hyper Tonto Maluco Legal", "Hyper Text Mark Lang", "Hyper Trade More Language", "Hyper Text Markup Language"],
        correta: "resp3"

    },
    {
        pergunta: "Qual o nome do apresentador que usava o bordão(beijo do gordo)?",
        respostas: ["Fausto Silva(Faustão)", "Geraldo Luis", "Jô Soares", "Gilberto Barros"],
        correta: "resp2"

    },
]

var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
    // GERAR UM NUMERO ALEATÓRIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    // MOSTRAR NO CONSOLE QUAL A PERGUNTA SORTEADA
    console.log('A pergunta sorteada foi a: ' + aleatorio)

    // VERIFICAR SE A PERGUNTA SORTEADA JÁ FOI FEITA
    if (!perguntasFeitas.includes(aleatorio)) {
        // COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        // PREENCHER O HTML COM OS DADOS DA QUESTAO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        // ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);

        // COLOCAR AS RESPOSTAS

        for (var i = 0; i < 4; i++) {
            $("#resp" + i).html(perguntas[aleatorio].respostas[i])
        }

        // EMBARALHAR AS RESPOSTAS
        var pai = $("#respostas");
        var botoes = pai.children();

        for (var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        // SE A PERGUNTA JÁ FOI FEITA
        console.log('A pergunta já foi gerada. Sorteando novamente.')
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas);
        } else {
            console.log('Acabaram as perguntas!');
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns!!! Você acabou de ganhar 1 Milhão de Reais no Show do Milhão!');
            $('#status').removeClass('oculto');
        }
    }
}

$('.resposta').click(function () {
    if ($("#quiz").attr('data-status') !== 'travado') {
        // PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
        resetaBotoes()
        // ADICIONAR A CLASSE SELECIONADA
        $(this).addClass('selecionada');
    }
});

$("#confirm").click(function () {

    // PEGAR O INDICE DA PERGUNTA
    var indice = $("#pergunta").attr('data-indice');

    // QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    // QUAL A RESPOSTA DO USUÁRIO SELECIONOU
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');

            if (respCerta == respostaEscolhida) {
                $('#' + respCerta).addClass('correta');
                console.log('Acertou Miseraviiiiii!');
                setTimeout(function () {
                    proximaPergunta();
                }, 3000);

            } else {
                console.log('Errrroooooou!');
                $("#quiz").attr('data-status', 'travado');
                $("#confirm").addClass('oculto');
                $('#' + respCerta).addClass('correta');
                $('#' + respostaEscolhida).removeClass('selecionada');
                $('#' + respostaEscolhida).addClass('errada');

                // 3 SEGUNDOS PARA DAR GAME OVER
                setTimeout(function () {
                    gameOver();
                }, 3000);
            }
        }
    })

});

function newGame() {
    $("#quiz").attr('data-status', 'ok');
    $("#confirm").removeClass('oculto');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    // PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada');
        }
        if ($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        }
        if ($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#status').removeClass('oculto');
}

$('#novoJogo').click(function () {
    newGame();
});


