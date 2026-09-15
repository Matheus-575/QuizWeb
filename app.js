let perguntas = [];
let respostas = [];
let indexAtual = 0;

const telaConfig = document.getElementById("screen-config");
const telaQuiz = document.getElementById("screen-quiz");
const telaResult = document.getElementById("screen-result");
const btnIniciar = document.getElementById("btn-iniciar");
const btnInicio = document.getElementById("btn-inicio");
const btnHistorico = document.getElementById("btn-historico");
const btnRetry = document.getElementById("btn-retry");

const inputTema = document.getElementById("tema");
const inputQuant = document.getElementById("quantidade");
const inputDif = document.getElementById("dificuldade");

const quizTema = document.getElementById("quiz-tema");
const qCount = document.getElementById("q-count");
const qTxt = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");

function mostrarTela(tela) {
  telaConfig.classList.add("hidden");
  telaQuiz.classList.add("hidden");
  telaResult.classList.add("hidden");
  tela.classList.remove("hidden");
}

function init() {
  btnIniciar.addEventListener("click", async () => {
    const tema = inputTema.value;
    const quant = inputQuant.value;
    const dif = inputDif.value;
    const resposta = await fetch("/api/gerar-perguntas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tema: tema,
        quantidade: quant,
        dificuldade: dif,
      }),
    });
    const dados = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao gerar perguntas", dados);
      alert(
        "Não foi possível gerar as perguntas. Tente novamente em instantes.",
      );
      return;
    }

    perguntas = dados;
    quizTema.textContent = tema;
    gerarPergunta();
    mostrarTela(telaQuiz);
  });
}
init();

function gerarPergunta() {
  optionsList.innerHTML = "";
  qTxt.textContent = perguntas[indexAtual].pergunta;
  qCount.textContent = `${indexAtual + 1}/${perguntas.length}`;
  document.getElementById('bar-fill').style.width = `${(indexAtual / perguntas.length) * 100}%`
  perguntas[indexAtual].opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opcao.name;
    btn.addEventListener("click", () => selecionar(opcao));
    optionsList.appendChild(btn);
  });
}

function selecionar(opcaoEscolhida) {
  const item = perguntas[indexAtual];

  respostas.push({
    pergunta: item.pergunta,
    respostaEscolhida: opcaoEscolhida.value,
    correta: item.correta_indice,
    opcoes: item.opcoes,
  });

  indexAtual++;

  if (indexAtual < perguntas.length) {
    gerarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  mostrarTela(telaResult);
  let acertos = 0;
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";

  respostas.forEach((r, i) => {
    const acertou = r.respostaEscolhida === r.correta;
    if (acertou) acertos++;

    const alternativaCorreta = r.opcoes.find((o) => o.value === r.correta).name;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${i + 1}. ${r.pergunta}</p>
      <p>${acertou ? "✓ correto" : `✕ incorreto — resposta certa: ${alternativaCorreta}`}</p>
    `;
    reviewList.appendChild(div);
  });

  const percentual = Math.round((acertos / respostas.length) * 100);
  document.getElementById("stamp-pct").textContent = `${percentual}%`;
  document.getElementById("score-fraction").textContent =
    `${acertos}/${respostas.length}`;
}

btnInicio.addEventListener("click", () => {
  mostrarTela(telaConfig);
});

btnHistorico.addEventListener("click", () => {
})

btnRetry.addEventListener("click", () => {
  indexAtual = 0;
  respostas = [];
  gerarPergunta();
  mostrarTela(telaConfig);
});
