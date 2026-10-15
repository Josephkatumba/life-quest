// ==========================================
// LIFE QUEST: 5TH GRADE SHOWDOWN — TEEN QUESTION BANK
// Loaded before grade-show.js (see index.html).
//
// Fun, fair questions for players aged 13–19. The Showdown climbs
// Grade 1 → 5 like a ladder: Grades 1–3 use EASY questions, Grades 4–5
// MEDIUM, and the Final Challenge HARD. Aim for about 50% easy, 40% medium,
// 10% hard.
//
// HOW TO ADD QUESTIONS
//   q("category", number, "easy|medium|hard", "Question?", "Correct answer",
//     ["Wrong 1", "Wrong 2", "Wrong 3"], "Short explanation.", "Optional Peek hint")
//   tf("truefalse", number, "difficulty", "Statement.", true|false, "Explanation.")
//
//   • number: the next unused number in that category. Never reuse or
//     renumber one (saved history uses the id, e.g. "sd-geography-07").
//   • Exactly one answer must be right. Use facts that won't go out of date
//     (no "current champion" or "most followers" questions).
//   • No Peek hint? PEEK crosses out one wrong answer instead
//     (True/False questions without a hint have no PEEK).
// ==========================================

"use strict";

const SHOWDOWN_BANK = (function () {

    const categories = {
        general:   { name: "Would You Know This?", icon: "💡" },
        math:      { name: "Quick Maths", icon: "➗" },
        science:   { name: "Science Surprises", icon: "🔬" },
        geography: { name: "Guess the Country", icon: "🌍" },
        history:   { name: "History Mystery", icon: "🏛️" },
        sports:    { name: "Football & Sports", icon: "⚽" },
        movies:    { name: "Movies & Entertainment", icon: "🎬" },
        gaming:    { name: "Tech & Gaming", icon: "🎮" },
        animals:   { name: "Animals & Planet", icon: "🐾" },
        funfacts:  { name: "Fun Facts & Brain Teasers", icon: "🤯" },
        pop:       { name: "Pop Culture", icon: "🎤" },
        life:      { name: "Everyday Life", icon: "🏠" },
        whoami:    { name: "Who Am I?", icon: "🕵️" },
        truefalse: { name: "True or False", icon: "✅" }
    };

    const questions = [];

    function q(category, n, difficulty, question, correct, wrong, explanation, hint) {
        questions.push({
            id: "sd-" + category + "-" + String(n).padStart(2, "0"),
            category,
            difficulty,
            question,
            answers: [correct, ...wrong],
            correct: 0,
            explanation,
            hint: hint || ""
        });
    }

    // True / False: always shown as "True" then "False"
    function tf(category, n, difficulty, statement, isTrue, explanation, hint) {
        questions.push({
            id: "sd-" + category + "-" + String(n).padStart(2, "0"),
            category,
            difficulty,
            question: statement,
            answers: ["True", "False"],
            correct: isTrue ? 0 : 1,
            keepOrder: true,
            explanation,
            hint: hint || ""
        });
    }


    // ============ 💡 WOULD YOU KNOW THIS? ============
    q("general", 1, "easy", "How many days are in a leap year?", "366", ["365", "364", "360"], "Leap years add an extra day: February 29.");
    q("general", 2, "easy", "How many colors are traditionally named in a rainbow?", "7", ["5", "6", "9"], "Red, orange, yellow, green, blue, indigo and violet.");
    q("general", 3, "easy", "How many letters are in the English alphabet?", "26", ["24", "25", "28"], "A to Z is 26 letters.");
    q("general", 4, "easy", "Which currency do most European Union countries use?", "The euro", ["The dollar", "The pound", "The yen"], "Most EU countries share the euro.");
    q("general", 5, "easy", "What does the signal 'SOS' mean?", "A call for help", ["A weather report", "Time for lunch", "A sports score"], "SOS is the international distress signal.");
    q("general", 6, "easy", "What is the tallest building in the world, found in Dubai?", "The Burj Khalifa", ["The Empire State Building", "The Eiffel Tower", "The Shard"], "The Burj Khalifa is about 828 meters tall.");
    q("general", 7, "easy", "How many strings does a standard guitar have?", "6", ["4", "5", "8"], "Most guitars have six strings.");
    q("general", 8, "easy", "Which holiday do many Christians celebrate on December 25?", "Christmas", ["Easter", "Halloween", "New Year's Day"], "Christmas is on December 25.");
    q("general", 9, "easy", "London's famous clock tower is often called what?", "Big Ben", ["The Eiffel Tower", "The Space Needle", "The Leaning Tower"], "Big Ben is really the name of its great bell.");
    q("general", 10, "easy", "What is the name of the twisty cube puzzle with colored squares?", "A Rubik's Cube", ["A Jenga tower", "A sudoku", "A tangram"], "Ernő Rubik invented it in 1974.");
    q("general", 11, "easy", "How many weeks are in a year?", "52", ["48", "50", "56"], "A year has 52 weeks and a day or two.");
    q("general", 12, "medium", "Which language has the most native speakers in the world?", "Mandarin Chinese", ["English", "Spanish", "Hindi"], "Mandarin has the most native speakers; English has many learners.");
    q("general", 13, "medium", "Which Hindu festival is known as the Festival of Lights?", "Diwali", ["Holi", "Eid al-Fitr", "Christmas"], "Diwali celebrates light over darkness. Holi is the festival of colors.");
    q("general", 14, "medium", "How many keys does a standard piano have?", "88", ["76", "100", "64"], "52 white keys + 36 black keys = 88.");
    q("general", 15, "medium", "How many hours are in one week?", "168", ["148", "120", "184"], "24 hours × 7 days = 168.");
    q("general", 16, "medium", "Which city is nicknamed 'the Big Apple'?", "New York City", ["Los Angeles", "Chicago", "London"], "New York City has been called the Big Apple since the 1920s.");
    q("general", 17, "medium", "How many pieces does each player start with in chess?", "16", ["8", "12", "20"], "8 pawns plus 8 other pieces.");
    q("general", 18, "medium", "What is the national animal of Scotland?", "The unicorn", ["The eagle", "The bear", "The wolf"], "Yes, really: Scotland's national animal is the unicorn!");
    q("general", 19, "medium", "In chess, which piece can only move diagonally?", "The bishop", ["The rook", "The knight", "The king"], "Bishops always stay on one color, moving diagonally.");
    q("general", 20, "medium", "Which country gave the Statue of Liberty to the United States?", "France", ["England", "Italy", "Spain"], "France gave it as a gift in 1886.");
    q("general", 21, "hard", "What is 50 in Roman numerals?", "L", ["C", "D", "X"], "L = 50, C = 100, D = 500, X = 10.");
    q("general", 22, "hard", "How many squares are on a standard chessboard?", "64", ["32", "81", "100"], "8 rows × 8 columns = 64 squares.");


    // ============ ➗ QUICK MATHS ============
    q("math", 1, "easy", "What is 15 × 4?", "60", ["45", "50", "64"], "15 × 4 = 60.");
    q("math", 2, "easy", "What is half of 90?", "45", ["30", "40", "60"], "90 ÷ 2 = 45.");
    q("math", 3, "easy", "What is 100 minus 37?", "63", ["73", "67", "53"], "100 − 37 = 63.");
    q("math", 4, "easy", "What is 9 × 9?", "81", ["72", "99", "89"], "9 × 9 = 81.");
    q("math", 5, "easy", "How many minutes are in 2 hours?", "120", ["100", "60", "200"], "60 + 60 = 120 minutes.");
    q("math", 6, "easy", "What is 10% of 50?", "5", ["10", "15", "50"], "10% means divide by 10: 50 ÷ 10 = 5.");
    q("math", 7, "easy", "What comes next: 2, 4, 8, 16, ...?", "32", ["24", "20", "18"], "Each number doubles: 16 × 2 = 32.");
    q("math", 8, "easy", "Four friends split 20 dollars equally. How much does each get?", "5 dollars", ["4 dollars", "6 dollars", "10 dollars"], "20 ÷ 4 = 5.");
    q("math", 9, "easy", "How many sides do 3 triangles have altogether?", "9", ["6", "12", "3"], "3 triangles × 3 sides = 9.");
    q("math", 10, "easy", "What is 1,000 divided by 10?", "100", ["10", "110", "1,010"], "1,000 ÷ 10 = 100.");
    q("math", 11, "easy", "What is 7 + 8 + 5?", "20", ["18", "21", "25"], "7 + 8 = 15, then + 5 = 20.");
    q("math", 12, "medium", "What is 25% of 80?", "20", ["25", "15", "40"], "25% is a quarter: 80 ÷ 4 = 20.");
    q("math", 13, "medium", "What is 12 × 11?", "132", ["121", "122", "144"], "12 × 11 = 132.");
    q("math", 14, "medium", "What is 3 squared plus 4 squared?", "25", ["7", "12", "49"], "9 + 16 = 25.");
    q("math", 15, "medium", "A 40-dollar shirt is 50% off. What is the new price?", "20 dollars", ["10 dollars", "25 dollars", "30 dollars"], "Half of 40 is 20.");
    q("math", 16, "medium", "What is the next prime number after 7?", "11", ["8", "9", "10"], "8, 9 and 10 can all be divided by other numbers.");
    q("math", 17, "medium", "How many seconds are in 5 minutes?", "300", ["50", "500", "250"], "5 × 60 = 300.");
    q("math", 18, "medium", "What is the average of 4, 6 and 8?", "6", ["5", "7", "18"], "4 + 6 + 8 = 18, and 18 ÷ 3 = 6.");
    q("math", 19, "medium", "What do you get if you double 37?", "74", ["64", "72", "77"], "37 + 37 = 74.");
    q("math", 20, "medium", "What is 0.25 as a percentage?", "25%", ["2.5%", "0.25%", "52%"], "0.25 = 25 hundredths = 25%.");
    q("math", 21, "hard", "What is 15% of 200?", "30", ["15", "20", "35"], "10% is 20 and 5% is 10, so 15% is 30.");
    q("math", 22, "hard", "A train goes 60 km every hour. How far does it go in 2.5 hours?", "150 km", ["120 km", "125 km", "180 km"], "60 × 2.5 = 150.");


    // ============ 🔬 SCIENCE SURPRISES ============
    q("science", 1, "easy", "Which planet is closest to the Sun?", "Mercury", ["Venus", "Earth", "Mars"], "Mercury is the closest and smallest planet.");
    q("science", 2, "easy", "Which gas do humans need to breathe in to survive?", "Oxygen", ["Carbon dioxide", "Helium", "Nitrogen"], "Our cells need oxygen to make energy.");
    q("science", 3, "easy", "What is H2O better known as?", "Water", ["Salt", "Air", "Sugar"], "Two hydrogen atoms + one oxygen atom = water.");
    q("science", 4, "easy", "Which planet is famous for its big, beautiful rings?", "Saturn", ["Mars", "Venus", "Mercury"], "Saturn's rings are made of ice and rock.");
    q("science", 5, "easy", "How many legs does an insect have?", "6", ["4", "8", "10"], "All insects have six legs. Spiders have eight.");
    q("science", 6, "easy", "At sea level, water boils at what temperature?", "100°C", ["50°C", "90°C", "212°C"], "Water boils at 100°C (212°F) at sea level.");
    q("science", 7, "easy", "What is the natural satellite that orbits Earth?", "The Moon", ["The Sun", "Mars", "A comet"], "The Moon orbits Earth about once a month.");
    q("science", 8, "easy", "Which sense do you mainly use your tongue for?", "Taste", ["Smell", "Hearing", "Sight"], "Your tongue is covered in taste buds.");
    q("science", 9, "easy", "Solar panels turn what into electricity?", "Sunlight", ["Wind", "Coal", "Water"], "Solar panels capture energy from sunlight.");
    q("science", 10, "easy", "Lightning is a giant spark of what?", "Electricity", ["Fire", "Water", "Wind"], "Lightning is electricity jumping through the air.");
    q("science", 11, "easy", "Which planet is often called 'the Blue Planet'?", "Earth", ["Mars", "Jupiter", "Mercury"], "Oceans cover about 70% of Earth.");
    q("science", 12, "medium", "What is the largest organ of the human body?", "The skin", ["The liver", "The brain", "The lungs"], "Your skin covers your whole body.");
    q("science", 13, "medium", "What is the chemical symbol for gold?", "Au", ["Ag", "Gd", "Go"], "Au comes from 'aurum', Latin for gold.");
    q("science", 14, "medium", "Which blood cells help fight infections?", "White blood cells", ["Red blood cells", "Platelets", "Plasma"], "White blood cells defend your body against germs.");
    q("science", 15, "medium", "About how long does sunlight take to reach Earth?", "About 8 minutes", ["About 8 seconds", "About 8 hours", "About 8 days"], "Light from the Sun takes roughly 8 minutes to get here.");
    q("science", 16, "medium", "Which gas makes up most of the air we breathe?", "Nitrogen", ["Oxygen", "Carbon dioxide", "Hydrogen"], "Air is about 78% nitrogen and 21% oxygen.");
    q("science", 17, "medium", "Sound travels fastest through which of these?", "Steel", ["Air", "Water", "Outer space"], "Sound moves fastest through solids, and can't travel through space at all.");
    q("science", 18, "medium", "Which part of your eye has a color?", "The iris", ["The pupil", "The retina", "The lens"], "The iris gives your eyes their color.");
    q("science", 19, "medium", "Which planet spins on its side?", "Uranus", ["Mars", "Venus", "Saturn"], "Uranus is tilted about 98 degrees.");
    q("science", 20, "medium", "What do we call the way plants make food from sunlight?", "Photosynthesis", ["Respiration", "Digestion", "Evaporation"], "'Photo' means light; 'synthesis' means making.");
    q("science", 21, "hard", "What is the chemical symbol for iron?", "Fe", ["Ir", "In", "I"], "Fe comes from 'ferrum', Latin for iron.");
    q("science", 22, "hard", "Which gas makes up most of the Sun?", "Hydrogen", ["Helium", "Oxygen", "Carbon"], "The Sun is roughly three-quarters hydrogen.");


    // ============ 🌍 GUESS THE COUNTRY ============
    q("geography", 1, "easy", "Pyramids, pharaohs and the Nile River. Which country am I?", "Egypt", ["Morocco", "Kenya", "Greece"], "Egypt is home to the Pyramids of Giza.");
    q("geography", 2, "easy", "The Eiffel Tower stands in which country?", "France", ["Italy", "Spain", "Germany"], "It's in Paris, the capital of France.");
    q("geography", 3, "easy", "What is the capital of Kenya?", "Nairobi", ["Mombasa", "Kampala", "Addis Ababa"], "Nairobi is Kenya's capital and biggest city.");
    q("geography", 4, "easy", "Which country is shaped like a boot?", "Italy", ["Spain", "Greece", "Portugal"], "Look at a map: Italy looks like a boot kicking a ball (Sicily).");
    q("geography", 5, "easy", "Which is the largest ocean?", "The Pacific Ocean", ["The Atlantic Ocean", "The Indian Ocean", "The Arctic Ocean"], "The Pacific covers about a third of Earth.");
    q("geography", 6, "easy", "What is the capital of Japan?", "Tokyo", ["Osaka", "Kyoto", "Seoul"], "Tokyo is Japan's capital. Seoul is South Korea's.");
    q("geography", 7, "easy", "Kangaroos and the Sydney Opera House. Which country am I?", "Australia", ["New Zealand", "South Africa", "Brazil"], "Australia is home to kangaroos and Sydney.");
    q("geography", 8, "easy", "What is the capital of Ghana?", "Accra", ["Kumasi", "Lagos", "Dakar"], "Accra is Ghana's capital, on the Atlantic coast.");
    q("geography", 9, "easy", "What is the largest hot desert in the world?", "The Sahara", ["The Kalahari", "The Gobi", "The Atacama"], "The Sahara stretches across North Africa.");
    q("geography", 10, "easy", "Which continent is Nigeria in?", "Africa", ["Asia", "South America", "Europe"], "Nigeria is in West Africa.");
    q("geography", 11, "easy", "The Taj Mahal is in which country?", "India", ["Egypt", "Turkey", "China"], "The Taj Mahal is in Agra, India.");
    q("geography", 12, "medium", "What is the capital of Nigeria?", "Abuja", ["Lagos", "Accra", "Kano"], "Abuja became the capital in 1991. Lagos is the biggest city.");
    q("geography", 13, "medium", "What is the highest mountain in Africa?", "Mount Kilimanjaro", ["Mount Kenya", "Table Mountain", "Mount Elgon"], "Kilimanjaro in Tanzania is about 5,895 meters tall.");
    q("geography", 14, "medium", "Which African country has the most people?", "Nigeria", ["Egypt", "Ethiopia", "South Africa"], "Nigeria has over 200 million people.");
    q("geography", 15, "medium", "Victoria Falls is on the border of Zambia and which country?", "Zimbabwe", ["Kenya", "Ghana", "Uganda"], "The falls sit on the Zambezi River between Zambia and Zimbabwe.");
    q("geography", 16, "medium", "Which African country has three capital cities?", "South Africa", ["Kenya", "Morocco", "Egypt"], "Pretoria, Cape Town and Bloemfontein.");
    q("geography", 17, "medium", "What is the largest country in Africa by area?", "Algeria", ["Nigeria", "Egypt", "South Africa"], "Algeria became the largest after Sudan split in 2011.");
    q("geography", 18, "medium", "Lake Victoria is shared by Uganda, Tanzania and which other country?", "Kenya", ["Ghana", "Egypt", "Zambia"], "Africa's largest lake touches Uganda, Tanzania and Kenya.");
    q("geography", 19, "medium", "What is the capital of Canada?", "Ottawa", ["Toronto", "Vancouver", "Montreal"], "Ottawa is the capital, though Toronto is bigger.");
    q("geography", 20, "medium", "The ancient city of Machu Picchu is in which country?", "Peru", ["Mexico", "Chile", "Brazil"], "Machu Picchu sits high in Peru's Andes mountains.");
    q("geography", 21, "hard", "What is the capital of Australia?", "Canberra", ["Sydney", "Melbourne", "Perth"], "Canberra was built to be the capital, between Sydney and Melbourne.");
    q("geography", 22, "hard", "What is the official capital of Tanzania?", "Dodoma", ["Dar es Salaam", "Arusha", "Zanzibar City"], "Dodoma is the capital; Dar es Salaam is the biggest city.");


    // ============ 🏛️ HISTORY MYSTERY ============
    q("history", 1, "easy", "Which ancient people built the Pyramids of Giza?", "The ancient Egyptians", ["The Romans", "The Vikings", "The Aztecs"], "They were built over 4,500 years ago.");
    q("history", 2, "easy", "Which famous ship hit an iceberg and sank in 1912?", "The Titanic", ["The Mayflower", "The Santa Maria", "The Black Pearl"], "The Titanic sank on its first voyage.");
    q("history", 3, "easy", "Which South African leader spent 27 years in prison before becoming president?", "Nelson Mandela", ["Desmond Tutu", "Steve Biko", "Thabo Mbeki"], "Mandela became president in 1994.");
    q("history", 4, "easy", "Which empire built the Colosseum?", "The Roman Empire", ["The Greek Empire", "The Ottoman Empire", "The Mongol Empire"], "The Colosseum in Rome opened in AD 80.");
    q("history", 5, "easy", "The ancient Olympic Games began in which country?", "Greece", ["Italy", "Egypt", "China"], "They began at Olympia, Greece.");
    q("history", 6, "easy", "Who painted the Mona Lisa?", "Leonardo da Vinci", ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"], "Leonardo painted it in the early 1500s.");
    q("history", 7, "easy", "What were the metal suits that medieval knights wore called?", "Armor", ["Togas", "Kimonos", "Ponchos"], "Armor protected knights in battle.");
    q("history", 8, "easy", "Who was the first president of the United States?", "George Washington", ["Abraham Lincoln", "Thomas Jefferson", "John Adams"], "Washington became president in 1789.");
    q("history", 9, "easy", "Which explorer sailed to the Americas in 1492?", "Christopher Columbus", ["Vasco da Gama", "Marco Polo", "Ferdinand Magellan"], "Columbus crossed the Atlantic in 1492.");
    q("history", 10, "easy", "Which wall in Germany was torn down in 1989?", "The Berlin Wall", ["The Great Wall", "Hadrian's Wall", "The Western Wall"], "Its fall led to Germany reuniting in 1990.");
    q("history", 11, "easy", "Who led India's peaceful struggle for independence?", "Mahatma Gandhi", ["Nelson Mandela", "Winston Churchill", "Martin Luther King Jr."], "Gandhi led nonviolent protests against British rule.");
    q("history", 12, "medium", "In which year did World War II end?", "1945", ["1918", "1939", "1950"], "World War II lasted from 1939 to 1945.");
    q("history", 13, "medium", "Which of the Seven Wonders of the Ancient World is still standing?", "The Great Pyramid of Giza", ["The Colossus of Rhodes", "The Lighthouse of Alexandria", "The Hanging Gardens of Babylon"], "It's the only ancient wonder that survives.");
    q("history", 14, "medium", "In 1957, Ghana became the first country south of the Sahara to gain independence from which colonial power?", "Britain", ["France", "Portugal", "Belgium"], "Kwame Nkrumah led Ghana to independence from Britain.");
    q("history", 15, "medium", "Mansa Musa, often called the richest person in history, ruled which empire?", "The Mali Empire", ["The Roman Empire", "The Ottoman Empire", "The Mongol Empire"], "Mansa Musa ruled Mali in the 1300s; it was rich in gold.");
    q("history", 16, "medium", "What was the first satellite launched into space, in 1957?", "Sputnik 1", ["Apollo 11", "Voyager 1", "Hubble"], "The Soviet Union launched Sputnik 1.");
    q("history", 17, "medium", "Napoleon Bonaparte was emperor of which country?", "France", ["Italy", "Spain", "Russia"], "Napoleon crowned himself Emperor of the French in 1804.");
    q("history", 18, "medium", "Which African country was never colonized, apart from a short Italian occupation?", "Ethiopia", ["Kenya", "Nigeria", "Ghana"], "Ethiopia defeated Italy at the Battle of Adwa in 1896.");
    q("history", 19, "medium", "Who discovered penicillin, the first antibiotic?", "Alexander Fleming", ["Louis Pasteur", "Marie Curie", "Isaac Newton"], "Fleming discovered it in 1928.");
    q("history", 20, "medium", "The Great Wall was built mainly to protect which country?", "China", ["Japan", "India", "Mongolia"], "It protected China from invaders from the north.");
    q("history", 21, "hard", "In which year did Nelson Mandela become president of South Africa?", "1994", ["1990", "1985", "2000"], "He was elected in South Africa's first all-race election in 1994.");
    q("history", 22, "hard", "In which year did humans first land on the Moon?", "1969", ["1959", "1975", "1981"], "Apollo 11 landed on July 20, 1969.");


    // ============ ⚽ FOOTBALL & SPORTS ============
    q("sports", 1, "easy", "How many players does each football (soccer) team have on the pitch?", "11", ["9", "10", "12"], "Ten outfield players plus a goalkeeper.");
    q("sports", 2, "easy", "Which country won the 2022 FIFA World Cup?", "Argentina", ["France", "Brazil", "Germany"], "Argentina beat France on penalties in the final.");
    q("sports", 3, "easy", "In football, which card sends a player off?", "Red", ["Yellow", "Green", "Blue"], "A red card means off the pitch.");
    q("sports", 4, "easy", "Which sport is played at Wimbledon?", "Tennis", ["Golf", "Cricket", "Rugby"], "Wimbledon is the oldest tennis tournament.");
    q("sports", 5, "easy", "How many points is a basketball shot from behind the three-point line?", "3", ["1", "2", "4"], "That's why it's called the three-point line!");
    q("sports", 6, "easy", "Which country hosted the 2010 World Cup, the first in Africa?", "South Africa", ["Nigeria", "Egypt", "Morocco"], "Remember the vuvuzelas?");
    q("sports", 7, "easy", "Which sport uses a shuttlecock?", "Badminton", ["Tennis", "Squash", "Volleyball"], "Badminton players hit a feathered shuttlecock.");
    q("sports", 8, "easy", "How long is a normal football (soccer) match, not counting added time?", "90 minutes", ["60 minutes", "80 minutes", "120 minutes"], "Two halves of 45 minutes.");
    q("sports", 9, "easy", "What is it called when a player scores three goals in one match?", "A hat-trick", ["A triple", "A three-pointer", "A grand slam"], "A hat-trick!");
    q("sports", 10, "easy", "Which footballer is nicknamed 'CR7'?", "Cristiano Ronaldo", ["Ronaldinho", "Kylian Mbappé", "Neymar"], "Cristiano Ronaldo, number 7.");
    q("sports", 11, "easy", "In which sport do you hit a home run?", "Baseball", ["Cricket", "Tennis", "Golf"], "A home run lets the batter run all the bases.");
    q("sports", 12, "medium", "Which country has won the most Africa Cup of Nations titles?", "Egypt", ["Cameroon", "Ghana", "Nigeria"], "Egypt has won the AFCON more times than any other country.");
    q("sports", 13, "medium", "How many rings are on the Olympic flag?", "5", ["4", "6", "7"], "Five linked rings stand for the continents taking part.");
    q("sports", 14, "medium", "FC Barcelona is a football club from which country?", "Spain", ["Italy", "Portugal", "France"], "Barcelona is in Catalonia, Spain.");
    q("sports", 15, "medium", "The Tour de France is a famous race in which sport?", "Cycling", ["Running", "Car racing", "Horse racing"], "It's a three-week bike race.");
    q("sports", 16, "medium", "In tennis, what is a score of zero called?", "Love", ["Nil", "Duck", "Zip"], "'Fifteen–love' means 15 to 0.");
    q("sports", 17, "medium", "Which country won the 2018 FIFA World Cup?", "France", ["Croatia", "Brazil", "Germany"], "France beat Croatia 4–2 in the final.");
    q("sports", 18, "medium", "How many players from one team are on a basketball court at once?", "5", ["6", "7", "4"], "Five players per team.");
    q("sports", 19, "medium", "Who set the 100-meter world record of 9.58 seconds in 2009?", "Usain Bolt", ["Yohan Blake", "Carl Lewis", "Justin Gatlin"], "Jamaica's Usain Bolt ran 9.58 in Berlin.");
    q("sports", 20, "medium", "In cricket, how many balls are in a standard over?", "6", ["4", "5", "8"], "A bowler bowls six balls in an over.");
    q("sports", 21, "hard", "Which African team reached the 2022 World Cup semi-finals, a first for Africa?", "Morocco", ["Senegal", "Ghana", "Cameroon"], "Morocco's Atlas Lions made history in Qatar.");
    q("sports", 22, "hard", "In which year did Spain win their first FIFA World Cup?", "2010", ["2006", "2014", "1998"], "Spain beat the Netherlands 1–0 in South Africa.");


    // ============ 🎬 MOVIES & ENTERTAINMENT ============
    q("movies", 1, "easy", "Which movie features a lion cub named Simba?", "The Lion King", ["Madagascar", "Zootopia", "The Jungle Book"], "Simba grows up to be king in The Lion King.");
    q("movies", 2, "easy", "What is Iron Man's real name?", "Tony Stark", ["Peter Parker", "Bruce Wayne", "Steve Rogers"], "Tony Stark is a genius inventor.");
    q("movies", 3, "easy", "In 'Toy Story', what is the cowboy's name?", "Woody", ["Buzz", "Rex", "Slinky"], "Woody is Andy's favorite cowboy toy.");
    q("movies", 4, "easy", "Which school does Harry Potter go to?", "Hogwarts", ["Xavier's School", "Starfleet Academy", "Nevermore Academy"], "Hogwarts School of Witchcraft and Wizardry.");
    q("movies", 5, "easy", "What kind of creature is Shrek?", "An ogre", ["A troll", "A giant", "A goblin"], "Shrek: ogres are like onions. They have layers!");
    q("movies", 6, "easy", "Which Disney movie stars the sisters Elsa and Anna?", "Frozen", ["Tangled", "Moana", "Encanto"], "Let it go!");
    q("movies", 7, "easy", "What is Spider-Man's real name?", "Peter Parker", ["Tony Stark", "Clark Kent", "Bruce Banner"], "Peter Parker was bitten by a radioactive spider.");
    q("movies", 8, "easy", "Nollywood is the film industry of which country?", "Nigeria", ["Ghana", "India", "Kenya"], "Nollywood makes thousands of films a year.");
    q("movies", 9, "easy", "Which city does Batman protect?", "Gotham City", ["Metropolis", "Central City", "Star City"], "Superman protects Metropolis.");
    q("movies", 10, "easy", "Which superhero is the king of Wakanda?", "Black Panther", ["Thor", "Captain America", "Aquaman"], "T'Challa rules Wakanda.");
    q("movies", 11, "easy", "In 'Finding Nemo', what kind of fish is Nemo?", "A clownfish", ["A goldfish", "A shark", "A pufferfish"], "Nemo is an orange-and-white clownfish.");
    q("movies", 12, "medium", "What is the name of Thor's hammer?", "Mjolnir", ["Excalibur", "Gungnir", "Aegis"], "Only the worthy can lift Mjolnir.");
    q("movies", 13, "medium", "India's huge Hindi-language film industry is known as what?", "Bollywood", ["Nollywood", "Hollywood", "Riverwood"], "Bollywood is based in Mumbai (once called Bombay).");
    q("movies", 14, "medium", "Which movie robot says 'I'll be back'?", "The Terminator", ["WALL-E", "Optimus Prime", "Baymax"], "Arnold Schwarzenegger said it in The Terminator.");
    q("movies", 15, "medium", "In 'The Lion King', who is Simba's evil uncle?", "Scar", ["Mufasa", "Rafiki", "Timon"], "Scar wants to be king.");
    q("movies", 16, "medium", "What sport do Harry Potter characters play on broomsticks?", "Quidditch", ["Wizard chess", "Gobstones", "Broomball"], "Harry plays Seeker in Quidditch.");
    q("movies", 17, "medium", "Which animated movie stars a lonely robot cleaning up Earth?", "WALL-E", ["Big Hero 6", "Robots", "Megamind"], "WALL-E compacts trash on an empty Earth.");
    q("movies", 18, "medium", "In 'Encanto', which family member do they not talk about?", "Bruno", ["Mirabel", "Luisa", "Camilo"], "We don't talk about Bruno, no, no, no!");
    q("movies", 19, "medium", "Who is Luke Skywalker's father?", "Darth Vader", ["Obi-Wan Kenobi", "Han Solo", "Yoda"], "'No, I am your father.'");
    q("movies", 20, "medium", "Which superhero team includes Iron Man, Thor and Hulk?", "The Avengers", ["The Justice League", "The X-Men", "The Fantastic Four"], "Avengers, assemble!");
    q("movies", 21, "hard", "Which movie won the first Oscar for Best Animated Feature, in 2002?", "Shrek", ["Monsters, Inc.", "Ice Age", "Jimmy Neutron: Boy Genius"], "Shrek beat Monsters, Inc. for the very first award.");
    q("movies", 22, "hard", "'The Lord of the Rings' movies were mainly filmed in which country?", "New Zealand", ["Ireland", "Canada", "Norway"], "New Zealand's landscapes became Middle-earth.");


    // ============ 🎮 TECH & GAMING ============
    q("gaming", 1, "easy", "Which company makes the PlayStation?", "Sony", ["Microsoft", "Nintendo", "Apple"], "Sony released the first PlayStation in 1994.");
    q("gaming", 2, "easy", "In Minecraft, which green creature explodes near players?", "A Creeper", ["A Zombie", "An Enderman", "A Slime"], "Ssssss... BOOM.");
    q("gaming", 3, "easy", "What is the name of Mario's brother?", "Luigi", ["Wario", "Toad", "Yoshi"], "Luigi wears green.");
    q("gaming", 4, "easy", "What does 'GG' usually mean after an online game?", "Good game", ["Go go", "Get going", "Great goal"], "GG is a friendly 'well played'.");
    q("gaming", 5, "easy", "Which company makes the Xbox?", "Microsoft", ["Sony", "Nintendo", "Samsung"], "Microsoft launched the first Xbox in 2001.");
    q("gaming", 6, "easy", "In 'Among Us', what are the secret bad guys called?", "Impostors", ["Hackers", "Ghosts", "Robots"], "Crewmates must find the Impostors.");
    q("gaming", 7, "easy", "Which yellow Pokémon is Ash's best friend?", "Pikachu", ["Charmander", "Squirtle", "Bulbasaur"], "Pika pika!");
    q("gaming", 8, "easy", "What does Wi-Fi let your devices do?", "Connect to the internet without cables", ["Charge their batteries", "Print photos", "Play louder"], "Wi-Fi sends data through radio waves.");
    q("gaming", 9, "easy", "Which company makes the iPhone?", "Apple", ["Samsung", "Google", "Sony"], "Apple released the first iPhone in 2007.");
    q("gaming", 10, "easy", "In which game do players build with blocks and survive monsters at night?", "Minecraft", ["Fortnite", "FIFA", "Tetris"], "Minecraft: mine, craft, survive.");
    q("gaming", 11, "easy", "Which game has falling blocks you fit together to clear lines?", "Tetris", ["Pac-Man", "Minecraft", "Pong"], "Tetris was created in 1984.");
    q("gaming", 12, "medium", "What is the name of the hero in 'The Legend of Zelda'?", "Link", ["Zelda", "Ganon", "Mario"], "Surprise: Zelda is the princess. The hero is Link!");
    q("gaming", 13, "medium", "What does 'CPU' stand for?", "Central Processing Unit", ["Computer Power Unit", "Central Program Utility", "Core Processing User"], "The CPU is the computer's brain.");
    q("gaming", 14, "medium", "Which company created Fortnite?", "Epic Games", ["EA", "Ubisoft", "Valve"], "Epic Games released Fortnite in 2017.");
    q("gaming", 15, "medium", "In Pac-Man, what does Pac-Man eat to chase the ghosts?", "Power pellets", ["Coins", "Mushrooms", "Stars"], "Power pellets turn the ghosts blue.");
    q("gaming", 16, "medium", "What does 'www' stand for in web addresses?", "World Wide Web", ["Wide Web World", "Web World Wide", "World Web Window"], "Tim Berners-Lee invented the World Wide Web.");
    q("gaming", 17, "medium", "Which studio originally created Minecraft?", "Mojang", ["Nintendo", "Epic Games", "Rockstar"], "Mojang (now owned by Microsoft) made Minecraft.");
    q("gaming", 18, "medium", "In gaming, what does 'NPC' mean?", "Non-player character", ["New player challenge", "No points counted", "Next power-up coming"], "NPCs are characters controlled by the game.");
    q("gaming", 19, "medium", "Which Nintendo console works both on a TV and as a handheld?", "The Nintendo Switch", ["The Wii", "The Game Boy", "The DS"], "The Switch slides out of its dock.");
    q("gaming", 20, "medium", "What is the name of SEGA's speedy blue hedgehog?", "Sonic", ["Crash", "Spyro", "Knuckles"], "Gotta go fast!");
    q("gaming", 21, "hard", "How many bits are in one byte?", "8", ["4", "16", "10"], "1 byte = 8 bits.");
    q("gaming", 22, "hard", "Who co-founded Microsoft with Paul Allen?", "Bill Gates", ["Steve Jobs", "Mark Zuckerberg", "Elon Musk"], "Gates and Allen founded Microsoft in 1975.");


    // ============ 🐾 ANIMALS & PLANET ============
    q("animals", 1, "easy", "What is the fastest land animal?", "The cheetah", ["The lion", "The horse", "The gazelle"], "Cheetahs can sprint over 100 km/h.");
    q("animals", 2, "easy", "Which animal is called the 'king of the jungle'?", "The lion", ["The tiger", "The elephant", "The gorilla"], "Funny, since lions mostly live on grasslands!");
    q("animals", 3, "easy", "What is the tallest animal in the world?", "The giraffe", ["The elephant", "The ostrich", "The camel"], "Giraffes can be over 5 meters tall.");
    q("animals", 4, "easy", "Which bird is a symbol of peace?", "The dove", ["The crow", "The eagle", "The parrot"], "A white dove often stands for peace.");
    q("animals", 5, "easy", "What do giant pandas mainly eat?", "Bamboo", ["Fish", "Meat", "Grass"], "Pandas eat bamboo for up to 14 hours a day.");
    q("animals", 6, "easy", "Which animal has a trunk?", "The elephant", ["The hippo", "The rhino", "The giraffe"], "An elephant's trunk is its nose and upper lip.");
    q("animals", 7, "easy", "What is a baby dog called?", "A puppy", ["A kitten", "A cub", "A calf"], "Puppies!");
    q("animals", 8, "easy", "Which sea creature has eight arms?", "The octopus", ["The starfish", "The jellyfish", "The crab"], "'Octo' means eight.");
    q("animals", 9, "easy", "Where do polar bears live?", "The Arctic", ["Antarctica", "The Sahara", "The Amazon"], "Polar bears live in the far north. Penguins live in the south.");
    q("animals", 10, "easy", "Where should a used plastic bottle go to help the planet?", "The recycling bin", ["The ocean", "The garden", "A campfire"], "Recycling turns old plastic into new things.");
    q("animals", 11, "easy", "Which animal changes color to blend in?", "The chameleon", ["The zebra", "The cow", "The rabbit"], "Chameleons change color to blend in, show mood or warm up.");
    q("animals", 12, "medium", "Which animal can sleep up to about 20 hours a day?", "The koala", ["The dog", "The horse", "The lion"], "Koalas save energy because eucalyptus leaves give little energy.");
    q("animals", 13, "medium", "Mountain gorillas live in Uganda's Bwindi Forest and which neighboring country?", "Rwanda", ["Egypt", "Nigeria", "Morocco"], "Mountain gorillas live in Uganda, Rwanda and DR Congo.");
    q("animals", 14, "medium", "What is a group of lions called?", "A pride", ["A pack", "A herd", "A school"], "A pride of lions!");
    q("animals", 15, "medium", "What is the largest animal that has ever lived?", "The blue whale", ["The African elephant", "The T. rex", "The great white shark"], "Blue whales can be over 30 meters long.");
    q("animals", 16, "medium", "Which animal carries its baby in a pouch?", "The kangaroo", ["The camel", "The lion", "The penguin"], "Baby kangaroos (joeys) live in the pouch.");
    q("animals", 17, "medium", "Which big cat has black spots called rosettes?", "The leopard", ["The lion", "The tiger", "The puma"], "Tigers have stripes; leopards have rosettes.");
    q("animals", 18, "medium", "What is the only mammal that can truly fly?", "The bat", ["The flying squirrel", "The sugar glider", "The ostrich"], "Flying squirrels only glide. Bats really fly.");
    q("animals", 19, "medium", "Which animal is called 'the ship of the desert'?", "The camel", ["The horse", "The donkey", "The elephant"], "Camels can travel far with little water.");
    q("animals", 20, "medium", "Lemurs live in the wild only on which island country?", "Madagascar", ["Mauritius", "Jamaica", "Iceland"], "Madagascar is off Africa's southeast coast.");
    q("animals", 21, "hard", "What do we call animals that eat both plants and meat?", "Omnivores", ["Herbivores", "Carnivores", "Insectivores"], "Humans and bears are omnivores.");
    q("animals", 22, "hard", "What is the largest fish in the ocean?", "The whale shark", ["The blue whale", "The great white shark", "The manta ray"], "Tricky: the blue whale is a mammal, not a fish!");


    // ============ 🤯 FUN FACTS & BRAIN TEASERS ============
    q("funfacts", 1, "easy", "What has keys but can't open locks?", "A piano", ["A map", "A door", "A car"], "A piano has 88 keys and no locks!");
    q("funfacts", 2, "easy", "What gets wetter the more it dries?", "A towel", ["A sponge", "The rain", "A puddle"], "A towel dries you and gets wet itself.");
    q("funfacts", 3, "easy", "How many months have 28 days?", "All 12", ["1", "2", "6"], "Every month has at least 28 days!");
    q("funfacts", 4, "easy", "What has hands but can't clap?", "A clock", ["A glove", "A robot", "A statue"], "Clock hands point to the time.");
    q("funfacts", 5, "easy", "What has a neck but no head?", "A bottle", ["A snake", "A pencil", "A spoon"], "A bottle has a neck but no head.");
    q("funfacts", 6, "easy", "Which weighs more: a kilogram of feathers or a kilogram of bricks?", "They weigh the same", ["The bricks", "The feathers", "It depends on the weather"], "A kilogram is a kilogram!");
    q("funfacts", 7, "easy", "What can you catch but not throw?", "A cold", ["A ball", "A frisbee", "A fish"], "You catch a cold, but you can't throw one.");
    q("funfacts", 8, "easy", "What has lots of teeth but can't bite?", "A comb", ["A shark", "A dog", "A crocodile"], "A comb's teeth untangle hair.");
    q("funfacts", 9, "easy", "What runs but never walks?", "A river", ["A tree", "A rock", "A chair"], "Rivers run to the sea.");
    q("funfacts", 10, "easy", "What has one eye but can't see?", "A needle", ["A cat", "A spoon", "A shoe"], "A needle's 'eye' is the hole for the thread.");
    q("funfacts", 11, "easy", "What goes up but never comes down?", "Your age", ["A ball", "A balloon", "An elevator"], "Your age only goes up!");
    q("funfacts", 12, "medium", "You have 3 apples and you take away 2. How many apples do YOU have?", "2", ["1", "3", "5"], "You took 2, so you have 2!");
    q("funfacts", 13, "medium", "What comes once in a minute, twice in a moment, and never in a thousand years?", "The letter M", ["The letter T", "A second", "A heartbeat"], "Look at the spelling: M-inute, M-o-M-ent.");
    q("funfacts", 14, "medium", "A rooster lays an egg on the top of a roof. Which way does it roll?", "It doesn't: roosters don't lay eggs", ["Left", "Right", "Down the middle"], "Only hens lay eggs!");
    q("funfacts", 15, "medium", "How many times can you subtract 5 from 25?", "Once", ["5 times", "4 times", "25 times"], "After the first time, you're subtracting from 20!");
    q("funfacts", 16, "medium", "What is full of holes but still holds water?", "A sponge", ["A net", "A sieve", "A bucket"], "A sponge soaks up water in its holes.");
    q("funfacts", 17, "medium", "Which word gets shorter when you add two letters to it?", "Short", ["Long", "Tall", "Small"], "Short + 'er' = shorter!");
    q("funfacts", 18, "medium", "Botanists classify bananas as which of these?", "Berries", ["Vegetables", "Nuts", "Seeds"], "Strange but true: bananas are berries. Strawberries aren't!");
    q("funfacts", 19, "medium", "Which letter doesn't appear in any U.S. state name?", "Q", ["Z", "X", "J"], "There's a Z in Arizona, an X in Texas, a J in New Jersey... but no Q!");
    q("funfacts", 20, "medium", "Which food can last for thousands of years without spoiling if sealed?", "Honey", ["Bread", "Milk", "Cheese"], "Edible honey has been found in ancient Egyptian tombs.");
    q("funfacts", 21, "hard", "A bat and a ball cost 1 dollar 10 cents in total. The bat costs 1 dollar more than the ball. How much is the ball?", "5 cents", ["10 cents", "15 cents", "1 dollar"], "Ball 5¢ + bat $1.05 = $1.10. Most people say 10¢!");
    q("funfacts", 22, "hard", "5 machines make 5 phone cases in 5 minutes. How long do 100 machines take to make 100 cases?", "5 minutes", ["100 minutes", "20 minutes", "50 minutes"], "Each machine makes one case in 5 minutes.");


    // ============ 🎤 POP CULTURE ============
    q("pop", 1, "easy", "Which app is famous for short videos, dances and trends?", "TikTok", ["Wikipedia", "Google Maps", "Gmail"], "TikTok made short videos huge.");
    q("pop", 2, "easy", "Which app has a white ghost on a yellow logo?", "Snapchat", ["Instagram", "WhatsApp", "YouTube"], "The ghost is called Ghostface Chillah!");
    q("pop", 3, "easy", "What does 'LOL' stand for?", "Laughing out loud", ["Lots of love", "Lots of laughs", "Look out loud"], "LOL = laughing out loud.");
    q("pop", 4, "easy", "Which company's logo is an apple with a bite taken out?", "Apple", ["Samsung", "Google", "Microsoft"], "The bitten apple is one of the world's best-known logos.");
    q("pop", 5, "easy", "RM, Jin, Suga, J-Hope, Jimin, V and Jungkook are members of which band?", "BTS", ["Blackpink", "EXO", "Twice"], "BTS is a South Korean boy band.");
    q("pop", 6, "easy", "Which singer is famous for 'Shape of You'?", "Ed Sheeran", ["Bruno Mars", "Justin Bieber", "Sam Smith"], "Ed Sheeran released it in 2017.");
    q("pop", 7, "easy", "Which messaging app has a green logo with a phone inside a speech bubble?", "WhatsApp", ["Telegram", "Messenger", "Snapchat"], "WhatsApp's logo is a green speech bubble.");
    q("pop", 8, "easy", "Burna Boy, Wizkid and Davido are stars of which music genre?", "Afrobeats", ["K-pop", "Country", "Opera"], "Afrobeats grew out of Nigeria and Ghana.");
    q("pop", 9, "easy", "What does the 😂 emoji usually mean?", "Laughing so hard you cry", ["Feeling very sad", "Feeling sleepy", "Being angry"], "It's officially called 'Face with Tears of Joy'.");
    q("pop", 10, "easy", "Which website is famous for watching and uploading videos?", "YouTube", ["Wikipedia", "Amazon", "LinkedIn"], "People upload hundreds of hours of video to YouTube every minute.");
    q("pop", 11, "easy", "Which Jamaican musician is famous for reggae songs like 'One Love'?", "Bob Marley", ["Shaggy", "Sean Paul", "Damian Marley"], "Bob Marley made reggae famous worldwide.");
    q("pop", 12, "medium", "K-pop comes from which country?", "South Korea", ["Japan", "China", "Thailand"], "The K stands for Korea.");
    q("pop", 13, "medium", "Burna Boy is from which country?", "Nigeria", ["Ghana", "South Africa", "Kenya"], "Burna Boy is from Port Harcourt, Nigeria.");
    q("pop", 14, "medium", "Which singer released the album '21' with 'Rolling in the Deep'?", "Adele", ["Rihanna", "Beyoncé", "Taylor Swift"], "Adele named her albums after her age.");
    q("pop", 15, "medium", "Which South African song started a worldwide dance challenge in 2020?", "Jerusalema", ["Despacito", "Macarena", "Gangnam Style"], "Master KG's 'Jerusalema' got the whole world dancing.");
    q("pop", 16, "medium", "What does 'DM' mean on social media?", "Direct message", ["Daily meme", "Don't mind", "Data mode"], "'Slide into my DMs' means send a private message.");
    q("pop", 17, "medium", "Which yellow cartoon family lives in Springfield?", "The Simpsons", ["Family Guy", "The Flintstones", "The Incredibles"], "The Simpsons began in 1989.");
    q("pop", 18, "medium", "Which superhero comes from the planet Krypton?", "Superman", ["Batman", "Spider-Man", "Iron Man"], "Superman was sent to Earth as a baby.");
    q("pop", 19, "medium", "The hit song 'Despacito' is mainly sung in which language?", "Spanish", ["Portuguese", "Italian", "French"], "'Despacito' means 'slowly' in Spanish.");
    q("pop", 20, "medium", "Who is known as the 'King of Pop' and sang 'Thriller'?", "Michael Jackson", ["Elvis Presley", "Prince", "Usher"], "'Thriller' is one of the best-selling albums ever.");
    q("pop", 21, "hard", "Which South African singer won the first Grammy for Best African Music Performance, for 'Water'?", "Tyla", ["Tems", "Burna Boy", "Ayra Starr"], "Tyla won the new award in 2024.");
    q("pop", 22, "hard", "In which year was YouTube founded?", "2005", ["2000", "2010", "1998"], "The first YouTube video went up in April 2005.");


    // ============ 🏠 EVERYDAY LIFE ============
    q("life", 1, "easy", "What is the best drink when you're thirsty after sport?", "Water", ["Soda", "Coffee", "Syrup"], "Water rehydrates you best.");
    q("life", 2, "easy", "About how many hours of sleep do teenagers need each night?", "8 to 10 hours", ["3 to 4 hours", "12 to 15 hours", "1 to 2 hours"], "Teens need 8–10 hours to feel and do their best.");
    q("life", 3, "easy", "What does a red traffic light mean?", "Stop", ["Go", "Speed up", "Turn around"], "Red means stop.");
    q("life", 4, "easy", "What should you do before crossing a road?", "Look both ways", ["Close your eyes", "Run fast", "Look at your phone"], "Look left and right (and left again).");
    q("life", 5, "easy", "Which of these is the healthiest snack?", "An apple", ["A bag of candy", "A can of soda", "A slice of cake"], "Fruit gives you vitamins and fiber.");
    q("life", 6, "easy", "What is a budget?", "A plan for spending and saving money", ["A type of bank", "A shopping app", "A kind of loan"], "A budget helps you control your money.");
    q("life", 7, "easy", "What should you never share online with strangers?", "Your password", ["Your favorite color", "A funny meme", "A joke"], "Keep passwords private, always.");
    q("life", 8, "easy", "What's the best way to stop germs when you cough?", "Cough into your elbow", ["Cough into the air", "Cough on your friend", "Cough into your food"], "Your elbow catches germs without spreading them with your hands.");
    q("life", 9, "easy", "Which of these is a need rather than a want?", "Food", ["New sneakers", "A video game", "Concert tickets"], "Needs keep us alive; wants are nice extras.");
    q("life", 10, "easy", "You find someone's lost wallet. What should you do?", "Hand it in or return it", ["Keep the money", "Throw it away", "Hide it"], "Returning it is the honest thing to do.");
    q("life", 11, "easy", "How often should you brush your teeth?", "Twice a day", ["Once a week", "Once a month", "Only before parties"], "Morning and night keeps cavities away.");
    q("life", 12, "medium", "A pan of cooking oil catches fire. What should you do?", "Cover it with a lid and turn off the heat", ["Throw water on it", "Blow on it", "Carry it outside"], "Water makes oil fires explode. Smother them instead.");
    q("life", 13, "medium", "A phone costs 300 dollars. You save 50 dollars a month. How many months until you can buy it?", "6", ["5", "8", "10"], "50 × 6 = 300.");
    q("life", 14, "medium", "What does 'RSVP' on an invitation ask you to do?", "Reply to say if you're coming", ["Bring a gift", "Dress formally", "Arrive early"], "RSVP comes from French: 'please respond'.");
    q("life", 15, "medium", "Which password is the strongest?", "A long mix of letters, numbers and symbols", ["password", "123456", "Your first name"], "Long and random is hardest to guess.");
    q("life", 16, "medium", "When you borrow money, what is the extra you pay back called?", "Interest", ["A tip", "Change", "A refund"], "Interest is the cost of borrowing.");
    q("life", 17, "medium", "What's the main reason to wear a seatbelt?", "To protect you in a crash", ["To look cool", "To keep your seat clean", "To stay warm"], "Seatbelts save thousands of lives every year.");
    q("life", 18, "medium", "What should you check on packaged food before eating it?", "The expiry date", ["The barcode", "The font", "The brand's logo"], "Expired food can make you sick.");
    q("life", 19, "medium", "Which usually costs less: cooking at home or eating out every day?", "Cooking at home", ["Eating out every day", "They cost the same", "It's always free"], "Home cooking usually saves money.");
    q("life", 20, "medium", "What does 'Wi-Fi password' protect?", "Your network from strangers using it", ["Your phone's screen", "Your battery", "Your photos from fading"], "A password stops others using your internet.");
    q("life", 21, "hard", "You earn 10 dollars an hour, work 6 hours, then spend 15 dollars. How much is left?", "45 dollars", ["60 dollars", "35 dollars", "50 dollars"], "10 × 6 = 60, and 60 − 15 = 45.");
    q("life", 22, "hard", "A 20-dollar meal and you leave a 15% tip. How much is the tip?", "3 dollars", ["2 dollars", "1.50 dollars", "5 dollars"], "10% is 2 dollars and 5% is 1 dollar: 3 dollars.");


    // ============ 🕵️ WHO AM I? ============
    q("whoami", 1, "easy", "I'm the red planet that robot rovers have explored. Who am I?", "Mars", ["Venus", "Jupiter", "Mercury"], "Mars looks red because of rusty dust.");
    q("whoami", 2, "easy", "I'm a boy wizard with a lightning-bolt scar. Who am I?", "Harry Potter", ["Ron Weasley", "Percy Jackson", "Frodo"], "The boy who lived!");
    q("whoami", 3, "easy", "I'm a plumber in a red cap who saves Princess Peach. Who am I?", "Mario", ["Luigi", "Wario", "Sonic"], "It's-a me, Mario!");
    q("whoami", 4, "easy", "I'm a horse-like animal with black and white stripes. Who am I?", "A zebra", ["A giraffe", "A tiger", "A panda"], "No two zebras have the same stripes.");
    q("whoami", 5, "easy", "I'm the star at the center of our solar system. Who am I?", "The Sun", ["The Moon", "The North Star", "Mars"], "All the planets orbit me.");
    q("whoami", 6, "easy", "I'm the scientist famous for E = mc². Who am I?", "Albert Einstein", ["Isaac Newton", "Charles Darwin", "Galileo"], "Einstein's theory of relativity changed physics.");
    q("whoami", 7, "easy", "I'm the Argentine captain who won the 2022 World Cup. Who am I?", "Lionel Messi", ["Cristiano Ronaldo", "Kylian Mbappé", "Neymar"], "Messi finally lifted the World Cup in Qatar.");
    q("whoami", 8, "easy", "I'm an Italian city with a famous leaning tower. Who am I?", "Pisa", ["Rome", "Venice", "Florence"], "The Leaning Tower of Pisa started tilting while it was being built.");
    q("whoami", 9, "easy", "I'm the plastic toy bricks from Denmark that click together. Who am I?", "LEGO", ["Jenga", "K'Nex", "Play-Doh"], "'LEGO' comes from Danish 'leg godt': play well.");
    q("whoami", 10, "easy", "I'm the orange vegetable people carve faces into at Halloween. Who am I?", "A pumpkin", ["A carrot", "An orange", "A sweet potato"], "Carved pumpkins are called jack-o'-lanterns.");
    q("whoami", 11, "easy", "I'm Disney's famous mouse with round black ears. Who am I?", "Mickey Mouse", ["Jerry", "Stuart Little", "Speedy Gonzales"], "Mickey first appeared in 1928.");
    q("whoami", 12, "medium", "I'm a Kenyan runner who ran a marathon in under 2 hours in 2019. Who am I?", "Eliud Kipchoge", ["Usain Bolt", "Mo Farah", "Haile Gebrselassie"], "He ran 1:59:40 in Vienna.");
    q("whoami", 13, "medium", "I'm a detective who lives at 221B Baker Street. Who am I?", "Sherlock Holmes", ["Hercule Poirot", "Inspector Gadget", "Scooby-Doo"], "Elementary, my dear Watson!");
    q("whoami", 14, "medium", "I'm the giant planet with a huge storm called the Great Red Spot. Who am I?", "Jupiter", ["Saturn", "Neptune", "Mars"], "The Great Red Spot is wider than Earth.");
    q("whoami", 15, "medium", "I painted 'The Starry Night' and cut off part of my ear. Who am I?", "Vincent van Gogh", ["Pablo Picasso", "Claude Monet", "Leonardo da Vinci"], "Van Gogh painted it in 1889.");
    q("whoami", 16, "medium", "I'm the famous queen of ancient Egypt who allied with Mark Antony. Who am I?", "Cleopatra", ["Nefertiti", "Queen Victoria", "Joan of Arc"], "Cleopatra was the last active ruler of her dynasty.");
    q("whoami", 17, "medium", "I'm a tree-like hero who only ever says 'I am Groot'. Who am I?", "Groot", ["Rocket", "Drax", "Ent"], "Groot is one of the Guardians of the Galaxy.");
    q("whoami", 18, "medium", "I co-founded Apple with Steve Wozniak. Who am I?", "Steve Jobs", ["Bill Gates", "Elon Musk", "Jeff Bezos"], "Jobs and Wozniak started Apple in a garage in 1976.");
    q("whoami", 19, "medium", "I'm Nigeria's biggest city, but not its capital. Who am I?", "Lagos", ["Abuja", "Kano", "Accra"], "Lagos was the capital until 1991; now it's Abuja.");
    q("whoami", 20, "medium", "I won 23 Grand Slam singles titles and my sister is Venus. Who am I?", "Serena Williams", ["Naomi Osaka", "Maria Sharapova", "Simone Biles"], "Serena is one of the greatest tennis players ever.");
    q("whoami", 21, "hard", "I was the first woman to win a Nobel Prize. Who am I?", "Marie Curie", ["Ada Lovelace", "Florence Nightingale", "Rosalind Franklin"], "Marie Curie won Nobel Prizes in physics and chemistry.");
    q("whoami", 22, "hard", "I'm the Ethiopian capital where the African Union has its headquarters. Who am I?", "Addis Ababa", ["Nairobi", "Cairo", "Abuja"], "The AU headquarters is in Addis Ababa.");


    // ============ ✅ TRUE OR FALSE ============
    tf("truefalse", 1, "easy", "The Sun is a star.", true, "The Sun is a medium-sized star.");
    tf("truefalse", 2, "easy", "Spiders are insects.", false, "Spiders are arachnids: they have 8 legs. Insects have 6.");
    tf("truefalse", 3, "easy", "At sea level, water boils at 100°C.", true, "Yes: 100°C, or 212°F.");
    tf("truefalse", 4, "easy", "A football (soccer) team has 15 players on the pitch.", false, "It's 11 players per team.");
    tf("truefalse", 5, "easy", "Bats are blind.", false, "Myth! Bats can see, and many also use echoes to hunt.");
    tf("truefalse", 6, "easy", "Mount Everest is the highest mountain above sea level.", true, "Everest is about 8,849 meters high.");
    tf("truefalse", 7, "easy", "Penguins can fly.", false, "Penguins can't fly, but they're amazing swimmers.");
    tf("truefalse", 8, "easy", "Tomatoes are fruits.", true, "Botanically, tomatoes are fruits because they have seeds.");
    tf("truefalse", 9, "easy", "The Sahara Desert is in Africa.", true, "It covers much of North Africa.");
    tf("truefalse", 10, "easy", "Sharks are mammals.", false, "Sharks are fish. Whales and dolphins are mammals.");
    tf("truefalse", 11, "easy", "The Moon makes its own light.", false, "The Moon reflects light from the Sun.");
    tf("truefalse", 12, "medium", "You can see the Great Wall of China from the Moon with your bare eyes.", false, "A famous myth: it's far too narrow to see from the Moon.");
    tf("truefalse", 13, "medium", "Lightning is hotter than the surface of the Sun.", true, "Lightning can reach about 30,000°C, about five times hotter.");
    tf("truefalse", 14, "medium", "An octopus has three hearts.", true, "Two pump blood to the gills, one to the rest of the body.");
    tf("truefalse", 15, "medium", "A group of crows is called a 'murder'.", true, "A murder of crows. Spooky!");
    tf("truefalse", 16, "medium", "Goldfish only have a 3-second memory.", false, "Myth! Goldfish can remember things for months.");
    tf("truefalse", 17, "medium", "Venus is the hottest planet in our solar system.", true, "Its thick clouds trap heat, so it's hotter than Mercury.");
    tf("truefalse", 18, "medium", "Mount Kilimanjaro is in Kenya.", false, "It's in Tanzania, near the Kenyan border.");
    tf("truefalse", 19, "medium", "Light travels faster than sound.", true, "That's why you see lightning before you hear thunder.");
    tf("truefalse", 20, "medium", "Antarctica is a desert.", true, "It gets very little rain or snow, so it counts as a desert.");
    tf("truefalse", 21, "hard", "There are more trees on Earth than stars in the Milky Way.", true, "About 3 trillion trees, and roughly 100–400 billion stars.");
    tf("truefalse", 22, "hard", "Napoleon was extremely short for his time.", false, "Myth! He was about average height for a Frenchman back then.");


    return { categories, questions };

})();
