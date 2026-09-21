// ==========================================
// LIFE QUEST V2
// ==========================================

// ------------------------------
// QUESTION BANK
// ------------------------------

const categories = {

    world: {
        name: "🌍 World Explorer",
        questions: [

            {
                question: "What is the capital city of France?",
                answers: ["Paris", "London", "Rome", "Madrid"],
                correct: 0,
                difficulty: "easy",
                explanation: "Paris is the capital and largest city of France."
            },

            {
                question: "Which country is famous for the Great Wall?",
                answers: ["Japan", "China", "India", "Thailand"],
                correct: 1,
                difficulty: "easy",
                explanation: "The Great Wall is one of China's most famous landmarks."
            },

            {
                question: "What is the largest continent?",
                answers: ["Africa", "Europe", "Asia", "North America"],
                correct: 2,
                difficulty: "easy",
                explanation: "Asia is the world's largest continent by both area and population."
            },

            {
                question: "Which ocean is the largest?",
                answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3,
                difficulty: "easy",
                explanation: "The Pacific Ocean is the largest ocean on Earth."
            },

            {
                question: "Which country is shaped like a boot?",
                answers: ["Italy", "Spain", "Greece", "Portugal"],
                correct: 0,
                difficulty: "easy",
                explanation: "Italy is often described as looking like a boot."
            },

            {
                question: "What is the capital of Japan?",
                answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
                correct: 1,
                difficulty: "easy",
                explanation: "Tokyo is the capital of Japan."
            },

            {
                question: "Which continent is Egypt located in?",
                answers: ["Asia", "Europe", "Africa", "South America"],
                correct: 2,
                difficulty: "easy",
                explanation: "Egypt is primarily located in northeastern Africa."
            },

            {
                question: "What is the largest country by land area?",
                answers: ["Canada", "China", "United States", "Russia"],
                correct: 3,
                difficulty: "medium",
                explanation: "Russia is the world's largest country by land area."
            },

            {
                question: "Which country is home to the city of Sydney?",
                answers: ["Australia", "New Zealand", "Canada", "South Africa"],
                correct: 0,
                difficulty: "easy",
                explanation: "Sydney is one of Australia's largest cities."
            },

            {
                question: "Which African country has the famous Serengeti?",
                answers: ["Kenya", "Tanzania", "Uganda", "Ghana"],
                correct: 1,
                difficulty: "medium",
                explanation: "The Serengeti ecosystem is primarily in Tanzania."
            },

            {
                question: "What is the capital of Uganda?",
                answers: ["Entebbe", "Jinja", "Kampala", "Mbarara"],
                correct: 2,
                difficulty: "easy",
                explanation: "Kampala is the capital city of Uganda."
            },

            {
                question: "Which country has the city of Rio de Janeiro?",
                answers: ["Argentina", "Brazil", "Chile", "Colombia"],
                correct: 1,
                difficulty: "easy",
                explanation: "Rio de Janeiro is a major city in Brazil."
            }

        ]
    },

    pop: {
        name: "🇺🇸 Pop Culture",
        questions: [

            {
                question: "Which superhero is known as the Dark Knight?",
                answers: ["Superman", "Batman", "Iron Man", "Spider-Man"],
                correct: 1,
                difficulty: "easy",
                explanation: "Batman is commonly known as the Dark Knight."
            },

            {
                question: "Which movie features the character Simba?",
                answers: ["Frozen", "Moana", "The Lion King", "Toy Story"],
                correct: 2,
                difficulty: "easy",
                explanation: "Simba is the main character in Disney's The Lion King."
            },

            {
                question: "Which instrument has black and white keys?",
                answers: ["Guitar", "Piano", "Trumpet", "Drum"],
                correct: 1,
                difficulty: "easy",
                explanation: "A piano keyboard has black and white keys."
            },

            {
                question: "Which superhero can climb walls?",
                answers: ["Hulk", "Thor", "Spider-Man", "Batman"],
                correct: 2,
                difficulty: "easy",
                explanation: "Spider-Man is famous for climbing walls and swinging between buildings."
            },

            {
                question: "Which game series features Mario?",
                answers: ["Minecraft", "Super Mario", "Fortnite", "Halo"],
                correct: 1,
                difficulty: "easy",
                explanation: "Mario is the famous character from Nintendo's Super Mario series."
            },

            {
                question: "What color is traditionally associated with Pikachu?",
                answers: ["Blue", "Green", "Yellow", "Purple"],
                correct: 2,
                difficulty: "easy",
                explanation: "Pikachu is famously yellow."
            },

            {
                question: "Which fictional school does Harry Potter attend?",
                answers: ["Hogwarts", "Ravenclaw", "Wakanda", "Nevermore"],
                correct: 0,
                difficulty: "easy",
                explanation: "Harry Potter attends Hogwarts School of Witchcraft and Wizardry."
            },

            {
                question: "Which film series includes the character Buzz Lightyear?",
                answers: ["Toy Story", "Cars", "Shrek", "Avatar"],
                correct: 0,
                difficulty: "easy",
                explanation: "Buzz Lightyear is one of the main characters in Toy Story."
            },

            {
                question: "Which social media platform is known for short-form videos?",
                answers: ["TikTok", "Wikipedia", "Google Maps", "Gmail"],
                correct: 0,
                difficulty: "easy",
                explanation: "TikTok became widely known for short-form video content."
            },

            {
                question: "Which fictional country is Black Panther associated with?",
                answers: ["Wakanda", "Atlantis", "Gotham", "Metropolis"],
                correct: 0,
                difficulty: "medium",
                explanation: "Black Panther is the superhero and king associated with Wakanda."
            }

        ]
    },

    brain: {
        name: "🧠 Brain Power",
        questions: [

            {
                question: "What is 12 × 5?",
                answers: ["50", "60", "70", "80"],
                correct: 1,
                difficulty: "easy",
                explanation: "12 multiplied by 5 equals 60."
            },

            {
                question: "What planet is closest to the Sun?",
                answers: ["Venus", "Earth", "Mercury", "Mars"],
                correct: 2,
                difficulty: "easy",
                explanation: "Mercury is the planet closest to the Sun."
            },

            {
                question: "How many sides does a triangle have?",
                answers: ["2", "3", "4", "5"],
                correct: 1,
                difficulty: "easy",
                explanation: "A triangle has three sides."
            },

            {
                question: "What gas do humans need to breathe?",
                answers: ["Oxygen", "Helium", "Carbon dioxide", "Hydrogen"],
                correct: 0,
                difficulty: "easy",
                explanation: "Humans need oxygen for cellular respiration."
            },

            {
                question: "What is 100 divided by 4?",
                answers: ["20", "25", "30", "40"],
                correct: 1,
                difficulty: "easy",
                explanation: "100 ÷ 4 = 25."
            },

            {
                question: "Which organ pumps blood around the body?",
                answers: ["Brain", "Lungs", "Heart", "Kidney"],
                correct: 2,
                difficulty: "easy",
                explanation: "The heart pumps blood throughout the body."
            },

            {
                question: "What is the freezing point of water in Celsius?",
                answers: ["0°C", "10°C", "32°C", "100°C"],
                correct: 0,
                difficulty: "easy",
                explanation: "Water freezes at 0°C under standard conditions."
            },

            {
                question: "What is 15% of 100?",
                answers: ["5", "10", "15", "20"],
                correct: 2,
                difficulty: "easy",
                explanation: "15% of 100 is 15."
            },

            {
                question: "Which force keeps us on the ground?",
                answers: ["Magnetism", "Gravity", "Friction", "Electricity"],
                correct: 1,
                difficulty: "easy",
                explanation: "Gravity pulls objects toward Earth."
            },

            {
                question: "If a pattern is 2, 4, 6, 8, what comes next?",
                answers: ["9", "10", "12", "14"],
                correct: 1,
                difficulty: "easy",
                explanation: "The pattern increases by 2 each time."
            },

            {
                question: "Which part of a plant usually absorbs water from the soil?",
                answers: ["Flower", "Leaf", "Root", "Fruit"],
                correct: 2,
                difficulty: "easy",
                explanation: "Roots absorb water and minerals from the soil."
            },

            {
                question: "What is the square root of 64?",
                answers: ["6", "7", "8", "9"],
                correct: 2,
                difficulty: "medium",
                explanation: "8 × 8 = 64."
            }

        ]
    },

    life: {
        name: "💰 Real Life",
        questions: [

            {
                question: "You find a wallet at school. What should you do?",
                answers: [
                    "Keep the money",
                    "Give it to a teacher or trusted adult",
                    "Throw it away",
                    "Hide it"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Giving lost property to a trusted adult gives the owner the best chance of getting it back."
            },

            {
                question: "You receive $100. Which is generally a smart financial habit?",
                answers: [
                    "Spend everything immediately",
                    "Save part of it",
                    "Give it all away",
                    "Buy something you don't need"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Saving part of your money can help you prepare for future needs."
            },

            {
                question: "Someone online asks for your password. What should you do?",
                answers: [
                    "Send it",
                    "Post it publicly",
                    "Keep it private",
                    "Ask them for their password first"
                ],
                correct: 2,
                difficulty: "easy",
                explanation: "Passwords should be kept private."
            },

            {
                question: "You are running late for school. What should you do?",
                answers: [
                    "Ignore it",
                    "Tell a trusted adult or school staff member",
                    "Skip school forever",
                    "Blame another student"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Communicating honestly helps adults understand what happened and support you."
            },

            {
                question: "Which is usually a need rather than a want?",
                answers: [
                    "Food",
                    "Video game",
                    "Designer shoes",
                    "New headphones"
                ],
                correct: 0,
                difficulty: "easy",
                explanation: "Food is a basic need."
            },

            {
                question: "What should you do before crossing a road?",
                answers: [
                    "Run without looking",
                    "Look for traffic and use a safe crossing",
                    "Use your phone",
                    "Close your eyes"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Checking for traffic and using a safe crossing helps reduce risk."
            },

            {
                question: "What does a budget help you do?",
                answers: [
                    "Track and plan your money",
                    "Make unlimited money",
                    "Avoid all bills",
                    "Predict the future"
                ],
                correct: 0,
                difficulty: "medium",
                explanation: "A budget helps you plan how money will be earned, spent, and saved."
            },

            {
                question: "Someone makes you uncomfortable online. What can you do?",
                answers: [
                    "Keep talking to them",
                    "Share your address",
                    "Block/report them and tell a trusted adult",
                    "Meet them alone"
                ],
                correct: 2,
                difficulty: "easy",
                explanation: "Blocking/reporting and telling a trusted adult can help keep you safe."
            },

            {
                question: "What is an emergency phone number in the United States?",
                answers: ["211", "311", "911", "999"],
                correct: 2,
                difficulty: "easy",
                explanation: "911 is the emergency number commonly used in the United States."
            },

            {
                question: "Why is it useful to compare prices before buying something?",
                answers: [
                    "It can help you find better value",
                    "It guarantees free products",
                    "It makes products cheaper automatically",
                    "It avoids paying taxes"
                ],
                correct: 0,
                difficulty: "medium",
                explanation: "Comparing prices can help you make informed spending decisions."
            }

        ]
    },

    school: {
        name: "🏫 School Challenge",
        questions: [

            {
                question: "Who was the first president of the United States?",
                answers: [
                    "Abraham Lincoln",
                    "George Washington",
                    "Thomas Jefferson",
                    "Barack Obama"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "George Washington was the first U.S. president."
            },

            {
                question: "How many states are in the United States?",
                answers: ["48", "49", "50", "52"],
                correct: 2,
                difficulty: "easy",
                explanation: "The United States has 50 states."
            },

            {
                question: "What language is primarily spoken in Brazil?",
                answers: ["Spanish", "Portuguese", "French", "English"],
                correct: 1,
                difficulty: "easy",
                explanation: "Portuguese is the official language of Brazil."
            },

            {
                question: "Which subject studies living organisms?",
                answers: ["Biology", "Geometry", "History", "Economics"],
                correct: 0,
                difficulty: "easy",
                explanation: "Biology is the study of living organisms."
            },

            {
                question: "What is the opposite of 'ancient'?",
                answers: ["Old", "Historic", "Modern", "Past"],
                correct: 2,
                difficulty: "easy",
                explanation: "Modern means relating to the present or recent times."
            },

            {
                question: "Which number is a prime number?",
                answers: ["4", "6", "9", "11"],
                correct: 3,
                difficulty: "medium",
                explanation: "11 can only be divided evenly by 1 and itself."
            },

            {
                question: "What is the main purpose of the U.S. Constitution?",
                answers: [
                    "To establish the framework of government",
                    "To list every school",
                    "To create weather forecasts",
                    "To explain sports rules"
                ],
                correct: 0,
                difficulty: "medium",
                explanation: "The Constitution establishes the framework and powers of the U.S. government."
            },

            {
                question: "Which punctuation mark ends most questions?",
                answers: [".", ",", "?", "!"],
                correct: 2,
                difficulty: "easy",
                explanation: "A question mark is normally used at the end of a question."
            },

            {
                question: "What is 9 × 9?",
                answers: ["72", "81", "90", "99"],
                correct: 1,
                difficulty: "easy",
                explanation: "9 × 9 = 81."
            },

            {
                question: "Which branch of science studies matter and energy?",
                answers: ["Physics", "Literature", "History", "Geography"],
                correct: 0,
                difficulty: "medium",
                explanation: "Physics studies matter, energy, motion, forces, and their interactions."
            }

        ]
    },

    sports: {
        name: "⚽ Sports Arena",
        questions: [

            {
                question: "How many players from one team are on the field in soccer?",
                answers: ["7", "9", "11", "13"],
                correct: 2,
                difficulty: "easy",
                explanation: "A soccer team has 11 players on the field during normal play."
            },

            {
                question: "How many points is a touchdown worth in American football before the extra point?",
                answers: ["3", "6", "7", "10"],
                correct: 1,
                difficulty: "easy",
                explanation: "A touchdown is worth 6 points before any extra-point attempt."
            },

            {
                question: "How many players from one basketball team are on the court?",
                answers: ["4", "5", "6", "7"],
                correct: 1,
                difficulty: "easy",
                explanation: "Five players from each team are normally on the basketball court."
            },

            {
                question: "Which sport uses a racket and a shuttlecock?",
                answers: ["Tennis", "Badminton", "Baseball", "Hockey"],
                correct: 1,
                difficulty: "easy",
                explanation: "Badminton is played with rackets and a shuttlecock."
            },

            {
                question: "How many bases are there on a baseball diamond?",
                answers: ["3", "4", "5", "6"],
                correct: 1,
                difficulty: "easy",
                explanation: "Baseball has four bases: first, second, third, and home plate."
            },

            {
                question: "Which sport is played at Wimbledon?",
                answers: ["Tennis", "Golf", "Soccer", "Swimming"],
                correct: 0,
                difficulty: "easy",
                explanation: "Wimbledon is one of tennis's four Grand Slam tournaments."
            },

            {
                question: "What sport uses a puck?",
                answers: ["Basketball", "Ice hockey", "Tennis", "Golf"],
                correct: 1,
                difficulty: "easy",
                explanation: "Ice hockey is played with a puck."
            },

            {
                question: "Which country is strongly associated with the sport of sumo?",
                answers: ["Japan", "Brazil", "Canada", "France"],
                correct: 0,
                difficulty: "easy",
                explanation: "Sumo is a traditional Japanese sport."
            },

            {
                question: "What color card usually means a player is sent off in soccer?",
                answers: ["Blue", "Green", "Yellow", "Red"],
                correct: 3,
                difficulty: "easy",
                explanation: "A red card means the player is sent off."
            },

            {
                question: "How many rings are on the Olympic symbol?",
                answers: ["4", "5", "6", "7"],
                correct: 1,
                difficulty: "easy",
                explanation: "The Olympic symbol contains five interlocking rings."
            },

            {
                question: "Which sport is associated with the NBA?",
                answers: ["Basketball", "Baseball", "Football", "Hockey"],
                correct: 0,
                difficulty: "easy",
                explanation: "The NBA is the National Basketball Association."
            },

            {
                question: "In golf, what is the goal?",
                answers: [
                    "Use the most strokes",
                    "Complete the course in as few strokes as possible",
                    "Hit the ball the highest",
                    "Run the fastest"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Golf generally rewards completing the course using fewer strokes."
            }

        ]
    }
};


// ==========================================
// PLAYER DATA
// ==========================================

let player = {
    name: "",
    xp: 0,
    level: 1,
    questionsAnswered: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    questsCompleted: 0,

    categoryXP: {
        world: 0,
        pop: 0,
        brain: 0,
        life: 0,
        school: 0,
        sports: 0
    },

    achievements: []
};


// ==========================================
// GAME STATE
// ==========================================

let currentCategory = "";
let currentQuestion = null;
let currentQuestionIndex = 0;
let questScore = 0;
let questCorrect = 0;
let questQuestions = [];

let currentQuestMode = "rookie";

const questModes = {

    rookie: {
        name: "🟢 ROOKIE QUEST",
        description: "5 easy questions",
        questions: 5,
        xp: 100,
        className: "rookie"
    },

    challenge: {
        name: "🟡 CHALLENGE QUEST",
        description: "10 mixed-difficulty questions",
        questions: 10,
        xp: 150,
        className: "challenge"
    },

    championship: {
        name: "🔴 CHAMPIONSHIP",
        description: "15 tough mixed questions",
        questions: 15,
        xp: 200,
        className: "championship"
    }

};


// ==========================================
// ACHIEVEMENTS
// ==========================================

const achievements = {

    first_steps: {
        name: "🌱 FIRST STEPS",
        description: "Answer your first question."
    },

    sharp_shooter: {
        name: "🎯 SHARP SHOOTER",
        description: "Get 5 correct answers in a row."
    },

    on_fire: {
        name: "🔥 ON FIRE",
        description: "Get 10 correct answers in a row."
    },

    world_traveler: {
        name: "🌍 WORLD TRAVELER",
        description: "Complete a World Explorer quest."
    },

    life_ready: {
        name: "💰 LIFE READY",
        description: "Complete a Real Life quest."
    },

    brainiac: {
        name: "🧠 BRAINIAC",
        description: "Earn 1,000 Brain Power XP."
    },

    quest_master: {
        name: "🏆 QUEST MASTER",
        description: "Complete 10 quests."
    },

    legend: {
        name: "👑 LEGEND",
        description: "Reach Level 10."
    }
};


// ==========================================
// SAVE / LOAD
// ==========================================

function savePlayer() {

    localStorage.setItem(
        "lifeQuestPlayer",
        JSON.stringify(player)
    );
}


function loadProfile() {

    const saved = localStorage.getItem("lifeQuestPlayer");

    if (saved) {

        try {

            player = JSON.parse(saved);

            // Safety for older saved profiles
            player.categoryXP = player.categoryXP || {};

            player.categoryXP.world = player.categoryXP.world || 0;
            player.categoryXP.pop = player.categoryXP.pop || 0;
            player.categoryXP.brain = player.categoryXP.brain || 0;
            player.categoryXP.life = player.categoryXP.life || 0;
            player.categoryXP.school = player.categoryXP.school || 0;
            player.categoryXP.sports = player.categoryXP.sports || 0;

            player.achievements = player.achievements || [];

        } catch (error) {

            console.error("Could not load profile:", error);

        }

    }
}


// ==========================================
// LEVEL SYSTEM
// ==========================================

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


function getLevelProgress(xp, level) {

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

    if (level >= 10) return 100;

    const start = levels[level - 1];
    const end = levels[level];

    return Math.min(
        100,
        Math.round(((xp - start) / (end - start)) * 100)
    );
}


// ==========================================
// PROFILE CREATION
// ==========================================

function createProfile() {

    const input = document.getElementById("student-name");

    if (!input) return;

    const name = input.value.trim();

    if (!name) {

        input.style.borderColor = "#ef4444";

        return;
    }

    player.name = name;

    savePlayer();

    showProfile();
}


// ==========================================
// PROFILE SCREEN
// ==========================================

function showProfile() {

    const card = document.getElementById("game-card");

    const level = getLevel(player.xp);

    player.level = level;

    const rank = getRank(level);

    const progress = getLevelProgress(player.xp, level);

    card.innerHTML = `

        <div class="profile-header">

            <div class="profile-info">

                <div class="profile-name">
                    👋 ${escapeHTML(player.name)}
                </div>

                <div class="profile-level">
                    Level ${level}
                </div>

            </div>

            <div class="profile-xp">
                ${player.xp} XP
            </div>

        </div>

        <div class="level-section">

            <div class="level-label">

                <span>Level ${level}</span>

                <span>${progress}%</span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

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

        <h3>📊 Your Progress</h3>

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

            <div class="profile-category">
                <div class="profile-category-title">
                    ⚽ Sports Arena
                </div>
                <div class="profile-category-xp">
                    ${player.categoryXP.sports} XP
                </div>
            </div>

        </div>

        <p class="score">
            Questions: ${player.questionsAnswered}
            |
            Correct: ${player.correctAnswers}
            |
            Best Streak: ${player.bestStreak}
        </p>

        <br>

        <button id="play-quest">
            🚀 PLAY A QUEST
        </button>

        <button id="achievements-button">
            🏆 ACHIEVEMENTS
        </button>

    `;

    document
        .getElementById("play-quest")
        .addEventListener("click", showCategories);

    document
        .getElementById("achievements-button")
        .addEventListener("click", showAchievements);
}


// ==========================================
// CATEGORY SCREEN
// ==========================================

function showCategories() {

    const card = document.getElementById("game-card");

    const level = getLevel(player.xp);
    const rank = getRank(level);
    const progress = getLevelProgress(player.xp, level);

    card.innerHTML = `

        <div class="quest-map-header">

            <div class="map-title">
                🗺️ YOUR QUEST WORLD
            </div>

            <div class="map-player">
                <strong>${escapeHTML(player.name)}</strong>
                <span>Level ${level} • ${rank}</span>
            </div>

            <div class="map-xp">
                ⭐ ${player.xp} XP
            </div>

            <div class="progress-bar map-progress">

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

        </div>


        <p class="map-instruction">
            Choose a world and begin your adventure!
        </p>


        <div class="quest-map">

            ${Object.keys(categories).map(key => {

                const category = categories[key];

                return `

                    <button
                        class="quest-world world-${key}"
                        data-category="${key}"
                    >

                        <div class="world-icon">
                            ${category.name.split(" ")[0]}
                        </div>

                        <div class="world-name">
                            ${category.name.substring(
                                category.name.indexOf(" ") + 1
                            )}
                        </div>

                        <div class="world-xp">
                            ⭐ ${player.categoryXP[key]} XP
                        </div>

                        <div class="world-action">
                            ENTER QUEST →
                        </div>

                    </button>

                `;

            }).join("")}

        </div>


        <button id="back-profile">
            👤 BACK TO PROFILE
        </button>

    `;


    document
        .querySelectorAll("[data-category]")
        .forEach(button => {

            button.addEventListener("click", function () {

                chooseCategory(
                    this.dataset.category
                );

            });

        });


    document
        .getElementById("back-profile")
        .addEventListener(
            "click",
            showProfile
        );
}


// ==========================================
// START QUEST
// ==========================================

function chooseCategory(category) {

    currentCategory = category;

    showQuestModes();
}

    currentCategory = category;

    questScore = 0;
    questCorrect = 0;
    currentQuestionIndex = 0;

    questQuestions = shuffle(
        [...categories[category].questions]
    );

    showQuestion();
}
function showQuestModes() {

    const card = document.getElementById("game-card");

    const categoryName =
        categories[currentCategory].name;

    card.innerHTML = `

        <div class="quest-mode-header">

            <div class="quest-mode-icon">
                ${categoryName.split(" ")[0]}
            </div>

            <h2>
                ${categoryName}
            </h2>

            <p>
                Choose your quest!
            </p>

        </div>


        <div class="quest-modes">

            <button
                class="quest-mode rookie-mode"
                data-mode="rookie"
            >

                <div class="mode-icon">
                    🟢
                </div>

                <div class="mode-content">

                    <strong>
                        ROOKIE QUEST
                    </strong>

                    <span>
                        5 easy questions
                    </span>

                    <span>
                        ⭐ Up to 500 XP
                    </span>

                </div>

                <div class="mode-arrow">
                    →
                </div>

            </button>


            <button
                class="quest-mode challenge-mode"
                data-mode="challenge"
            >

                <div class="mode-icon">
                    🟡
                </div>

                <div class="mode-content">

                    <strong>
                        CHALLENGE QUEST
                    </strong>

                    <span>
                        10 mixed questions
                    </span>

                    <span>
                        ⭐ Up to 1,500 XP
                    </span>

                </div>

                <div class="mode-arrow">
                    →
                </div>

            </button>


            <button
                class="quest-mode championship-mode"
                data-mode="championship"
            >

                <div class="mode-icon">
                    🔴
                </div>

                <div class="mode-content">

                    <strong>
                        CHAMPIONSHIP
                    </strong>

                    <span>
                        15 challenging questions
                    </span>

                    <span>
                        ⭐ Up to 3,000 XP
                    </span>

                </div>

                <div class="mode-arrow">
                    →
                </div>

            </button>

        </div>


        <button id="back-to-map">
            🗺️ BACK TO MAP
        </button>

    `;


    document
        .querySelectorAll("[data-mode]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    startQuestMode(
                        this.dataset.mode
                    );

                }
            );

        });


    document
        .getElementById("back-to-map")
        .addEventListener(
            "click",
            showCategories
        );
}

// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const card = document.getElementById("game-card");

    if (currentQuestionIndex >= questQuestions.length) {

        endGame();

        return;
    }

    currentQuestion =
        questQuestions[currentQuestionIndex];

    card.innerHTML = `

        <p class="category-name">
            ${categories[currentCategory].name}
        </p>

        <p>
            Question ${currentQuestionIndex + 1}
            of ${questQuestions.length}
        </p>

        <h2 class="question-text">
            ${currentQuestion.question}
        </h2>

        <div class="answers">

            ${currentQuestion.answers.map(
                (answer, index) => `

                <button data-answer="${index}">
                    ${answer}
                </button>

            `
            ).join("")}

        </div>

        <p class="score">
            Quest XP: ${questScore}
        </p>

    `;

    document
        .querySelectorAll("[data-answer]")
        .forEach(button => {

            button.addEventListener("click", function () {

                checkAnswer(
                    Number(this.dataset.answer)
                );

            });

        });
}
function startQuestMode(mode) {

    currentQuestMode = mode;

    const settings =
        questModes[mode];

    questScore = 0;
    questCorrect = 0;
    currentQuestionIndex = 0;


    const allQuestions =
        [...categories[currentCategory].questions];


    let selectedQuestions = [];


    if (mode === "rookie") {

        selectedQuestions =
            allQuestions
                .filter(q => q.difficulty === "easy");

    }


    else if (mode === "challenge") {

        selectedQuestions =
            allQuestions
                .filter(q =>
                    q.difficulty === "easy" ||
                    q.difficulty === "medium"
                );

    }


    else {

        selectedQuestions =
            [...allQuestions];

    }


    selectedQuestions =
        shuffle(selectedQuestions);


    questQuestions =
        selectedQuestions.slice(
            0,
            Math.min(
                settings.questions,
                selectedQuestions.length
            )
        );


    showQuestion();
}

// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(selected) {

    const buttons =
        document.querySelectorAll("[data-answer]");

    buttons.forEach(button => {

        button.disabled = true;

    });

    const correct =
        selected === currentQuestion.correct;

    player.questionsAnswered++;

    if (correct) {

        player.correctAnswers++;

        player.currentStreak++;

        if (
            player.currentStreak >
            player.bestStreak
        ) {

            player.bestStreak =
                player.currentStreak;

        }

        const xp =
    getQuestionXP(currentQuestion);

        player.xp += xp;

        player.categoryXP[currentCategory] += xp;

        questScore += xp;

        questCorrect++;

    } else {

        player.currentStreak = 0;

    }

    player.level = getLevel(player.xp);

    savePlayer();

    checkAchievements();

    showFeedback(correct);
}
function getQuestionXP(question) {

    if (
        currentQuestMode === "championship"
    ) {

        if (question.difficulty === "medium") {
            return 200;
        }

        if (question.difficulty === "easy") {
            return 150;
        }

        return 250;
    }


    if (
        currentQuestMode === "challenge"
    ) {

        if (question.difficulty === "medium") {
            return 150;
        }

        return 100;
    }


    return 100;
}

// ==========================================
// FEEDBACK
// ==========================================

function showFeedback(correct) {

    const card = document.getElementById("game-card");

    if (correct) {

        card.innerHTML = `

            <div class="feedback-correct">

                <div class="feedback-icon">
                    🎉
                </div>

                <h2>
                    CORRECT!
                </h2>

                <div class="xp-animation">
    +${getQuestionXP(currentQuestion)} XP
</div>

                <p>
                    ${currentQuestion.explanation}
                </p>

                <button id="continue-button">
                    ➡️ CONTINUE
                </button>

            </div>

        `;

    } else {

        card.innerHTML = `

            <div class="feedback-wrong">

                <div class="feedback-icon">
                    💡
                </div>

                <h2>
                    NOT QUITE!
                </h2>

                <p>
                    The correct answer was:
                </p>

                <h3>
                    ${currentQuestion.answers[currentQuestion.correct]}
                </h3>

                <p>
                    ${currentQuestion.explanation}
                </p>

                <button id="continue-button">
                    ➡️ CONTINUE
                </button>

            </div>

        `;

    }

    document
        .getElementById("continue-button")
        .addEventListener(
            "click",
            nextQuestion
        );
}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    currentQuestionIndex++;

    showQuestion();
}


// ==========================================
// END QUEST
// ==========================================

function endGame() {

    player.questsCompleted++;

    checkAchievements();

    savePlayer();

    const card =
        document.getElementById("game-card");

    const percentage =
        Math.round(
            (questCorrect / questQuestions.length) * 100
        );

    card.innerHTML = `

        <div class="final-result">

            <div class="feedback-icon">
                🏆
            </div>

            <h2>
                QUEST COMPLETE!
            </h2>

            <p>
                Great work, ${escapeHTML(player.name)}!
            </p>

            <div class="final-xp">
                +${questScore} XP
            </div>

            <h3>
                ${questCorrect}
                /
                ${questQuestions.length}
                Correct
            </h3>

            <p>
                Accuracy: ${percentage}%
            </p>

            <p>
                🔥 Current Streak:
                ${player.currentStreak}
            </p>

            <button id="another-quest">
                🎮 ANOTHER QUEST
            </button>

            <button id="view-profile">
                👤 VIEW PROFILE
            </button>

        </div>

    `;

    document
        .getElementById("another-quest")
        .addEventListener(
            "click",
            showCategories
        );

    document
        .getElementById("view-profile")
        .addEventListener(
            "click",
            showProfile
        );
}


// ==========================================
// ACHIEVEMENT SYSTEM
// ==========================================

function checkAchievements() {

    unlockAchievement(
        "first_steps",
        player.questionsAnswered >= 1
    );

    unlockAchievement(
        "sharp_shooter",
        player.bestStreak >= 5
    );

    unlockAchievement(
        "on_fire",
        player.bestStreak >= 10
    );

    unlockAchievement(
        "world_traveler",
        currentCategory === "world" &&
        currentQuestionIndex >= questQuestions.length
    );

    unlockAchievement(
        "life_ready",
        currentCategory === "life" &&
        currentQuestionIndex >= questQuestions.length
    );

    unlockAchievement(
        "brainiac",
        player.categoryXP.brain >= 1000
    );

    unlockAchievement(
        "quest_master",
        player.questsCompleted >= 10
    );

    unlockAchievement(
        "legend",
        getLevel(player.xp) >= 10
    );

    savePlayer();
}


function unlockAchievement(id, condition) {

    if (
        condition &&
        !player.achievements.includes(id)
    ) {

        player.achievements.push(id);

        showAchievementUnlocked(
            achievements[id]
        );

    }
}


// ==========================================
// ACHIEVEMENT SCREEN
// ==========================================

function showAchievements() {

    const card =
        document.getElementById("game-card");

    card.innerHTML = `

        <h2>🏆 Achievements</h2>

        <p>
            Keep playing to unlock them all!
        </p>

        <div class="profile-categories">

            ${Object.keys(achievements).map(id => {

                const achievement =
                    achievements[id];

                const unlocked =
                    player.achievements.includes(id);

                return `

                    <div
                        class="profile-category"
                        style="
                            opacity:${unlocked ? "1" : "0.45"};
                        "
                    >

                        <div
                            class="profile-category-title"
                        >
                            ${achievement.name}
                        </div>

                        <div
                            class="profile-category-xp"
                        >
                            ${unlocked
                                ? "✅ UNLOCKED"
                                : "🔒 LOCKED"}
                        </div>

                        <small>
                            ${achievement.description}
                        </small>

                    </div>

                `;

            }).join("")}

        </div>

        <button id="back-profile-achievements">
            👤 BACK TO PROFILE
        </button>

    `;

    document
        .getElementById(
            "back-profile-achievements"
        )
        .addEventListener(
            "click",
            showProfile
        );
}


// ==========================================
// ACHIEVEMENT POPUP
// ==========================================

function showAchievementUnlocked(achievement) {

    const popup =
        document.createElement("div");

    popup.style.position = "fixed";
    popup.style.left = "50%";
    popup.style.top = "30px";
    popup.style.transform = "translateX(-50%)";
    popup.style.zIndex = "9999";
    popup.style.background = "#ffffff";
    popup.style.color = "#172033";
    popup.style.padding = "25px 35px";
    popup.style.borderRadius = "20px";
    popup.style.boxShadow =
        "0 20px 60px rgba(0,0,0,0.35)";
    popup.style.textAlign = "center";
    popup.style.maxWidth = "90%";
    popup.style.animation =
        "cardAppear 0.4s ease";

    popup.innerHTML = `

        <div style="
            font-size:18px;
            font-weight:800;
            color:#7c3aed;
        ">
            🎉 ACHIEVEMENT UNLOCKED!
        </div>

        <div style="
            font-size:28px;
            font-weight:900;
            margin-top:8px;
        ">
            ${achievement.name}
        </div>

        <div style="
            margin-top:8px;
            color:#64748b;
        ">
            ${achievement.description}
        </div>

    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 3500);
}


// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;
}


function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================
// START GAME
// ==========================================

loadProfile();

if (player.name) {

    showProfile();

}
