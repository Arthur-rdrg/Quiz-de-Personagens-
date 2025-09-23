const characters = {
    aang: { name: "Aang", img: "aang.jpg", desc: "Você é pacífico, brincalhão e adora liberdade. Seu espírito é leve e você sempre busca o caminho certo." },
    katara: { name: "Katara", img: "katara.webp", desc: "Você é leal, protetor(a) e sempre cuida das pessoas ao seu redor. A justiça é importante para você." },
    zuko: { name: "Zuko", img: "zuko.webp", desc: "Você é determinado(a) e intenso(a), sempre buscando melhorar e superar o passado. Seu crescimento é sua força." }
};

// Cada pergunta tem 3 opções com pontos para cada personagem
const questions = [
    {
        q: "Qual elemento você mais se identifica?",
        options: [
            { text: "Ar", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Água", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Fogo", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Como você lida com conflitos?",
        options: [
            { text: "Evito e busco paz", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Tento resolver conversando", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Enfrento de frente", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Qual seu maior valor?",
        options: [
            { text: "Liberdade", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Família", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Superação", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "O que você gosta de fazer no tempo livre?",
        options: [
            { text: "Meditar ou brincar", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Ajudar outras pessoas", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Treinar e ficar mais forte", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Qual sua maior fraqueza?",
        options: [
            { text: "Fugir de problemas", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Ser protetor(a) demais", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Raiva e impulsividade", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Qual animal você gostaria de ter?",
        options: [
            { text: "Bisão voador", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Peixe koi", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Dragão", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Qual estação do ano você prefere?",
        options: [
            { text: "Outono", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Inverno", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Verão", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Como você reage à pressão?",
        options: [
            { text: "Mantenho a calma", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Respiro fundo e sigo", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Explodo às vezes", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Que tipo de líder você é?",
        options: [
            { text: "Inspirador", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Cuidadoso", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Exigente", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    },
    {
        q: "Qual seria seu destino?",
        options: [
            { text: "Trazer equilíbrio ao mundo", points: { aang: 3, katara: 1, zuko: 1 } },
            { text: "Proteger quem ama", points: { aang: 1, katara: 3, zuko: 1 } },
            { text: "Encontrar meu próprio caminho", points: { aang: 1, katara: 1, zuko: 3 } }
        ]
    }
];

function loadQuiz() {
    const quizForm = document.getElementById("quizForm");
    questions.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `<p>${index + 1}. ${item.q}</p>`;
        
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");
        
        item.options.forEach((opt, i) => {
            optionsDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${i}" required>
                    ${opt.text}
                </label><br>
            `;
        });

        div.appendChild(optionsDiv);
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.textContent = "Ver Resultado";
    submitBtn.onclick = calculateResult;
    quizForm.appendChild(submitBtn);
}

function calculateResult() {
    let scores = { aang: 0, katara: 0, zuko: 0 };

    questions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const optionIndex = parseInt(selected.value);
            const points = item.options[optionIndex].points;
            scores.aang += points.aang;
            scores.katara += points.katara;
            scores.zuko += points.zuko;
        }
    });

    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    document.getElementById("quizForm").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("characterImage").src = characters[winner].img;
    document.getElementById("characterName").textContent = characters[winner].name;
    document.getElementById("characterDescription").textContent = characters[winner].desc;
}

function restartQuiz() {
    document.getElementById("quizForm").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("quizForm").innerHTML = "";
    loadQuiz();
}

window.onload = loadQuiz;
