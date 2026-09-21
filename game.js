const categories = {
    world: {
        name: "🌍 World Explorer",
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
                question: "What is the capital of the United States?",
                answers: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"],
                correct: 2
            },
            {
                question: "What is the capital of Canada?",
                answers: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
                correct: 1
            },
            {
                question: "What is the capital of Australia?",
                answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
                correct: 2
            },
            {
                question: "What is the capital of Germany?",
                answers: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
                correct: 0
            },
            {
                question: "What is the capital of Italy?",
                answers: ["Milan", "Venice", "Rome", "Naples"],
                correct: 2
            },
            {
                question: "Which country has a maple leaf on its flag?",
                answers: ["Australia", "Canada", "Switzerland", "New Zealand"],
                correct: 1
            },
            {
                question: "Which country is famous for the pyramids of Giza?",
                answers: ["Egypt", "Mexico", "Greece", "India"],
                correct: 0
            },
            {
                question: "Which is the largest continent?",
                answers: ["Africa", "Europe", "Asia", "Australia"],
                correct: 2
            }
        ]
    },

    pop: {
        name: "🇺🇸 Pop Culture",
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
                question: "Who is known as the King of Pop?",
                answers: [
                    "Elvis Presley",
                    "Michael Jackson",
                    "Prince",
                    "Bruno Mars"
                ],
                correct: 1
            },
            {
                question: "Who played Jack in Titanic?",
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
                question: "Which basketball legend is associated with number 23 and the Chicago Bulls?",
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
                question: "Which singer released Flowers?",
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
                    "Wizard Academy",
                    "Magic School"
                ],
                correct: 0
            }
        ]
    },

    brain: {
        name: "🧠 Brain Power",
        questions: [
            {
                question: "What number comes next: 2, 4, 6, 8?",
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
            },
            {
                question: "How many months are in a year?",
                answers: ["10", "11", "12", "13"],
                correct: 2
            },
            {
                question: "What is the largest planet in our solar system?",
                answers: ["Earth", "Mars", "Jupiter", "Saturn"],
                correct: 2
            }
        ]
    },

    life: {
        name: "💰 Real Life",
        questions: [
            {
                question: "You have $20 and need $4 for the bus home. What is the smartest choice?",
                answers: [
                    "Spend all $20 on a video game",
                    "Buy food and save enough for the bus",
                    "Spend everything on candy",
                    "Give all your money away"
                ],
                correct: 1
            },
            {
                question: "Someone online asks for your password in exchange for a free game. What should you do?",
                answers: [
                    "Give them your password",
                    "Give them your friend's password",
                    "Don't share it and tell a trusted adult",
                    "Post it online"
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
            },
            {
                question: "You have $50 and buy something for $45. How much do you have left?",
                answers: ["$3", "$5", "$10", "$15"],
                correct: 1
            },
            {
                question: "What should you do before crossing a busy road?",
                answers: [
                    "Run quickly",
                    "Look both ways and cross safely",
                    "Look only at your phone",
                    "Close your eyes"
                ],
                correct: 1
            }
        ]
    },

    school: {
        name: "🏫 School Challenge",
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
            },
            {
                question: "What is H2O commonly called?",
                answers: ["Salt", "Water", "Oxygen", "Hydrogen"],
                correct: 1
            },
            {
                question: "What is 5 × 5?",
                answers: ["10", "20", "25", "30"],
                correct: 2
            }
        ]
    }
};


/* =========================
   GAME STATE
========================= */

let currentCategory = null;
let currentQuestion = 0;
let sessionXP = 0;

let player = {
    name: "",
    totalXP: 0,
    questionsAnswered: 0,
    correctAnswers: 0,

    categoryXP: {
        world: 0,
        pop: 0,
        brain: 0,
        life: 0,
        school: 0
    }
};


/* =========================
   SAVE / LOAD
========================= */

function loadProfile() {

    const saved = localStorage.getItem("lifeQuestProfile");

    if (saved) {
        try {
            player = JSON.parse(saved);
        } catch (error) {
            console.log("Could not load profile.");
        }
    }
}


function saveProfile() {

    localStorage.setItem(
        "lifeQuestProfile",
        JSON.stringify(player)
    );
}


/* =========================
   CREATE PROFILE
========================= */

function createProfile() {

    const input =
        document.getElementById("student-name");

    const name =
        input.value.trim();

    if (!name) {

        input.focus();

        return;
    }

    player.name = name;

    saveProfile();

    showProfile();
}


/* =========================
   LEVEL SYSTEM
========================= */

function getLevel(xp) {

    if (xp >= 10000) return 10;
    if (xp >= 7500) return 9;
    if (xp >= 5500) return 8;
    if (xp >= 4000) return 7;
    if (xp >= 3000) return 6;
    if (xp >= 2000) return 5;
    if (xp >= 1500) return 4;
    if (xp >= 1000) return 3;
    if (xp >= 500) return 2;

    return 1;
}


function getRank(level) {

    if (level >= 10) return "👑 LEGEND";
    if (level >= 8) return "💎 CHAMPION";
    if (level >= 6) return "🏆 ACHIEVER";
    if (level >= 4) return "🚀 CHALLENGER";
    if (level >= 2) return "⭐ ROOKIE";

    return "🌱 EXPLORER";
}


function getLevelProgress(xp) {

    const levels = [
        0,
        500,
        1000,
        1500,
        2000,
        3000,
        4000,
        5500,
        7500,
        10000
    ];

    const level = getLevel(xp);

    if (level >= 10) {
        return 100;
    }

    const current = levels[level - 1];
    const next = levels[level];

    return Math.max(
        0,
        Math.min(
            100,
            ((xp - current) /
                (next - current)) * 100
        )
    );
}


/* =========================
   PROFILE
========================= */

function showProfile() {

    const card =
        document.querySelector(".card");

    const level =
        getLevel(player.totalXP);

    const rank =
        getRank(level);

    const progress =
        getLevelProgress(player.totalXP);


    card.innerHTML = `

        <div class="profile-header">

            <div class="profile-info">

                <div class="profile-name">
                    👋 ${player.name}
                </div>

                <div class="profile-level">
                    Level ${level}
                </div>

            </div>

            <div class="profile-xp">
                ⭐ ${player.totalXP} XP
            </div>

        </div>


        <div class="rank-card">

            <div class="rank-title">
                CURRENT RANK
            </div>

            <div class="rank-name">
                ${rank}
            </div>

        </div>


        <div class="level-section">

            <div class="level-label">

                <span>
                    Level ${level}
                </span>

                <span>
                    ${Math.round(progress)}%
                </span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

        </div>


        <h3>
            📊 Your Quest Progress
        </h3>


        <div class="profile-categories">

            <div class="profile-category">
                <div class="profile-category-title">
                    🌍 World Explorer
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.world} XP
                </div>
            </div>


            <div class="profile-category">
                <div class="profile-category-title">
                    🇺🇸 Pop Culture
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.pop} XP
                </div>
            </div>


            <div class="profile-category">
                <div class="profile-category-title">
                    🧠 Brain Power
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.brain} XP
                </div>
            </div>


            <div class="profile-category">
                <div class="profile-category-title">
                    💰 Real Life
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.life} XP
                </div>
            </div>


            <div class="profile-category">
                <div class="profile-category-title">
                    🏫 School Challenge
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.school} XP
                </div>
            </div>

        </div>


        <p style="margin-top:25px;">
            Questions answered:
            <strong>
                ${player.questionsAnswered}
            </strong>
        </p>


        <p>
            Correct answers:
            <strong>
                ${player.correctAnswers}
            </strong>
        </p>


        <button
            type="button"
            onclick="showCategories()"
        >
            🎮 PLAY A QUEST
        </button>

    `;
}


/* =========================
   CATEGORY MENU
========================= */

function showCategories() {

    const card =
        document.querySelector(".card");


    card.innerHTML = `

        <h2>
            🎯 Choose Your Quest
        </h2>

        <p>
            Pick an adventure and start earning XP!
        </p>


        <div class="category-buttons">

            <button
                type="button"
                data-category="world"
            >
                🌍 World Explorer
            </button>


            <button
                type="button"
                data-category="pop"
            >
                🇺🇸 Pop Culture
            </button>


            <button
                type="button"
                data-category="brain"
            >
                🧠 Brain Power
            </button>


            <button
                type="button"
                data-category="life"
            >
                💰 Real Life
            </button>


            <button
                type="button"
                data-category="school"
            >
                🏫 School Challenge
            </button>

        </div>


        <button
            type="button"
            id="profile-button"
        >
            👤 MY PROFILE
        </button>

    `;


    document
        .querySelectorAll(
            "[data-category]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    chooseCategory(
                        this.dataset.category
                    );

                }
            );

        });


    document
        .getElementById(
            "profile-button"
        )
        .addEventListener(
            "click",
            showProfile
        );
}


/* =========================
   START CATEGORY
========================= */

function chooseCategory(category) {

    if (!categories[category]) {

        console.error(
            "Category does not exist:",
            category
        );

        return;
    }


    currentCategory =
        categories[category];

    currentCategory.key =
        category;

    currentQuestion = 0;

    sessionXP = 0;

    showQuestion();
}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    const card =
        document.querySelector(".card");

    const question =
        currentCategory.questions[
            currentQuestion
        ];


    card.innerHTML = `

        <p class="category-name">
            ${currentCategory.name}
        </p>


        <h2>
            Question
            ${currentQuestion + 1}
            of
            ${currentCategory.questions.length}
        </h2>


        <p class="question-text">
            ${question.question}
        </p>


        <div class="answers">

            ${question.answers
                .map(
                    (answer, index) => `

                    <button
                        type="button"
                        data-answer="${index}"
                    >
                        ${answer}
                    </button>

                `
                )
                .join("")}

        </div>


        <p class="score">
            ⭐ Session XP: ${sessionXP}
        </p>

    `;


    document
        .querySelectorAll(
            "[data-answer]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    checkAnswer(
                        Number(
                            this.dataset.answer
                        )
                    );

                }
            );

        });
}


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(answerIndex) {

    const question =
        currentCategory.questions[
            currentQuestion
        ];


    document
        .querySelectorAll(".answers button")
        .forEach(button => {

            button.disabled = true;

        });


    player.questionsAnswered++;


    if (
        answerIndex ===
        question.correct
    ) {

        const earnedXP = 100;

        sessionXP += earnedXP;

        player.totalXP += earnedXP;

        player.correctAnswers++;

        player.categoryXP[
            currentCategory.key
        ] += earnedXP;


        saveProfile();


        showFeedback(
            true,
            "🎉 CORRECT!",
            "+100 XP",
            "Great job, " +
            player.name +
            "!"
        );

    } else {

        saveProfile();


        showFeedback(
            false,
            "💡 NOT QUITE!",
            "+0 XP",
            "The correct answer was: " +
            question.answers[
                question.correct
            ]
        );
    }
}


/* =========================
   FEEDBACK
========================= */

function showFeedback(
    correct,
    title,
    points,
    message
) {

    const card =
        document.querySelector(".card");


    card.innerHTML = `

        <div class="feedback">

            <div class="feedback-icon">
                ${correct ? "🎉" : "💡"}
            </div>


            <h2>
                ${title}
            </h2>


            <div class="xp-animation">
                ${points}
            </div>


            <p>
                ${message}
            </p>


            <button
                type="button"
                id="continue-button"
            >
                CONTINUE →
            </button>

        </div>

    `;


    document
        .getElementById(
            "continue-button"
        )
        .addEventListener(
            "click",
            nextQuestion
        );
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        currentCategory.questions.length
    ) {

        showQuestion();

    } else {

        endGame();

    }
}


/* =========================
   END GAME
========================= */

function endGame() {

    const card =
        document.querySelector(".card");


    const total =
        currentCategory.questions.length;


    const correct =
        sessionXP / 100;


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    let message =
        "🌟 KEEP PRACTICING!";


    if (percentage === 100) {

        message =
            "🏆 PERFECT SCORE!";

    } else if (percentage >= 80) {

        message =
            "🔥 AMAZING JOB!";

    } else if (percentage >= 60) {

        message =
            "⭐ GREAT WORK!";

    }


    const level =
        getLevel(player.totalXP);


    const rank =
        getRank(level);


    card.innerHTML = `

        <div class="final-result">

            <h2>
                ${message}
            </h2>


            <p>
                Quest complete,
                <strong>
                    ${player.name}
                </strong>!
            </p>


            <h3>
                ${currentCategory.name}
            </h3>


            <div class="final-xp">
                ⭐ +${sessionXP} XP
            </div>


            <p>
                You answered
                <strong>
                    ${correct}
                </strong>
                out of
                <strong>
                    ${total}
                </strong>
                correctly.
            </p>


            <div class="rank-card">

                <div class="rank-title">
                    YOUR CURRENT RANK
                </div>

                <div class="rank-name">
                    ${rank}
                </div>

                <p>
                    Level ${level}
                </p>

            </div>


            <button
                type="button"
                id="another-quest"
            >
                🎮 PLAY ANOTHER QUEST
            </button>


            <button
                type="button"
                id="view-profile"
            >
                👤 VIEW MY PROFILE
            </button>

        </div>

    `;


    document
        .getElementById(
            "another-quest"
        )
        .addEventListener(
            "click",
            showCategories
        );


    document
        .getElementById(
            "view-profile"
        )
        .addEventListener(
            "click",
            showProfile
        );
}


/* =========================
   START
========================= */

loadProfile();


if (player.name) {

    showProfile();

}
