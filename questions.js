// ==========================================
// LIFE QUEST: QUESTION BANK
// Loaded before engine.js and game.js (see index.html).
//
// HOW TO ADD QUESTIONS
//   Use the mc() helper inside a category:
//     mc("Question?", "The correct answer", ["Wrong 1", "Wrong 2", "Wrong 3"],
//        "easy" | "medium" | "hard", "Short, kind explanation.")
//   Or the full format: { question, answers, correct, difficulty, explanation }
//
//   Optional fields:
//     id:        a permanent id (e.g. "world-us-capitals-01"). Without one, the id
//                comes from the question text, so rewording a question resets its
//                history and removes it from saved Practice Mistakes lists.
//     keepOrder: true keeps the answers in the order written (e.g. True / False).
//
//   Answers are shuffled every time a question is shown, and number-only
//   answers are sorted from smallest to largest automatically.
//   Duplicate questions are reported in the browser console (F12).
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
,

            {
                question: "Which river is the longest in Africa?",
                answers: ["Congo River","Nile River","Zambezi River","Niger River"],
                correct: 1,
                difficulty: "medium",
                explanation: "The Nile is generally recognized as Africa's longest river."
            },

            {
                question: "Which country is home to Mount Kilimanjaro?",
                answers: ["Kenya","Uganda","Tanzania","Rwanda"],
                correct: 2,
                difficulty: "easy",
                explanation: "Mount Kilimanjaro is in Tanzania."
            },

            {
                question: "What is the smallest continent by land area?",
                answers: ["Europe","Australia","Antarctica","South America"],
                correct: 1,
                difficulty: "medium",
                explanation: "Australia is the smallest continent by land area."
            },

            {
                question: "Which desert is the largest hot desert in the world?",
                answers: ["Gobi","Kalahari","Sahara","Atacama"],
                correct: 2,
                difficulty: "medium",
                explanation: "The Sahara is the world's largest hot desert."
            },

            {
                question: "Which country has the most natural lakes?",
                answers: ["Canada","Russia","Brazil","United States"],
                correct: 0,
                difficulty: "hard",
                explanation: "Canada has more lakes than any other country."
            },

            {
                question: "Which city is located on two continents?",
                answers: ["Cairo","Istanbul","Nairobi","Lisbon"],
                correct: 1,
                difficulty: "medium",
                explanation: "Istanbul spans Europe and Asia across the Bosporus."
            },

            {
                question: "Which African lake is the world's second-largest freshwater lake by surface area?",
                answers: ["Lake Victoria","Lake Tanganyika","Lake Malawi","Lake Chad"],
                correct: 0,
                difficulty: "hard",
                explanation: "Lake Victoria is the second-largest freshwater lake by surface area after Lake Superior."
            },

            {
                question: "Which country is completely surrounded by South Africa?",
                answers: ["Eswatini","Lesotho","Botswana","Namibia"],
                correct: 1,
                difficulty: "hard",
                explanation: "Lesotho is an enclave entirely surrounded by South Africa."
            }
,

            {
                question: "Which African country is known as the 'Pearl of Africa'?",
                answers: ["Uganda","Ghana","Ethiopia","Senegal"],
                correct: 0,
                difficulty: "easy",
                explanation: "Uganda has long been associated with the nickname 'Pearl of Africa'."
            },

            {
                question: "Which strait separates Europe from Africa at the western Mediterranean?",
                answers: ["Strait of Gibraltar","Bering Strait","Bosporus","Strait of Malacca"],
                correct: 0,
                difficulty: "medium",
                explanation: "The Strait of Gibraltar separates southern Spain from northern Morocco."
            },

            {
                question: "Which country has the city of Marrakech?",
                answers: ["Morocco","Tunisia","Algeria","Egypt"],
                correct: 0,
                difficulty: "easy",
                explanation: "Marrakech is a major city in Morocco."
            },

            {
                question: "Which mountain range contains Mount Everest?",
                answers: ["Andes","Alps","Himalayas","Rockies"],
                correct: 2,
                difficulty: "easy",
                explanation: "Mount Everest is part of the Himalaya mountain range."
            },

            {
                question: "Which African country has Addis Ababa as its capital?",
                answers: ["Ethiopia","Eritrea","Somalia","Sudan"],
                correct: 0,
                difficulty: "easy",
                explanation: "Addis Ababa is the capital of Ethiopia."
            },

            {
                question: "Which ocean lies between Africa and Australia?",
                answers: ["Atlantic Ocean","Indian Ocean","Pacific Ocean","Arctic Ocean"],
                correct: 1,
                difficulty: "medium",
                explanation: "The Indian Ocean lies between Africa, Asia, and Australia."
            },

            {
                question: "Which country is home to the ancient city of Petra?",
                answers: ["Jordan","Lebanon","Turkey","Greece"],
                correct: 0,
                difficulty: "medium",
                explanation: "Petra is an ancient archaeological city in southern Jordan."
            },

            {
                question: "Which river flows through Egypt and empties into the Mediterranean Sea?",
                answers: ["Niger","Congo","Nile","Zambezi"],
                correct: 2,
                difficulty: "easy",
                explanation: "The Nile flows north through Egypt into the Mediterranean."
            },

            {
                question: "Which country is the world's most populous as of the mid-2020s?",
                answers: ["China","India","United States","Indonesia"],
                correct: 1,
                difficulty: "medium",
                explanation: "India surpassed China in population in 2023 and remains the most populous country in the mid-2020s."
            },

            {
                question: "Which African island nation is famous for its lemurs?",
                answers: ["Madagascar","Mauritius","Seychelles","Comoros"],
                correct: 0,
                difficulty: "medium",
                explanation: "Madagascar is famous for its many endemic lemur species."
            }
,

            {
                question: "Which country is home to the ancient city of Timbuktu?",
                answers: ["Mali","Niger","Chad","Sudan"],
                correct: 0,
                difficulty: "medium",
                explanation: "Timbuktu is a historic city in Mali."
            },

            {
                question: "Which African country has Kigali as its capital?",
                answers: ["Rwanda","Burundi","Uganda","Kenya"],
                correct: 0,
                difficulty: "easy",
                explanation: "Kigali is the capital of Rwanda."
            },

            {
                question: "Which country is famous for the fjords of Scandinavia?",
                answers: ["Norway","Portugal","Egypt","Mexico"],
                correct: 0,
                difficulty: "medium",
                explanation: "Norway is famous for its dramatic fjords."
            },

            {
                question: "Which sea lies between Europe and Africa?",
                answers: ["Mediterranean Sea","Caribbean Sea","Baltic Sea","Arabian Sea"],
                correct: 0,
                difficulty: "easy",
                explanation: "The Mediterranean Sea separates Europe from Africa in much of its extent."
            },

            {
                question: "Which African country is crossed by the Equator and has Mount Kenya?",
                answers: ["Kenya","Tanzania","Ethiopia","Ghana"],
                correct: 0,
                difficulty: "medium",
                explanation: "The Equator crosses Kenya, which is also home to Mount Kenya."
            },

            {
                question: "What is the capital of Canada?",
                answers: ["Toronto","Vancouver","Ottawa","Montreal"],
                correct: 2,
                difficulty: "easy",
                explanation: "Ottawa is Canada's capital."
            },

            {
                question: "Which country is home to the ancient pyramids of Giza?",
                answers: ["Egypt","Sudan","Jordan","Libya"],
                correct: 0,
                difficulty: "easy",
                explanation: "The Giza pyramid complex is in Egypt."
            },

            {
                question: "Which continent contains the Amazon rainforest?",
                answers: ["Africa","Asia","South America","Europe"],
                correct: 2,
                difficulty: "easy",
                explanation: "Most of the Amazon rainforest lies in South America."
            },

            {
                question: "Which African country has Cape Town, Pretoria and Bloemfontein as its capitals for different branches of government?",
                answers: ["South Africa","Namibia","Botswana","Zimbabwe"],
                correct: 0,
                difficulty: "hard",
                explanation: "South Africa has three capital cities with different governmental functions."
            },

            {
                question: "Which country is the world's largest archipelago by number of islands commonly cited?",
                answers: ["Indonesia","Japan","Philippines","Greece"],
                correct: 0,
                difficulty: "hard",
                explanation: "Indonesia is the world's largest archipelagic country."
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
                answers: ["Hogwarts", "Xavier's School", "Starfleet Academy", "Nevermore"],
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
,

            {
                question: "Which animated film features the song 'Let It Go'?",
                answers: ["Frozen","Encanto","Tangled","Brave"],
                correct: 0,
                difficulty: "easy",
                explanation: "'Let It Go' is from Disney's Frozen."
            },

            

            {
                question: "Which band released the song 'Bohemian Rhapsody'?",
                answers: ["The Beatles","Queen","ABBA","U2"],
                correct: 1,
                difficulty: "medium",
                explanation: "Queen released 'Bohemian Rhapsody' in 1975."
            },

            {
                question: "Which film franchise features the character Jack Sparrow?",
                answers: ["Pirates of the Caribbean","Indiana Jones","Mission: Impossible","The Mummy"],
                correct: 0,
                difficulty: "easy",
                explanation: "Captain Jack Sparrow is the central character of Pirates of the Caribbean."
            },

            {
                question: "Which artist is known for the album 'Thriller'?",
                answers: ["Prince","Michael Jackson","Elton John","Stevie Wonder"],
                correct: 1,
                difficulty: "easy",
                explanation: "Michael Jackson released the album Thriller."
            },

            {
                question: "In the Mario games, what is the name of Mario's brother?",
                answers: ["Luigi","Wario","Toad","Yoshi"],
                correct: 0,
                difficulty: "easy",
                explanation: "Luigi is Mario's younger twin brother."
            },

            {
                question: "Which television series follows a chemistry teacher who enters the illegal drug trade?",
                answers: ["The Wire","Breaking Bad","Lost","Suits"],
                correct: 1,
                difficulty: "medium",
                explanation: "Breaking Bad follows Walter White and his transformation into a methamphetamine manufacturer."
            }
,

            {
                question: "Which actor played the archaeologist Indiana Jones in the original films?",
                answers: ["Harrison Ford","Tom Hanks","Tom Cruise","Keanu Reeves"],
                correct: 0,
                difficulty: "easy",
                explanation: "Indiana Jones is the archaeologist and adventurer at the center of the franchise."
            },

            {
                question: "Which singer released the album '21'?",
                answers: ["Adele","Rihanna","Beyoncé","Taylor Swift"],
                correct: 0,
                difficulty: "medium",
                explanation: "Adele released the album 21 in 2011."
            },

            {
                question: "In the Harry Potter series, what is the name of Harry's owl?",
                answers: ["Hedwig","Scabbers","Fawkes","Crookshanks"],
                correct: 0,
                difficulty: "medium",
                explanation: "Hedwig is Harry Potter's snowy owl."
            },

            {
                question: "Which film won the Academy Award for Best Picture at the 67th Academy Awards?",
                answers: ["Forrest Gump","Pulp Fiction","The Shawshank Redemption","Four Weddings and a Funeral"],
                correct: 0,
                difficulty: "hard",
                explanation: "Forrest Gump won Best Picture at the 67th Academy Awards."
            },

            {
                question: "Which fictional city does the Dark Knight protect?",
                answers: ["Metropolis","Gotham City","Central City","Star City"],
                correct: 1,
                difficulty: "easy",
                explanation: "The Dark Knight protects the fictional Gotham City."
            },

            {
                question: "Which video game character is known for the phrase 'It's-a me'?",
                answers: ["Sonic","Mario","Link","Kirby"],
                correct: 1,
                difficulty: "easy",
                explanation: "Mario is famously associated with the phrase 'It's-a me, Mario!'."
            },

            {
                question: "Which artist painted the famous portrait 'Mona Lisa'?",
                answers: ["Michelangelo","Leonardo da Vinci","Raphael","Donatello"],
                correct: 1,
                difficulty: "medium",
                explanation: "Leonardo da Vinci painted the Mona Lisa."
            },

            {
                question: "Which TV sitcom follows six friends living in New York City?",
                answers: ["Friends","The Office","Modern Family","Brooklyn Nine-Nine"],
                correct: 0,
                difficulty: "easy",
                explanation: "Friends follows six friends living in New York City."
            },

            {
                question: "Which movie features the fictional kingdom of Arendelle?",
                answers: ["Frozen","Moana","Coco","Aladdin"],
                correct: 0,
                difficulty: "easy",
                explanation: "Arendelle is the fictional kingdom in Disney's Frozen."
            },

            {
                question: "Which music group included John Lennon, Paul McCartney, George Harrison and Ringo Starr?",
                answers: ["The Rolling Stones","The Beatles","ABBA","The Beach Boys"],
                correct: 1,
                difficulty: "easy",
                explanation: "Those four musicians formed the classic lineup of The Beatles."
            }
,

            {
                question: "Which actor played Jack in the film Titanic?",
                answers: ["Leonardo DiCaprio","Brad Pitt","Tom Hanks","Matt Damon"],
                correct: 0,
                difficulty: "easy",
                explanation: "Leonardo DiCaprio played Jack Dawson."
            },

            {
                question: "Which Disney character is a wooden puppet who wants to become a real boy?",
                answers: ["Pinocchio","Peter Pan","Aladdin","Hercules"],
                correct: 0,
                difficulty: "easy",
                explanation: "Pinocchio is the wooden puppet in the classic story."
            },

            {
                question: "Which superhero carries a shield featuring a star?",
                answers: ["Captain America","Thor","Iron Man","Hulk"],
                correct: 0,
                difficulty: "easy",
                explanation: "Captain America's iconic shield bears a star."
            },

            {
                question: "Which franchise features the characters Luke Skywalker and Darth Vader?",
                answers: ["Star Wars","Star Trek","Dune","Avatar"],
                correct: 0,
                difficulty: "easy",
                explanation: "Luke Skywalker and Darth Vader are central Star Wars characters."
            },

            {
                question: "Which singer is known for the album 'Lemonade'?",
                answers: ["Beyoncé","Adele","Sia","Ariana Grande"],
                correct: 0,
                difficulty: "medium",
                explanation: "Beyoncé released Lemonade in 2016."
            },

            

            {
                question: "Which fictional detective lives at 221B Baker Street?",
                answers: ["Sherlock Holmes","Hercule Poirot","James Bond","Miss Marple"],
                correct: 0,
                difficulty: "medium",
                explanation: "Sherlock Holmes is famously associated with 221B Baker Street."
            },

            {
                question: "Which video game series stars the hero Link?",
                answers: ["The Legend of Zelda","Final Fantasy","Halo","Sonic the Hedgehog"],
                correct: 0,
                difficulty: "easy",
                explanation: "Link is the hero of Nintendo's The Legend of Zelda series."
            },

            {
                question: "Which movie franchise features dinosaurs brought back through genetic engineering?",
                answers: ["Jurassic Park","Transformers","The Matrix","Terminator"],
                correct: 0,
                difficulty: "easy",
                explanation: "Jurassic Park centers on genetically recreated dinosaurs."
            },

            {
                question: "Which singer released the song 'Shape of You'?",
                answers: ["Ed Sheeran","Bruno Mars","Justin Bieber","Sam Smith"],
                correct: 0,
                difficulty: "easy",
                explanation: "Ed Sheeran released Shape of You."
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
,

            

            {
                question: "What is the process by which plants use light to make food?",
                answers: ["Respiration","Photosynthesis","Fermentation","Digestion"],
                correct: 1,
                difficulty: "easy",
                explanation: "Plants use photosynthesis to convert light energy into chemical energy."
            },

            {
                question: "How many bones are in the adult human body, approximately?",
                answers: ["106","206","306","406"],
                correct: 1,
                difficulty: "medium",
                explanation: "A typical adult human skeleton has 206 bones."
            },

            

            {
                question: "What is the chemical symbol for gold?",
                answers: ["Ag","Au","Gd","Go"],
                correct: 1,
                difficulty: "easy",
                explanation: "Gold's chemical symbol is Au, from the Latin word aurum."
            },

            {
                question: "Which planet has the most prominent ring system?",
                answers: ["Mars","Venus","Saturn","Mercury"],
                correct: 2,
                difficulty: "easy",
                explanation: "Saturn is famous for its extensive and bright ring system."
            },

            {
                question: "What force keeps planets in orbit around the Sun?",
                answers: ["Magnetism","Friction","Gravity","Electricity"],
                correct: 2,
                difficulty: "medium",
                explanation: "Gravity provides the force that keeps planets in orbit around the Sun."
            },

            {
                question: "What is the approximate speed of light in a vacuum?",
                answers: ["300,000 km/s","30,000 km/s","3,000 km/s","3,000,000 km/s"],
                correct: 0,
                difficulty: "hard",
                explanation: "Light travels through a vacuum at about 300,000 kilometers per second."
            }
,

            {
                question: "Which part of a cell contains most of its genetic material?",
                answers: ["Nucleus","Cell wall","Ribosome","Vacuole"],
                correct: 0,
                difficulty: "medium",
                explanation: "In eukaryotic cells, most DNA is contained in the nucleus."
            },

            {
                question: "What is the boiling point of water at sea level in Celsius?",
                answers: ["90°C","100°C","110°C","120°C"],
                correct: 1,
                difficulty: "easy",
                explanation: "Pure water boils at 100°C at standard atmospheric pressure."
            },

            {
                question: "Which blood cells primarily help fight infections?",
                answers: ["Red blood cells","White blood cells","Platelets","Plasma"],
                correct: 1,
                difficulty: "medium",
                explanation: "White blood cells are key components of the immune system."
            },

            {
                question: "What is the largest organ of the human body?",
                answers: ["Liver","Brain","Skin","Lungs"],
                correct: 2,
                difficulty: "medium",
                explanation: "The skin is the body's largest organ by surface area and weight."
            },

            

            {
                question: "What type of energy is stored in food?",
                answers: ["Chemical energy","Sound energy","Nuclear energy","Light energy"],
                correct: 0,
                difficulty: "medium",
                explanation: "Food stores chemical energy that the body can release through metabolism."
            },

            {
                question: "Which vitamin is commonly produced in the skin after sunlight exposure?",
                answers: ["Vitamin A","Vitamin C","Vitamin D","Vitamin K"],
                correct: 2,
                difficulty: "easy",
                explanation: "Sunlight helps the skin produce vitamin D."
            },

            {
                question: "What is the pH of a neutral solution at about room temperature?",
                answers: ["0","5","7","14"],
                correct: 2,
                difficulty: "medium",
                explanation: "A neutral aqueous solution has a pH of about 7 at room temperature."
            },

            {
                question: "Which particle has a negative electric charge?",
                answers: ["Proton","Neutron","Electron","Photon"],
                correct: 2,
                difficulty: "easy",
                explanation: "Electrons carry negative electric charge."
            },

            {
                question: "What is the name of the process in which a solid changes directly into a gas?",
                answers: ["Condensation","Sublimation","Freezing","Melting"],
                correct: 1,
                difficulty: "hard",
                explanation: "Sublimation is the direct change from solid to gas without becoming liquid."
            }
,

            {
                question: "What is the largest planet in our solar system?",
                answers: ["Jupiter","Saturn","Neptune","Earth"],
                correct: 0,
                difficulty: "easy",
                explanation: "Jupiter is the largest planet in the solar system."
            },

            {
                question: "Which gas do plants take in from the air to make their food?",
                answers: ["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],
                correct: 1,
                difficulty: "easy",
                explanation: "Plants use carbon dioxide during photosynthesis."
            },

            {
                question: "What is the basic unit of life?",
                answers: ["Cell","Atom","Tissue","Organ"],
                correct: 0,
                difficulty: "easy",
                explanation: "The cell is the basic structural and functional unit of life."
            },

            {
                question: "Which metal is liquid at room temperature?",
                answers: ["Iron","Mercury","Copper","Aluminum"],
                correct: 1,
                difficulty: "medium",
                explanation: "Mercury is liquid at typical room temperature."
            },

            {
                question: "What is the hardest natural substance commonly known?",
                answers: ["Quartz","Diamond","Granite","Steel"],
                correct: 1,
                difficulty: "medium",
                explanation: "Diamond is the hardest naturally occurring mineral on the Mohs scale."
            },

            {
                question: "Which organ is primarily responsible for filtering waste from the blood to make urine?",
                answers: ["Heart","Kidney","Stomach","Pancreas"],
                correct: 1,
                difficulty: "easy",
                explanation: "The kidneys filter blood and produce urine."
            },

            {
                question: "What is DNA short for?",
                answers: ["Deoxyribonucleic acid","Dynamic nuclear acid","Double nitrogen atom","Deoxygenated nucleic agent"],
                correct: 0,
                difficulty: "medium",
                explanation: "DNA stands for deoxyribonucleic acid."
            },

            {
                question: "Which phenomenon causes the apparent bending of a straw in water?",
                answers: ["Refraction","Gravity","Magnetism","Evaporation"],
                correct: 0,
                difficulty: "hard",
                explanation: "Light changes direction when it passes between materials with different optical densities."
            },

            {
                question: "How many chromosomes are normally found in a human somatic cell?",
                answers: ["23","46","44","48"],
                correct: 1,
                difficulty: "hard",
                explanation: "Most human somatic cells contain 46 chromosomes arranged in 23 pairs."
            },

            {
                question: "Which scientist formulated the laws of motion and universal gravitation?",
                answers: ["Isaac Newton","Albert Einstein","Galileo Galilei","Marie Curie"],
                correct: 0,
                difficulty: "medium",
                explanation: "Isaac Newton formulated the classical laws of motion and universal gravitation."
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
                    "Report it to a trusted adult",
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
                    "Stay home without telling anyone",
                    "Let the school know and get there safely",
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
                    "Check traffic and cross safely",
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
                    "Block them and tell an adult",
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
,

            

            {
                question: "Which habit can help build an emergency fund?",
                answers: ["Saving regularly","Spending every payday","Ignoring expenses","Borrowing for every purchase"],
                correct: 0,
                difficulty: "easy",
                explanation: "Regular saving is a practical way to build an emergency fund."
            },

            {
                question: "What does interest mean when you borrow money?",
                answers: ["The cost of borrowing","A free gift","A tax refund","A salary increase"],
                correct: 0,
                difficulty: "medium",
                explanation: "Interest is generally the cost paid for using borrowed money."
            },

            

            {
                question: "What is compound interest?",
                answers: ["Interest on principal and past interest","A bank fee only","A fixed salary","A type of tax"],
                correct: 0,
                difficulty: "medium",
                explanation: "Compound interest allows interest to be calculated on both the original amount and accumulated interest."
            },

            {
                question: "What is a good first step before making a major purchase?",
                answers: ["Compare the cost with your budget","Buy immediately","Borrow as much as possible","Ignore the price"],
                correct: 0,
                difficulty: "easy",
                explanation: "Checking a major purchase against your budget helps prevent unaffordable spending."
            },

            {
                question: "What does diversification mean in investing?",
                answers: ["Spreading investments across different assets","Putting all money into one asset","Avoiding all savings","Borrowing more money"],
                correct: 0,
                difficulty: "medium",
                explanation: "Diversification spreads exposure across different investments rather than concentrating it in one."
            },

            {
                question: "If an investment rises from $1,000 to $1,200, what is the percentage gain?",
                answers: ["10%","15%","20%","25%"],
                correct: 2,
                difficulty: "medium",
                explanation: "The gain is $200, and $200 divided by $1,000 is 20%."
            }
,

            {
                question: "If you earn $2,000 and spend $1,500, how much remains before savings or other deductions?",
                answers: ["$300","$400","$500","$600"],
                correct: 2,
                difficulty: "easy",
                explanation: "$2,000 minus $1,500 leaves $500."
            },

            {
                question: "What does 'living below your means' generally mean?",
                answers: ["Spending less than you earn","Borrowing more than you earn","Avoiding all spending","Spending everything you earn"],
                correct: 0,
                difficulty: "easy",
                explanation: "Living below your means means your spending is lower than your income."
            },

            {
                question: "What is an opportunity cost?",
                answers: ["The next best choice you give up","A bank charge","A guaranteed profit","A government tax"],
                correct: 0,
                difficulty: "medium",
                explanation: "Opportunity cost is the value of the next best alternative forgone."
            },

            {
                question: "Why is an emergency fund useful?",
                answers: ["To cover unexpected expenses","To increase taxes","To guarantee investment profits","To eliminate every bill"],
                correct: 0,
                difficulty: "easy",
                explanation: "Emergency savings can help cover unexpected costs."
            },

            {
                question: "What is inflation?",
                answers: ["A general rise in prices over time","A fall in all prices","A rise in wages only","A decrease in money supply only"],
                correct: 0,
                difficulty: "medium",
                explanation: "Inflation refers to a sustained increase in the general price level."
            },

            {
                question: "What is the main purpose of insurance?",
                answers: ["To transfer certain financial risks","To guarantee wealth","To eliminate every risk","To make all purchases cheaper"],
                correct: 0,
                difficulty: "medium",
                explanation: "Insurance can transfer specified financial risks to an insurer in exchange for premiums."
            },

            {
                question: "If you save $100 every month, how much do you save in one year before interest?",
                answers: ["$600","$1,000","$1,200","$1,500"],
                correct: 2,
                difficulty: "easy",
                explanation: "$100 × 12 months equals $1,200."
            },

            {
                question: "What does liquidity describe in finance?",
                answers: ["How easily an asset can be converted to cash","How profitable a company must be","How much debt a person has","How old an investment is"],
                correct: 0,
                difficulty: "hard",
                explanation: "Liquidity describes how readily an asset can be converted to cash with little loss in value."
            },

            {
                question: "What is diversification intended to reduce?",
                answers: ["Concentration risk","All possible losses","Taxes in every situation","Inflation completely"],
                correct: 0,
                difficulty: "medium",
                explanation: "Diversification can reduce the risk of concentrating an investment portfolio in one exposure."
            },

            {
                question: "What is a fixed expense?",
                answers: ["A cost that usually stays the same","A surprise purchase","A discount","A one-time gift"],
                correct: 0,
                difficulty: "easy",
                explanation: "Rent or a fixed subscription can be examples of expenses that generally stay constant for a period."
            }
,

            {
                question: "What is net income generally?",
                answers: ["Income after relevant deductions","Total sales before costs","Money borrowed","The value of possessions"],
                correct: 0,
                difficulty: "medium",
                explanation: "Net income is income remaining after applicable deductions and expenses depending on context."
            },

            {
                question: "What does APR commonly represent on a loan?",
                answers: ["Annual Percentage Rate","Average Payment Return","Annual Profit Ratio","Applied Principal Rate"],
                correct: 0,
                difficulty: "medium",
                explanation: "APR stands for Annual Percentage Rate."
            },

            {
                question: "What is a financial asset?",
                answers: ["Something with financial value","Only physical property","A household appliance","A work schedule"],
                correct: 0,
                difficulty: "medium",
                explanation: "Financial assets include items such as cash, shares, and bonds that represent value or claims."
            },

            {
                question: "Why is tracking expenses useful?",
                answers: ["It shows where money is going","It guarantees investment returns","It eliminates taxes","It increases salary automatically"],
                correct: 0,
                difficulty: "easy",
                explanation: "Expense tracking helps reveal spending patterns and supports budgeting."
            },

            {
                question: "What is a credit score generally designed to indicate?",
                answers: ["Creditworthiness","Height","Employment seniority","Investment profit"],
                correct: 0,
                difficulty: "medium",
                explanation: "Credit scores are used to assess aspects of a borrower's credit risk."
            },

            {
                question: "What is a loan principal?",
                answers: ["The original amount borrowed","The interest only","A late fee","The monthly payment only"],
                correct: 0,
                difficulty: "medium",
                explanation: "Principal is the amount originally borrowed, excluding interest."
            },

            {
                question: "What is a bear market commonly associated with?",
                answers: ["Broadly falling asset prices","Rapid price increases","No price movement","Guaranteed profits"],
                correct: 0,
                difficulty: "medium",
                explanation: "A bear market is commonly associated with a sustained decline in market prices."
            },

            {
                question: "What is a bull market commonly associated with?",
                answers: ["Broadly rising asset prices","A total market closure","Falling wages only","Fixed prices"],
                correct: 0,
                difficulty: "medium",
                explanation: "A bull market is generally characterized by rising asset prices."
            },

            {
                question: "What is a financial goal?",
                answers: ["A target for your money","A random purchase","A bank password","A tax penalty"],
                correct: 0,
                difficulty: "easy",
                explanation: "A financial goal is a defined objective such as saving a target amount or paying down debt."
            },

            {
                question: "Why should an investor consider risk tolerance?",
                answers: ["Investments have different levels of risk","It guarantees profits","It predicts every price","It eliminates uncertainty"],
                correct: 0,
                difficulty: "hard",
                explanation: "Risk tolerance helps an investor choose exposures that fit their ability and willingness to handle losses."
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
                    "To set up the government framework",
                    "To list every school",
                    "To create weather forecasts",
                    "To explain sports rules"
                ],
                correct: 0,
                difficulty: "medium",
                explanation: "The Constitution establishes the framework and powers of the U.S. government."
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
,

            {
                question: "What is 12 × 8?",
                answers: ["86","96","108","116"],
                correct: 1,
                difficulty: "easy",
                explanation: "12 multiplied by 8 equals 96."
            },

            {
                question: "Which part of speech describes a noun?",
                answers: ["Verb","Adjective","Conjunction","Preposition"],
                correct: 1,
                difficulty: "easy",
                explanation: "An adjective describes or modifies a noun."
            },

            {
                question: "What is the square root of 144?",
                answers: ["10","11","12","14"],
                correct: 2,
                difficulty: "easy",
                explanation: "12 × 12 equals 144."
            },

            {
                question: "Which punctuation mark normally ends a direct question?",
                answers: ["Comma","Period","Question mark","Colon"],
                correct: 2,
                difficulty: "easy",
                explanation: "A question mark is normally used at the end of a direct question."
            },

            {
                question: "What is the main gas in Earth's atmosphere?",
                answers: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
                correct: 1,
                difficulty: "medium",
                explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
            },

            {
                question: "What is 15% of 200?",
                answers: ["15","20","30","35"],
                correct: 2,
                difficulty: "easy",
                explanation: "0.15 × 200 equals 30."
            },

            {
                question: "Which branch of mathematics studies shapes, sizes, and properties of space?",
                answers: ["Algebra","Geometry","Statistics","Calculus"],
                correct: 1,
                difficulty: "medium",
                explanation: "Geometry studies shapes, sizes, and spatial relationships."
            },

            {
                question: "If a triangle has angles of 50° and 60°, what is the third angle?",
                answers: ["60°","70°","80°","90°"],
                correct: 1,
                difficulty: "medium",
                explanation: "The angles of a triangle total 180°, so 180 - 50 - 60 = 70°."
            }
,

            

            {
                question: "Which planet is known as the Red Planet?",
                answers: ["Venus","Mars","Jupiter","Saturn"],
                correct: 1,
                difficulty: "easy",
                explanation: "Mars appears reddish because of iron minerals on its surface."
            },

            {
                question: "What is the main function of the roots of most plants?",
                answers: ["Absorb water and anchor the plant","Produce seeds only","Make flowers","Absorb sunlight"],
                correct: 0,
                difficulty: "medium",
                explanation: "Roots anchor plants and absorb water and minerals from the soil."
            },

            {
                question: "Which literary term describes a comparison using 'like' or 'as'?",
                answers: ["Metaphor","Simile","Hyperbole","Irony"],
                correct: 1,
                difficulty: "medium",
                explanation: "A simile compares things using words such as 'like' or 'as'."
            },

            {
                question: "What is 3/4 expressed as a percentage?",
                answers: ["25%","50%","75%","80%"],
                correct: 2,
                difficulty: "easy",
                explanation: "Three quarters equals 0.75, or 75%."
            },

            {
                question: "Which ancient civilization built Machu Picchu?",
                answers: ["Roman","Inca","Egyptian","Mayan"],
                correct: 1,
                difficulty: "medium",
                explanation: "Machu Picchu was built by the Inca civilization."
            },

            {
                question: "What is the perimeter of a square with sides of 6 cm?",
                answers: ["12 cm","18 cm","24 cm","36 cm"],
                correct: 2,
                difficulty: "medium",
                explanation: "A square has four equal sides, so 4 × 6 = 24 cm."
            },

            {
                question: "Which layer of Earth is directly beneath the crust?",
                answers: ["Inner core","Outer core","Mantle","Atmosphere"],
                correct: 2,
                difficulty: "medium",
                explanation: "The mantle lies directly beneath Earth's crust."
            },

            {
                question: "What is the next prime number after 17?",
                answers: ["18","19","20","21"],
                correct: 1,
                difficulty: "easy",
                explanation: "19 is the next prime number after 17."
            },

            {
                question: "Which branch of government generally makes laws in a constitutional democracy?",
                answers: ["Legislative","Judicial","Executive","Electoral"],
                correct: 0,
                difficulty: "medium",
                explanation: "The legislative branch is generally responsible for making laws."
            }
,

            {
                question: "What is 7 × 9?",
                answers: ["56","63","72","81"],
                correct: 1,
                difficulty: "easy",
                explanation: "Seven times nine equals 63."
            },

            {
                question: "What is the capital of Australia?",
                answers: ["Sydney","Melbourne","Canberra","Perth"],
                correct: 2,
                difficulty: "easy",
                explanation: "Canberra is Australia's capital."
            },

            {
                question: "Which scientist is associated with the theory of evolution by natural selection?",
                answers: ["Charles Darwin","Isaac Newton","Louis Pasteur","Nikola Tesla"],
                correct: 0,
                difficulty: "medium",
                explanation: "Charles Darwin developed the theory of evolution by natural selection."
            },

            {
                question: "What is the chemical symbol for oxygen?",
                answers: ["O","Ox","C","Og"],
                correct: 0,
                difficulty: "easy",
                explanation: "O is the chemical symbol for oxygen."
            },

            {
                question: "What is 2.5 × 4?",
                answers: ["8","9","10","12"],
                correct: 2,
                difficulty: "easy",
                explanation: "2.5 multiplied by 4 equals 10."
            },

            {
                question: "Which ancient civilization developed democracy in Athens?",
                answers: ["Ancient Greeks","Romans","Vikings","Persians"],
                correct: 0,
                difficulty: "medium",
                explanation: "Ancient Athens developed an early form of democracy."
            },

            {
                question: "What is the area of a rectangle 8 cm long and 5 cm wide?",
                answers: ["13 cm²","26 cm²","40 cm²","80 cm²"],
                correct: 2,
                difficulty: "medium",
                explanation: "Area equals length × width, so 8 × 5 = 40 cm²."
            },

            {
                question: "Which layer of the atmosphere contains most weather?",
                answers: ["Troposphere","Stratosphere","Mesosphere","Thermosphere"],
                correct: 0,
                difficulty: "hard",
                explanation: "Most weather occurs in the troposphere."
            },

            {
                question: "What is 25% of 80?",
                answers: ["10","15","20","25"],
                correct: 2,
                difficulty: "easy",
                explanation: "One quarter of 80 is 20."
            },

            {
                question: "Which instrument is used to measure temperature?",
                answers: ["Barometer","Thermometer","Hygrometer","Anemometer"],
                correct: 1,
                difficulty: "easy",
                explanation: "A thermometer measures temperature."
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
                question: "In the NFL, how many points is a touchdown worth before the extra point?",
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
                    "Finish in as few strokes as possible",
                    "Hit the ball the highest",
                    "Run the fastest"
                ],
                correct: 1,
                difficulty: "easy",
                explanation: "Golf generally rewards completing the course using fewer strokes."
            }
,

            

            

            {
                question: "How many Grand Slam tournaments are there in tennis each year?",
                answers: ["2","3","4","5"],
                correct: 2,
                difficulty: "medium",
                explanation: "The four Grand Slam tournaments are the Australian Open, French Open, Wimbledon, and US Open."
            },

            {
                question: "In golf, what is one stroke under par on a hole called?",
                answers: ["Bogey","Par","Birdie","Eagle"],
                correct: 2,
                difficulty: "easy",
                explanation: "A birdie is one stroke under par on a hole."
            },

            {
                question: "How long is an Olympic swimming pool?",
                answers: ["25 meters","50 meters","75 meters","100 meters"],
                correct: 1,
                difficulty: "medium",
                explanation: "The standard Olympic long-course swimming pool is 50 meters long."
            },

            {
                question: "In athletics, how many laps of a standard 400-metre track make up a 1,500-metre race?",
                answers: ["2","3","3.75","4.5"],
                correct: 2,
                difficulty: "medium",
                explanation: "1,500 divided by 400 equals 3.75 laps."
            },

            {
                question: "Which country won the first FIFA World Cup in 1930?",
                answers: ["Brazil","Argentina","Uruguay","Italy"],
                correct: 2,
                difficulty: "hard",
                explanation: "Uruguay won the inaugural FIFA World Cup in 1930."
            },

            {
                question: "In cricket, how many legal deliveries are normally in one over?",
                answers: ["4","5","6","8"],
                correct: 2,
                difficulty: "medium",
                explanation: "A standard cricket over consists of six legal deliveries."
            }
,

            {
                question: "How many points is a free throw worth in basketball?",
                answers: ["1","2","3","4"],
                correct: 0,
                difficulty: "easy",
                explanation: "A successful free throw is worth one point."
            },

            {
                question: "How many players are on a volleyball team on court at one time?",
                answers: ["5","6","7","8"],
                correct: 1,
                difficulty: "easy",
                explanation: "Indoor volleyball teams have six players on court."
            },

            

            {
                question: "How many minutes are in a standard soccer match, not counting added time?",
                answers: ["60","75","90","120"],
                correct: 2,
                difficulty: "easy",
                explanation: "A regulation football match has two 45-minute halves."
            },

            

            {
                question: "In Formula 1, what flag traditionally signals the end of a race?",
                answers: ["Red","Yellow","Green","Checkered"],
                correct: 3,
                difficulty: "medium",
                explanation: "The chequered flag signals the end of a race."
            },

            

            {
                question: "In rugby union, how many points is a try worth?",
                answers: ["3","5","7","10"],
                correct: 1,
                difficulty: "medium",
                explanation: "A try in rugby union is worth five points."
            },

            {
                question: "Which country hosted the first modern Olympic Games in 1896?",
                answers: ["France","Greece","Italy","United Kingdom"],
                correct: 1,
                difficulty: "hard",
                explanation: "The first modern Olympic Games were held in Athens, Greece, in 1896."
            },

            {
                question: "In tennis, what score comes after 30?",
                answers: ["35","40","45","50"],
                correct: 1,
                difficulty: "easy",
                explanation: "The traditional sequence is love, 15, 30, 40, then game."
            }
,

            

            {
                question: "How many sets must a player generally win to win a best-of-three tennis match?",
                answers: ["1","2","3","4"],
                correct: 1,
                difficulty: "easy",
                explanation: "A player must win two sets in a best-of-three match."
            },

            {
                question: "Which country is strongly associated with the origin of modern rugby?",
                answers: ["England","Brazil","Canada","Japan"],
                correct: 0,
                difficulty: "medium",
                explanation: "Modern rugby developed in England."
            },

            {
                question: "How many holes are played in a standard full round of golf?",
                answers: ["9","12","18","24"],
                correct: 2,
                difficulty: "easy",
                explanation: "A standard full round consists of 18 holes."
            },

            {
                question: "Which sport awards a touchdown?",
                answers: ["American football","Basketball","Cricket","Hockey"],
                correct: 0,
                difficulty: "easy",
                explanation: "A touchdown is a scoring play in American football."
            },

            {
                question: "Which country is home to the football club FC Barcelona?",
                answers: ["Spain","Italy","Portugal","France"],
                correct: 0,
                difficulty: "easy",
                explanation: "FC Barcelona is based in Barcelona, Spain."
            },

            {
                question: "In boxing, what is a knockout?",
                answers: ["When a fighter cannot continue","A type of training","A scoring bonus","A timeout"],
                correct: 0,
                difficulty: "medium",
                explanation: "A knockout occurs when a fighter cannot continue within the referee's count or under the applicable rules."
            },

            {
                question: "Which event combines swimming, cycling and running?",
                answers: ["Triathlon","Decathlon","Pentathlon","Heptathlon"],
                correct: 0,
                difficulty: "easy",
                explanation: "A triathlon combines swimming, cycling, and running."
            },

            {
                question: "How many points is a three-point shot worth in basketball?",
                answers: ["1","2","3","4"],
                correct: 2,
                difficulty: "easy",
                explanation: "A successful shot from beyond the three-point line is worth three points."
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
,

            {
                question: "What does CV commonly stand for in job applications?",
                answers: ["Career Value","Curriculum Vitae","Company Verification","Candidate Volume"],
                correct: 1,
                difficulty: "easy",
                explanation: "CV stands for Curriculum Vitae."
            },

            {
                question: "What is a deadline?",
                answers: ["The latest time to finish","A lunch break","A salary bonus","A job title"],
                correct: 0,
                difficulty: "easy",
                explanation: "A deadline is the latest time by which a task is expected to be completed."
            },

            {
                question: "Which skill is most useful when working in a team?",
                answers: ["Communication","Avoiding everyone","Ignoring feedback","Hiding problems"],
                correct: 0,
                difficulty: "easy",
                explanation: "Clear communication helps teams coordinate work and solve problems."
            },

            {
                question: "What is a KPI?",
                answers: ["Key Performance Indicator","Known Payment Invoice","Key Project Interview","Knowledge Planning Index"],
                correct: 0,
                difficulty: "medium",
                explanation: "KPI stands for Key Performance Indicator, a measure used to track performance."
            },

            {
                question: "What should you generally do when you make a mistake at work?",
                answers: ["Hide it","Blame someone else","Acknowledge it and help fix it","Delete the evidence"],
                correct: 2,
                difficulty: "easy",
                explanation: "Acknowledging a mistake and helping correct it supports accountability and problem solving."
            },

            {
                question: "What is networking in a professional context?",
                answers: ["Building professional relationships","Installing internet cables","Avoiding colleagues","Changing passwords"],
                correct: 0,
                difficulty: "medium",
                explanation: "Professional networking involves building and maintaining relationships that can support learning and opportunities."
            },

            {
                question: "Which document usually summarizes a project's planned tasks and deadlines?",
                answers: ["Project plan","Receipt","Passport","Menu"],
                correct: 0,
                difficulty: "medium",
                explanation: "A project plan typically outlines tasks, responsibilities, timelines, and milestones."
            },

            {
                question: "What is delegation?",
                answers: ["Giving tasks to others while staying responsible","Doing every task yourself","Cancelling a project","Avoiding deadlines"],
                correct: 0,
                difficulty: "hard",
                explanation: "Delegation means assigning work to others while the person delegating remains accountable for the overall outcome."
            }
,

            {
                question: "What does a meeting agenda normally provide?",
                answers: ["A list of topics to discuss","A salary statement","A job contract","A tax receipt"],
                correct: 0,
                difficulty: "easy",
                explanation: "An agenda outlines the topics and often the order for a meeting."
            },

            {
                question: "What is a milestone in project management?",
                answers: ["A key point in a project","A daily lunch","A company logo","A type of salary"],
                correct: 0,
                difficulty: "medium",
                explanation: "A milestone marks an important stage, event, or achievement in a project."
            },

            {
                question: "What is prioritization?",
                answers: ["Deciding which tasks deserve attention first","Doing every task simultaneously","Avoiding deadlines","Delegating every responsibility"],
                correct: 0,
                difficulty: "easy",
                explanation: "Prioritization helps determine which tasks should receive attention first."
            },

            {
                question: "What is a professional elevator pitch?",
                answers: ["A brief explanation of who you are","A building safety inspection","A long business report","A salary negotiation only"],
                correct: 0,
                difficulty: "medium",
                explanation: "An elevator pitch is a concise introduction to a person, idea, product, or business."
            },

            {
                question: "What does remote work mean?",
                answers: ["Working outside the traditional office","Working only at night","Working without a manager","Working without technology"],
                correct: 0,
                difficulty: "easy",
                explanation: "Remote work generally means performing job duties away from the traditional workplace."
            },

            {
                question: "What is a stakeholder?",
                answers: ["A person affected by a project","Only the project manager","A type of software","A company vehicle"],
                correct: 0,
                difficulty: "medium",
                explanation: "Stakeholders can include people or groups affected by or interested in a project."
            },

            {
                question: "What is a deliverable?",
                answers: ["A specific project output","A lunch break","A job interview","A company holiday"],
                correct: 0,
                difficulty: "medium",
                explanation: "A deliverable is a defined output or result that a project must produce."
            },

            {
                question: "What does productivity generally measure?",
                answers: ["How effectively inputs become outputs","How many meetings you attend","How long you stay online","How many emails you receive"],
                correct: 0,
                difficulty: "hard",
                explanation: "Productivity concerns the relationship between outputs and the inputs used to produce them."
            },

            {
                question: "Why are meeting minutes useful?",
                answers: ["They record key decisions and action items","They replace every company policy","They guarantee attendance","They calculate salaries"],
                correct: 0,
                difficulty: "easy",
                explanation: "Meeting minutes provide a record of decisions, discussions, and action items."
            },

            {
                question: "What is a conflict of interest?",
                answers: ["Personal interests affecting work duties","A disagreement about lunch","A successful negotiation","A routine performance review"],
                correct: 0,
                difficulty: "hard",
                explanation: "A conflict of interest occurs when competing personal interests could improperly influence professional responsibilities."
            }
,

            {
                question: "What does ROI commonly stand for in business?",
                answers: ["Return on Investment","Rate of Income","Risk of Income","Return on Inventory"],
                correct: 0,
                difficulty: "medium",
                explanation: "ROI stands for Return on Investment."
            },

            {
                question: "What is a business model?",
                answers: ["How a business creates and earns value","A company logo","An employee badge","A meeting schedule"],
                correct: 0,
                difficulty: "medium",
                explanation: "A business model describes how an organization creates, delivers, and captures value."
            },

            {
                question: "What is gross revenue?",
                answers: ["Revenue before costs or deductions","Profit after all expenses","Cash in a personal wallet","Employee salary"],
                correct: 0,
                difficulty: "medium",
                explanation: "Gross revenue refers to total revenue before subtracting expenses or other deductions."
            },

            {
                question: "What is a target market?",
                answers: ["A group of customers a business targets","A stock exchange","A tax office","A company building"],
                correct: 0,
                difficulty: "easy",
                explanation: "A target market is the customer group a product or service is intended to reach."
            },

            {
                question: "What is an entrepreneur?",
                answers: ["Someone who starts a business","Only a government worker","A customer","A tax collector"],
                correct: 0,
                difficulty: "easy",
                explanation: "An entrepreneur creates or develops a business venture and accepts associated risks."
            },

            {
                question: "What is a profit margin?",
                answers: ["Revenue left as profit","The number of employees","The price of a building","A loan term"],
                correct: 0,
                difficulty: "medium",
                explanation: "Profit margin measures profit relative to revenue."
            },

            {
                question: "Why is customer feedback valuable?",
                answers: ["It reveals needs and improvements","It guarantees sales","It eliminates competition","It replaces accounting"],
                correct: 0,
                difficulty: "easy",
                explanation: "Customer feedback can reveal problems, preferences, and opportunities for improvement."
            },

            {
                question: "What is cash flow?",
                answers: ["Money entering and leaving an account","Only profit","Only debt","The company share price"],
                correct: 0,
                difficulty: "medium",
                explanation: "Cash flow tracks cash entering and leaving an entity."
            },

            {
                question: "What is a business expense?",
                answers: ["A cost of running a business","A customer review","A sales target","A company slogan"],
                correct: 0,
                difficulty: "easy",
                explanation: "Business expenses are costs associated with operating the business."
            }

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
,

            {
                question: "What is active listening?",
                answers: ["Planning your reply while someone talks","Paying attention and trying to understand the speaker","Interrupting often","Ignoring body language"],
                correct: 1,
                difficulty: "easy",
                explanation: "Active listening involves paying attention, understanding, and responding thoughtfully."
            },

            {
                question: "What is empathy?",
                answers: ["Understanding another person's feelings","Winning every argument","Avoiding people","Agreeing with everything"],
                correct: 0,
                difficulty: "easy",
                explanation: "Empathy involves understanding another person's feelings or point of view."
            },

            {
                question: "What is a respectful way to disagree?",
                answers: ["Insult the person","Explain your view calmly","Shout louder","End the conversation immediately"],
                correct: 1,
                difficulty: "easy",
                explanation: "Calmly explaining a different view allows disagreement without attacking the other person."
            },

            {
                question: "What does body language include?",
                answers: ["Posture and facial expressions","Only spoken words","Written exams","Bank statements"],
                correct: 0,
                difficulty: "easy",
                explanation: "Body language includes nonverbal signals such as posture, gestures, and facial expressions."
            },

            {
                question: "What is a boundary in a relationship?",
                answers: ["A limit on what feels comfortable","A rule that controls everyone","A financial investment","A punishment"],
                correct: 0,
                difficulty: "medium",
                explanation: "A personal boundary communicates limits around what someone is comfortable with or willing to accept."
            },

            {
                question: "When resolving a disagreement, what is usually most helpful?",
                answers: ["Listening to both sides","Refusing to listen","Spreading rumors","Threatening the other person"],
                correct: 0,
                difficulty: "easy",
                explanation: "Listening to both sides can help identify the real issue and possible solutions."
            },

            {
                question: "What is constructive feedback?",
                answers: ["Feedback meant to help improvement","An insult disguised as advice","Only praise","Public embarrassment"],
                correct: 0,
                difficulty: "medium",
                explanation: "Constructive feedback identifies specific areas for improvement in a useful and respectful way."
            },

            {
                question: "What is a good response when you do not understand someone's instructions?",
                answers: ["Pretend you understand","Ask for clarification","Ignore the task","Blame the speaker"],
                correct: 1,
                difficulty: "easy",
                explanation: "Asking for clarification reduces misunderstandings and helps ensure the task is done correctly."
            }
,

            

            {
                question: "What is assertive communication?",
                answers: ["Clearly stating needs while respecting others","Getting your way by force","Never speaking up","Agreeing with everyone"],
                correct: 0,
                difficulty: "medium",
                explanation: "Assertive communication balances clear self-expression with respect for others."
            },

            {
                question: "What is peer pressure?",
                answers: ["Influence from your social group","A school exam","A financial investment","A medical treatment"],
                correct: 0,
                difficulty: "easy",
                explanation: "Peer pressure is influence from peers or a social group."
            },

            {
                question: "What is a stereotype?",
                answers: ["A generalized belief about a group","A verified fact about every individual","A personal budget","A communication skill"],
                correct: 0,
                difficulty: "medium",
                explanation: "A stereotype is a generalized belief or assumption about a group."
            },

            {
                question: "Why can asking open-ended questions improve a conversation?",
                answers: ["They encourage fuller responses","They always end arguments","They prevent people from speaking","They guarantee agreement"],
                correct: 0,
                difficulty: "medium",
                explanation: "Open-ended questions often encourage people to explain their thoughts in more detail."
            },

            {
                question: "What is digital citizenship?",
                answers: ["Responsible participation online","Owning a smartphone","Using social media every day","Having many followers"],
                correct: 0,
                difficulty: "medium",
                explanation: "Digital citizenship involves responsible, safe, and respectful behavior online."
            },

            {
                question: "What is consent in an interpersonal situation?",
                answers: ["A clear and voluntary agreement","Silence in every situation","Pressure from friends","An assumption"],
                correct: 0,
                difficulty: "medium",
                explanation: "Consent should be clear, voluntary, and free from coercion."
            },

            {
                question: "What is a rumor?",
                answers: ["Unverified information that is circulated","A confirmed official announcement","A written contract","A scientific law"],
                correct: 0,
                difficulty: "easy",
                explanation: "A rumor is information circulated without reliable verification."
            },

            {
                question: "What is compromise?",
                answers: ["A solution with shared concessions","One person always wins","Avoiding every discussion","Refusing to negotiate"],
                correct: 0,
                difficulty: "medium",
                explanation: "Compromise involves each side making concessions toward an acceptable solution."
            },

            {
                question: "Why is it useful to pause before responding when angry?",
                answers: ["It can reduce impulsive reactions","It guarantees you are right","It makes the other person agree","It ends every conflict"],
                correct: 0,
                difficulty: "easy",
                explanation: "Pausing can create space to respond thoughtfully rather than impulsively."
            }
,

            {
                question: "What is respect?",
                answers: ["Treating people with dignity","Always agreeing","Avoiding communication","Winning arguments"],
                correct: 0,
                difficulty: "easy",
                explanation: "Respect involves treating others with consideration and dignity."
            },

            {
                question: "What is an assumption?",
                answers: ["Something believed without enough evidence","A confirmed measurement","A legal contract","A scientific law"],
                correct: 0,
                difficulty: "medium",
                explanation: "An assumption is something accepted as true without sufficient evidence or verification."
            },

            

            {
                question: "What is a healthy way to handle criticism?",
                answers: ["Listen and consider what you can learn","Insult the person","Reject every point automatically","Spread rumors"],
                correct: 0,
                difficulty: "easy",
                explanation: "Constructive reflection can turn useful criticism into learning."
            },

            {
                question: "What is collaboration?",
                answers: ["Working toward a shared goal","Working alone","Avoiding responsibility","Competing on every task"],
                correct: 0,
                difficulty: "easy",
                explanation: "Collaboration means working together toward a shared objective."
            },

            {
                question: "What is a misunderstanding?",
                answers: ["Information interpreted differently","A confirmed agreement","A planned celebration","A legal judgment"],
                correct: 0,
                difficulty: "easy",
                explanation: "A misunderstanding occurs when communication is interpreted differently from the intended meaning."
            },

            {
                question: "Why is tone important in communication?",
                answers: ["It can change how a message is perceived","It always makes facts true","It removes the need for words","It guarantees agreement"],
                correct: 0,
                difficulty: "medium",
                explanation: "Tone can strongly influence how the receiver interprets a message."
            },

            {
                question: "What is mediation?",
                answers: ["A neutral process for resolving disputes","A punishment","A public argument","A social media post"],
                correct: 0,
                difficulty: "hard",
                explanation: "Mediation uses a neutral third party to help disputing people work toward a resolution."
            },

            {
                question: "What is confidentiality?",
                answers: ["Keeping appropriate information private","Sharing everything publicly","Ignoring a promise","Changing someone's password"],
                correct: 0,
                difficulty: "medium",
                explanation: "Confidentiality means protecting information from unauthorized disclosure."
            },

            {
                question: "What is a constructive conversation?",
                answers: ["A discussion aimed at solving something","A conversation designed to humiliate","An argument where nobody listens","A rumor session"],
                correct: 0,
                difficulty: "easy",
                explanation: "Constructive conversations focus on understanding, problem-solving, or improvement."
            }

        ]
    }
};
