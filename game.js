const challenges = [
    {
        question: "You have $20. You need $4 for the bus home. You are hungry too. What is the best choice?",
        answers: [
            "Buy a $15 video game",
            "Buy food for $12 and save $4 for the bus",
            "Spend all $20 on snacks"
        ],
        correct: 1
    },
    {
        question: "Someone online asks for your password and promises to give you a free game. What should you do?",
        answers: [
            "Give them your password",
            "Send them your friend's password",
            "Do not share it and tell a trusted adult"
        ],
        correct: 2
    },
    {
        question: "You disagree with a classmate. What is a good way to handle the situation?",
        answers: [
            "Yell at them",
            "Talk calmly and listen to their point of view",
            "Immediately walk away and refuse to talk"
        ],
        correct: 1
    }
];

let currentChallenge = 0;
let score = 0;

function startGame() {
    currentChallenge = 0;
    score = 0;
    showChallenge();
}

function showChallenge() {
    const gameContainer = document.querySelector(".card");

    const challenge = challenges[currentChallenge];

    gameContainer.innerHTML = `
        <h2>Challenge ${currentChallenge + 1}</h2>

        <p>${challenge.question}</p>

        <div class="answers">
            ${challenge.answers.map((answer, index) => `
                <button onclick="checkAnswer(${index})">
                    ${answer}
                </button>
            `).join("")}
        </div>

        <p class="score">⭐ XP: ${score}</p>
    `;
}

function checkAnswer(answerIndex) {
    const challenge = challenges[currentChallenge];

    if (answerIndex === challenge.correct) {
        score += 100;
        alert("🎉 Great choice! +100 XP");
    } else {
        alert("👍 Good try! Let's learn from this one.");
    }

    currentChallenge++;

    if (currentChallenge < challenges.length) {
        showChallenge();
    } else {
        endGame();
    }
}

function endGame() {
    const gameContainer = document.querySelector(".card");

    gameContainer.innerHTML = `
        <h2>🏆 Quest Complete!</h2>

        <p>You completed all the challenges.</p>

        <h3>⭐ Your XP: ${score}</h3>

        <button onclick="startGame()">
            PLAY AGAIN
        </button>
    `;
}
