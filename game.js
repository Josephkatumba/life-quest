// ==========================================
// LIFE QUEST V3
// An accessible quiz adventure for high school students.
//
// What's new in V3 (see the settings ⚙️ button in the game):
//   • Accessibility: text size, high contrast, easy-to-read font,
//     reduced motion, read-aloud, keyboard play (keys 1-4), screen-reader support
//   • Learning supports: 50/50 hints, second chances, breathing breaks,
//     "Practice Mistakes" quests that revisit missed questions
//   • Life-skills worlds: 💼 Work Ready and 🤝 Social Skills
//   • Stars, confetti, level-up and achievement toasts (no timers, no pressure)
//   • Multiple players on one shared computer + a printable / CSV progress report
//   • Safer saving (works even if the browser blocks storage) and old saves are migrated
//
// HOW TO ADD QUESTIONS
//   Use the mc() helper inside a category:
//     mc("Question?", "The correct answer", ["Wrong 1", "Wrong 2", "Wrong 3"],
//        "easy" | "medium" | "hard", "Short, kind explanation.")
//   Answers are shuffled every time a question is shown, and number-only
//   answers are sorted from smallest to largest automatically.
//   Existing questions can keep using the { question, answers, correct, ... } format.
// ==========================================

"use strict";


// ------------------------------
// QUESTION HELPER
// ------------------------------

function mc(question, correctAnswer, wrongAnswers, difficulty, explanation) {

    return {
        question: question,
        answers: [correctAnswer, ...wrongAnswers],
        correct: 0, // shuffled when the question is shown
        difficulty: difficulty,
        explanation: explanation
    };
}


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
    },


    // ------------------------------------------
    // NEW IN V3: life-skills worlds
    // ------------------------------------------

    work: {
        name: "💼 Work Ready",
        questions: [

            mc("It's your first day at a new job and you don't understand a task. What's the best thing to do?",
                "Politely ask for the task to be explained again",
                ["Guess and hope it works out", "Wait and do nothing", "Go home"],
                "easy",
                "Asking questions shows you care about doing the job well. Good workers ask for help when they need it."),

            mc("You'll be late for work because your bus is delayed. What should you do?",
                "Tell your manager as soon as you can",
                ["Say nothing and hope no one notices", "Skip the shift without telling anyone", "Blame a coworker"],
                "easy",
                "Letting your manager know early is responsible and helps the team plan."),

            mc("What is a good way to get ready for a job interview?",
                "Practice answers to common questions",
                ["Show up 30 minutes late", "Wear pajamas", "Plan to look at your phone the whole time"],
                "easy",
                "Practicing helps you feel calm and confident. A family member, friend, or teacher can help you practice."),

            mc("What is a paycheck?",
                "Money your employer pays you for the work you did",
                ["A gift card from a friend", "A school report card", "A coupon for a store"],
                "easy",
                "A paycheck is the pay you earn for your work."),

            mc("What is a resume?",
                "A short document that lists your skills, education, and experience",
                ["A type of uniform", "A list of your favorite foods", "A bus schedule"],
                "easy",
                "A resume helps an employer learn about you. School projects and volunteering count as experience too!"),

            mc("Why do some workers wear safety gear like gloves or safety glasses?",
                "To help prevent injuries",
                ["To look silly", "To hide from customers", "Because it's a costume"],
                "easy",
                "Safety gear protects workers from getting hurt on the job."),

            mc("Which shows that you are dependable at work?",
                "Showing up on time and doing what you said you would do",
                ["Leaving early without telling anyone", "Forgetting instructions on purpose", "Using your phone during the whole shift"],
                "easy",
                "Being dependable means people can count on you. That's one of the most valuable job skills."),

            mc("A customer is upset with you at work. What is a calm way to respond?",
                "Listen, then say you will get help to solve the problem",
                ["Yell back", "Walk away without a word", "Laugh at them"],
                "medium",
                "Staying calm and listening helps solve problems. If you can't fix it, it's okay to ask a supervisor for help."),

            mc("You want to ask for a day off. What is the best way?",
                "Ask politely and early, following your workplace's rules",
                ["Just don't show up", "Ask a coworker to lie for you", "Send an angry message"],
                "medium",
                "Asking early and politely gives your workplace time to plan."),

            mc("A coworker asks you to clock in for them while they aren't there. What should you do?",
                "Politely say no",
                ["Do it to be nice", "Do it just this once", "Ask them to pay you first"],
                "medium",
                "Clocking in for someone else is dishonest and could get you both in trouble. It's okay to say no."),

            mc("On a paycheck, what is 'net pay'?",
                "The money you take home after taxes and deductions",
                ["The money you earned before anything is taken out", "The amount of tax you owe", "A bonus"],
                "medium",
                "Gross pay is what you earn before deductions. Net pay is what you actually take home."),

            mc("You earn $12 an hour and work 5 hours. How much do you earn before taxes?",
                "$60",
                ["$17", "$50", "$72"],
                "medium",
                "5 × $12 = $60."),

            mc("In the U.S., what does 'overtime pay' usually mean?",
                "Extra pay for hours worked over a weekly limit",
                ["Pay for time you were asleep", "Less pay for working longer", "A free day off"],
                "medium",
                "Many hourly workers in the U.S. earn a higher rate, often 1.5 times their normal pay, for hours over 40 in a week."),

            mc("You work 6 hours a day for 4 days at $11 an hour. How much do you earn before taxes?",
                "$264",
                ["$66", "$242", "$246"],
                "hard",
                "6 × 4 = 24 hours, and 24 × $11 = $264.")

        ]
    },

    social: {
        name: "🤝 Social Skills",
        questions: [

            mc("You feel overwhelmed in a loud, crowded room. What is a healthy thing to do?",
                "Ask for a short break or move somewhere quieter",
                ["Yell at everyone", "Throw something", "Stay and never tell anyone"],
                "easy",
                "Taking a break can help your body and mind calm down. It's okay to ask for what you need."),

            mc("You don't understand the teacher's directions. What's a good way to speak up?",
                "Raise your hand and ask for the directions again",
                ["Stay quiet and guess", "Copy from a classmate", "Give up"],
                "easy",
                "Asking questions is a strength. Teachers want to help you understand."),

            mc("What does it mean to be a good listener?",
                "Paying attention and waiting for your turn to talk",
                ["Interrupting often", "Looking at your phone", "Talking louder than the speaker"],
                "easy",
                "Good listeners pay attention and give the other person a chance to finish."),

            mc("A friend seems sad. What is a kind thing to do?",
                "Ask if they are okay and listen",
                ["Laugh at them", "Ignore them", "Tell everyone their business"],
                "easy",
                "Checking in and listening shows you care."),

            mc("You disagree with a friend. What is a good way to handle it?",
                "Use a calm voice and explain how you feel",
                ["Shout at them", "Spread rumors", "Never speak to them again"],
                "easy",
                "Calm words help people understand each other, even when they disagree."),

            mc("Someone asks you to do something that feels unsafe or wrong. What can you do?",
                "Say no and tell a trusted adult",
                ["Do it so they will like you", "Do it and keep it a secret", "Pretend you didn't hear"],
                "easy",
                "You always have the right to say no to things that feel unsafe. A trusted adult can help."),

            mc("Which shows someone that you are listening?",
                "Facing them and giving nods or short replies",
                ["Turning your back", "Rolling your eyes", "Walking away mid-sentence"],
                "easy",
                "There are many ways to show you are listening. Eye contact is one way, but it isn't the only way, and it's okay if it feels hard."),

            mc("You made a mistake. What is a good way to respond?",
                "Say sorry and try to fix it",
                ["Blame someone else", "Hide it", "Pretend it didn't happen"],
                "easy",
                "Everyone makes mistakes. What matters is how we work to fix them."),

            mc("What can help you calm down when you feel upset?",
                "Taking slow, deep breaths",
                ["Holding your breath", "Yelling at someone", "Breaking something"],
                "easy",
                "Slow breathing tells your body it's safe to relax. Try the 🌿 Break button in this game!"),

            mc("Who are trusted adults you can talk to at school?",
                "A teacher, counselor, or other staff member you trust",
                ["A stranger online", "No one", "Someone who asks you to keep secrets"],
                "easy",
                "Trusted adults are there to help you stay safe and supported."),

            mc("A classmate says hello to you. What is a friendly response?",
                "Say hello back",
                ["Ignore them", "Walk away", "Make a face"],
                "easy",
                "A simple hello can start a friendship."),

            mc("What is self-advocacy?",
                "Speaking up for what you need and want",
                ["Bragging about yourself", "Arguing with everyone", "Never asking for help"],
                "medium",
                "Self-advocacy means speaking up for yourself, like asking for extra time, a quiet space, or a different way to learn."),

            mc("Your group is working on a class project. What does a good teammate do?",
                "Does their part and listens to others' ideas",
                ["Does nothing", "Takes over everything", "Makes fun of other people's ideas"],
                "medium",
                "Teamwork works best when everyone shares the work and respects each other's ideas."),

            mc("What is a polite way to join a conversation?",
                "Wait for a pause, then say something related",
                ["Shout over people", "Interrupt with a totally different topic", "Grab someone's arm"],
                "medium",
                "Waiting for a pause and staying on topic helps everyone feel respected."),

            mc("You feel too nervous to speak in front of the class. What can you do?",
                "Tell your teacher and ask about other ways to share, like writing it down",
                ["Never come to class again", "Leave without telling anyone", "Pretend to be sick every day"],
                "medium",
                "Teachers can offer options, like writing your answer, sharing one-on-one, or practicing first.")

        ]
    }
};



// ==========================================
// QUESTION BANK PREPARATION
// Gives every question a stable id and checks the data for mistakes.
// Problems are reported in the browser console (F12) for whoever maintains the game.
// ==========================================

const questionById = Object.create(null);

function hashText(text) {

    let hash = 5381;

    for (const character of String(text)) {
        hash = ((hash << 5) + hash) ^ character.codePointAt(0);
    }

    return (hash >>> 0).toString(36);
}


function prepareQuestionBank() {

    Object.keys(categories).forEach(key => {

        categories[key].questions.forEach((q, index) => {

            q.category = key;
            q.id = key + "-" + hashText(q.question);

            const problems = [];

            if (!q.question) problems.push("missing question text");

            if (!Array.isArray(q.answers) || q.answers.length < 2) {
                problems.push("needs at least 2 answers");
            } else {
                if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length) {
                    problems.push("'correct' does not point at an answer");
                }
                if (new Set(q.answers).size !== q.answers.length) {
                    problems.push("has duplicate answers");
                }
            }

            if (!["easy", "medium", "hard"].includes(q.difficulty)) {
                problems.push("difficulty must be easy, medium or hard");
            }

            if (!q.explanation) problems.push("missing explanation");

            if (questionById[q.id]) problems.push("duplicate question");

            if (problems.length) {
                console.warn(
                    "[Life Quest] " + key + " question " + (index + 1) +
                    " (" + q.question + "): " + problems.join(", ")
                );
            }

            questionById[q.id] = q;
        });
    });
}

prepareQuestionBank();


// ==========================================
// CONFIGURATION
// ==========================================

const STORAGE_KEYS = {
    legacyPlayer: "lifeQuestPlayer",        // V1/V2 single-player save (migrated automatically)
    profiles: "lifeQuestProfiles",
    activePlayer: "lifeQuestActivePlayer",
    settings: "lifeQuestSettings"
};

const MAX_NAME_LENGTH = 24;
const PRACTICE_SIZE = 5;
const PRACTICE_LABEL = "🔁 Practice Mistakes";

const questModes = {

    rookie: {
        name: "🟢 ROOKIE QUEST",
        icon: "🟢",
        title: "ROOKIE QUEST",
        label: "easy",
        questions: 5,
        difficulties: ["easy"],
        className: "rookie"
    },

    challenge: {
        name: "🟡 CHALLENGE QUEST",
        icon: "🟡",
        title: "CHALLENGE QUEST",
        label: "mixed",
        questions: 10,
        difficulties: ["easy", "medium"],
        className: "challenge"
    },

    championship: {
        name: "🔴 CHAMPIONSHIP",
        icon: "🔴",
        title: "CHAMPIONSHIP",
        label: "challenging",
        questions: 15,
        difficulties: ["easy", "medium", "hard"],
        className: "championship"
    }
};

// XP for a correct answer, by quest type and question difficulty
const XP_TABLE = {
    rookie:       { easy: 100, medium: 100, hard: 100 },
    challenge:    { easy: 100, medium: 150, hard: 150 },
    championship: { easy: 150, medium: 200, hard: 250 },
    practice:     { easy: 75,  medium: 100, hard: 125 }
};

const LEVEL_XP = [0, 500, 1000, 1500, 2000, 3000, 4000, 5500, 7500, 10000];

const CORRECT_TITLES = [
    "CORRECT!", "NICE WORK!", "YOU GOT IT!", "AWESOME!", "GREAT JOB!", "EXACTLY RIGHT!"
];

const MISS_TITLES = [
    "GOOD TRY!", "ALMOST!", "THAT'S OKAY!", "YOU'RE LEARNING!"
];

const RESULT_MESSAGES = {
    3: "Amazing focus! You really know your stuff.",
    2: "Great work! You're getting stronger every quest.",
    1: "You finished the quest, and that takes effort. Every try makes you better."
};


// ==========================================
// ACHIEVEMENTS
// ==========================================

const achievements = {

    first_steps: {
        name: "🌱 FIRST STEPS",
        description: "Answer your first question.",
        test: p => p.questionsAnswered >= 1
    },

    sharp_shooter: {
        name: "🎯 SHARP SHOOTER",
        description: "Get 5 correct answers in a row.",
        test: p => p.bestStreak >= 5
    },

    on_fire: {
        name: "🔥 ON FIRE",
        description: "Get 10 correct answers in a row.",
        test: p => p.bestStreak >= 10
    },

    world_traveler: {
        name: "🌍 WORLD TRAVELER",
        description: "Complete a World Explorer quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "world"
    },

    life_ready: {
        name: "💰 LIFE READY",
        description: "Complete a Real Life quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "life"
    },

    work_ready: {
        name: "💼 WORK READY",
        description: "Complete a Work Ready quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "work"
    },

    good_communicator: {
        name: "🤝 GOOD COMMUNICATOR",
        description: "Complete a Social Skills quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "social"
    },

    brainiac: {
        name: "🧠 BRAINIAC",
        description: "Earn 1,000 Brain Power XP.",
        test: p => p.categoryXP.brain >= 1000
    },

    never_give_up: {
        name: "💪 NEVER GIVE UP",
        description: "Get a question right on your second try.",
        test: p => p.secondChanceWins >= 1
    },

    perfect_quest: {
        name: "⭐ PERFECT QUEST",
        description: "Get every question right in a quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.perfect
    },

    mistake_master: {
        name: "🔁 MISTAKE MASTER",
        description: "Finish a Practice Mistakes quest.",
        test: (p, ctx) => ctx.questCompleted && ctx.category === "practice"
    },

    all_rounder: {
        name: "🧭 ALL-ROUNDER",
        description: "Earn XP in every world.",
        test: p => Object.keys(categories).every(key => (p.categoryXP[key] || 0) > 0)
    },

    quest_master: {
        name: "🏆 QUEST MASTER",
        description: "Complete 10 quests.",
        test: p => p.questsCompleted >= 10
    },

    legend: {
        name: "👑 LEGEND",
        description: "Reach Level 10.",
        test: p => getLevel(p.xp) >= 10
    }
};


// ==========================================
// GAME STATE
// ==========================================

let screen = "welcome";           // which screen is showing (used to come back from Settings)
let settingsReturnScreen = "profile";
let welcomeHTML = "";             // the sign-in form from index.html, kept so we can return to it

let profiles = Object.create(null);   // saved players, keyed by lower-case name
let activeKey = "";
let player = createDefaultPlayer();

let currentCategory = "";
let currentQuestion = null;
let currentQuestionIndex = 0;
let questScore = 0;
let questCorrect = 0;
let questQuestions = [];
let questMissedIds = [];
let currentQuestMode = "rookie";

let qState = null;                // per-question state: shuffled answers, hints, tries
let lastFeedback = null;
let lastResult = null;

let storageOK = true;


// ==========================================
// SAFE STORAGE
// School browsers sometimes block localStorage. The game keeps working;
// it just can't remember progress, and it tells the player so.
// ==========================================

const storage = {

    get(key, fallback = null) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (error) {
            storageOK = false;
            return fallback;
        }
    },

    set(key, value) {
        try {
            window.localStorage.setItem(key, value);
            return true;
        } catch (error) {
            storageOK = false;
            return false;
        }
    },

    remove(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            storageOK = false;
        }
    }
};


function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}


// ==========================================
// SETTINGS
// ==========================================

const TEXT_SIZES = ["normal", "large", "xlarge"];

function prefersReducedMotion() {
    return typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function defaultSettings() {
    return {
        textSize: "normal",
        highContrast: false,
        readableFont: false,
        reduceMotion: prefersReducedMotion(),
        sound: false,          // off by default: sudden sounds can be stressful
                secondChances: true
    };
}

let settings = defaultSettings();

function loadSettings() {

    const defaults = defaultSettings();
    const raw = storage.get(STORAGE_KEYS.settings);

    if (!raw) return defaults;

    try {
        const saved = JSON.parse(raw);
        const merged = { ...defaults };

        if (isPlainObject(saved)) {
            if (TEXT_SIZES.includes(saved.textSize)) merged.textSize = saved.textSize;
            ["highContrast", "readableFont", "reduceMotion", "sound", "secondChances"]
                .forEach(key => {
                    if (typeof saved[key] === "boolean") merged[key] = saved[key];
                });
        }

        return merged;

    } catch (error) {
        return defaults;
    }
}

function saveSettings() {
    storage.set(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function applySettings() {

    const body = document.body;

    if (!body) return;

    body.classList.toggle("lq-text-large", settings.textSize === "large");
    body.classList.toggle("lq-text-xlarge", settings.textSize === "xlarge");
    body.classList.toggle("lq-high-contrast", settings.highContrast);
    body.classList.toggle("lq-readable-font", settings.readableFont);
    body.classList.toggle("lq-reduce-motion", settings.reduceMotion);
}


// ==========================================
// STYLES ADDED BY THE GAME
// Accessibility modes and the new V3 screens. Your own CSS file is untouched;
// everything here is prefixed with "lq-" so it can't clash with it.
// ==========================================

const LQ_CSS = `

.lq-sr-only {
    position: absolute !important;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ----- keyboard focus you can actually see ----- */
#game-card:focus { outline: none; }
#game-card :focus-visible,
.lq-fab:focus-visible {
    outline: 4px solid #f59e0b;
    outline-offset: 3px;
}
/* headings we move focus to (for screen readers) don't need a ring */
#game-card [tabindex="-1"]:focus,
#game-card [tabindex="-1"]:focus-visible { outline: none; }

/* ----- comfortable tap targets ----- */
#game-card button { min-height: 48px; }

/* ----- text size ----- */
body.lq-text-large  #game-card { zoom: 1.15; }
body.lq-text-xlarge #game-card { zoom: 1.3; }
@supports not (zoom: 1) {
    body.lq-text-large  #game-card { font-size: 1.15em; }
    body.lq-text-xlarge #game-card { font-size: 1.3em; }
}

/* ----- easy-to-read font ----- */
body.lq-readable-font #game-card,
body.lq-readable-font #game-card * {
    font-family: "Atkinson Hyperlegible", "Lexend", Verdana, "Trebuchet MS", sans-serif !important;
    letter-spacing: 0.03em;
    word-spacing: 0.1em;
}
body.lq-readable-font #game-card { line-height: 1.6; }

/* ----- reduced motion ----- */
body.lq-reduce-motion *,
body.lq-reduce-motion *::before,
body.lq-reduce-motion *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
}

/* ----- high contrast ----- */
body.lq-high-contrast { background: #000 !important; }
body.lq-high-contrast #game-card {
    background: #000 !important;
    color: #fff !important;
    border: 3px solid #fff !important;
    box-shadow: none !important;
}
body.lq-high-contrast #game-card :is(div, section, p, h1, h2, h3, span, small, strong) {
    background: transparent !important;
    background-image: none !important;
    color: #fff !important;
    text-shadow: none !important;
}
body.lq-high-contrast #game-card button {
    background: #000 !important;
    background-image: none !important;
    color: #ffeb3b !important;
    border: 3px solid #ffeb3b !important;
    box-shadow: none !important;
}
body.lq-high-contrast #game-card button * { color: #ffeb3b !important; background: transparent !important; }
body.lq-high-contrast #game-card button:hover:not(:disabled) { background: #ffeb3b !important; color: #000 !important; }
body.lq-high-contrast #game-card button:hover:not(:disabled) * { color: #000 !important; }
body.lq-high-contrast #game-card :is(.profile-category, .rank-card) { border: 2px solid #fff !important; }
body.lq-high-contrast #game-card .progress-bar,
body.lq-high-contrast #game-card .lq-quest-progress,
body.lq-high-contrast #game-card .lq-report-bar { background: #333 !important; border: 2px solid #fff !important; }
body.lq-high-contrast #game-card .progress-fill,
body.lq-high-contrast #game-card .lq-quest-progress > span,
body.lq-high-contrast #game-card .lq-report-bar > span { background: #ffeb3b !important; }
body.lq-high-contrast #game-card .lq-switch[aria-checked="true"],
body.lq-high-contrast #game-card .lq-seg[aria-pressed="true"] { background: #ffeb3b !important; color: #000 !important; }
body.lq-high-contrast #game-card .lq-switch[aria-checked="true"] *,
body.lq-high-contrast #game-card .lq-seg[aria-pressed="true"] * { color: #000 !important; }
body.lq-high-contrast #game-card input { background: #000 !important; color: #fff !important; border: 3px solid #fff !important; }
body.lq-high-contrast .lq-fab { background: #000; color: #ffeb3b; border-color: #ffeb3b; }
body.lq-high-contrast .lq-toast { background: #000 !important; border: 3px solid #ffeb3b; }
body.lq-high-contrast .lq-toast * { color: #fff !important; }

/* ----- settings button ----- */
.lq-fab {
    position: fixed; top: 14px; right: 14px; z-index: 900;
    width: 52px; height: 52px; padding: 0;
    display: grid; place-items: center;
    border-radius: 50%;
    border: 3px solid #172033;
    background: #fff; color: #172033;
    font-size: 26px; line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
.lq-fab:hover { background: #eef2ff; }

/* ----- question screen ----- */
.lq-quest-progress {
    height: 12px; margin: 6px 0 10px;
    border-radius: 999px; background: #e2e8f0; overflow: hidden;
}
.lq-quest-progress > span {
    display: block; height: 100%;
    background: #7c3aed; border-radius: 999px;
}
#game-card .lq-answer {
    display: flex; align-items: center; justify-content: flex-start;
    gap: 0.7em; text-align: left;
}
.lq-key {
    flex: none; display: inline-grid; place-items: center;
    width: 1.9em; height: 1.9em;
    border: 2px solid currentColor; border-radius: 8px;
    font-weight: 800; font-size: 0.9em;
}
#game-card .lq-answer.lq-eliminated { opacity: 0.35; text-decoration: line-through; }
#game-card .lq-answer.lq-tried { opacity: 0.55; }
.lq-tools { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 18px 0 6px; }
#game-card .lq-tool {
    min-height: 48px; padding: 10px 16px;
    border-radius: 14px; border: 2px solid #c7d2fe;
    background: #eef2ff; color: #1e293b;
    font: inherit; font-weight: 700; cursor: pointer;
}
#game-card .lq-tool:hover:not(:disabled) { background: #e0e7ff; }
#game-card .lq-tool:disabled { opacity: 0.5; cursor: not-allowed; }
.lq-message { min-height: 1.6em; margin: 8px 0; font-weight: 700; color: #b45309; text-align: center; }
.lq-note { margin: 8px 0; opacity: 0.85; }
.lq-warning { margin: 10px 0; padding: 10px 14px; border-radius: 12px; background: #fef3c7; color: #78350f; font-weight: 700; }
.lq-stars { margin: 6px 0; font-size: 2.6em; letter-spacing: 0.1em; }

/* ----- practice world ----- */
.quest-map .quest-world.world-practice {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
}
.quest-map .quest-world.world-work {
    background: linear-gradient(135deg, #0ea5e9, #1d4ed8); color: #fff;
}
.quest-map .quest-world.world-social {
    background: linear-gradient(135deg, #f472b6, #be185d); color: #fff;
}

/* ----- settings screen ----- */
.lq-setting {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    padding: 14px 4px; text-align: left;
    border-bottom: 1px solid rgba(100, 116, 139, 0.35);
}
.lq-setting-label { font-weight: 800; }
.lq-setting-help { font-size: 0.9em; opacity: 0.8; }
.lq-segment { display: flex; flex-wrap: wrap; gap: 8px; }
#game-card .lq-seg, #game-card .lq-switch {
    min-height: 48px; padding: 8px 16px;
    border-radius: 12px; border: 3px solid #64748b;
    background: #e2e8f0; color: #0f172a;
    font: inherit; font-weight: 800; cursor: pointer;
}
#game-card .lq-switch { flex: none; min-width: 88px; border-radius: 999px; }
#game-card .lq-seg[aria-pressed="true"] { background: #4338ca; border-color: #312e81; color: #fff; }
#game-card .lq-switch[aria-checked="true"] { background: #16a34a; border-color: #166534; color: #fff; }
#game-card .lq-switch:disabled { opacity: 0.45; cursor: not-allowed; }

/* ----- progress report ----- */
.lq-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin: 14px 0; }
.lq-stat { padding: 12px; border-radius: 14px; background: rgba(99, 102, 241, 0.12); text-align: center; }
.lq-stat b { display: block; font-size: 1.6em; }
.lq-report-row {
    display: grid; grid-template-columns: minmax(120px, 1.2fr) 2fr auto;
    gap: 12px; align-items: center; padding: 10px 0; text-align: left;
}
.lq-report-bar { height: 14px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
.lq-report-bar > span { display: block; height: 100%; background: #16a34a; }
@media (max-width: 560px) { .lq-report-row { grid-template-columns: 1fr; gap: 4px; } }

/* ----- player picker ----- */
.lq-player-list { display: grid; gap: 10px; margin: 16px 0; }
.lq-input {
    width: 100%; max-width: 360px; padding: 14px;
    border-radius: 12px; border: 3px solid #64748b;
    font: inherit; font-size: 1.1em;
}

/* ----- breathing break ----- */
.lq-breathe {
    width: 170px; height: 170px; margin: 22px auto;
    display: grid; place-items: center;
    border-radius: 50%; color: #fff; font-weight: 800;
    background: radial-gradient(circle at 35% 30%, #a5f3fc, #38bdf8 60%, #2563eb);
    animation: lq-breathe 10s ease-in-out infinite;
}
@keyframes lq-breathe {
    0%, 100% { transform: scale(0.7); }
    40%      { transform: scale(1.05); }
}

/* ----- toasts ----- */
#lq-toasts {
    position: fixed; top: 14px; left: 50%; transform: translateX(-50%);
    z-index: 9999; display: grid; gap: 10px;
    width: min(92vw, 460px); pointer-events: none;
}
.lq-toast {
    padding: 18px 24px; border-radius: 20px;
    background: #fff; color: #172033; text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    animation: lq-pop 0.35s ease;
}
.lq-toast-eyebrow { font-weight: 800; color: #7c3aed; }
.lq-toast-title { margin-top: 4px; font-size: 1.5em; font-weight: 900; }
.lq-toast-body { margin-top: 6px; color: #475569; }
@keyframes lq-pop {
    from { opacity: 0; transform: translateY(-14px) scale(0.96); }
    to   { opacity: 1; transform: none; }
}

/* ----- confetti ----- */
.lq-confetti { position: fixed; inset: 0; z-index: 9998; overflow: hidden; pointer-events: none; }
.lq-confetti i {
    position: absolute; top: -16px; width: 10px; height: 16px; border-radius: 2px;
    animation: lq-fall linear forwards;
}
@keyframes lq-fall { to { transform: translate3d(var(--lq-x), 110vh, 0) rotate(720deg); } }

@media print {
    .lq-fab, #lq-toasts, #game-card button { display: none !important; }
}
`;

function injectStyles() {

    if (document.getElementById("lq-styles")) return;

    const style = document.createElement("style");

    style.id = "lq-styles";
    style.textContent = LQ_CSS;

    document.head.appendChild(style);
}


// ==========================================
// PLAYER DATA
// ==========================================

function createDefaultPlayer(name = "") {

    const categoryXP = {};
    const categoryStats = {};

    Object.keys(categories).forEach(key => {
        categoryXP[key] = 0;
        categoryStats[key] = { answered: 0, correct: 0 };
    });

    return {
        name: name,
        xp: 0,
        level: 1,
        questionsAnswered: 0,
        correctAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
        questsCompleted: 0,
        hintsUsed: 0,
        secondChanceWins: 0,
        categoryXP: categoryXP,
        categoryStats: categoryStats,
        achievements: [],
        bestStars: {},
        missed: []
    };
}


// Turns anything read from storage into a complete, safe player record.
// This is also how saves from older versions get upgraded.
function normalizePlayer(saved) {

    const name = String(saved.name || "").trim().slice(0, MAX_NAME_LENGTH);
    const base = createDefaultPlayer(name);
    const p = { ...base, ...saved, name: name };

    [
        "xp", "questionsAnswered", "correctAnswers", "currentStreak",
        "bestStreak", "questsCompleted", "hintsUsed", "secondChanceWins"
    ].forEach(field => {
        p[field] = Number.isFinite(p[field]) && p[field] >= 0 ? Math.floor(p[field]) : 0;
    });

    p.categoryXP = { ...base.categoryXP };
    p.categoryStats = { ...base.categoryStats };

    if (isPlainObject(saved.categoryXP)) {
        Object.keys(saved.categoryXP).forEach(key => {
            const value = saved.categoryXP[key];
            if (Number.isFinite(value) && value >= 0) p.categoryXP[key] = value;
        });
    }

    if (isPlainObject(saved.categoryStats)) {
        Object.keys(saved.categoryStats).forEach(key => {
            const s = saved.categoryStats[key];
            if (isPlainObject(s) && Number.isFinite(s.answered) && Number.isFinite(s.correct)) {
                p.categoryStats[key] = {
                    answered: Math.max(0, Math.floor(s.answered)),
                    correct: Math.max(0, Math.floor(s.correct))
                };
            }
        });
    }

    p.achievements = Array.isArray(saved.achievements)
        ? saved.achievements.filter(id => typeof id === "string")
        : [];

    p.missed = Array.isArray(saved.missed)
        ? saved.missed.filter(id => typeof id === "string")
        : [];

    p.bestStars = {};
    if (isPlainObject(saved.bestStars)) {
        Object.keys(saved.bestStars).forEach(key => {
            const stars = saved.bestStars[key];
            if (Number.isInteger(stars) && stars >= 1 && stars <= 3) p.bestStars[key] = stars;
        });
    }

    p.level = getLevel(p.xp);

    return p;
}


// ==========================================
// SAVE / LOAD (several players can share one computer)
// ==========================================

function profileKey(name) {
    return String(name).trim().toLowerCase();
}


function persistProfiles() {

    storage.set(STORAGE_KEYS.profiles, JSON.stringify(profiles));

    if (activeKey) {
        storage.set(STORAGE_KEYS.activePlayer, activeKey);
    } else {
        storage.remove(STORAGE_KEYS.activePlayer);
    }
}


function savePlayer() {

    if (!player.name) return;

    activeKey = activeKey || profileKey(player.name);
    profiles[activeKey] = player;

    persistProfiles();
}


function loadProfiles() {

    profiles = Object.create(null);

    const raw = storage.get(STORAGE_KEYS.profiles);

    if (raw) {

        try {

            const parsed = JSON.parse(raw);

            if (isPlainObject(parsed)) {
                Object.keys(parsed).forEach(key => {
                    if (isPlainObject(parsed[key]) && parsed[key].name) {
                        profiles[key] = normalizePlayer(parsed[key]);
                    }
                });
            }

        } catch (error) {
            console.error("Could not load profiles:", error);
        }
    }

    // Bring a V1/V2 save along so nobody loses their progress
    let migratedKey = "";

    if (Object.keys(profiles).length === 0) {

        const legacy = storage.get(STORAGE_KEYS.legacyPlayer);

        if (legacy) {

            try {

                const parsed = JSON.parse(legacy);

                if (isPlainObject(parsed) && parsed.name) {
                    migratedKey = profileKey(parsed.name);
                    profiles[migratedKey] = normalizePlayer(parsed);
                }

            } catch (error) {
                console.error("Could not read the old save:", error);
            }
        }
    }

    activeKey = storage.get(STORAGE_KEYS.activePlayer, "") || migratedKey;

    if (!profiles[activeKey]) activeKey = "";

    player = activeKey ? profiles[activeKey] : createDefaultPlayer();

    if (migratedKey) persistProfiles();
}


// ==========================================
// LEVEL SYSTEM
// ==========================================

function getLevel(xp) {

    for (let i = LEVEL_XP.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_XP[i]) return i + 1;
    }

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

    if (level >= LEVEL_XP.length) return 100;

    const start = LEVEL_XP[level - 1];
    const end = LEVEL_XP[level];

    return Math.max(0, Math.min(100, Math.round(((xp - start) / (end - start)) * 100)));
}


function xpToNextLevel(xp, level) {

    return level >= LEVEL_XP.length ? 0 : LEVEL_XP[level] - xp;
}


// ==========================================
// SMALL HELPERS
// ==========================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
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


function splitLabel(label) {

    const space = label.indexOf(" ");

    return space === -1
        ? { icon: "", text: label }
        : { icon: label.slice(0, space), text: label.slice(space + 1) };
}


function categoryLabel(key) {

    if (key === "practice") return PRACTICE_LABEL;

    return categories[key] ? categories[key].name : String(key);
}


function percent(part, whole) {

    return whole > 0 ? Math.round((part / whole) * 100) : 0;
}


function starString(count) {

    return "⭐".repeat(count) + "☆".repeat(3 - count);
}


function getStats(key) {

    const s = player.categoryStats[key];

    return s ? s : { answered: 0, correct: 0 };
}


function ensureStats(key) {

    if (!player.categoryStats[key]) {
        player.categoryStats[key] = { answered: 0, correct: 0 };
    }

    return player.categoryStats[key];
}


// Answers that are only numbers ("$17", "0°C", "1,000") read best from smallest to largest
function isNumericAnswer(text) {

    return /^\s*[$€£]?\s*-?\d[\d,]*(\.\d+)?\s*(%|°[CF])?\s*$/.test(String(text));
}


function numericValue(text) {

    return parseFloat(String(text).replace(/[^0-9.\-]/g, ""));
}


function buildAnswers(question) {

    const items = question.answers.map((text, index) => ({
        text: text,
        correct: index === question.correct
    }));

    if (question.keepOrder) return items;

    if (items.every(item => isNumericAnswer(item.text))) {
        return items.sort((a, b) => numericValue(a.text) - numericValue(b.text));
    }

    return shuffle(items);
}


function pick(list) {

    return list[Math.floor(Math.random() * list.length)];
}


// ==========================================
// XP RULES
// ==========================================

function getQuestionXP(question, mode = currentQuestMode) {

    const table = XP_TABLE[mode] || XP_TABLE.rookie;

    return table[question.difficulty] || 100;
}


// ==========================================
// SOUND (tiny, gentle, and OFF until the player turns it on)
// ==========================================

let audioContext = null;

const SOUNDS = {
    correct:     [[523.25, 0], [659.25, 0.12], [783.99, 0.24]],
    retry:       [[392.0, 0]],
    miss:        [[330.0, 0], [294.0, 0.16]],
    levelup:     [[523.25, 0], [659.25, 0.1], [783.99, 0.2], [1046.5, 0.32]],
    achievement: [[659.25, 0], [880.0, 0.14]],
    complete:    [[523.25, 0], [659.25, 0.14], [783.99, 0.28], [1046.5, 0.42]]
};

function soundSupported() {

    return typeof window.AudioContext === "function" ||
        typeof window.webkitAudioContext === "function";
}


function playSound(name) {

    if (!settings.sound || !SOUNDS[name] || !soundSupported()) return;

    try {

        const Context = window.AudioContext || window.webkitAudioContext;

        audioContext = audioContext || new Context();

        if (audioContext.state === "suspended") audioContext.resume();

        SOUNDS[name].forEach(([frequency, delay]) => {

            const start = audioContext.currentTime + delay;
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.06, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(start);
            oscillator.stop(start + 0.3);
        });

    } catch (error) {
        // Sound is a bonus; never let it break the game
    }
}


// ==========================================
// READ ALOUD
// ==========================================

function speechSupported() {

    return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}


function stopSpeaking() {

    if (speechSupported()) window.speechSynthesis.cancel();
}


function speak(text) {

    if (!speechSupported() || !text) return;

    stopSpeaking();

    const utterance = new window.SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
}


// ==========================================
// SCREEN HELPERS, LIVE ANNOUNCEMENTS, TOASTS, CONFETTI
// ==========================================

function getCard() {

    return document.getElementById("game-card");
}


function on(id, handler) {

    const element = document.getElementById(id);

    if (element) element.addEventListener("click", handler);
}


// Draws a screen, then moves keyboard / screen-reader focus to it
function render(html) {

    const card = getCard();

    if (!card) return;

    stopSpeaking();

    card.innerHTML = html;

    const target = card.querySelector("[data-autofocus]") || card;

    target.focus({ preventScroll: true });
}


function announce(message) {

    const live = document.getElementById("lq-live");

    if (!live) return;

    live.textContent = "";

    setTimeout(() => { live.textContent = message; }, 40);
}


function showToast(eyebrow, title, body) {

    const stack = document.getElementById("lq-toasts");

    if (!stack) return;

    const toast = document.createElement("div");

    toast.className = "lq-toast";

    toast.innerHTML =
        '<div class="lq-toast-eyebrow">' + escapeHTML(eyebrow) + "</div>" +
        '<div class="lq-toast-title">' + escapeHTML(title) + "</div>" +
        (body ? '<div class="lq-toast-body">' + escapeHTML(body) + "</div>" : "");

    stack.appendChild(toast);

    while (stack.children.length > 3) stack.firstElementChild.remove();

    setTimeout(() => toast.remove(), 4500);
}


function showAchievementUnlocked(achievement) {

    showToast("🎉 ACHIEVEMENT UNLOCKED!", achievement.name, achievement.description);
}


function launchConfetti() {

    if (settings.reduceMotion) return;

    const layer = document.createElement("div");

    layer.className = "lq-confetti";
    layer.setAttribute("aria-hidden", "true");

    const colors = ["#7c3aed", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#ef4444"];

    for (let i = 0; i < 70; i++) {

        const piece = document.createElement("i");

        piece.style.left = Math.random() * 100 + "%";
        piece.style.background = pick(colors);
        piece.style.animationDuration = 2.4 + Math.random() * 2 + "s";
        piece.style.animationDelay = Math.random() * 0.6 + "s";
        piece.style.setProperty("--lq-x", (Math.random() * 160 - 80) + "px");

        layer.appendChild(piece);
    }

    document.body.appendChild(layer);

    setTimeout(() => layer.remove(), 5500);
}


// ==========================================
// PROFILE CREATION
// ==========================================

function createProfile() {

    const input = document.getElementById("student-name");

    if (!input) return;

    const name = input.value.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);

    if (!name) {

        input.style.borderColor = "#ef4444";
        input.setAttribute("aria-invalid", "true");
        input.focus();

        announce("Please type your name to start.");

        return;
    }

    const key = profileKey(name);

    // Typing a name that already exists brings that player's progress back
    if (profiles[key]) {
        player = profiles[key];
    } else {
        player = createDefaultPlayer(name);
        profiles[key] = player;
    }

    activeKey = key;

    persistProfiles();

    showProfile();
}

window.createProfile = createProfile;


// ==========================================
// WELCOME + PLAYER PICKER
// ==========================================

function showWelcome() {

    screen = "welcome";

    const card = getCard();

    if (!card) return;

    stopSpeaking();

    card.innerHTML = welcomeHTML;
}


function showPlayerPicker() {

    screen = "picker";

    const keys = Object.keys(profiles).sort();

    render(`

        <h2 tabindex="-1" data-autofocus>👥 Who's playing?</h2>

        <p>Pick your name to keep going, or start as a new player.</p>

        <div class="lq-player-list">

            ${keys.map(key => {

                const p = profiles[key];
                const level = getLevel(p.xp);

                return `
                    <button data-player="${escapeHTML(key)}">
                        👋 ${escapeHTML(p.name)} • Level ${level} • ${p.xp} XP
                    </button>
                `;

            }).join("")}

        </div>

        <h3>➕ New player</h3>

        <p>
            <label for="student-name">Type your name:</label>
            <br>
            <input
                id="student-name"
                class="lq-input"
                type="text"
                maxlength="${MAX_NAME_LENGTH}"
                autocomplete="off"
            >
        </p>

        <button id="create-player">🚀 START</button>

        ${player.name ? '<button id="picker-back">↩️ BACK</button>' : ""}

    `);

    document.querySelectorAll("[data-player]").forEach(button => {

        button.addEventListener("click", function () {

            const key = this.dataset.player;

            if (!profiles[key]) return;

            player = profiles[key];
            activeKey = key;

            persistProfiles();
            showProfile();
        });
    });

    on("create-player", createProfile);
    on("picker-back", showProfile);
}


function switchPlayer() {

    savePlayer();

    activeKey = "";
    persistProfiles();

    player = createDefaultPlayer();

    showPlayerPicker();
}


// ==========================================
// PROFILE SCREEN
// ==========================================

function showProfile() {

    screen = "profile";

    const level = getLevel(player.xp);

    player.level = level;

    const rank = getRank(level);
    const progress = getLevelProgress(player.xp, level);
    const toNext = xpToNextLevel(player.xp, level);

    render(`

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

        ${storageOK ? "" : `
            <p class="lq-warning" role="alert">
                ⚠️ This browser is blocking saving, so your progress will be lost
                when you close the page. Ask a teacher if you need help.
            </p>
        `}

        <div class="level-section">

            <div class="level-label">

                <span>Level ${level}</span>

                <span>${progress}%</span>

            </div>

            <div
                class="progress-bar"
                role="progressbar"
                aria-label="Progress to the next level"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${progress}"
            >

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

            <p class="lq-note">
                ${toNext > 0
                    ? `${toNext} XP to reach Level ${level + 1}`
                    : "You reached the top level!"}
            </p>

        </div>

        <div class="rank-card">

            <div class="rank-title">
                CURRENT RANK
            </div>

            <div class="rank-name">
                ${rank}
            </div>

        </div>

        <h3 tabindex="-1" data-autofocus>📊 Your Progress</h3>

        <div class="profile-categories">

            ${Object.keys(categories).map(key => `

                <div class="profile-category">

                    <div class="profile-category-title">
                        ${escapeHTML(categories[key].name)}
                    </div>

                    <div class="profile-category-xp">
                        ${player.categoryXP[key] || 0} XP
                    </div>

                </div>

            `).join("")}

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

        <button id="report-button">
            📈 MY PROGRESS REPORT
        </button>

        <button id="switch-player">
            👥 SWITCH PLAYER
        </button>

    `);

    on("play-quest", showCategories);
    on("achievements-button", showAchievements);
    on("report-button", showReport);
    on("switch-player", switchPlayer);
}


// ==========================================
// CATEGORY SCREEN
// ==========================================


let jeopardyBoard = null;

function startJeopardyGame() {
    screen = "jeopardy-board";
    const sourceCategories = Object.keys(categories).filter(
        key => categories[key] && Array.isArray(categories[key].questions)
    );

    const chosen = shuffle([...sourceCategories]).slice(0, 6);

    jeopardyBoard = {
        categories: chosen,
        values: [100, 200, 300, 400, 500],
        cells: Object.create(null),
        score: 0
    };

    chosen.forEach(key => {
        const pool = shuffle([...categories[key].questions]);

        jeopardyBoard.values.forEach((value, row) => {
            let candidates;

            if (value <= 200) {
                candidates = pool.filter(q => q.difficulty === "easy");
            } else if (value === 300) {
                candidates = pool.filter(q => q.difficulty === "easy" || q.difficulty === "medium");
            } else if (value === 400) {
                candidates = pool.filter(q => q.difficulty === "medium" || q.difficulty === "hard");
            } else {
                candidates = pool.filter(q => q.difficulty === "hard");
            }

            if (!candidates.length) candidates = pool;

            jeopardyBoard.cells[key + ":" + value] = {
                question: candidates[row % candidates.length],
                used: false,
                earned: 0
            };
        });
    });

    renderJeopardyBoard();
}

function renderJeopardyBoard() {
    if (!jeopardyBoard) {
        startJeopardyGame();
        return;
    }

    const keys = jeopardyBoard.categories;
    const total = keys.length * jeopardyBoard.values.length;
    const used = Object.values(jeopardyBoard.cells).filter(cell => cell.used).length;

    render(`
        <div class="lq-jeopardy-head">
            <div>
                <div class="lq-jeopardy-title">⚡ LIFE QUEST JEOPARDY</div>
                <div class="lq-board-caption">
                    Pick a category. Pick a value. Answer the clue. Clear the board.
                </div>
            </div>

            <div class="lq-jeopardy-meta">
                <span class="lq-pill">👤 ${escapeHTML(player.name)}</span>
                <span class="lq-pill">⭐ ${player.xp} XP</span>
                <span class="lq-pill">🏆 Board score: ${jeopardyBoard.score}</span>
            </div>
        </div>

        <div class="lq-board">
            ${keys.map(key => `
                <div class="lq-category">
                    ${escapeHTML(splitLabel(categories[key].name).text)}
                </div>
            `).join("")}

            ${jeopardyBoard.values.map(value =>
                keys.map(key => {
                    const id = key + ":" + value;
                    const cell = jeopardyBoard.cells[id];

                    return `
                        <button
                            class="lq-clue ${cell.used ? "is-used" : ""}"
                            data-clue="${escapeHTML(id)}"
                            ${cell.used ? "disabled" : ""}
                        >
                            ${cell.used ? "✓" : "$" + value}
                        </button>
                    `;
                }).join("")
            ).join("")}
        </div>

        <p class="lq-board-caption">Cleared: ${used} / ${total}</p>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">
            <button id="lq-board-reset">🔄 NEW BOARD</button>
            <button id="lq-board-exit">🗺️ BACK TO WORLDS</button>
        </div>
    `);

    document.querySelectorAll("[data-clue]").forEach(button => {
        button.addEventListener("click", () => openJeopardyClue(button.dataset.clue));
    });

    on("lq-board-reset", startJeopardyGame);
    on("lq-board-exit", showCategories);
}

function openJeopardyClue(id) {
    const cell = jeopardyBoard && jeopardyBoard.cells[id];

    if (!cell || cell.used) return;

    const value = Number(id.split(":").pop());
    const q = cell.question;
    const categoryKey = id.split(":")[0];

    const modal = document.createElement("div");
    modal.className = "lq-clue-modal";
    modal.id = "lq-clue-modal";

    modal.innerHTML = `
        <div class="lq-clue-panel">
            <div class="lq-clue-value">LIFE QUEST • ${value}</div>
            <div class="lq-clue-question">${escapeHTML(q.question)}</div>

            <div class="lq-clue-controls">
                ${q.answers.map((answer, i) => `
                    <button class="lq-answer-modal" data-choice="${i}">
                        ${escapeHTML(answer)}
                    </button>
                `).join("")}
            </div>

            <div id="lq-clue-feedback" style="min-height:2em;margin:16px 0;font-weight:900"></div>
            <div id="lq-clue-correct" class="lq-clue-answer" style="display:none"></div>

            <button id="lq-clue-close" style="display:none">
                BACK TO BOARD
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll("[data-choice]").forEach(button => {
        button.addEventListener("click", () => {
            const picked = Number(button.dataset.choice);
            const isCorrect = picked === q.correct;

            modal.querySelectorAll("[data-choice]").forEach(item => item.disabled = true);

            cell.used = true;
            cell.earned = isCorrect ? value : 0;
            jeopardyBoard.score += cell.earned;

            player.questionsAnswered++;

            const stats = ensureStats(categoryKey);
            stats.answered++;

            if (isCorrect) {
                player.correctAnswers++;
                stats.correct++;

                player.currentStreak++;

                if (player.currentStreak > player.bestStreak) {
                    player.bestStreak = player.currentStreak;
                }

                player.xp += value;
                player.categoryXP[categoryKey] = (player.categoryXP[categoryKey] || 0) + value;

                modal.querySelector("#lq-clue-feedback").textContent =
                    "✅ Correct! +" + value + " points";
                modal.querySelector("#lq-clue-feedback").style.color = "#86efac";
            } else {
                player.currentStreak = 0;

                modal.querySelector("#lq-clue-feedback").textContent =
                    "💡 The correct answer is " + q.answers[q.correct];
                modal.querySelector("#lq-clue-feedback").style.color = "#fde68a";
            }

            player.level = getLevel(player.xp);
            savePlayer();

            const reveal = modal.querySelector("#lq-clue-correct");
            reveal.textContent = "Correct answer: " + q.answers[q.correct];
            reveal.style.display = "block";

            modal.querySelector("#lq-clue-close").style.display = "inline-block";
        });
    });

    modal.querySelector("#lq-clue-close").addEventListener("click", () => {
        modal.remove();
        renderJeopardyBoard();
    });
}

function showCategories() {

    screen = "categories";

    const level = getLevel(player.xp);
    const rank = getRank(level);
    const progress = getLevelProgress(player.xp, level);

    const missedCount = player.missed.filter(id => questionById[id]).length;

    render(`

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

            <div
                class="progress-bar map-progress"
                role="progressbar"
                aria-label="Progress to the next level"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="${progress}"
            >

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

        </div>


        <button id="play-jeopardy" style="width:100%;margin-bottom:16px;background:linear-gradient(135deg,#2563eb,#7c3aed);font-size:22px;">🎯 PLAY LIFE QUEST JEOPARDY</button>

        <p class="map-instruction" tabindex="-1" data-autofocus>
            Choose a world and begin your adventure!
        </p>


        <div class="quest-map">

            ${Object.keys(categories).map(key => {

                const label = splitLabel(categories[key].name);

                return `

                    <button
                        class="quest-world world-${escapeHTML(key)}"
                        data-category="${escapeHTML(key)}"
                    >

                        <div class="world-icon">
                            ${label.icon}
                        </div>

                        <div class="world-name">
                            ${escapeHTML(label.text)}
                        </div>

                        <div class="world-xp">
                            ⭐ ${player.categoryXP[key] || 0} XP
                        </div>

                        <div class="world-action">
                            ENTER QUEST →
                        </div>

                    </button>

                `;

            }).join("")}

            ${missedCount > 0 ? `

                <button
                    class="quest-world world-practice"
                    id="practice-button"
                >

                    <div class="world-icon">🔁</div>

                    <div class="world-name">Practice Mistakes</div>

                    <div class="world-xp">
                        ${missedCount} to review
                    </div>

                    <div class="world-action">
                        START PRACTICE →
                    </div>

                </button>

            ` : ""}

        </div>


        <button id="back-profile">
            👤 BACK TO PROFILE
        </button>

    `);


    document.querySelectorAll("[data-category]").forEach(button => {

        button.addEventListener("click", function () {

            chooseCategory(this.dataset.category);
        });
    });

    on("play-jeopardy", startJeopardyGame);
    on("practice-button", startPractice);
    on("back-profile", showProfile);
}


// ==========================================
// QUEST MODE SCREEN
// ==========================================

function chooseCategory(category) {
    if (!categories[category]) return;
    currentCategory = category;
    startJeopardyGame();
}


// The questions a quest mode can draw from in the current world
function questPool(modeKey, categoryKey = currentCategory) {

    const mode = questModes[modeKey];

    return categories[categoryKey].questions.filter(
        q => mode.difficulties.includes(q.difficulty)
    );
}


function showQuestModes() {

    screen = "modes";

    const categoryName = categories[currentCategory].name;
    const label = splitLabel(categoryName);

    render(`

        <div class="quest-mode-header">

            <div class="quest-mode-icon">
                ${label.icon}
            </div>

            <h2 tabindex="-1" data-autofocus>
                ${escapeHTML(categoryName)}
            </h2>

            <p>
                Choose your quest!
            </p>

        </div>


        <div class="quest-modes">

            ${Object.keys(questModes).map(modeKey => {

                const mode = questModes[modeKey];
                const pool = questPool(modeKey);
                const count = Math.min(mode.questions, pool.length);

                // The most XP this quest could possibly give
                const maxXP = pool
                    .map(q => getQuestionXP(q, modeKey))
                    .sort((a, b) => b - a)
                    .slice(0, count)
                    .reduce((total, xp) => total + xp, 0);

                const best = player.bestStars[currentCategory + ":" + modeKey] || 0;

                return `

                    <button
                        class="quest-mode ${mode.className}-mode"
                        data-mode="${modeKey}"
                        ${count === 0 ? "disabled" : ""}
                    >

                        <div class="mode-icon">
                            ${mode.icon}
                        </div>

                        <div class="mode-content">

                            <strong>
                                ${mode.title}
                            </strong>

                            <span>
                                ${count} ${mode.label} questions
                            </span>

                            <span>
                                ⭐ Up to ${maxXP.toLocaleString("en-US")} XP
                            </span>

                            ${best ? `
                                <span aria-label="Your best: ${best} out of 3 stars">
                                    Your best: ${starString(best)}
                                </span>
                            ` : ""}

                        </div>

                        <div class="mode-arrow">
                            →
                        </div>

                    </button>

                `;

            }).join("")}

        </div>


        <button id="back-to-map">
            🗺️ BACK TO MAP
        </button>

    `);


    document.querySelectorAll("[data-mode]").forEach(button => {

        button.addEventListener("click", function () {

            startQuestMode(this.dataset.mode);
        });
    });

    on("back-to-map", showCategories);
}


// ==========================================
// STARTING A QUEST
// ==========================================

function pickQuestions(pool, modeKey, count) {

    const tier = difficulty => shuffle(pool.filter(q => q.difficulty === difficulty));

    const easy = tier("easy");
    const medium = tier("medium");
    const hard = tier("hard");

    let ordered;

    if (modeKey === "rookie") {

        ordered = easy;

    } else if (modeKey === "challenge") {

        // "Mixed": up to 40% medium questions, the rest easy
        const someMedium = medium.splice(0, Math.ceil(count * 0.4));

        ordered = [...someMedium, ...easy, ...medium];

    } else {

        // Championship: hardest questions first, then fill up
        ordered = [...hard, ...medium, ...easy];
    }

    return shuffle(ordered.slice(0, count));
}


function beginQuest(questions) {

    questScore = 0;
    questCorrect = 0;
    currentQuestionIndex = 0;
    questMissedIds = [];
    qState = null;
    lastFeedback = null;
    lastResult = null;
    questQuestions = questions;

    showQuestion();
}


function startQuestMode(mode) {

    if (!questModes[mode] || !categories[currentCategory]) return;

    currentQuestMode = mode;

    const pool = questPool(mode);

    beginQuest(pickQuestions(pool, mode, questModes[mode].questions));
}


function startPractice() {

    const pool = player.missed
        .map(id => questionById[id])
        .filter(Boolean);

    if (pool.length === 0) {

        showCategories();

        return;
    }

    currentCategory = "practice";
    currentQuestMode = "practice";

    beginQuest(shuffle([...pool]).slice(0, PRACTICE_SIZE));
}


// ==========================================
// SHOW QUESTION
// ==========================================

function newQuestionState(question) {

    return {
        question: question,
        answers: buildAnswers(question),
        eliminated: new Set(),   // removed by the hint
        tried: new Set(),        // wrong answers already picked
        hintUsed: false,
        wrongCount: 0,
        locked: false,
        firstShow: true
    };
}


function showQuestion() {

    if (currentQuestionIndex >= questQuestions.length) {

        finishQuest();

        return;
    }

    screen = "question";

    currentQuestion = questQuestions[currentQuestionIndex];

    if (!qState || qState.question !== currentQuestion) {
        qState = newQuestionState(currentQuestion);
    }

    const total = questQuestions.length;

    render(`

        <p class="category-name">
            ${escapeHTML(categoryLabel(currentCategory))}
        </p>

        <div
            class="lq-quest-progress"
            role="progressbar"
            aria-label="Quest progress"
            aria-valuemin="0"
            aria-valuemax="${total}"
            aria-valuenow="${currentQuestionIndex}"
        >
            <span style="width:${percent(currentQuestionIndex, total)}%"></span>
        </div>

        <p>
            Question ${currentQuestionIndex + 1}
            of ${total}
        </p>

        <h2
            class="question-text"
            id="lq-question-text"
            tabindex="-1"
            data-autofocus
        >
            ${escapeHTML(currentQuestion.question)}
        </h2>

        <div
            class="answers"
            role="group"
            aria-labelledby="lq-question-text"
        >

            ${qState.answers.map((answer, index) => `

                <button class="lq-answer" data-answer="${index}">
                    <span class="lq-key" aria-hidden="true">${index + 1}</span>
                    <span>${escapeHTML(answer.text)}</span>
                </button>

            `).join("")}

        </div>

        <p class="lq-message" id="lq-message"></p>

        <div class="lq-tools">


            <button
                class="lq-tool"
                id="lq-hint"
                ${qState.answers.length < 3 ? "disabled" : ""}
            >💡 Hint</button>

            <button class="lq-tool" id="lq-break">🌿 Break</button>

        </div>

        <p class="score">
            Quest XP: ${questScore}
        </p>

        <p class="lq-note">
            Tip: press the number keys ${
                qState.answers.length > 1 ? "1–" + qState.answers.length : "1"
            } to answer.
        </p>

    `);

    document.querySelectorAll("[data-answer]").forEach(button => {

        button.addEventListener("click", function () {

            handleAnswer(Number(this.dataset.answer));
        });
    });

    on("lq-hint", useHint);
    on("lq-break", showBreak);

    refreshAnswerButtons();

}


// Keeps the answer buttons in sync with what the player has already tried
function refreshAnswerButtons() {

    if (!qState) return;

    document.querySelectorAll("[data-answer]").forEach(button => {

        const index = Number(button.dataset.answer);
        const eliminated = qState.eliminated.has(index);
        const tried = qState.tried.has(index);

        button.classList.toggle("lq-eliminated", eliminated);
        button.classList.toggle("lq-tried", tried);
        button.disabled = eliminated || tried || qState.locked;
    });

    const hint = document.getElementById("lq-hint");

    if (hint) {
        hint.disabled = qState.hintUsed || qState.locked || qState.answers.length < 3;
    }
}


function readQuestionAloud() {

    if (!qState) return;

    const choices = qState.answers
        .map((answer, index) => ({ answer, index }))
        .filter(item => !qState.eliminated.has(item.index) && !qState.tried.has(item.index))
        .map(item => "Choice " + (item.index + 1) + ": " + item.answer.text + ".")
        .join(" ");

    speak(currentQuestion.question + " " + choices);
}


// ==========================================
// HINTS AND SECOND CHANCES
// We never take XP away for asking for help.
// ==========================================

function useHint() {

    if (!qState || qState.locked || qState.hintUsed || qState.answers.length < 3) return;

    const wrongOnes = qState.answers
        .map((answer, index) => ({ answer, index }))
        .filter(item =>
            !item.answer.correct &&
            !qState.tried.has(item.index) &&
            !qState.eliminated.has(item.index)
        );

    // Always leave one wrong answer so the hint narrows things down without giving it away
    const toRemove = shuffle(wrongOnes).slice(0, Math.max(0, Math.min(2, wrongOnes.length - 1)));

    toRemove.forEach(item => qState.eliminated.add(item.index));

    qState.hintUsed = true;
    player.hintsUsed++;

    savePlayer();
    refreshAnswerButtons();

    const message = document.getElementById("lq-message");

    if (message) message.textContent = "💡 Hint: some wrong answers were crossed out.";

    announce("Hint used. Some wrong answers were crossed out.");

    const firstOpen = document.querySelector("[data-answer]:not(:disabled)");

    if (firstOpen) firstOpen.focus();
}


function handleAnswer(index) {

    if (!qState || qState.locked) return;

    const choice = qState.answers[index];

    if (!choice || qState.eliminated.has(index) || qState.tried.has(index)) return;

    stopSpeaking();

    if (choice.correct) {

        resolveQuestion(true);

        return;
    }

    qState.wrongCount++;
    qState.tried.add(index);

    // First mistake: offer another try (unless a hint already helped)
    if (settings.secondChances && qState.wrongCount === 1 && !qState.hintUsed) {

        playSound("retry");
        refreshAnswerButtons();

        const message = document.getElementById("lq-message");

        if (message) message.textContent = "Not this one. Try again, you can do it!";

        announce("Not this one. Try again, you can do it!");

        const firstOpen = document.querySelector("[data-answer]:not(:disabled)");

        if (firstOpen) firstOpen.focus();

        return;
    }

    resolveQuestion(false);
}


// ==========================================
// SCORING AN ANSWER
// ==========================================

function resolveQuestion(correct) {

    qState.locked = true;

    const q = currentQuestion;
    const categoryKey = q.category;
    const levelBefore = getLevel(player.xp);
    const stats = ensureStats(categoryKey);

    let xp = 0;
    let secondTry = false;

    player.questionsAnswered++;
    stats.answered++;

    if (correct) {

        secondTry = qState.wrongCount > 0;

        xp = getQuestionXP(q);

        if (secondTry) {
            xp = Math.round(xp / 2);
            player.secondChanceWins++;
        }

        player.correctAnswers++;
        stats.correct++;

        player.currentStreak++;

        if (player.currentStreak > player.bestStreak) {
            player.bestStreak = player.currentStreak;
        }

        player.xp += xp;
        player.categoryXP[categoryKey] = (player.categoryXP[categoryKey] || 0) + xp;

        questScore += xp;
        questCorrect++;

        // Answered it right, so it no longer needs practice
        player.missed = player.missed.filter(id => id !== q.id);

    } else {

        player.currentStreak = 0;

        if (!player.missed.includes(q.id)) player.missed.push(q.id);

        questMissedIds.push(q.id);
    }

    const levelAfter = getLevel(player.xp);

    player.level = levelAfter;

    lastFeedback = {
        correct: correct,
        secondTry: secondTry,
        xp: xp,
        streak: player.currentStreak,
        title: pick(correct ? CORRECT_TITLES : MISS_TITLES)
    };

    playSound(correct ? "correct" : "miss");

    savePlayer();

    checkAchievements({});

    if (levelAfter > levelBefore) {

        showToast("⬆️ LEVEL UP!", "Level " + levelAfter, getRank(levelAfter));

        playSound("levelup");
    }

    showFeedback();
}


// ==========================================
// FEEDBACK
// ==========================================

function showFeedback() {

    screen = "feedback";

    const f = lastFeedback;
    const q = currentQuestion;

    const correctText = qState
        ? qState.answers.find(answer => answer.correct).text
        : q.answers[q.correct];


    if (f.correct) {

        render(`

            <div class="feedback-correct">

                <div class="feedback-icon">
                    ${f.secondTry ? "💪" : "🎉"}
                </div>

                <h2>
                    ${escapeHTML(f.title)}
                </h2>

                <div class="xp-animation">
                    +${f.xp} XP
                </div>

                ${f.secondTry ? `
                    <p class="lq-note">
                        Second try earns half XP. Great persistence!
                    </p>
                ` : ""}

                ${f.streak >= 3 ? `
                    <p class="lq-note">
                        🔥 ${f.streak} in a row!
                    </p>
                ` : ""}

                <p>
                    ${escapeHTML(q.explanation)}
                </p>


                <button id="continue-button" data-autofocus>
                    ➡️ CONTINUE
                </button>

            </div>

        `);

    } else {

        render(`

            <div class="feedback-wrong">

                <div class="feedback-icon">
                    💡
                </div>

                <h2>
                    ${escapeHTML(f.title)}
                </h2>

                <p>
                    The correct answer was:
                </p>

                <h3>
                    ${escapeHTML(correctText)}
                </h3>

                <p>
                    ${escapeHTML(q.explanation)}
                </p>

                <p class="lq-note">
                    We saved this one so you can practice it later.
                </p>

                ${readButton}

                <button id="continue-button" data-autofocus>
                    ➡️ CONTINUE
                </button>

            </div>

        `);
    }


    on("continue-button", nextQuestion);



}


function nextQuestion() {

    currentQuestionIndex++;

    qState = null;

    showQuestion();
}


// ==========================================
// END OF QUEST
// ==========================================

function getStars(percentage) {

    if (percentage >= 90) return 3;
    if (percentage >= 60) return 2;

    return 1;    // finishing a quest always earns at least one star
}


function finishQuest() {

    player.questsCompleted++;

    const total = questQuestions.length;
    const percentage = percent(questCorrect, total);
    const stars = getStars(percentage);
    const starKey = currentCategory + ":" + currentQuestMode;
    const previousBest = player.bestStars[starKey] || 0;

    if (stars > previousBest) player.bestStars[starKey] = stars;

    checkAchievements({
        questCompleted: true,
        category: currentCategory,
        perfect: total > 0 && questCorrect === total
    });

    savePlayer();

    lastResult = {
        total: total,
        correct: questCorrect,
        percentage: percentage,
        stars: stars,
        xp: questScore,
        newBest: stars > previousBest && previousBest > 0,
        missedCount: questMissedIds.length
    };

    showQuestResult();
}


function showQuestResult() {

    screen = "result";

    const r = lastResult;

    render(`

        <div class="final-result">

            <div class="feedback-icon">
                🏆
            </div>

            <h2 tabindex="-1" data-autofocus>
                QUEST COMPLETE!
            </h2>

            <p>
                Great work, ${escapeHTML(player.name)}!
            </p>

            <div
                class="lq-stars"
                role="img"
                aria-label="${r.stars} out of 3 stars"
            >
                ${starString(r.stars)}
            </div>

            <p>
                ${RESULT_MESSAGES[r.stars]}
                ${r.newBest ? "That's a new personal best!" : ""}
            </p>

            <div class="final-xp">
                +${r.xp} XP
            </div>

            <h3>
                ${r.correct}
                /
                ${r.total}
                Correct
            </h3>

            <p>
                Accuracy: ${r.percentage}%
            </p>

            <p>
                🔥 Current Streak:
                ${player.currentStreak}
            </p>

            <button id="another-quest">
                🎮 ANOTHER QUEST
            </button>

            ${r.missedCount > 0 ? `
                <button id="practice-missed">
                    🔁 PRACTICE THE ONES I MISSED
                </button>
            ` : ""}

            <button id="view-profile">
                👤 VIEW PROFILE
            </button>

        </div>

    `);

    on("another-quest", showCategories);
    on("practice-missed", startPractice);
    on("view-profile", showProfile);

    playSound("complete");

    if (r.stars >= 2) launchConfetti();

    announce(
        "Quest complete. " + r.correct + " out of " + r.total +
        " correct. " + r.stars + " out of 3 stars."
    );
}


// ==========================================
// BREATHING BREAK
// ==========================================

function showBreak() {

    screen = "break";

    render(`

        <div class="lq-break">

            <h2 tabindex="-1" data-autofocus>🌿 Take a break</h2>

            <p>Your quest is paused. Your XP is saved. Take all the time you need.</p>

            <div class="lq-breathe" aria-hidden="true">Breathe</div>

            <p>Breathe in for 4 seconds, then out for 6 seconds.</p>

            <button id="resume-quest">▶️ I'M READY</button>

            <button id="leave-quest">🗺️ LEAVE THIS QUEST</button>

        </div>

    `);

    on("resume-quest", showQuestion);

    on("leave-quest", () => {

        qState = null;

        showCategories();
    });
}


// ==========================================
// ACHIEVEMENT SYSTEM
// ==========================================

function checkAchievements(context = {}) {

    let unlockedSomething = false;

    Object.keys(achievements).forEach(id => {

        if (player.achievements.includes(id)) return;

        let earned = false;

        try {
            earned = achievements[id].test(player, context);
        } catch (error) {
            console.error("Achievement check failed for", id, error);
        }

        if (earned) {

            player.achievements.push(id);

            showAchievementUnlocked(achievements[id]);

            unlockedSomething = true;
        }
    });

    if (unlockedSomething) {

        playSound("achievement");

        savePlayer();
    }
}


// ==========================================
// ACHIEVEMENT SCREEN
// ==========================================

function showAchievements() {

    screen = "achievements";

    const ids = Object.keys(achievements);
    const unlockedCount = ids.filter(id => player.achievements.includes(id)).length;

    render(`

        <h2 tabindex="-1" data-autofocus>🏆 Achievements</h2>

        <p>
            ${unlockedCount} of ${ids.length} unlocked. Keep playing to unlock them all!
        </p>

        <div class="profile-categories">

            ${ids.map(id => {

                const achievement = achievements[id];
                const unlocked = player.achievements.includes(id);

                return `

                    <div
                        class="profile-category"
                        style="opacity:${unlocked ? "1" : "0.6"};"
                    >

                        <div class="profile-category-title">
                            ${escapeHTML(achievement.name)}
                        </div>

                        <div class="profile-category-xp">
                            ${unlocked ? "✅ UNLOCKED" : "🔒 LOCKED"}
                        </div>

                        <small>
                            ${escapeHTML(achievement.description)}
                        </small>

                    </div>

                `;

            }).join("")}

        </div>

        <button id="back-profile-achievements">
            👤 BACK TO PROFILE
        </button>

    `);

    on("back-profile-achievements", showProfile);
}


// ==========================================
// PROGRESS REPORT (for students, teachers, and families)
// ==========================================

function showReport() {

    screen = "report";

    const totalAnswered = player.questionsAnswered;
    const accuracy = percent(player.correctAnswers, totalAnswered);
    const level = getLevel(player.xp);

    const keys = Object.keys(categories);

    // Suggest one world to revisit: the lowest accuracy with a fair number of answers
    const needsPractice = keys
        .map(key => ({ key, stats: getStats(key) }))
        .filter(item => item.stats.answered >= 3 && percent(item.stats.correct, item.stats.answered) < 70)
        .sort((a, b) =>
            percent(a.stats.correct, a.stats.answered) - percent(b.stats.correct, b.stats.answered)
        )[0];

    const trackedAnswers = keys.reduce((sum, key) => sum + getStats(key).answered, 0);

    render(`

        <h2 tabindex="-1" data-autofocus>📈 ${escapeHTML(player.name)}'s Progress</h2>

        <div class="lq-stat-grid">

            <div class="lq-stat"><b>${level}</b>Level</div>
            <div class="lq-stat"><b>${player.xp}</b>Total XP</div>
            <div class="lq-stat"><b>${totalAnswered}</b>Questions</div>
            <div class="lq-stat"><b>${accuracy}%</b>Accuracy</div>
            <div class="lq-stat"><b>${player.bestStreak}</b>Best streak</div>
            <div class="lq-stat"><b>${player.questsCompleted}</b>Quests done</div>

        </div>

        <h3>By world</h3>

        <div>

            ${keys.map(key => {

                const stats = getStats(key);
                const pct = percent(stats.correct, stats.answered);

                return `

                    <div class="lq-report-row">

                        <div>${escapeHTML(categories[key].name)}</div>

                        <div
                            class="lq-report-bar"
                            role="img"
                            aria-label="${escapeHTML(splitLabel(categories[key].name).text)}: ${pct}% correct"
                        >
                            <span style="width:${pct}%"></span>
                        </div>

                        <div>
                            ${stats.answered > 0
                                ? stats.correct + "/" + stats.answered + " • " + pct + "%"
                                : "Not played yet"}
                        </div>

                    </div>

                `;

            }).join("")}

        </div>

        ${needsPractice ? `
            <p class="lq-note">
                💡 A great next step: play more of
                <strong>${escapeHTML(splitLabel(categories[needsPractice.key].name).text)}</strong>
                to build confidence.
            </p>
        ` : ""}

        ${trackedAnswers < totalAnswered ? `
            <p class="lq-note">
                Detailed world-by-world results start counting from this update.
            </p>
        ` : ""}

        <button id="download-report">⬇️ DOWNLOAD REPORT (CSV)</button>

        <button id="print-report">🖨️ PRINT</button>

        <button id="back-profile-report">👤 BACK TO PROFILE</button>

    `);

    on("download-report", downloadReport);
    on("print-report", () => window.print());
    on("back-profile-report", showProfile);
}


function csvCell(value) {

    if (typeof value === "number") return String(value);

    let text = String(value);

    // Stops spreadsheet programs from running a name like "=SUM(...)" as a formula
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;

    if (/[",\r\n]/.test(text)) text = '"' + text.replace(/"/g, '""') + '"';

    return text;
}


function downloadFile(filename, content, type) {

    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function downloadReport() {

    const date = new Date().toISOString().slice(0, 10);

    const rows = [[
        "Report date", "Player", "World", "Questions answered", "Correct", "Accuracy (%)", "XP earned"
    ]];

    Object.keys(categories).forEach(key => {

        const stats = getStats(key);

        rows.push([
            date,
            player.name,
            splitLabel(categories[key].name).text,
            stats.answered,
            stats.correct,
            stats.answered > 0 ? percent(stats.correct, stats.answered) : "",
            player.categoryXP[key] || 0
        ]);
    });

    rows.push([
        date,
        player.name,
        "All worlds",
        player.questionsAnswered,
        player.correctAnswers,
        player.questionsAnswered > 0 ? percent(player.correctAnswers, player.questionsAnswered) : "",
        player.xp
    ]);

    const csv = "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");

    const safeName = player.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "player";

    downloadFile(safeName + "-life-quest-report.csv", csv, "text/csv;charset=utf-8");
}


// ==========================================
// SETTINGS SCREEN
// ==========================================

function openSettings() {

    if (screen === "settings") {

        closeSettings();

        return;
    }

    settingsReturnScreen = screen;

    showSettings();
}


function closeSettings() {

    restoreScreen(settingsReturnScreen);
}


function switchRow(key, label, help, disabled) {

    const isOn = settings[key];

    return `

        <div class="lq-setting">

            <div>
                <div class="lq-setting-label" id="lq-label-${key}">${label}</div>
                <div class="lq-setting-help">${help}</div>
            </div>

            <button
                type="button"
                class="lq-switch"
                role="switch"
                aria-checked="${isOn ? "true" : "false"}"
                aria-labelledby="lq-label-${key}"
                data-setting="${key}"
                ${disabled ? "disabled" : ""}
            >${isOn ? "ON" : "OFF"}</button>

        </div>
    `;
}


function showSettings() {

    screen = "settings";

    const sizes = [
        ["normal", "Normal"],
        ["large", "Large"],
        ["xlarge", "Extra large"]
    ];

    render(`

        <h2 tabindex="-1" data-autofocus>⚙️ Settings</h2>

        <p>Make the game work best for you. Changes save automatically.</p>

        <div class="lq-setting">

            <div>
                <div class="lq-setting-label" id="lq-label-size">Text size</div>
            </div>

            <div class="lq-segment" role="group" aria-labelledby="lq-label-size">
                ${sizes.map(([value, label]) => `
                    <button
                        type="button"
                        class="lq-seg"
                        data-size="${value}"
                        aria-pressed="${settings.textSize === value ? "true" : "false"}"
                    >${label}</button>
                `).join("")}
            </div>

        </div>

        ${switchRow("highContrast", "High contrast", "Black background with bright text")}

        ${switchRow("readableFont", "Easy-to-read font", "Clearer letters with extra spacing")}

        ${switchRow("reduceMotion", "Less movement", "Turns off animations and confetti")}


        ${switchRow(
            "sound",
            "Sound effects",
            soundSupported() ? "Soft, gentle sounds" : "Not available in this browser",
            !soundSupported()
        )}

        ${switchRow("secondChances", "Second chances", "Get one more try on a question for half XP")}

        <div class="lq-tools">


            ${player.name ? `
                <button class="lq-tool" id="reset-progress">🗑️ Reset my progress</button>
            ` : ""}

        </div>

        <button id="close-settings">✅ DONE</button>

    `);

    document.querySelectorAll("[data-setting]").forEach(button => {

        button.addEventListener("click", function () {

            const key = this.dataset.setting;

            settings[key] = !settings[key];

            saveSettings();
            applySettings();

            this.setAttribute("aria-checked", settings[key] ? "true" : "false");
            this.textContent = settings[key] ? "ON" : "OFF";

            // Give instant feedback when sound effects are enabled
            if (key === "sound" && settings.sound) playSound("correct");
        });
    });

    document.querySelectorAll("[data-size]").forEach(button => {

        button.addEventListener("click", function () {

            settings.textSize = this.dataset.size;

            saveSettings();
            applySettings();

            document.querySelectorAll("[data-size]").forEach(other => {
                other.setAttribute("aria-pressed", other === this ? "true" : "false");
            });
        });
    });


    on("reset-progress", () => {

        const sure = window.confirm(
            "Reset all of " + player.name + "'s progress? This cannot be undone."
        );

        if (!sure) return;

        player = createDefaultPlayer(player.name);
        profiles[activeKey] = player;

        savePlayer();

        showProfile();
    });

    on("close-settings", closeSettings);
}


// Goes back to whatever the player was looking at before opening Settings
function restoreScreen(name) {

    const hasPlayer = Boolean(player.name);

    switch (name) {

        case "welcome":
            showWelcome();
            break;

        case "picker":
            showPlayerPicker();
            break;

        case "categories":
            hasPlayer ? showCategories() : showWelcome();
            break;

        case "jeopardy-board":
            hasPlayer ? renderJeopardyBoard() : showWelcome();
            break;

        case "modes":
            categories[currentCategory] ? showQuestModes() : showCategories();
            break;

        case "question":
            questQuestions.length ? showQuestion() : showCategories();
            break;

        case "feedback":
            lastFeedback && currentQuestion ? showFeedback() : showProfile();
            break;

        case "result":
            lastResult ? showQuestResult() : showProfile();
            break;

        case "achievements":
            showAchievements();
            break;

        case "report":
            showReport();
            break;

        case "break":
            showBreak();
            break;

        default:
            hasPlayer ? showProfile() : showWelcome();
    }
}


// ==========================================
// KEYBOARD SUPPORT
// 1-4 answer, H = hint, R = read aloud, Esc closes Settings
// ==========================================

function handleKeydown(event) {

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : "";

    if (tag === "input" || tag === "textarea" || tag === "select") {

        if (event.key === "Enter" && target.id === "student-name") {

            event.preventDefault();

            createProfile();
        }

        return;
    }

    if (event.key === "Escape" && screen === "settings") {

        closeSettings();

        return;
    }

    if (screen !== "question" || !qState || qState.locked) return;

    if (/^[1-9]$/.test(event.key)) {

        const index = Number(event.key) - 1;

        if (qState.answers[index]) {

            event.preventDefault();

            handleAnswer(index);
        }

    } else if (event.key === "h" || event.key === "H") {

        useHint();

    }
}


// ==========================================
// START GAME
// ==========================================

function startGame() {

    if (!document.documentElement.lang) document.documentElement.lang = "en";

    injectStyles();

    settings = loadSettings();

    applySettings();

    const card = getCard();

    if (card) {

        // Keep the sign-in form from index.html so Settings can return to it
        welcomeHTML = card.innerHTML;

        card.setAttribute("tabindex", "-1");
        card.setAttribute("role", "region");
        card.setAttribute("aria-label", "Life Quest game");
    }

    // Settings button, message area for screen readers, and a spot for pop-up messages
    const fab = document.createElement("button");

    fab.type = "button";
    fab.className = "lq-fab";
    fab.id = "lq-settings-button";
    fab.title = "Settings";
    fab.setAttribute("aria-label", "Settings and accessibility");
    fab.textContent = "⚙️";
    fab.addEventListener("click", openSettings);

    const live = document.createElement("div");

    live.id = "lq-live";
    live.className = "lq-sr-only";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    const toasts = document.createElement("div");

    toasts.id = "lq-toasts";
    toasts.setAttribute("role", "status");
    toasts.setAttribute("aria-live", "polite");

    document.body.append(fab, live, toasts);

    document.addEventListener("keydown", handleKeydown);

    window.addEventListener("pagehide", stopSpeaking);

    loadProfiles();

    if (player.name) {

        showProfile();

    } else if (Object.keys(profiles).length > 0) {

        // Someone used "Switch player" last, so ask who is playing now
        showPlayerPicker();
    }
}


if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", startGame);

} else {

    startGame();
}
