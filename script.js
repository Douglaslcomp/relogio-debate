let tempoInicial = 180;
let tempoRestante = 180;
let intervalo = null;
let fim = 0;

const contador = document.getElementById("contador");
const situacao = document.getElementById("situacao");
const progresso = document.getElementById("progresso");

function atualizarRelogio() {
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    contador.innerText =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");

    contador.classList.toggle("atencao",
        tempoRestante <= 30 && tempoRestante > 15);

    contador.classList.toggle("alerta",
        tempoRestante <= 15);

    progresso.style.width =
        (tempoRestante / tempoInicial * 100) + "%";
}

function selecionarTempo(segundos, botao) {
    clearInterval(intervalo);
    intervalo = null;

    tempoInicial = segundos;
    tempoRestante = segundos;

    document.querySelectorAll(".tempo").forEach(b => {
        b.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    situacao.innerText = "Pronto para iniciar";
    atualizarRelogio();
}

function iniciar() {
    if (intervalo !== null || tempoRestante === 0) {
        return;
    }

    fim = Date.now() + tempoRestante * 1000;
    situacao.innerText = "Tempo em andamento";

    intervalo = setInterval(() => {
        tempoRestante = Math.max(
            0,
            Math.ceil((fim - Date.now()) / 1000)
        );

        atualizarRelogio();

        if (tempoRestante === 0) {
            clearInterval(intervalo);
            intervalo = null;
            situacao.innerText = "TEMPO ENCERRADO";
        }
    }, 100);
}

function pausar() {
    if (intervalo === null) {
        return;
    }

    clearInterval(intervalo);
    intervalo = null;
    situacao.innerText = "Tempo pausado";
}

function reiniciar() {
    clearInterval(intervalo);
    intervalo = null;

    tempoRestante = tempoInicial;
    situacao.innerText = "Pronto para iniciar";

    atualizarRelogio();
}

function telaCheia() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}