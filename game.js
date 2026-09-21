const categories = {
    world: {
        name: "🌍 World Explorer",
        description: "Test your knowledge of countries, capitals and geography!",
        questions: [
            {
                question: "What is the capital of France?",
                answers: ["Paris", "London", "Rome", "Madrid"],
                correct: 0
            },
            {
                question: "What is the capital of Japan?",
                answers: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
                correct: 1
            },
            {
                question: "Which country has a maple leaf on its flag?",
                answers: ["Australia", "Canada", "United States", "Switzerland"],
                correct: 1
            },
            {
                question: "Which country is famous for the pyramids of Giza?",
                answers: ["Egypt", "Mexico", "Greece", "India"],
                correct: 0
            },
            {
                question: "What is the capital of Uganda?",
                answers: ["Nairobi", "Kampala", "Kigali", "Accra"],
                correct: 1
            },
            {
                question: "What is the capital of Kenya?",
                answers: ["Kampala", "Nairobi", "Lagos", "Addis Ababa"],
                correct: 1
            },
            {
                question: "What is the capital of Australia?",
                answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
                correct: 2
            },
            {
                question: "Which country is shaped like a boot?",
                answers: ["Italy", "Spain", "Portugal", "Greece"],
                correct: 0
            }
        ]
    },

    pop: {
        name: "🇺🇸 Pop Culture",
        description: "Movies, music, celebrities, sports and games!",
        questions: [
            {
                question: "Who played Iron Man in the Marvel movies?",
                answers: [
                    "Robert Downey Jr.",
                    "Chris Evans",
                    "Tom Holland",
                    "Chris Hemsworth"
                ],
                correct: 0
            },
            {
                question: "Who is known as the 'King of Pop'?",
                answers: [
                    "Elvis Presley",
                    "Michael Jackson",
                    "Prince",
                    "Bruno Mars"
                ],
                correct: 1
            },
            {
                question: "Who played Jack in the movie Titanic?",
                answers: [
                    "Brad Pitt",
                    "Leonardo DiCaprio",
                    "Tom Cruise",
                    "Johnny Depp"
                ],
                correct: 1
            },
            {
                question: "Which superhero is also known as Bruce Wayne?",
                answers: [
                    "Superman",
                    "Spider-Man",
                    "Batman",
                    "Iron Man"
                ],
                correct: 2
            },
            {
                question: "Which basketball player is strongly associated with the number 23 and the Chicago Bulls?",
                answers: [
                    "LeBron James",
                    "Stephen Curry",
                    "Michael Jordan",
                    "Kobe Bryant"
                ],
                correct: 2
            },
            {
                question: "Which video game features Mario and Luigi?",
                answers: [
                    "Minecraft",
                    "Super Mario",
                    "Fortnite",
                    "Call of Duty"
                ],
                correct: 1
            },
            {
                question: "Who released the song 'Flowers'?",
                answers: [
                    "Miley Cyrus",
                    "Taylor Swift",
                    "Ariana Grande",
                    "Beyoncé"
                ],
                correct: 0
            },
            {
                question: "What is the name of the school in Harry Potter?",
                answers: [
                    "Hogwarts",
                    "Ravenwood",
                    "Wizards Academy",
                    "Magic School"
                ],
                correct: 0
            }
        ]
    },

    brain: {
        name: "🧠 Brain Power",
        description: "Logic, numbers, patterns and general knowledge!",
        questions: [
            {
                question: "What number comes next: 2, 4, 6, 8, ?",
                answers: ["9", "10", "11", "12"],
                correct: 1
            },
            {
                question: "How many days are in a week?",
                answers: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "How many sides does a triangle have?",
                answers: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: ["Earth", "Venus", "Mars", "Jupiter"],
                correct: 2
            },
            {
                question: "How many minutes are in one hour?",
                answers: ["30", "45", "60", "100"],
                correct: 2
            },
            {
                question: "What is 10 × 5?",
                answers: ["15", "50", "100", "25"],
                correct: 1
            }
        ]
    },

    life: {
        name: "💰 Real Life",
        description: "Make smart decisions in everyday situations!",
        questions: [
            {
                question: "You have $20 and need $4 for the bus home. What is the smartest choice?",
                answers: [
                    "Spend all $20 on a video game",
                    "Buy food and save enough for the bus",
                    "Give all your money away",
                    "Spend everything on candy"
                ],
                correct: 1
            },
            {
                question: "Someone online asks for your password in exchange for a free game. What should you do?",
                answers: [
                    "Give them your password",
                    "Give them your friend's password",
                    "Don't share it and tell a trusted adult",
                    "Post your password online"
                ],
                correct: 2
            },
            {
                question: "You disagree with a classmate. What is a good response?",
                answers: [
                    "Yell at them",
                    "Listen and talk calmly",
                    "Insult them",
                    "Start a fight"
                ],
                correct: 1
            }
        ]
    },

    school: {
        name: "🏫 School Challenge",
        description: "A little bit of everything from school!",
        questions: [
            {
                question: "Which subject studies living things?",
                answers: ["Biology", "History", "Geography", "Art"],
                correct: 0
            },
            {
                question: "What gas do humans need to breathe?",
                answers: ["Oxygen", "Helium", "Carbon dioxide", "Hydrogen"],
                correct: 0
            },
            {
                question: "Which continent is the United States in?",
                answers: [
                    "Europe",
                    "North America",
                    "Africa",
                    "Asia"
                ],
                correct: 1
            },
            {
                question: "How many letters are in the English alphabet?",
                answers: ["24", "25", "26", "27"],
                correct: 2
            }
        ]
    }
};

let currentCategory = null;
let currentQuestion = 0;
let score = 0;

function startGame() {
    showCategories();
}

function showCategories() {
    const gameContainer = document.querySelector(".card");

    gameContainer.innerHTML = `
        <h2>🎯 Choose Your Quest</h2>

        <p>Pick a category and test your skills!</p>

        <div class="category-buttons">

            <button onclick="chooseCategory('world')">
                🌍 World Explorer
            </button>

            <button onclick="chooseCategory('pop')">
                🇺🇸 Pop Culture
            </button>

            <button onclick="chooseCategory('brain')">
                🧠 Brain Power
            </button>

            <button onclick="chooseCategory('life')">
                💰 Real Life
            </button>

            <button onclick="chooseCategory('school')">
                🏫 School Challenge
            </button>

        </div>

        <p class="score">⭐ XP: ${score}</p>
    `;
}

function chooseCategory(category) {
    currentCategory = categories[category];
    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    const gameContainer = document.querySelector(".card");
    const question = currentCategory.questions[currentQuestion];

    gameContainer.innerHTML = `
        <p class="category-name">${currentCategory.name}</p>

        <h2>Question ${currentQuestion + 1} of ${currentCategory.questions.length}</h2>

        <p>${question.question}</p>

        <div class="answers">

            ${question.answers.map((answer, index) => `
                <button onclick="checkAnswer(${index})">
                    ${answer}
                </button>
            `).join("")}

        </div>

        <p class="score">⭐ XP: ${score}</p>
    `;
}

function checkAnswer(answerIndex) {

    const question = currentCategory.questions[currentQuestion];

    if (answerIndex === question.correct) {

        score += 100;

        alert("🎉 Correct! +100 XP");

    } else {

        alert(
            "👍 Good try! The correct answer was: " +
            question.answers[question.correct]
        );
    }

    currentQuestion++;

    if (currentQuestion < currentCategory.questions.length) {

        showQuestion();

    } else {

        endGame();
    }
}

function endGame() {

    const gameContainer = document.querySelector(".card");

    let message;

    if (score === currentCategory.questions.length * 100) {
        message = "🏆 PERFECT SCORE!";
    } else if (score >= currentCategory.questions.length * 60) {
        message = "🔥 GREAT JOB!";
    } else {
        message = "🌟 NICE WORK!";
    }

    gameContainer.innerHTML = `
        <h2>${message}</h2>

        <p>You completed:</p>

        <h3>${currentCategory.name}</h3>

        <h2>⭐ ${score} XP</h2>

        <button onclick="showCategories()">
            PLAY ANOTHER QUEST
        </button>

        <button onclick="startGame()">
            MAIN MENU
        </button>
    `;
}
