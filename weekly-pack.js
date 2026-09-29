// ==========================================
// LIFE QUEST: WEEKLY QUESTION PACK
// Loaded after questions.js / starter-questions.js and before engine.js.
//
// THIS WEEK: Life Skills (week 40, 2026) — 60 questions
//   30 Easy   → shown in the 🟢 STARTER level (always exactly 2 choices, 45 seconds)
//   20 Medium → shown on 🟡 CHALLENGE and 🔴 EXPERT boards (3 choices)
//   10 Hard   → shown on 🟡 CHALLENGE and 🔴 EXPERT boards (3–4 choices)
//
// The pack adds to the main question bank. Questions nobody has seen yet are
// picked first (see engine.js), so a new pack shows up quickly in play.
//
// HOW TO SWAP IN NEXT WEEK'S PACK
//   1. Replace this whole file with the new pack (keep the same layout).
//   2. Give the pack a new WEEKLY_PACK.id, e.g. "2026-W41".
//   3. Give every question a NEW id that starts with the pack id
//      (e.g. "2026-W41-easy-01"). Never reuse an old id.
//   4. Run `node tests/weekly-pack-checks.js` to check the pack.
//   Nothing else in the game needs to change. Old pack questions simply
//   drop out; saved Practice Mistakes for them are tidied away on load.
//
// WRITING RULES
//   easy(n, world, question, correctAnswer, wrongAnswer, explanation)
//       Exactly 2 choices. Short, concrete, everyday. The wrong answer must be
//       clearly wrong so learners can succeed.
//   medium(n, world, question, correctAnswer, [wrong1, wrong2], explanation)
//   hard(n, world, question, correctAnswer, [wrong1, wrong2, wrong3?], explanation)
//   world: "life" (Real Life), "social" (Social Skills), "work" (Work Ready),
//          "school" (School Challenge) — or any other world key.
// ==========================================

"use strict";

const WEEKLY_PACK = {
    id: "2026-W40",
    title: "Life Skills Week",
    questions: []
};

(function () {

    const pack = WEEKLY_PACK;

    function add(level, difficulty, n, world, question, correct, wrong, explanation) {
        pack.questions.push({
            id: pack.id + "-" + level + "-" + String(n).padStart(2, "0"),
            world: world,
            pack: pack.id,
            level: level,                // what the pack calls it: easy / medium / hard
            question: question,
            answers: [correct, ...wrong],
            correct: 0,                  // answers are shuffled when shown
            difficulty: difficulty,      // what the game uses (easy → "starter")
            explanation: explanation,
            skill: "life skills",
            type: "life skills"
        });
    }

    // Easy questions use the Starter level, which always has exactly 2 choices
    const easy = (n, world, q, correct, wrong, why) => add("easy", "starter", n, world, q, correct, [wrong], why);
    const medium = (n, world, q, correct, wrong, why) => add("medium", "medium", n, world, q, correct, wrong, why);
    const hard = (n, world, q, correct, wrong, why) => add("hard", "hard", n, world, q, correct, wrong, why);


    // ---------- EASY (30): 2 choices ----------

    easy(1, "life", "It is bath time. What do you use to wash your body?", "Soap and water", "Sand", "Soap and water get your body clean.");
    easy(2, "life", "You used the toilet. What do you do next?", "Flush and wash your hands", "Leave right away", "Always flush, then wash your hands.");
    easy(3, "life", "It is cold outside. What do you put on your feet?", "Socks and shoes", "Nothing", "Socks and shoes keep your feet warm.");
    easy(4, "life", "You have trash from your snack. Where does it go?", "In the trash can", "On the floor", "Trash goes in the trash can.");
    easy(5, "life", "You spilled juice on the table. What should you do?", "Wipe it up", "Leave it there", "Wiping up spills keeps the table clean.");
    easy(6, "life", "What do you wear to bed at night?", "Pajamas", "A winter coat", "Pajamas are comfy clothes for sleeping.");
    easy(7, "life", "Your bed is messy in the morning. What can you do?", "Make your bed", "Throw your pillow outside", "Making your bed keeps your room neat.");
    easy(8, "life", "A sharp knife is on the counter. What should you do?", "Leave it and tell an adult", "Play with it", "Sharp knives can cut you. Let an adult move it.");
    easy(9, "life", "You smell smoke at home. What should you do?", "Tell an adult right away", "Ignore it", "Smoke can mean a fire. Tell an adult fast.");
    easy(10, "life", "Where should you keep your money?", "In your wallet", "On the floor", "A wallet keeps your money safe.");
    easy(11, "life", "How do you find out what a snack costs?", "Look at the price tag", "Look at the ceiling", "The price tag shows how much it costs.");
    easy(12, "life", "A toy costs more money than you have. What can you do?", "Save up for it", "Take it without paying", "Saving a little at a time helps you buy things later.");
    easy(13, "life", "Your clothes are dirty. Where do they go?", "In the laundry basket", "Under the bed", "Dirty clothes go in the laundry basket to be washed.");
    easy(14, "life", "Your family sets the table. How can you help?", "Put out the plates", "Hide the forks", "Helping with the table is a great way to help at home.");
    easy(15, "life", "The plant in your room looks dry. What does it need?", "Water", "Ketchup", "Plants need water to stay alive.");
    easy(16, "social", "Your friend forgot their lunch. What is kind to do?", "Share some of your food", "Eat in front of them", "Sharing is kind when a friend needs help.");
    easy(17, "social", "You feel very angry. Who can you talk to?", "A trusted adult", "No one", "A trusted adult can help you with big feelings.");
    easy(18, "social", "A classmate is shaking and hiding. How might they feel?", "Scared", "Happy", "Shaking and hiding often mean someone feels scared.");
    easy(19, "social", "You won a game. What do you say to the other team?", "Good game!", "You lost!", "Saying 'good game' shows good sportsmanship.");
    easy(20, "social", "You are lost in a store. Who can you ask for help?", "A store worker", "Nobody", "Store workers can help you find your family.");
    easy(21, "social", "A stranger knocks on your door. What should you do?", "Get an adult", "Open the door", "Let an adult answer the door for a stranger.");
    easy(22, "social", "Someone is using the computer you want. What do you do?", "Ask for a turn and wait", "Push them away", "Asking and waiting is the fair way to take turns.");
    easy(23, "social", "Someone helps pick up your books. What do you say?", "Thank you for helping", "Leave me alone", "Thanking people shows you notice their kindness.");
    easy(24, "social", "Your brother breaks your cup by accident. What can you calmly say?", "It's okay, accidents happen", "I hate you!", "Staying calm helps when accidents happen.");
    easy(25, "school", "The teacher is talking. What should you do?", "Listen quietly", "Talk loudly", "Listening quietly helps everyone learn.");
    easy(26, "school", "Where should you keep your lunch at school?", "In your backpack", "On the floor", "Your backpack keeps your lunch clean and safe.");
    easy(27, "school", "You are done using the markers. What should you do?", "Put them away", "Leave them on the floor", "Putting things away keeps the classroom tidy.");
    easy(28, "school", "The bell rings to start class. Where should you go?", "To your classroom", "To the parking lot", "When the bell rings, go to your classroom.");
    easy(29, "school", "You need the bathroom during class. What do you do?", "Ask the teacher", "Leave without asking", "Ask first, so your teacher knows where you are.");
    easy(30, "work", "How often does a pet cat need food?", "Every day", "Never", "Pets need food every day.");


    // ---------- MEDIUM (20): 3 choices ----------

    medium(1, "life", "You have $5. A sandwich costs $3. How much money is left?", "$2", ["$8", "$3"], "$5 take away $3 leaves $2.");
    medium(2, "life", "You are making a sandwich. What should you do first?", "Wash your hands", ["Eat the bread", "Put the plate away"], "Clean hands keep germs out of your food.");
    medium(3, "life", "The milk smells bad and is past its date. What should you do?", "Throw it away", ["Drink it quickly", "Put it back in the fridge"], "Old milk can make you sick.");
    medium(4, "life", "Where is the safest place to cross a busy street?", "At a crosswalk when the signal says walk", ["Between parked cars", "Wherever is closest"], "Crosswalks and signals help drivers see you.");
    medium(5, "life", "You spill food on your shirt at lunch. What is the best plan?", "Change later and put it in the laundry", ["Wear it all week", "Throw the shirt in the trash"], "Laundry gets stains out, so you can wear it again.");
    medium(6, "life", "You go shopping with $10 and a list. What should you buy first?", "The things on your list", ["Whatever looks fun", "The most expensive thing"], "A list helps you buy what you need first.");
    medium(7, "life", "School starts at 8:00. Why set your alarm for 7:00?", "To have time to get ready", ["To be late on purpose", "To skip getting dressed"], "Waking up early gives you time to get ready calmly.");
    medium(8, "life", "Which one is a healthy daily routine?", "Eat meals, move your body, and sleep enough", ["Stay up all night", "Eat only candy"], "Food, exercise and sleep keep your body healthy.");
    medium(9, "social", "Your friend wants to play a different game than you. What is fair?", "Take turns choosing", ["Always pick your game", "Stop being friends"], "Taking turns is fair to both friends.");
    medium(10, "social", "A classmate keeps taking your pencil without asking. What should you do first?", "Calmly ask them to stop", ["Take their things", "Yell at them"], "Starting calmly often solves the problem.");
    medium(11, "social", "A friend tells you someone is hurting them. What should you do?", "Tell a trusted adult", ["Keep it a secret forever", "Tell everyone at school"], "An adult can keep your friend safe.");
    medium(12, "social", "You want to join a group playing basketball. What can you say?", "Can I play too?", ["Get off the court!", "Nothing, just grab the ball"], "Asking nicely is the best way to join in.");
    medium(13, "social", "Someone sends you a mean message online. What is a good first step?", "Save it and show a trusted adult", ["Send a mean message back", "Share it with everyone"], "An adult can help you deal with online meanness.");
    medium(14, "work", "Your chore list says: feed the dog, then do homework. What comes first?", "Feed the dog", ["Do homework", "Watch TV"], "Follow the list in order.");
    medium(15, "work", "You borrowed a book from the library. What should you do with it?", "Return it on time", ["Keep it forever", "Give it to a friend"], "Returning books on time lets others read them too.");
    medium(16, "work", "Your job is to wipe the tables after lunch. What does being responsible mean?", "Doing it every day", ["Doing it only when someone watches", "Asking a friend to always do it"], "Responsible people do their job even when no one is watching.");
    medium(17, "school", "Math starts at 10:00. It is 9:55 now. What should you do?", "Get ready for Math", ["Start a new game", "Go outside"], "Five minutes is time to get ready for the next class.");
    medium(18, "school", "Your backpack strap breaks. What is a good plan?", "Ask an adult to help fix it", ["Leave your books at school forever", "Throw the backpack away"], "Many things can be fixed with a little help.");
    medium(19, "school", "You lost your jacket at school. Where should you look first?", "The lost and found", ["The cafeteria trash", "A stranger's car"], "Schools keep found items in the lost and found.");
    medium(20, "social", "At a friend's house, they ask you to take off your shoes. What should you do?", "Take them off politely", ["Refuse and walk in", "Leave the house"], "Following house rules shows respect.");


    // ---------- HARD (10): 3–4 choices ----------

    hard(1, "life", "You have $20 for the week. Lunch costs $3 a day for 5 days. How much is left after lunches?", "$5", ["$15", "$2", "$8"], "5 lunches × $3 = $15. $20 − $15 = $5.");
    hard(2, "life", "Tonight you have homework, a chore, and a TV show. What is the best order?", "Homework, chore, then TV", ["TV first, then maybe homework", "Skip the chore and watch TV", "Do nothing tonight"], "Finish what you must do first, then relax.");
    hard(3, "social", "Friends dare you to take something from a store. What is the best response?", "Say no and walk away", ["Take something small", "Let a friend do it", "Keep watch for them"], "Stealing is wrong. Saying no protects you, even under pressure.");
    hard(4, "life", "Your phone battery is low and you need to call home later. What is the best plan?", "Charge it now", ["Play games until it dies", "Turn it off and on many times", "Ignore it"], "Charging early means you can call when you need to.");
    hard(5, "school", "You broke a classmate's calculator by accident. What is the best thing to do?", "Tell them, say sorry, and offer to help fix it", ["Give it back and say nothing", "Hide it", "Blame someone else"], "Owning a mistake and making it right builds trust.");
    hard(6, "social", "At the park, you feel someone is following you. What is the safest choice?", "Go to a busy place and ask a trusted adult for help", ["Hide somewhere empty", "Keep walking alone", "Face them by yourself"], "Busy places and trusted adults keep you safe.");
    hard(7, "work", "Your shift starts at 3:00. It takes 30 minutes to get there. When should you leave?", "By 2:30", ["At 3:00", "At 3:30", "At 2:59"], "Leave 30 minutes early so you arrive on time.");
    hard(8, "life", "Shoes cost $40. You save $10 each week. How many weeks until you can buy them?", "4 weeks", ["2 weeks", "10 weeks", "40 weeks"], "$10 a week × 4 weeks = $40.");
    hard(9, "social", "Two friends are arguing and both want you on their side. What is a good way to help?", "Listen to both and suggest they talk it out", ["Pick the friend you like more", "Spread what they said", "Tell them to fight"], "Staying fair helps friends solve the problem.");
    hard(10, "life", "You are home alone and the power goes out. What is the safest choice?", "Use a flashlight and call a family member", ["Touch the wires to check them", "Go to a stranger's house", "Hide and tell no one"], "A flashlight is safe, and your family can help.");


    // Add the pack to the game's worlds
    pack.questions.forEach(q => {
        if (!categories[q.world]) {
            console.warn("[Life Quest] Weekly pack question for unknown world: " + q.world);
            return;
        }
        const { world, ...question } = q;
        categories[world].questions.push(question);
    });

})();
