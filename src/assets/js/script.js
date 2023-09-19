const dadosAlternativas = [
    {
        pergunta: "Qual a capital da Austrália?",
        opcoes: ["Camberra", "Sydney", "Melbourne", "Queensland"],
        resposta: "Camberra"
    },
    {
        pergunta: "Quem é conhecido como o pai da física moderna?",
        opcoes: ["Aristóteles", "Galileu Galilei", "Isaac Newton", "Nikola Tesla"],
        resposta: "Isaac Newton"
    },
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: ["Marte", "Vênus", "Saturno", "Júpiter"],
        resposta: "Júpiter"
    },
    {
        pergunta: "Qual é o idioma oficial do Brasil?",
        opcoes: ["Espanhol", "Inglês", "Português", "Francês"],
        resposta: "Português"
    },
    {
        pergunta: "Onde estão localizadas as pirâmides?",
        opcoes: ["México", "Índia", "Egito", "Grécia"],
        resposta: "Egito"
    },
    {
        pergunta: "Quem escreveu 'Romeu e Julieta'?",
        opcoes: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Victor Hugo"],
        resposta: "William Shakespeare"
    },
    {
        pergunta: "O que é fotossíntese?",
        opcoes: ["Respiração celular", "Divisão celular", "Síntese de proteínas", "Processo pelo qual plantas transformam luz em energia"],
        resposta: "Processo pelo qual plantas transformam luz em energia"
    },
    {
        pergunta: "Qual é o maior animal terrestre?",
        opcoes: ["Leão", "Girafa", "Elefante Africano", "Rinoceronte"],
        resposta: "Elefante Africano"
    },
    {
        pergunta: "Onde foi disputada a Copa do Mundo de Futebol de 2014?",
        opcoes: ["Alemanha", "Brasil", "África do Sul", "Rússia"],
        resposta: "Brasil"
    },
    {
        pergunta: "Em que país está localizada a cidade de Tóquio?",
        opcoes: ["China", "Coreia do Sul", "Tailândia", "Japão"],
        resposta: "Japão"
    }
];

const contador = document.querySelector(".cont");
const question = document.querySelector(".question");
const alternativas = document.querySelectorAll(".alt");
const btnNext = document.querySelector(".next");

let contNum = 0;
let acertos = 0;
let erros = 0;

embarallharArray(dadosAlternativas);
embarallharOpcoes();
updateScreen();

function embarallharArray(array) {
    let currentIndex = array.length;
    let randomIndex = null;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}

function embarallharOpcoes() {
    dadosAlternativas.forEach(question => {
        question.opcoes = embarallharArray(question.opcoes);
    });
}

alternativas.forEach(currentItem => {
    currentItem.addEventListener("click", (e) => {
        alternativas.forEach(el => {
            el.setAttribute("data-clicked", "false");
        });

        currentItem.setAttribute("data-clicked", "true");
        verificaEl();
    });
});

btnNext.addEventListener("click", (e) => {
    let tagValue = null;

    alternativas.forEach(currentItem => {
        if (currentItem.getAttribute("data-clicked") === "true") {
            tagValue = currentItem.querySelector("span").textContent;
        }
    });

    if (tagValue && tagValue === dadosAlternativas[contNum - 1].resposta) {
        acertos++;
    } else {
        erros++;
    }

    updateScreen();
});

function updateScreen() {
    if (contNum >= dadosAlternativas.length) {
        let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
            backdrop: 'static',
            keyboard: false
        });

        contNum--;
        myModal.show();
        prepareModal();
    }

    alternativas.forEach(el => {
        el.setAttribute("data-clicked", "false");
    });

    verificaEl();
    contador.innerText = `${contNum + 1}`;
    question.innerText = dadosAlternativas[contNum].pergunta;

    alternativas.forEach((currentItem, index) => {
        currentItem.querySelector("span").innerText = dadosAlternativas[contNum].opcoes[index];
    });

    contNum++;
}

function verificaEl() {
    let hasClickedElement = false;

    alternativas.forEach(currentItem => {
        if (currentItem.getAttribute("data-clicked") === "true") {
            hasClickedElement = true;
        }
    });

    if (hasClickedElement) {
        btnNext.classList.remove("disabled");
    } else {
        btnNext.classList.add("disabled");
    }
}

function prepareModal() {
    document.querySelector(".acert").innerText = `${acertos}`;
    document.querySelector(".err").innerText = `${erros}`;

    setTimeout(function () {
        location.reload();
    }, 5000);
}