// ==========================================
// LIFE QUEST: GRADE SCHOOL QUESTION BANK (Grades 1–5)
// Used only by the 5th-grade game show mode (grade-show.js). It has its own
// question engine, so these never appear in Quest Board or Classroom Mode.
//
// HOW TO ADD QUESTIONS
//   q(grade, "subject", number, "difficulty", "Question?", "Correct answer",
//     ["Wrong 1", "Wrong 2", "Wrong 3"], "Short explanation.", "Peek hint.")
//
//   grade:      1–5
//   subject:    math, ela, science, social, geography, history, general
//   number:     the next unused number for that grade + subject. Never reuse or
//               renumber one: saved history uses the id (e.g. "g3-math-06").
//   difficulty: easy, medium or hard (compared with other questions in that grade)
//   hint:       what PEEK shows. A nudge, never the answer itself.
//
//   final(subject, number, ...) adds a 5th Grade Final Challenge question.
//
//   Answers are shuffled when shown. One answer must be clearly right.
//   Avoid spelling questions (read-aloud can't say a misspelling) and anything
//   experts still argue about.
// ==========================================

"use strict";

const GRADE_SCHOOL_BANK = (function () {

    const subjects = {
        math:      { name: "Math", icon: "➗" },
        ela:       { name: "English Language Arts", icon: "📖" },
        science:   { name: "Science", icon: "🔬" },
        social:    { name: "Social Studies", icon: "🏛️" },
        geography: { name: "Geography", icon: "🗺️" },
        history:   { name: "U.S. History", icon: "🦅" },
        general:   { name: "General Knowledge", icon: "💡" }
    };

    const questions = [];

    function q(grade, subject, n, difficulty, question, correct, wrong, explanation, hint) {
        questions.push({
            id: "g" + grade + "-" + subject + "-" + String(n).padStart(2, "0"),
            grade: grade,
            subject: subject,
            difficulty: difficulty,
            question: question,
            answers: [correct, ...wrong],
            correct: 0,
            explanation: explanation,
            hint: hint,
            final: false
        });
    }

    function final(subject, n, difficulty, question, correct, wrong, explanation, hint) {
        q(5, subject, n, difficulty, question, correct, wrong, explanation, hint);
        const added = questions[questions.length - 1];
        added.id = "final-" + subject + "-" + String(n).padStart(2, "0");
        added.final = true;
    }


    // ================= GRADE 1 =================

    q(1, "math", 1, "easy", "What is 2 + 3?", "5", ["4", "6", "7"], "2 + 3 = 5.", "Hold up 2 fingers, then 3 more, and count them all.");
    q(1, "math", 2, "easy", "Which number is the biggest?", "9", ["4", "6", "2"], "9 is more than 6, 4 and 2.", "Count up from 1. Which number do you reach last?");
    q(1, "math", 3, "medium", "What is 10 minus 2?", "8", ["7", "9", "12"], "Counting back 2 from 10 gives 8.", "Start at 10 and count back two numbers.");
    q(1, "math", 4, "medium", "How many sides does a triangle have?", "3", ["4", "5", "2"], "A triangle has 3 sides.", "'Tri' means three, like a tricycle's wheels.");
    q(1, "math", 5, "hard", "What number comes right after 19?", "20", ["18", "21", "29"], "After 19 comes 20.", "What do you get when you add 1 to 19?");

    q(1, "ela", 1, "easy", "Which word rhymes with 'cat'?", "Hat", ["Dog", "Cup", "Sun"], "Cat and hat both end with the -at sound.", "Listen for a word that ends with '-at'.");
    q(1, "ela", 2, "easy", "Which letter makes the first sound in 'ball'?", "B", ["D", "P", "L"], "'Ball' starts with the /b/ sound.", "Say 'ball' slowly. What sound do your lips make first?");
    q(1, "ela", 3, "medium", "Which word is the name of an animal?", "Horse", ["Run", "Blue", "Happy"], "A horse is an animal. Run, blue and happy are not.", "Which one could you see at a farm?");
    q(1, "ela", 4, "easy", "What is the opposite of 'up'?", "Down", ["Over", "In", "Left"], "Up and down are opposites.", "Think of going up a slide... and then?");
    q(1, "ela", 5, "medium", "How many letters are in the word 'dog'?", "3", ["2", "4", "5"], "D-O-G has 3 letters.", "Spell it out: D, O, G.");

    q(1, "science", 1, "easy", "What do plants need to grow?", "Water and sunlight", ["Candy and milk", "Only darkness", "Sand and salt"], "Plants use water and sunlight to grow.", "Think about what you give a flower in a pot.");
    q(1, "science", 2, "easy", "Which animal hatches from an egg?", "A chicken", ["A dog", "A cat", "A cow"], "Chicks hatch from eggs.", "Which one is a bird?");
    q(1, "science", 3, "easy", "What do we call frozen water?", "Ice", ["Steam", "Juice", "Sand"], "When water freezes, it becomes ice.", "It's what keeps your drink cold.");
    q(1, "science", 4, "medium", "Which body part do you use to smell?", "Your nose", ["Your ears", "Your elbows", "Your knees"], "Your nose lets you smell.", "It's in the middle of your face.");
    q(1, "science", 5, "medium", "Which season comes right after winter?", "Spring", ["Summer", "Fall"], "The seasons go winter, spring, summer, fall.", "It's when flowers start to bloom again.");

    q(1, "social", 1, "easy", "Who helps put out fires in your town?", "Firefighters", ["Bakers", "Dentists", "Pilots"], "Firefighters put out fires and keep people safe.", "They ride in a big red truck.");
    q(1, "social", 2, "easy", "Where can you borrow books for free?", "The library", ["The bank", "The gas station", "The bakery"], "Libraries lend books for free.", "It has shelves and shelves of books.");
    q(1, "social", 3, "easy", "What should you do before you cross the street?", "Look both ways", ["Close your eyes", "Run fast", "Look at your phone"], "Looking both ways helps you see cars.", "You need to check for cars on each side.");
    q(1, "social", 4, "medium", "What is a good classroom rule?", "Raise your hand to talk", ["Shout out answers", "Run in the halls", "Throw pencils"], "Raising your hand gives everyone a turn.", "Which one helps everyone get a turn to speak?");
    q(1, "social", 5, "medium", "Who brings letters and packages to your home?", "A mail carrier", ["A doctor", "A farmer", "A chef"], "Mail carriers deliver the mail.", "This person puts things in your mailbox.");

    q(1, "geography", 1, "easy", "If you live in Texas, what country do you live in?", "The United States", ["Canada", "Mexico", "Brazil"], "Texas is one of the 50 states of the United States.", "Texas is one of the 50 states.");
    q(1, "geography", 2, "easy", "What do we call a huge body of salt water?", "An ocean", ["A puddle", "A pond", "A river"], "Oceans are huge bodies of salt water.", "Whales and sharks live in it.");
    q(1, "geography", 3, "medium", "Which direction is the opposite of north?", "South", ["East", "West", "Up"], "North and south are opposites.", "On a map, north is at the top. What's at the bottom?");
    q(1, "geography", 4, "medium", "What does a map show?", "Where places are", ["What time it is", "How old you are", "What to eat"], "Maps show where places are.", "You use it to find your way.");
    q(1, "geography", 5, "hard", "What do we call a very tall, rocky landform?", "A mountain", ["A valley", "A lake", "A beach"], "Mountains are very tall landforms.", "People climb it to reach the top.");

    q(1, "history", 1, "easy", "What colors are on the American flag?", "Red, white, and blue", ["Green and yellow", "Purple and orange", "Black and pink"], "The American flag is red, white and blue.", "Picture the stars and stripes.");
    q(1, "history", 2, "medium", "Who was the first president of the United States?", "George Washington", ["Abraham Lincoln", "Benjamin Franklin", "Martin Luther King Jr."], "George Washington was the first president.", "His face is on the one-dollar bill.");
    q(1, "history", 3, "easy", "Which holiday is America's birthday, on July 4th?", "Independence Day", ["Thanksgiving", "Halloween", "Valentine's Day"], "Independence Day is celebrated on July 4th.", "There are fireworks!");
    q(1, "history", 4, "medium", "Which bird is a symbol of the United States?", "The bald eagle", ["The pigeon", "The penguin", "The parrot"], "The bald eagle is a national symbol.", "It's a big bird with a white head.");
    q(1, "history", 5, "hard", "What do we say while facing the flag with a hand over our heart?", "The Pledge of Allegiance", ["The alphabet", "A spelling list", "Happy Birthday"], "The Pledge of Allegiance is said facing the flag.", "It begins 'I pledge allegiance...'");

    q(1, "general", 1, "easy", "How many days are in a week?", "7", ["5", "6", "10"], "A week has 7 days.", "Count from Monday to Sunday.");
    q(1, "general", 2, "medium", "What color do you get when you mix red and yellow?", "Orange", ["Purple", "Green", "Blue"], "Red and yellow make orange.", "It's the color of a pumpkin.");
    q(1, "general", 3, "easy", "Which meal do most people eat in the morning?", "Breakfast", ["Lunch", "Dinner", "Supper"], "Breakfast is the morning meal.", "It's the first meal of the day.");
    q(1, "general", 4, "medium", "How many legs does a spider have?", "8", ["6", "4", "10"], "Spiders have 8 legs.", "It's more than an insect's 6 legs.");
    q(1, "general", 5, "easy", "Which shape has no corners?", "A circle", ["A square", "A triangle", "A rectangle"], "A circle is round with no corners.", "Think of a wheel.");


    // ================= GRADE 2 =================

    q(2, "math", 1, "easy", "What is 7 + 8?", "15", ["14", "16", "13"], "7 + 8 = 15.", "7 + 7 is 14. Add one more.");
    q(2, "math", 2, "medium", "What is 20 minus 7?", "13", ["12", "14", "17"], "20 − 7 = 13.", "20 minus 10 would be 10. You took away 3 less than that.");
    q(2, "math", 3, "easy", "How much is a dime worth?", "10 cents", ["5 cents", "1 cent", "25 cents"], "A dime is worth 10 cents.", "Ten dimes make one dollar.");
    q(2, "math", 4, "hard", "Which number has a 4 in the tens place?", "47", ["74", "14", "71"], "In 47, the 4 means 4 tens.", "The tens place is the first digit of a two-digit number.");
    q(2, "math", 5, "medium", "How many minutes are in one hour?", "60", ["30", "100", "12"], "One hour has 60 minutes.", "A clock's minute hand goes around once in this many minutes.");

    q(2, "ela", 1, "easy", "Which word is a verb (an action word)?", "Jump", ["Table", "Green", "Happy"], "'Jump' is something you can do.", "Which one can you do with your body?");
    q(2, "ela", 2, "medium", "What is the plural of 'box'?", "Boxes", ["Boxs", "Boxen", "Boxies"], "Words ending in x add -es: boxes.", "Words that end in x add two letters.");
    q(2, "ela", 3, "easy", "Which word means the same as 'big'?", "Large", ["Tiny", "Cold", "Slow"], "'Large' and 'big' mean the same thing.", "Think of the shirt sizes small, medium and...");
    q(2, "ela", 4, "easy", "Which punctuation mark ends a question?", "A question mark", ["A period", "A comma", "An apostrophe"], "Questions end with a question mark.", "It's the curvy one with a dot under it.");
    q(2, "ela", 5, "medium", "Which word is a noun (a person, place, or thing)?", "School", ["Run", "Quickly", "Pretty"], "A school is a place, so it's a noun.", "Which one is a place you can go?");

    q(2, "science", 1, "medium", "Which insect starts its life as a caterpillar?", "A butterfly", ["A spider", "An ant", "A bee"], "Caterpillars become butterflies.", "It has colorful wings when it grows up.");
    q(2, "science", 2, "hard", "What are the three states of matter we learn about?", "Solid, liquid, and gas", ["Hot, cold, and warm", "Big, medium, and small", "Wet, dry, and sticky"], "Matter can be a solid, a liquid or a gas.", "Think of ice, water and steam.");
    q(2, "science", 3, "easy", "Which planet do we live on?", "Earth", ["Mars", "Venus", "Jupiter"], "We live on planet Earth.", "It's the third planet from the Sun, and it's home!");
    q(2, "science", 4, "medium", "What do we call an animal that eats only plants?", "A herbivore", ["A carnivore", "An omnivore", "A predator"], "Herbivores eat only plants.", "Herbs are plants.");
    q(2, "science", 5, "easy", "What does a thermometer measure?", "Temperature", ["Weight", "Length", "Time"], "A thermometer tells how hot or cold something is.", "You use it when you might have a fever.");

    q(2, "social", 1, "medium", "What is a community?", "A group of people who live and work in the same area", ["A kind of food", "A type of weather", "A school subject"], "A community is people living and working near each other.", "Your neighborhood is one.");
    q(2, "social", 2, "easy", "What do people use money for?", "To buy things they need and want", ["To plant trees", "To tell time", "To measure weight"], "Money is used to buy goods and services.", "You use it at a store.");
    q(2, "social", 3, "easy", "Which one is a need, not a want?", "Food", ["A video game", "A toy car", "Candy"], "We need food to live. The others are wants.", "Which one does your body need every day?");
    q(2, "social", 4, "medium", "Who is the leader of a city?", "The mayor", ["The principal", "The coach", "The librarian"], "A mayor leads a city or town.", "A principal leads a school. This person leads a whole city.");
    q(2, "social", 5, "easy", "What job does a farmer do?", "Grows food", ["Fixes teeth", "Flies planes", "Teaches class"], "Farmers grow crops and raise animals for food.", "Think of fields, barns and tractors.");

    q(2, "geography", 1, "medium", "How many continents are there?", "7", ["5", "6", "8"], "There are 7 continents.", "It's the same as the number of days in a week.");
    q(2, "geography", 2, "medium", "Which continent is the United States on?", "North America", ["South America", "Europe", "Africa"], "The U.S. is in North America.", "Canada and Mexico are on it too.");
    q(2, "geography", 3, "hard", "Which is the largest ocean?", "The Pacific Ocean", ["The Atlantic Ocean", "The Indian Ocean", "The Arctic Ocean"], "The Pacific is the largest ocean.", "It's on the west coast of the United States.");
    q(2, "geography", 4, "medium", "On a map, what does a compass rose show?", "Directions", ["Weather", "Prices", "Time"], "A compass rose shows north, south, east and west.", "It points N, S, E and W.");
    q(2, "geography", 5, "easy", "What is an island?", "Land with water all around it", ["A very tall mountain", "A dry desert", "A deep valley"], "An island is surrounded by water.", "You'd need a boat or plane to get there.");

    q(2, "history", 1, "easy", "Which November holiday is about giving thanks?", "Thanksgiving", ["Halloween", "Memorial Day", "New Year's Day"], "Thanksgiving is about being thankful.", "Its name tells you!");
    q(2, "history", 2, "medium", "Whose face is on the one-dollar bill?", "George Washington", ["Abraham Lincoln", "Thomas Jefferson", "Benjamin Franklin"], "George Washington is on the one-dollar bill.", "He was the very first president.");
    q(2, "history", 3, "easy", "What is the big statue in New York Harbor that was a gift from France?", "The Statue of Liberty", ["Mount Rushmore", "The Lincoln Memorial", "The Liberty Bell"], "France gave the Statue of Liberty to the U.S.", "She holds up a torch.");
    q(2, "history", 4, "hard", "Which president's face is on the penny?", "Abraham Lincoln", ["George Washington", "Thomas Jefferson", "John F. Kennedy"], "Abraham Lincoln is on the penny.", "He was known as 'Honest Abe.'");
    q(2, "history", 5, "medium", "Who was Martin Luther King Jr.?", "A leader who worked for equal rights", ["A famous baseball player", "The first president", "An astronaut"], "Dr. King worked for equal rights for all people.", "He gave a famous speech about a dream.");

    q(2, "general", 1, "easy", "How many months are in a year?", "12", ["10", "7", "52"], "A year has 12 months.", "January is the first. December is the last.");
    q(2, "general", 2, "medium", "What is the largest animal on Earth?", "The blue whale", ["The elephant", "The giraffe", "The great white shark"], "The blue whale is the largest animal ever known.", "It lives in the ocean.");
    q(2, "general", 3, "medium", "What color is an emerald?", "Green", ["Red", "Blue", "Yellow"], "Emeralds are green gems.", "It's the color of grass.");
    q(2, "general", 4, "easy", "Which instrument has black and white keys?", "A piano", ["A drum", "A trumpet", "A violin"], "A piano has black and white keys.", "You press keys to play it.");
    q(2, "general", 5, "easy", "How many hours are in one day?", "24", ["12", "20", "60"], "A day has 24 hours.", "It's two times 12.");


    // ================= GRADE 3 =================

    q(3, "math", 1, "medium", "What is 6 × 7?", "42", ["36", "48", "49"], "6 × 7 = 42.", "6 × 6 is 36. Add one more 6.");
    q(3, "math", 2, "medium", "What is 56 divided by 8?", "7", ["6", "8", "9"], "56 ÷ 8 = 7, because 8 × 7 = 56.", "What times 8 makes 56?");
    q(3, "math", 3, "hard", "A pizza is cut into 4 equal slices. You eat 1. What fraction is left?", "Three-fourths", ["One-fourth", "One-half", "Four-thirds"], "3 of the 4 slices are left: three-fourths.", "Count the slices that are still there.");
    q(3, "math", 4, "medium", "What is the perimeter of a square with 5-inch sides?", "20 inches", ["10 inches", "25 inches", "15 inches"], "A square has 4 sides: 5 + 5 + 5 + 5 = 20.", "Perimeter means adding all the sides.");
    q(3, "math", 5, "easy", "What is 47 rounded to the nearest ten?", "50", ["40", "45", "47"], "47 is closer to 50 than to 40.", "Is 47 closer to 40 or to 50?");

    q(3, "ela", 1, "easy", "What is a synonym for 'happy'?", "Glad", ["Sad", "Angry", "Tired"], "Glad means the same as happy.", "A synonym means the same thing.");
    q(3, "ela", 2, "medium", "What is the past tense of 'run'?", "Ran", ["Runned", "Running", "Runs"], "Yesterday I ran. 'Run' changes to 'ran.'", "Finish the sentence: 'Yesterday I ___ home.'");
    q(3, "ela", 3, "medium", "Which word is an adjective (a describing word)?", "Purple", ["Swim", "Quickly", "Table"], "'Purple' describes a noun, like a purple hat.", "Which word could describe a hat?");
    q(3, "ela", 4, "hard", "In the word 'unhappy,' what does 'un-' mean?", "Not", ["Very", "Again", "Before"], "Unhappy means not happy.", "Unlocked, unkind, unhappy...");
    q(3, "ela", 5, "medium", "What is a group of sentences about one main idea called?", "A paragraph", ["A letter", "A title", "A word"], "A paragraph is a group of sentences about one idea.", "It's indented at the start.");

    q(3, "science", 1, "medium", "Which part of a plant makes food using sunlight?", "The leaves", ["The roots", "The stem", "The flower"], "Leaves use sunlight to make food for the plant.", "They're usually green and flat.");
    q(3, "science", 2, "easy", "What force pulls things toward the Earth?", "Gravity", ["Magnetism", "Friction", "Wind"], "Gravity pulls everything toward Earth.", "It's why a dropped ball falls down.");
    q(3, "science", 3, "medium", "What do bees collect from flowers?", "Nectar and pollen", ["Water and sand", "Leaves", "Seeds"], "Bees collect nectar and pollen.", "Bees use it to make honey.");
    q(3, "science", 4, "hard", "Which animal is a mammal?", "A dolphin", ["A shark", "A frog", "A snake"], "Dolphins are mammals: they breathe air and feed milk to their babies.", "It breathes air through a blowhole.");
    q(3, "science", 5, "medium", "What is the closest star to Earth?", "The Sun", ["The Moon", "Mars", "The North Star"], "The Sun is a star, and it's the closest one to us.", "You can only see it during the day.");

    q(3, "social", 1, "hard", "What are the three branches of the U.S. government?", "Legislative, executive, and judicial", ["Police, fire, and school", "North, south, and east", "Mayor, governor, and coach"], "The three branches make, carry out and judge the laws.", "One makes laws, one carries them out, one decides cases.");
    q(3, "social", 2, "medium", "What do we call money people pay to the government for roads and schools?", "Taxes", ["Tips", "Allowance", "Prizes"], "Taxes pay for things everyone shares.", "It's added to the price at many stores.");
    q(3, "social", 3, "easy", "What is the job of a judge?", "To decide cases in court using the law", ["To make pizza", "To drive buses", "To paint houses"], "Judges decide cases in court.", "This person works in a courtroom.");
    q(3, "social", 4, "medium", "What is a producer?", "Someone who makes goods or services", ["Someone who only buys things", "A kind of tool", "A type of money"], "Producers make goods or provide services.", "The word 'produce' means to make.");
    q(3, "social", 5, "easy", "What is a citizen?", "A member of a country", ["A city building", "A kind of map", "A type of weather"], "A citizen is a member of a country.", "You can be a citizen of the United States.");

    q(3, "geography", 1, "easy", "What is the capital of the United States?", "Washington, D.C.", ["New York City", "Los Angeles", "Chicago"], "Washington, D.C. is the nation's capital.", "The White House is there.");
    q(3, "geography", 2, "easy", "How many states are in the United States?", "50", ["48", "52", "13"], "The U.S. has 50 states.", "There's one star on the flag for each state.");
    q(3, "geography", 3, "medium", "Which ocean is on the east coast of the United States?", "The Atlantic Ocean", ["The Pacific Ocean", "The Indian Ocean", "The Arctic Ocean"], "The Atlantic Ocean is to the east.", "It's the ocean between the U.S. and Europe.");
    q(3, "geography", 4, "medium", "Which state is the largest by area?", "Alaska", ["Texas", "California", "Florida"], "Alaska is by far the largest state.", "It's way up north, near Canada.");
    q(3, "geography", 5, "hard", "What is the equator?", "An imaginary line around the middle of the Earth", ["A tall mountain", "A kind of weather", "A river in Africa"], "The equator circles the middle of the Earth.", "It splits the Earth into a top half and a bottom half.");

    q(3, "history", 1, "medium", "Who were the Pilgrims?", "People who sailed to America on the Mayflower", ["The first astronauts", "Ancient Egyptians", "Pirates from Spain"], "The Pilgrims sailed on the Mayflower in 1620.", "They're remembered at Thanksgiving.");
    q(3, "history", 2, "medium", "What did Benjamin Franklin study with his famous kite experiment?", "Electricity", ["Gravity", "Magnets", "Sound"], "Franklin used a kite to show that lightning is electricity.", "He flew it during a thunderstorm.");
    q(3, "history", 3, "hard", "Which document begins with the words 'We the People'?", "The U.S. Constitution", ["The Declaration of Independence", "The Gettysburg Address", "The Pledge of Allegiance"], "The Constitution begins 'We the People.'", "It's the plan for how the U.S. government works.");
    q(3, "history", 4, "medium", "Why did Paul Revere make his famous midnight ride?", "To warn that British soldiers were coming", ["To deliver pizza", "To win a horse race", "To find gold"], "He warned colonists that British soldiers were coming.", "It happened just before the American Revolution.");
    q(3, "history", 5, "easy", "Who was the first person to walk on the Moon?", "Neil Armstrong", ["Buzz Aldrin", "John Glenn", "Sally Ride"], "Neil Armstrong stepped onto the Moon in 1969.", "He said: 'That's one small step for man.'");

    q(3, "general", 1, "medium", "How many sides does a hexagon have?", "6", ["5", "8", "7"], "A hexagon has 6 sides.", "It's the shape of a honeycomb cell.");
    q(3, "general", 2, "easy", "What is the largest planet in our solar system?", "Jupiter", ["Saturn", "Earth", "Mars"], "Jupiter is the largest planet.", "It has a giant red spot.");
    q(3, "general", 3, "easy", "How many inches are in one foot?", "12", ["10", "3", "100"], "One foot equals 12 inches.", "It's the length of a normal ruler.");
    q(3, "general", 4, "hard", "What is a baby kangaroo called?", "A joey", ["A cub", "A kit", "A calf"], "Baby kangaroos are called joeys.", "It rides in its mother's pouch.");
    q(3, "general", 5, "medium", "Which continent is the coldest?", "Antarctica", ["Africa", "Asia", "Europe"], "Antarctica is the coldest continent.", "Penguins live there.");


    // ================= GRADE 4 =================

    q(4, "math", 1, "medium", "What is 12 × 12?", "144", ["124", "142", "132"], "12 × 12 = 144.", "12 × 10 is 120. Add two more 12s.");
    q(4, "math", 2, "medium", "Which fraction is equal to one-half?", "Two-fourths", ["One-third", "Three-fourths", "One-fifth"], "2 out of 4 is the same as 1 out of 2.", "Think of a pizza with 4 slices. How many make half?");
    q(4, "math", 3, "hard", "What is 0.5 written as a fraction?", "One-half", ["One-fifth", "Five-halves", "One-tenth"], "0.5 means 5 tenths, which equals one-half.", "50 cents is what part of a dollar?");
    q(4, "math", 4, "medium", "What is the area of a rectangle 6 feet long and 4 feet wide?", "24 square feet", ["20 square feet", "10 square feet", "12 square feet"], "Area = length × width = 6 × 4 = 24.", "Multiply the length by the width.");
    q(4, "math", 5, "easy", "In the number 3,742, what is the value of the 7?", "700", ["70", "7", "7,000"], "The 7 is in the hundreds place, so it means 700.", "Name the places: ones, tens, hundreds, thousands.");

    q(4, "ela", 1, "medium", "Which word sounds the same as 'night' but means something different?", "Knight", ["Day", "Light", "Kite"], "'Night' and 'knight' are homophones.", "It's a soldier in armor.");
    q(4, "ela", 2, "easy", "What do we call the main character in a story?", "The protagonist", ["The setting", "The plot", "The theme"], "The protagonist is the main character.", "The other choices are not people.");
    q(4, "ela", 3, "hard", "'The wind whispered through the trees' is an example of what?", "Personification", ["A simile", "A rhyme", "A question"], "Giving the wind a human action (whispering) is personification.", "Can wind really whisper? Who whispers?");
    q(4, "ela", 4, "easy", "What is the opposite of 'ancient'?", "Modern", ["Old", "Historic", "Dusty"], "Ancient means very old. Modern means new.", "Ancient means very, very old.");
    q(4, "ela", 5, "medium", "In 'The tall boy kicked the ball,' who is doing the action?", "The tall boy", ["The ball", "Kicked", "Tall"], "The tall boy is the subject: he does the kicking.", "Who kicked?");

    q(4, "science", 1, "medium", "What is it called when water turns into vapor?", "Evaporation", ["Condensation", "Freezing", "Melting"], "Evaporation turns liquid water into vapor.", "It's what happens to a puddle on a sunny day.");
    q(4, "science", 2, "easy", "Which gas do plants give off that people need to breathe?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Smoke"], "Plants release oxygen.", "You breathe it in right now.");
    q(4, "science", 3, "medium", "Which layer of the Earth do we live on?", "The crust", ["The mantle", "The outer core", "The inner core"], "We live on the crust, Earth's outer layer.", "It's the thin, rocky outside layer, like the skin of an apple.");
    q(4, "science", 4, "hard", "What type of energy is stored in a battery?", "Chemical energy", ["Sound energy", "Light energy", "Wind energy"], "Batteries store chemical energy.", "Batteries hold special chemicals inside.");
    q(4, "science", 5, "medium", "What does a food chain show?", "How energy passes from one living thing to another by eating", ["A row of grocery stores", "A kind of necklace", "A cooking recipe"], "A food chain shows who eats what.", "Grass → rabbit → fox.");

    q(4, "social", 1, "hard", "What are the first ten amendments to the Constitution called?", "The Bill of Rights", ["The Declaration of Independence", "The Preamble", "The Pledge of Allegiance"], "The first ten amendments are the Bill of Rights.", "They list rights like freedom of speech.");
    q(4, "social", 2, "medium", "Many kids want a toy, but the store has only a few. What usually happens to the price?", "It goes up", ["It goes down", "It becomes free", "It stays at zero"], "When demand is high and supply is low, prices usually rise.", "If everyone wants it, sellers can ask for more money.");
    q(4, "social", 3, "easy", "What is the leader of a state called?", "The governor", ["The mayor", "The president", "The principal"], "A governor leads a state.", "A mayor leads a city. This person leads a state.");
    q(4, "social", 4, "medium", "What is a natural resource?", "Something from nature that people use, like water or trees", ["A factory", "A toy store", "A computer game"], "Natural resources come from nature.", "The answer comes from nature, not from a factory.");
    q(4, "social", 5, "easy", "What do citizens do when they vote?", "Make a choice that gets counted, like picking a leader", ["Write a story", "Plant a tree", "Buy a ticket"], "Voting lets citizens choose leaders and decide things.", "It happens on Election Day.");

    q(4, "geography", 1, "hard", "Which country in North America is the largest by area?", "Canada", ["The United States", "Mexico", "Cuba"], "Canada is the largest country in North America.", "It's north of the United States.");
    q(4, "geography", 2, "medium", "What are the Great Lakes?", "Five large lakes on or near the U.S.–Canada border", ["Five oceans", "Lakes in Africa", "Mountain lakes in Mexico"], "The five Great Lakes are near the U.S.–Canada border.", "Michigan is surrounded by them.");
    q(4, "geography", 3, "easy", "Which mountain range is in the western United States?", "The Rocky Mountains", ["The Appalachian Mountains", "The Alps", "The Himalayas"], "The Rockies run through the western U.S.", "Colorado is full of them.");
    q(4, "geography", 4, "medium", "What is the capital of California?", "Sacramento", ["Los Angeles", "San Francisco", "San Diego"], "Sacramento is California's capital.", "It's not the biggest city.");
    q(4, "geography", 5, "hard", "What are lines of latitude?", "Imaginary lines that run east and west around the Earth", ["Real roads", "Rivers", "Lines that run only north and south"], "Latitude lines run east–west. Longitude lines run north–south.", "The equator is one of them.");

    q(4, "history", 1, "medium", "In what year was the Declaration of Independence adopted?", "1776", ["1492", "1812", "1865"], "It was adopted on July 4, 1776.", "America celebrated its 200th birthday in 1976.");
    q(4, "history", 2, "medium", "Who was the main writer of the Declaration of Independence?", "Thomas Jefferson", ["George Washington", "Benjamin Franklin", "John Adams"], "Thomas Jefferson wrote most of it.", "He later became the third president.");
    q(4, "history", 3, "hard", "What was the Underground Railroad?", "A secret network that helped enslaved people escape to freedom", ["A subway in New York", "A railroad built under mountains", "A train for gold miners"], "It was a secret network of people and safe houses.", "Harriet Tubman was a famous guide.");
    q(4, "history", 4, "medium", "Who was Sacagawea?", "A Shoshone woman who helped guide the Lewis and Clark expedition", ["The first female president", "A famous painter", "A queen of England"], "Sacagawea helped guide Lewis and Clark across the West.", "She helped explorers travel west.");
    q(4, "history", 5, "easy", "Which war was fought between the North and the South in the United States?", "The Civil War", ["The Revolutionary War", "World War I", "The War of 1812"], "The Civil War was fought from 1861 to 1865.", "Abraham Lincoln was president during this war.");

    q(4, "general", 1, "medium", "How many degrees are in a right angle?", "90", ["45", "180", "100"], "A right angle is 90 degrees.", "It's the corner of a square.");
    q(4, "general", 2, "easy", "Which planet is called the Red Planet?", "Mars", ["Venus", "Jupiter", "Neptune"], "Mars looks red because of rusty dust.", "It's named after the Roman god of war.");
    q(4, "general", 3, "medium", "What is the hardest natural material?", "Diamond", ["Gold", "Glass", "Wood"], "Diamond is the hardest natural material.", "It sparkles in rings.");
    q(4, "general", 4, "medium", "How many centimeters are in one meter?", "100", ["10", "1,000", "12"], "One meter is 100 centimeters.", "'Centi' means hundred, like a century.");
    q(4, "general", 5, "hard", "What do we call an animal that is active at night?", "Nocturnal", ["Herbivore", "Migrating", "Hibernating"], "Nocturnal animals are awake at night.", "Owls and bats are like this.");


    // ================= GRADE 5 =================

    q(5, "math", 1, "medium", "What is 25% of 200?", "50", ["25", "75", "100"], "25% is one-fourth, and one-fourth of 200 is 50.", "25% is the same as one-fourth.");
    q(5, "math", 2, "easy", "What is three-fourths plus one-fourth?", "1 whole", ["Four-eighths", "Two-fourths", "Three-fourths"], "3 fourths + 1 fourth = 4 fourths = 1 whole.", "How many fourths make a whole?");
    q(5, "math", 3, "hard", "What is the volume of a box 2 feet long, 3 feet wide, and 4 feet high?", "24 cubic feet", ["9 cubic feet", "12 cubic feet", "20 cubic feet"], "Volume = 2 × 3 × 4 = 24 cubic feet.", "Multiply all three measurements.");
    q(5, "math", 4, "medium", "What is 4 squared (4 × 4)?", "16", ["8", "12", "44"], "4 × 4 = 16.", "Squared means multiply the number by itself.");
    q(5, "math", 5, "hard", "What is 1.5 + 2.75?", "4.25", ["3.25", "4.75", "3.8"], "1.50 + 2.75 = 4.25.", "Line up the decimal points: 1.50 + 2.75.");

    q(5, "ela", 1, "medium", "What is the theme of a story?", "The lesson or message of the story", ["The name of the main character", "Where the story happens", "The number of pages"], "The theme is the big message or lesson.", "What does the author want you to learn?");
    q(5, "ela", 2, "easy", "What figure of speech is 'as brave as a lion'?", "A simile", ["A metaphor", "Personification", "Onomatopoeia"], "A simile compares using 'like' or 'as.'", "Look for the word 'as.'");
    q(5, "ela", 3, "medium", "Which word is an example of onomatopoeia (a sound word)?", "Buzz", ["Quiet", "Beautiful", "Slowly"], "'Buzz' sounds like the noise it names.", "Which word sounds like a bee?");
    q(5, "ela", 4, "hard", "A story told using 'I' and 'me' is written in which point of view?", "First person", ["Second person", "Third person", "No person"], "Stories told with 'I' are in first person.", "Who is telling the story: me, you, or them?");
    q(5, "ela", 5, "medium", "What does the prefix 'pre-' mean, as in 'preview'?", "Before", ["After", "Again", "Not"], "Pre- means before: a preview is a look before.", "Preschool comes ___ kindergarten.");

    q(5, "science", 1, "medium", "Which gas do plants take in to make their food?", "Carbon dioxide", ["Oxygen", "Helium", "Nitrogen"], "Plants take in carbon dioxide and give off oxygen.", "It's the gas you breathe out.");
    q(5, "science", 2, "hard", "What is the center of an atom called?", "The nucleus", ["The electron", "The shell", "The crust"], "The nucleus is the center of an atom.", "Cells have one of these too.");
    q(5, "science", 3, "medium", "Why do we have day and night?", "The Earth spins on its axis", ["The Sun moves around the Earth", "The Moon blocks the Sun", "Clouds cover the sky"], "Earth spins once a day, so each side faces the Sun, then away.", "Something is spinning like a top.");
    q(5, "science", 4, "easy", "What is it called when a liquid turns into a solid?", "Freezing", ["Melting", "Boiling", "Evaporating"], "Freezing turns a liquid into a solid.", "Think of making ice cubes.");
    q(5, "science", 5, "easy", "Which organ pumps blood through your body?", "The heart", ["The lungs", "The stomach", "The brain"], "The heart pumps blood all day long.", "You can feel it beating in your chest.");

    q(5, "social", 1, "medium", "How many U.S. senators does each state have?", "2", ["1", "4", "100"], "Every state has 2 senators.", "There are 100 senators and 50 states.");
    q(5, "social", 2, "medium", "Which branch of government makes the laws?", "The legislative branch (Congress)", ["The executive branch", "The judicial branch", "The military"], "Congress, the legislative branch, makes laws.", "'Legislate' means to make laws.");
    q(5, "social", 3, "easy", "How long is one term for the U.S. president?", "4 years", ["2 years", "6 years", "8 years"], "A president's term is 4 years.", "Presidential elections happen every this many years.");
    q(5, "social", 4, "hard", "What is the point of 'checks and balances'?", "To keep any one branch of government from having too much power", ["To balance a bank account", "To check homework", "To count votes"], "Each branch can limit the others.", "It's about sharing power fairly.");
    q(5, "social", 5, "medium", "In which city does the U.S. Supreme Court meet?", "Washington, D.C.", ["New York City", "Philadelphia", "Boston"], "The Supreme Court is in Washington, D.C.", "It's the same city as the White House.");

    q(5, "geography", 1, "medium", "Which state has the most people?", "California", ["Texas", "Florida", "New York"], "California has the most people of any state.", "It's on the West Coast and has Hollywood.");
    q(5, "geography", 2, "easy", "Which U.S. state is made up of islands in the Pacific Ocean?", "Hawaii", ["Alaska", "Florida", "Maine"], "Hawaii is a chain of islands in the Pacific.", "It's famous for volcanoes and surfing.");
    q(5, "geography", 3, "hard", "Which Great Lake is completely inside the United States?", "Lake Michigan", ["Lake Superior", "Lake Erie", "Lake Ontario"], "Lake Michigan is the only Great Lake entirely in the U.S.", "It shares its name with a state.");
    q(5, "geography", 4, "medium", "What is the capital of New York State?", "Albany", ["New York City", "Buffalo", "Rochester"], "Albany is the capital of New York State.", "It's not the biggest city.");
    q(5, "geography", 5, "medium", "Which line divides the Earth into the Northern and Southern Hemispheres?", "The equator", ["The prime meridian", "The Tropic of Cancer", "The International Date Line"], "The equator splits Earth into north and south halves.", "It goes around the middle of the Earth.");

    q(5, "history", 1, "easy", "Who was president during the Civil War?", "Abraham Lincoln", ["George Washington", "Thomas Jefferson", "Ulysses S. Grant"], "Abraham Lincoln led the country during the Civil War.", "He gave the Gettysburg Address.");
    q(5, "history", 2, "hard", "Jamestown, settled in 1607, was the first lasting English colony. Which present-day state is it in?", "Virginia", ["Massachusetts", "New York", "Georgia"], "Jamestown was in Virginia.", "It's a southern state named after a queen.");
    q(5, "history", 3, "medium", "What did the 19th Amendment give women?", "The right to vote", ["Free college", "The right to own a car", "Free train rides"], "In 1920, the 19th Amendment gave women the right to vote.", "It's about elections.");
    q(5, "history", 4, "easy", "Who gave the famous 'I Have a Dream' speech?", "Martin Luther King Jr.", ["Abraham Lincoln", "John F. Kennedy", "Frederick Douglass"], "Dr. King gave the speech in 1963.", "He worked for civil rights.");
    q(5, "history", 5, "medium", "What was the Boston Tea Party?", "A protest where colonists dumped British tea into Boston Harbor", ["A big party with tea and cake", "A ship race", "The first Thanksgiving"], "In 1773, colonists protested a tax by dumping tea into the harbor.", "The colonists were angry about a tax.");

    q(5, "general", 1, "easy", "How many sides does an octagon have?", "8", ["6", "10", "7"], "An octagon has 8 sides, like a stop sign.", "Think of a stop sign. Or an octopus's legs!");
    q(5, "general", 2, "hard", "At what temperature does water boil, in degrees Fahrenheit (at sea level)?", "212°F", ["100°F", "32°F", "180°F"], "Water boils at 212°F (100°C).", "Water freezes at 32°F. Boiling is 180 degrees higher.");
    q(5, "general", 3, "hard", "About how many bones are in an adult human body?", "206", ["106", "306", "406"], "Adults have 206 bones.", "It's a little over 200.");
    q(5, "general", 4, "medium", "How many zeros are in one million?", "6", ["5", "7", "9"], "One million is 1,000,000: six zeros.", "One thousand has 3 zeros. A million is a thousand thousands.");
    q(5, "general", 5, "medium", "What do we call a word that reads the same backward and forward, like 'mom'?", "A palindrome", ["An acronym", "A synonym", "A homophone"], "Words like mom, dad and racecar are palindromes.", "Try spelling 'racecar' backward.");


    // ============ 5TH GRADE FINAL CHALLENGE ============

    final("math", 1, "hard", "What is 15% of 60?", "9", ["6", "12", "15"], "10% of 60 is 6, and 5% is 3. 6 + 3 = 9.", "Find 10%, then add half of that.");
    final("math", 2, "hard", "What is the smallest number that both 4 and 6 divide into evenly?", "12", ["24", "2", "10"], "12 is the least common multiple of 4 and 6.", "Count by 4s and by 6s. Where do they meet first?");
    final("ela", 1, "hard", "Which sentence uses a metaphor?", "Her smile was sunshine.", ["Her smile was like sunshine.", "She smiled at me.", "The sun shone brightly."], "A metaphor says something IS something else, without 'like' or 'as.'", "A metaphor doesn't use 'like' or 'as.'");
    final("ela", 2, "hard", "What is the root word in 'unbelievable'?", "Believe", ["Able", "Un", "Lie"], "Un + believe + able: the root is 'believe.'", "Take off the prefix and the suffix.");
    final("science", 1, "hard", "What is the chemical formula for water?", "H2O", ["CO2", "O2", "NaCl"], "Water is two hydrogen atoms and one oxygen atom: H2O.", "It has hydrogen and oxygen.");
    final("science", 2, "hard", "Which planet takes the least time to go around the Sun?", "Mercury", ["Venus", "Earth", "Mars"], "Mercury is closest to the Sun, so its year is only 88 days.", "It's the planet closest to the Sun.");
    final("social", 1, "hard", "How many justices serve on the U.S. Supreme Court?", "9", ["7", "12", "50"], "The Supreme Court has 9 justices.", "It's an odd number, so there can't be a tie.");
    final("social", 2, "hard", "What are the two parts of Congress?", "The Senate and the House of Representatives", ["The President and the Vice President", "The Supreme Court and the Cabinet", "The governors and the mayors"], "Congress is made up of the Senate and the House.", "One part has 100 members. The other has 435.");
    final("geography", 1, "hard", "Which U.S. state has the longest coastline?", "Alaska", ["Florida", "California", "Hawaii"], "Alaska's coastline is longer than all other states' combined.", "It's the biggest state.");
    final("geography", 2, "hard", "What is the smallest U.S. state by area?", "Rhode Island", ["Delaware", "Connecticut", "Vermont"], "Rhode Island is the smallest state.", "Its name sounds like an island, but it isn't one.");
    final("history", 1, "hard", "In 1863, Abraham Lincoln issued an order declaring enslaved people in the Confederate states free. What was it called?", "The Emancipation Proclamation", ["The Bill of Rights", "The Declaration of Independence", "The Gettysburg Address"], "The Emancipation Proclamation was issued in 1863.", "'Emancipate' means to set free.");
    final("history", 2, "hard", "Who was the first woman to fly an airplane alone across the Atlantic Ocean?", "Amelia Earhart", ["Sally Ride", "Harriet Tubman", "Rosa Parks"], "Amelia Earhart flew solo across the Atlantic in 1932.", "She was a famous pilot who later disappeared over the Pacific.");
    final("general", 1, "hard", "What is the only even prime number?", "2", ["4", "0", "6"], "2 is prime (divisible only by 1 and itself) and even.", "It's the smallest prime number.");
    final("general", 2, "hard", "How many feet are in one mile?", "5,280", ["1,000", "3,280", "5,000"], "One mile is 5,280 feet.", "It's a little more than 5,000.");


    return { subjects, questions, grades: [1, 2, 3, 4, 5] };

})();
