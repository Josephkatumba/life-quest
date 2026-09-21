const categories = {
    world: {
        name: "🌍 World Explorer",
        description: "Countries, capitals, flags and geography!",
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
                question: "What is the capital of Brazil?",
                answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
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
                question: "Which country is shaped roughly like a boot?",
                answers: ["Italy", "Spain", "Portugal", "Greece"],
                correct: 0
            },
            {
                question: "Which is the largest continent?",
                answers: ["Africa", "Europe", "Asia", "Australia"],
                correct: 2
            },
            {
                question: "Which ocean is the largest?",
                answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
                correct: 2
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
                question: "Which basketball legend is strongly associated with number 23 and the Chicago Bulls?",
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
                    "Wizard Academy",
                    "Magic School"
                ],
                correct: 0
            },
            {
                question: "Which singer is known for the song 'Shake It Off'?",
                answers: [
                    "Taylor Swift",
                    "Rihanna",
                    "Adele",
                    "Lady Gaga"
                ],
                correct: 0
            },
            {
                question: "Which movie features the character Elsa?",
                answers: [
                    "Moana",
                    "Frozen",
                    "Encanto",
                    "Tangled"
                ],
                correct: 1
            },
            {
                question: "Which superhero uses a shield with a star?",
                answers: [
                    "Thor",
                    "Captain America",
                    "Hulk",
                    "Flash"
                ],
                correct: 1
            },
            {
                question: "Which artist is famous for the song 'Single Ladies'?",
                answers: [
                    "Beyoncé",
                    "Ariana Grande",
                    "Katy Perry",
                    "Nicki Minaj"
                ],
                correct: 0
            },
            {
                question: "Which sport does LeBron James play professionally?",
                answers: [
                    "Football",
                    "Baseball",
                    "Basketball",
                    "Hockey"
                ],
                correct: 2
            },
            {
                question: "Which game is known for building with blocks and exploring a pixelated world?",
                answers: [
                    "Minecraft",
                    "FIFA",
                    "Fortnite",
                    "NBA 2K"
                ],
                correct: 0
            },
            {
                question: "Which character is Mickey Mouse's girlfriend?",
                answers: [
                    "Daisy Duck",
                    "Minnie Mouse",
                    "Elsa",
                    "Hello Kitty"
                ],
                correct: 1
            }
        ]
    },

    brain: {
        name: "🧠 Brain Power",
        description: "Logic, science, numbers and general knowledge!",
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
            },
            {
                question: "How many months are in a year?",
                answers: ["10", "11", "12", "13"],
                correct: 2
            },
            {
                question: "Which gas do humans need to breathe?",
                answers: ["Oxygen", "Helium", "Hydrogen", "Neon"],
                correct: 0
            },
            {
                question: "What is the largest planet in our solar system?",
                answers: ["Earth", "Mars", "Jupiter", "Saturn"],
                correct: 2
            },
            {
                question: "What is 12 + 8?",
                answers: ["18", "20", "22", "24"],
                correct: 1
            },
            {
                question: "What is half of 100?",
                answers: ["25", "40", "50", "75"],
                correct: 2
            },
            {
                question: "Which animal is known as the largest land animal?",
                answers: ["Elephant", "Giraffe", "Hippo", "Rhino"],
                correct: 0
            },
            {
                question: "How many colors are traditionally in a rainbow?",
                answers: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "What do bees make?",
                answers: ["Milk", "Honey", "Bread", "Juice"],
                correct: 1
            },
            {
                question: "Which organ pumps blood around the human body?",
                answers: ["Brain", "Lungs", "Heart", "Stomach"],
                correct: 2
            }
        ]
    },

    life: {
        name: "💰 Real Life",
        description: "Everyday decisions and practical skills!",
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
                question: "You receive a message from someone you don't know asking where you live. What should you do?",
                answers: [
                    "Tell them your address",
                    "Send them a photo of your house",
                    "Do not share personal information",
                    "Invite them over"
                ],
                correct: 2
            },
            {
                question: "You have $50 and want something that costs $45. How much will you have left?",
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
            },
            {
                question: "If you don't understand an assignment, what is a good choice?",
                answers: [
                    "Give up immediately",
                    "Ask the teacher for help",
                    "Ignore it forever",
                    "Blame someone else"
                ],
                correct: 1
            },
            {
                question: "Which is generally safer online?",
                answers: [
                    "Sharing your password",
                    "Using strong unique passwords",
                    "Posting your home address",
                    "Meeting strangers alone"
                ],
                correct: 1
            }
        ]
    },

    school: {
        name: "🏫 School Challenge",
        description: "Science, history, English and school knowledge!",
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
                question: "Which planet do humans live on?",
                answers: ["Mars", "Venus", "Earth", "Jupiter"],
                correct: 2
            },
            {
                question: "Which subject focuses on events from the past?",
                answers: ["History", "Chemistry", "Biology", "Algebra"],
                correct: 0
            },
            {
                question: "What is 5 × 5?",
                answers: ["10", "20", "25", "30"],
                correct: 2
            },
            {
                question: "Which instrument is commonly used to measure temperature?",
                answers: ["Ruler", "Thermometer", "Compass", "Scale"],
                correct: 1
            },
            {
                question: "What is the opposite of 'ancient'?",
                answers: ["Old", "Historic", "Modern", "Past"],
                correct: 2
            }
        ]
    }
};

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
   PROFILE
========================= */

function loadProfile() {

    const savedProfile = localStorage.getItem("lifeQuestProfile");

    if (savedProfile) {
        player = JSON.parse(savedProfile);
    }
}


function saveProfile() {

    localStorage.setItem(
        "lifeQuestProfile",
        JSON.stringify(player)
    );
}


function createProfile() {

    const input = document.getElementById("student-name");

    const name = input.value.trim();

    if (!name) {

        input.focus();

        alert("Please enter your name!");

        return;
    }

    player.name = name;

    saveProfile();

    showProfile();

}


/* =========================
   XP & LEVELS
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

    const thresholds = [
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

    const currentLevelXP = thresholds[level - 1];

    const nextLevelXP = thresholds[level];

    const progress =
        ((xp - currentLevelXP) /
        (nextLevelXP - currentLevelXP)) * 100;

    return Math.max(0, Math.min(100, progress));
}


/* =========================
   PROFILE SCREEN
========================= */

function showProfile() {

    const gameContainer =
        document.querySelector(".card");

    const level = getLevel(player.totalXP);

    const rank = getRank(level);

    const progress =
        getLevelProgress(player.totalXP);

    gameContainer.innerHTML = `

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


        <h3>📊 Your Quest Progress</h3>


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


        <div style="margin-top:25px">

            <p>
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

        </div>


        <button onclick="showCategories()">
            🎮 PLAY A QUEST
        </button>

    `;
}


/* =========================
   CATEGORY MENU
========================= */

function showCategories() {

    const gameContainer =
        document.querySelector(".card");

    gameContainer.innerHTML = `

        <h2>🎯 Choose Your Quest</h2>

        <p>
            What adventure are you taking today?
        </p>


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


        <button
            onclick="showProfile()"
            style="margin-top:25px"
        >
            👤 MY PROFILE
        </button>

    `;
}


/* =========================
   START CATEGORY
========================= */

function chooseCategory(category) {

    currentCategory =
        categories[category];

    currentCategory.key =
        category;

    currentQuestion = 0;

    sessionXP = 0;

    showQuestion();
}


/* =========================
   QUESTIONS
========================= */

function showQuestion() {

    const gameContainer =
        document.querySelector(".card");

    const question =
        currentCategory.questions[currentQuestion];


    gameContainer.innerHTML = `

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

            ${question.answers.map(
                (answer, index) => `

                <button
                    onclick="checkAnswer(${index})"
                >
                    ${answer}
                </button>

            `
            ).join("")}

        </div>


        <p class="score">
            ⭐ Session XP: ${sessionXP}
        </p>

    `;
}


/* =========================
   ANSWERS
========================= */

function checkAnswer(answerIndex) {

    const question =
        currentCategory.questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answers button"
        );


    buttons.forEach(button => {

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
            "Fantastic work, " +
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

    const gameContainer =
        document.querySelector(".card");


    const feedbackClass =
        correct
            ? "feedback-correct"
            : "feedback-wrong";


    gameContainer.innerHTML = `

        <div class="feedback ${feedbackClass}">

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
                onclick="nextQuestion()"
            >
                CONTINUE →
            </button>

        </div>

    `;
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
   FINISH QUEST
========================= */

function endGame() {

    const gameContainer =
        document.querySelector(".card");


    const totalQuestions =
        currentCategory.questions.length;


    const correct =
        sessionXP / 100;


    const percentage =
        Math.round(
            (correct /
            totalQuestions) * 100
        );


    let message;


    if (percentage === 100) {

        message =
            "🏆 PERFECT SCORE!";

    } else if (percentage >= 80) {

        message =
            "🔥 AMAZING JOB!";

    } else if (percentage >= 60) {

        message =
            "⭐ GREAT WORK!";

    } else {

        message =
            "🌟 KEEP PRACTICING!";

    }


    const level =
        getLevel(player.totalXP);


    const rank =
        getRank(level);


    gameContainer.innerHTML = `

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
                    ${totalQuestions}
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
                onclick="showCategories()"
            >
                🎮 PLAY ANOTHER QUEST
            </button>


            <button
                onclick="showProfile()"
            >
                👤 VIEW MY PROFILE
            </button>

        </div>

    `;
}


/* =========================
   INITIALIZE
========================= */

loadProfile();


if (player.name) {

    showProfile();

}

function startGame() {
    score = 0;
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

        <p class="question-text">${question.question}</p>

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

    const buttons = document.querySelectorAll(".answers button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (answerIndex === question.correct) {

        score += 100;

        showFeedback(
            true,
            "🎉 CORRECT!",
            "+100 XP",
            "Great job! Keep going!"
        );

    } else {

        showFeedback(
            false,
            "💡 NOT QUITE!",
            "Keep learning!",
            "The correct answer was: " +
            question.answers[question.correct]
        );
    }
}

function showFeedback(correct, title, points, message) {

    const gameContainer = document.querySelector(".card");

    const feedbackClass = correct ? "feedback-correct" : "feedback-wrong";

    gameContainer.innerHTML = `
        <div class="feedback ${feedbackClass}">

            <div class="feedback-icon">
                ${correct ? "🎉" : "💡"}
            </div>

            <h2>${title}</h2>

            <div class="xp-animation">
                ${points}
            </div>

            <p>${message}</p>

            <button onclick="nextQuestion()">
                CONTINUE →
            </button>

        </div>
    `;
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < currentCategory.questions.length) {

        showQuestion();

    } else {

        endGame();
    }
}

function endGame() {

    const gameContainer = document.querySelector(".card");

    const totalQuestions = currentCategory.questions.length;

    const percentage = Math.round(
        (score / (totalQuestions * 100)) * 100
    );

    let message;

    if (percentage === 100) {
        message = "🏆 PERFECT SCORE!";
    } else if (percentage >= 80) {
        message = "🔥 AMAZING JOB!";
    } else if (percentage >= 60) {
        message = "⭐ GREAT WORK!";
    } else {
        message = "🌟 KEEP PRACTICING!";
    }

    gameContainer.innerHTML = `
        <div class="final-result">

            <h2>${message}</h2>

            <p>You completed:</p>

            <h3>${currentCategory.name}</h3>

            <div class="final-xp">
                ⭐ ${score} XP
            </div>

            <p>
                You answered ${score / 100}
                out of ${totalQuestions} correctly.
            </p>

            <button onclick="showCategories()">
                🎮 PLAY ANOTHER QUEST
            </button>

            <button onclick="startGame()">
                🏠 MAIN MENU
            </button>

        </div>
    `;
}
