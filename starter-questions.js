// ==========================================
// LIFE QUEST: STARTER QUESTIONS
// Loaded after questions.js and before engine.js (see index.html).
//
// Starter is the most supported level: one idea per question, short everyday
// wording, and exactly two choices. The questions join the same 8 worlds as
// every other question and go through the same QuestionEngine, so they get
// the same no-repeat, history, Practice Mistakes and Classroom rules.
//
// HOW TO ADD A STARTER QUESTION
//   s("id", "Question?", "Correct answer", "Wrong answer", "Short explanation.", "skill")
//   • The id is permanent: never reuse or change one (saved progress uses it).
//   • Keep it to one idea. No trick wording, no double negatives.
//   • The wrong answer must be clearly wrong, never "also sort of right".
//   • "skill" names what the question practises (e.g. "counting", "safety"),
//     so progress can later be tracked by skill.
// ==========================================

"use strict";

(function () {

    // type: what kind of thinking the question asks for (for future adaptive play)
    function s(id, question, correctAnswer, wrongAnswer, explanation, skill, type = "everyday") {
        return {
            id: "starter-" + id,
            question: question,
            answers: [correctAnswer, wrongAnswer],
            correct: 0,                 // answers are shuffled when shown
            difficulty: "starter",
            explanation: explanation,
            skill: skill,
            type: type
        };
    }

    const starter = {

        // 🌍 World Explorer: weather, nature, the world around us
        world: [
            s("world-01", "What gives us light during the day?", "The sun", "The moon", "The sun lights up the sky during the day.", "nature", "recognition"),
            s("world-02", "Which season is usually the coldest?", "Winter", "Summer", "Winter is the coldest season. Summer is the hottest.", "seasons", "recognition"),
            s("world-03", "What falls from the clouds when it rains?", "Water", "Sand", "Rain is water falling from the clouds.", "weather", "recognition"),
            s("world-04", "It is snowing outside. What should you wear?", "A warm coat", "Shorts", "A warm coat keeps you warm in the snow.", "weather", "everyday"),
            s("world-05", "What color is the sky on a clear, sunny day?", "Blue", "Green", "On a clear day, the sky looks blue.", "colors", "recognition"),
            s("world-06", "Where do fish live?", "In water", "In trees", "Fish live in water, like lakes, rivers, and oceans.", "animals", "recognition"),
            s("world-07", "What do plants need to grow?", "Water and sunlight", "Salt and sand", "Plants need water and sunlight to grow.", "nature", "recognition"),
            s("world-08", "What colors are on the American flag?", "Red, white, and blue", "Green and yellow", "The American flag is red, white, and blue.", "our country", "recognition"),
            s("world-09", "What is snow made of?", "Frozen water", "Cotton", "Snow is frozen water that falls from the clouds.", "weather", "recognition"),
            s("world-10", "Which animal can fly?", "A bird", "A horse", "Birds use their wings to fly.", "animals", "recognition"),
            s("world-11", "When is it usually dark outside?", "At night", "At noon", "It gets dark at night, after the sun goes down.", "time", "recognition"),
            s("world-12", "Which country has 50 states?", "The United States", "Canada", "The United States has 50 states.", "our country", "recognition"),
            s("world-13", "What do bees make?", "Honey", "Milk", "Bees make honey.", "animals", "recognition"),
            s("world-14", "Which one is very hot?", "The sun", "An ice cube", "The sun is very, very hot. Ice is cold.", "nature", "compare")
        ],

        // 🇺🇸 Pop Culture: music, movies, holidays, fun
        pop: [
            s("pop-01", "Which one do you use to listen to music?", "Headphones", "A fork", "Headphones let you listen to music.", "technology", "everyday"),
            s("pop-02", "Where do people go to watch a new movie on a big screen?", "A movie theater", "A bank", "Movie theaters show movies on a big screen.", "places", "everyday"),
            s("pop-03", "Which one is a musical instrument?", "A guitar", "A pillow", "You can play music on a guitar.", "music", "recognition"),
            s("pop-04", "Which one can you play video games on?", "A game console", "A toaster", "A game console is made for playing video games.", "technology", "recognition"),
            s("pop-05", "What snack do people often eat at the movies?", "Popcorn", "Soup", "Popcorn is a popular movie snack.", "food", "everyday"),
            s("pop-06", "Which superhero wears a cape with a big 'S' on his chest?", "Superman", "Batman", "Superman has a big 'S' on his chest.", "superheroes", "recognition"),
            s("pop-07", "Which holiday has a big turkey dinner in November?", "Thanksgiving", "Halloween", "Many families eat turkey on Thanksgiving.", "holidays", "recognition"),
            s("pop-08", "On which holiday do people wear costumes and say 'trick or treat'?", "Halloween", "Thanksgiving", "People dress up and say 'trick or treat' on Halloween.", "holidays", "recognition"),
            s("pop-09", "Which one takes pictures?", "A camera", "A spoon", "A camera takes pictures.", "technology", "recognition"),
            s("pop-10", "Which holiday is on July 4th?", "Independence Day", "Christmas", "Independence Day is July 4th. It is America's birthday.", "holidays", "recognition"),
            s("pop-11", "Which one is Disney's famous cartoon mouse?", "Mickey Mouse", "Garfield", "Mickey Mouse is Disney's famous mouse. Garfield is a cat.", "cartoons", "recognition"),
            s("pop-12", "What do people do at a concert?", "Listen to music", "Take a bath", "At a concert, people listen to music.", "music", "everyday"),
            s("pop-13", "What do people often send to friends on phones?", "Text messages", "Sandwiches", "People send text messages on their phones.", "technology", "everyday")
        ],

        // 🧠 Brain Power: numbers, shapes, colors, animals
        brain: [
            s("brain-01", "You have 2 apples. You get 1 more. How many apples do you have now?", "3", "5", "2 apples plus 1 more apple makes 3 apples.", "adding", "math"),
            s("brain-02", "What is 1 plus 1?", "2", "4", "1 plus 1 is 2.", "adding", "math"),
            s("brain-03", "Which number is bigger?", "10", "3", "10 is bigger than 3.", "comparing numbers", "math"),
            s("brain-04", "How many fingers are on one hand?", "5", "8", "One hand has 5 fingers.", "counting", "math"),
            s("brain-05", "When you count, what number comes after 3?", "4", "7", "We count 1, 2, 3, 4.", "counting", "math"),
            s("brain-06", "What color is a ripe banana?", "Yellow", "Blue", "A ripe banana is yellow.", "colors", "recognition"),
            s("brain-07", "What shape is a basketball?", "Round", "Square", "A basketball is round, like a circle.", "shapes", "recognition"),
            s("brain-08", "How many sides does a square have?", "4", "6", "A square has 4 sides.", "shapes", "math"),
            s("brain-09", "Which animal says 'meow'?", "A cat", "A dog", "Cats say 'meow.' Dogs bark.", "animals", "recognition"),
            s("brain-10", "Which animal lives in the ocean?", "A shark", "A cow", "Sharks live in the ocean. Cows live on farms.", "animals", "recognition"),
            s("brain-11", "What is 5 minus 1?", "4", "6", "5 take away 1 is 4.", "subtracting", "math"),
            s("brain-12", "What color are most leaves in summer?", "Green", "Purple", "In summer, most leaves are green.", "colors", "recognition"),
            s("brain-13", "How many wheels does a car have?", "4", "2", "Most cars have 4 wheels.", "counting", "math"),
            s("brain-14", "What is 5 plus 5?", "10", "15", "5 plus 5 is 10.", "adding", "math")
        ],

        // 💰 Real Life: money, time, food, home, safety
        life: [
            s("life-01", "You are thirsty. What should you drink?", "Water", "Sand", "Water is the best drink when you are thirsty.", "health", "everyday"),
            s("life-02", "Which one is a fruit?", "An apple", "A rock", "An apple is a fruit you can eat.", "food", "recognition"),
            s("life-03", "Which one costs more money?", "A car", "A pencil", "A car costs much more money than a pencil.", "money", "compare"),
            s("life-04", "Which coin is worth more?", "A quarter", "A penny", "A quarter is 25 cents. A penny is 1 cent.", "money", "compare"),
            s("life-05", "When do most people eat breakfast?", "In the morning", "At midnight", "Breakfast is the first meal of the day, in the morning.", "time", "everyday"),
            s("life-06", "Where do you keep milk cold?", "In the refrigerator", "In the oven", "The refrigerator keeps food and drinks cold.", "home", "everyday"),
            s("life-07", "What do you use to brush your teeth?", "A toothbrush", "A hairbrush", "A toothbrush cleans your teeth.", "health", "everyday"),
            s("life-08", "Before you cross the street, what should you do?", "Look both ways", "Close your eyes", "Look left and right for cars before you cross.", "safety", "safety"),
            s("life-09", "What does a red traffic light mean?", "Stop", "Go", "Red means stop. Green means go.", "safety", "safety"),
            s("life-10", "In an emergency, what number do you call?", "911", "123", "Call 911 in an emergency to get help fast.", "safety", "safety"),
            s("life-11", "It is raining. What can keep you dry?", "An umbrella", "Sunglasses", "An umbrella keeps the rain off you.", "weather", "everyday"),
            s("life-12", "Your hands are dirty and it is time to eat. What should you do first?", "Wash your hands with soap", "Start eating", "Washing with soap removes germs before you eat.", "health", "everyday"),
            s("life-13", "When do most people eat lunch?", "Around noon", "At bedtime", "Lunch is usually eaten around the middle of the day.", "time", "everyday"),
            s("life-14", "What do you use to pay at a store?", "Money", "Leaves", "You pay for things at a store with money.", "money", "everyday"),
            s("life-15", "Where do you buy groceries like milk and bread?", "A grocery store", "A post office", "Grocery stores sell food. Post offices send mail.", "places", "everyday"),
            s("life-16", "A stove is very hot. What should you do?", "Keep your hands away", "Touch it", "Hot things can burn you, so keep your hands away.", "safety", "safety")
        ],

        // 🏫 School Challenge: letters, words, school life
        school: [
            s("school-01", "Which one do you use to write on paper?", "A pencil", "A shoe", "You write on paper with a pencil.", "school supplies", "everyday"),
            s("school-02", "Which letter comes after A?", "B", "M", "The alphabet starts A, B, C.", "letters", "recognition"),
            s("school-03", "Which word starts with the letter B?", "Ball", "Cat", "'Ball' starts with B. 'Cat' starts with C.", "letters", "recognition"),
            s("school-04", "Where do students eat lunch at school?", "The cafeteria", "The parking lot", "Students eat lunch in the cafeteria.", "school places", "everyday"),
            s("school-05", "Who helps you learn in class?", "A teacher", "A bus driver", "Teachers help students learn in class.", "people at school", "everyday"),
            s("school-06", "You want to ask a question in class. What do you raise?", "Your hand", "Your foot", "Raise your hand when you want to ask a question.", "classroom rules", "everyday"),
            s("school-07", "Which one do you use to cut paper?", "Scissors", "A spoon", "Scissors cut paper.", "school supplies", "everyday"),
            s("school-08", "Which day comes after Monday?", "Tuesday", "Friday", "The days go Monday, then Tuesday.", "days of the week", "recognition"),
            s("school-09", "How many days are in one week?", "7", "10", "A week has 7 days.", "days of the week", "math"),
            s("school-10", "What do many students carry their books in?", "A backpack", "A cereal bowl", "A backpack holds books and supplies.", "school supplies", "everyday"),
            s("school-11", "Which word is a color?", "Red", "Run", "Red is a color. Run is something you do.", "words", "recognition"),
            s("school-12", "What do you use to fix a pencil mistake?", "An eraser", "A cup", "An eraser rubs out pencil marks.", "school supplies", "everyday"),
            s("school-13", "Which letter does the word 'dog' start with?", "D", "G", "'Dog' starts with the letter D.", "letters", "recognition"),
            s("school-14", "Which one do you read?", "A book", "A chair", "You read a book.", "reading", "recognition")
        ],

        // ⚽ Sports Arena: sports, games, staying active
        sports: [
            s("sports-01", "Which sport uses a hoop?", "Basketball", "Swimming", "In basketball, you shoot the ball through a hoop.", "sports", "recognition"),
            s("sports-02", "In soccer, what do players kick?", "A ball", "A racket", "Soccer players kick a ball.", "sports", "recognition"),
            s("sports-03", "Where do people swim?", "In a pool", "In a library", "People swim in a pool, a lake, or the ocean.", "sports", "everyday"),
            s("sports-04", "What should you wear on your head when you ride a bike?", "A helmet", "A sock", "A helmet protects your head.", "safety", "safety"),
            s("sports-05", "Which one is a sport?", "Baseball", "Sleeping", "Baseball is a sport.", "sports", "recognition"),
            s("sports-06", "What do you hit a baseball with?", "A bat", "A pillow", "Baseball players hit the ball with a bat.", "sports", "recognition"),
            s("sports-07", "What is the best drink when you exercise?", "Water", "Syrup", "Water helps your body when you exercise.", "health", "everyday"),
            s("sports-08", "Which ball is bigger?", "A basketball", "A tennis ball", "A basketball is much bigger than a tennis ball.", "sports", "compare"),
            s("sports-09", "Which sport is played on ice with skates?", "Hockey", "Golf", "Hockey players skate on ice.", "sports", "recognition"),
            s("sports-10", "What does a referee do?", "Makes sure players follow the rules", "Sells snacks", "A referee watches the game and makes sure everyone plays fair.", "sports", "everyday"),
            s("sports-11", "In American football, what do players throw?", "A football", "A chair", "Players throw and catch a football.", "sports", "recognition"),
            s("sports-12", "Your teammate misses a shot. What is a kind thing to say?", "Nice try!", "You are bad.", "Kind words help your team.", "teamwork", "social"),
            s("sports-13", "What has two wheels and pedals?", "A bike", "A boat", "A bike has two wheels and pedals.", "transportation", "recognition"),
            s("sports-14", "What do runners try to reach in a race?", "The finish line", "The parking lot", "Runners race to the finish line.", "sports", "recognition")
        ],

        // 💼 Work Ready: jobs and community helpers
        work: [
            s("work-01", "Who puts out fires?", "A firefighter", "A baker", "Firefighters put out fires and keep people safe.", "community helpers", "recognition"),
            s("work-02", "Who helps you when you are sick?", "A doctor", "A pilot", "Doctors help sick people get better.", "community helpers", "recognition"),
            s("work-03", "Who flies an airplane?", "A pilot", "A chef", "Pilots fly airplanes.", "jobs", "recognition"),
            s("work-04", "Who brings letters and packages to your home?", "A mail carrier", "A dentist", "Mail carriers bring letters and packages.", "community helpers", "recognition"),
            s("work-05", "Who takes care of your teeth?", "A dentist", "A farmer", "Dentists check and clean your teeth.", "community helpers", "recognition"),
            s("work-06", "Who grows food on a farm?", "A farmer", "A police officer", "Farmers grow food on farms.", "jobs", "recognition"),
            s("work-07", "Who cooks food in a restaurant?", "A chef", "A lifeguard", "Chefs cook food in restaurants.", "jobs", "recognition"),
            s("work-08", "What do people get paid for doing their job?", "Money", "Homework", "People earn money for the work they do.", "work basics", "everyday"),
            s("work-09", "When should you get to work?", "On time", "Very late", "Getting to work on time shows you are dependable.", "work basics", "everyday"),
            s("work-10", "Which tool do you use to hit a nail?", "A hammer", "A spoon", "A hammer is the tool for nails.", "tools", "recognition"),
            s("work-11", "Who drives a school bus?", "A bus driver", "A nurse", "Bus drivers drive students to school.", "community helpers", "recognition"),
            s("work-12", "Who keeps swimmers safe at the pool?", "A lifeguard", "A librarian", "Lifeguards watch swimmers and keep them safe.", "community helpers", "recognition"),
            s("work-13", "Who helps you find books at the library?", "A librarian", "A mechanic", "Librarians help people find books.", "community helpers", "recognition"),
            s("work-14", "Who fixes cars?", "A mechanic", "A teacher", "Mechanics fix cars.", "jobs", "recognition")
        ],

        // 🤝 Social Skills: feelings, manners, staying safe with people
        social: [
            s("social-01", "Someone gives you a gift. What do you say?", "Thank you", "Go away", "Saying 'thank you' is polite.", "manners", "social"),
            s("social-02", "Someone says hello to you. What is a friendly answer?", "Hi, how are you?", "I don't care.", "Saying hi back is friendly.", "greetings", "social"),
            s("social-03", "Your friend is crying. How might they feel?", "Sad", "Happy", "People often cry when they feel sad.", "feelings", "social"),
            s("social-04", "Someone is smiling and laughing. How do they probably feel?", "Happy", "Sad", "Smiling and laughing usually mean someone feels happy.", "feelings", "social"),
            s("social-05", "You bump into someone by mistake. What do you say?", "I'm sorry", "Move!", "Saying 'I'm sorry' is kind when it was an accident.", "manners", "social"),
            s("social-06", "A stranger online asks where you live. What should you do?", "Keep it private", "Tell them your address", "Never share your address online. Tell a trusted adult too.", "online safety", "safety"),
            s("social-07", "You need help at school. Who can you ask?", "A teacher", "A stranger", "Teachers and school staff are there to help you.", "asking for help", "social"),
            s("social-08", "Someone is talking to you. What should you do?", "Listen", "Walk away", "Listening shows you care about what they say.", "listening", "social"),
            s("social-09", "You feel upset. What can help you calm down?", "Take slow, deep breaths", "Throw things", "Slow, deep breaths help your body calm down.", "calming down", "social"),
            s("social-10", "Which one is a kind thing to do?", "Help a friend", "Push someone", "Helping others is kind.", "kindness", "social"),
            s("social-11", "A classmate asks to borrow a pencil. What is a friendly answer?", "Sure, here you go.", "Go away!", "Sharing is friendly.", "manners", "social"),
            s("social-12", "What word do you say when you ask for something?", "Please", "Now!", "Saying 'please' is polite.", "manners", "social"),
            s("social-13", "Someone you don't know wants you to get in their car. What should you do?", "Say no and get help", "Get in the car", "Never go with a stranger. Say no and tell a trusted adult.", "personal safety", "safety"),
            s("social-14", "It is someone else's turn to talk. What do you do?", "Wait for your turn", "Shout over them", "Waiting your turn is respectful.", "conversation", "social")
        ]
    };

    Object.keys(starter).forEach(key => {
        if (!categories[key]) {
            console.warn("[Life Quest] Starter questions for unknown world: " + key);
            return;
        }
        categories[key].questions.push(...starter[key]);
    });

})();
