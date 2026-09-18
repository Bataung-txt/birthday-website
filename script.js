// ========================================
// BIRTHDAY CARD → GAME SCREEN
// ========================================

const button = document.getElementById("enterbutton");
    if (button) {
        button.addEventListener("click",
            function() {
                window.location.href ="levels.html";
            }
        )
    }

const birthdayCard = document.querySelector(".birthday-card");
const levelScreen = document.querySelector(".level-container")

const gameScreen = document.querySelector(".game-screen");



const easybutton = document.getElementById("easybutton");
const mediumbutton= document.getElementById("mediumbutton");
const hardbutton = document.getElementById("hardbutton");
    if (easybutton) {
        easybutton.addEventListener("click",
            function() {
                levelScreen.style.display = "none";
                gameScreen.style.display = "block";
            }
        );
    };
     if (mediumbutton) {
        mediumbutton.addEventListener("click",
            function() {
                levelScreen.style.display = "none";
                gameScreen.style.display = "block";
            }
        );
    };
     if (hardbutton) {
        hardbutton.addEventListener("click",
            function() {
                levelScreen.style.display = "none";
                gameScreen.style.display = "block";
            }
        );
    };
   
// ========================================
// EASY WORD SEARCH
// ========================================


// ========================================
// WORDS THE PLAYER MUST FIND
// ========================================

const wordsToFind = [
    "HAPPY",
    "BIRTHDAY",
    "SMILE",
    "JOY",
    "GIFT"
];


// ========================================
// GRID SETTINGS
// ========================================

const GRID_SIZE = 10;

const letters =
    Array(GRID_SIZE * GRID_SIZE).fill("");


// ========================================
// DIRECTIONS
// ========================================

const directions = [
    [0, 1],    // right
    [1, 0],    // down
    [1, 1],    // diagonal down-right
    [1, -1]    // diagonal down-left
];


// ========================================
// FIND THE GRID
// ========================================

const wordGrid =
    document.getElementById("wordGrid");


// ========================================
// PLACE A WORD
// ========================================

function placeWord(word) {

    for (let attempt = 0; attempt < 100; attempt++) {

        const direction =
            directions[
                Math.floor(
                    Math.random() * directions.length
                )
            ];

        const rowStep = direction[0];

        const columnStep = direction[1];


        const startRow =
            Math.floor(
                Math.random() * GRID_SIZE
            );

        const startColumn =
            Math.floor(
                Math.random() * GRID_SIZE
            );


        let fits = true;


        // ========================================
        // CHECK WHETHER WORD FITS
        // ========================================

        for (
            let i = 0;
            i < word.length;
            i++
        ) {

            const row =
                startRow + (rowStep * i);

            const column =
                startColumn + (columnStep * i);


            // Outside grid

            if (
                row < 0 ||
                row >= GRID_SIZE ||
                column < 0 ||
                column >= GRID_SIZE
            ) {

                fits = false;

                break;

            }


            const index =
                (row * GRID_SIZE) + column;


            // Letter conflict

            if (
                letters[index] !== "" &&
                letters[index] !== word[i]
            ) {

                fits = false;

                break;

            }

        }


        // ========================================
        // PLACE WORD
        // ========================================

        if (fits) {

            for (
                let i = 0;
                i < word.length;
                i++
            ) {

                const row =
                    startRow + (rowStep * i);

                const column =
                    startColumn + (columnStep * i);


                const index =
                    (row * GRID_SIZE) + column;


                letters[index] =
                    word[i];

            }


            return true;

        }

    }


    return false;
}


// ========================================
// PLACE ALL WORDS
// ========================================

for (
    let i = 0;
    i < wordsToFind.length;
    i++
) {

    placeWord(wordsToFind[i]);

}


// ========================================
// FILL EMPTY SPACES
// ========================================

const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


for (
    let i = 0;
    i < letters.length;
    i++
) {

    if (letters[i] === "") {

        letters[i] =
            alphabet[
                Math.floor(
                    Math.random() * alphabet.length
                )
            ];

    }

}


// ========================================
// DISPLAY WORD LIST
// ========================================

const wordList =
    document.getElementById("wordList");


let foundWords = 0;


for (
    let i = 0;
    i < wordsToFind.length;
    i++
) {

    const word =
        document.createElement("span");


    word.textContent =
        wordsToFind[i];


    word.dataset.word =
        wordsToFind[i];


    wordList.appendChild(word);

}


// ========================================
// CREATE THE GRID
// ========================================

let firstLetter = null;

let secondLetter = null;


for (
    let i = 0;
    i < letters.length;
    i++
) {

    const letterBox =
        document.createElement("div");


    letterBox.classList.add("letter");


    letterBox.textContent =
        letters[i];


    letterBox.dataset.index =
        i;


    // ========================================
    // LETTER CLICK
    // ========================================

    letterBox.addEventListener(
        "click",
        function() {

            if (firstLetter === null) {

                firstLetter =
                    letterBox;

                letterBox.classList.add(
                    "selected"
                );

            }

            else if (secondLetter === null) {

                secondLetter =
                    letterBox;

                letterBox.classList.add(
                    "selected"
                );

                checkWord();

            }

        }
    );


    wordGrid.appendChild(letterBox);

}


// ========================================
// CHECK WORD
// ========================================

function checkWord() {

    const startIndex =
        Number(
            firstLetter.dataset.index
        );


    const endIndex =
        Number(
            secondLetter.dataset.index
        );


    const startRow =
        Math.floor(
            startIndex / GRID_SIZE
        );


    const startColumn =
        startIndex % GRID_SIZE;


    const endRow =
        Math.floor(
            endIndex / GRID_SIZE
        );


    const endColumn =
        endIndex % GRID_SIZE;


    const rowStep =
        endRow === startRow
            ? 0
            : (endRow > startRow ? 1 : -1);


    const columnStep =
        endColumn === startColumn
            ? 0
            : (endColumn > startColumn ? 1 : -1);


    const validLine =
        startRow === endRow ||
        startColumn === endColumn ||
        Math.abs(endRow - startRow) ===
        Math.abs(endColumn - startColumn);


    if (!validLine) {

        document.getElementById("message")
            .textContent =
            "Try selecting a straight line! 🔎";

        clearSelection();

        firstLetter = null;
        secondLetter = null;

        return;

    }


    let selectedWord = "";

    let row = startRow;

    let column = startColumn;


    let selectedIndexes = [];


    while (true) {

        const index =
            (row * GRID_SIZE) + column;


        selectedWord +=
            letters[index];


        selectedIndexes.push(index);


        if (
            row === endRow &&
            column === endColumn
        ) {

            break;

        }


        row += rowStep;

        column += columnStep;

    }


    const normalWord =
        selectedWord;


    const reverseWord =
        selectedWord
            .split("")
            .reverse()
            .join("");


    let foundWord = null;


    if (
        wordsToFind.includes(normalWord)
    ) {

        foundWord =
            normalWord;

    }

    else if (
        wordsToFind.includes(reverseWord)
    ) {

        foundWord =
            reverseWord;

    }


    // ========================================
    // CORRECT WORD
    // ========================================

    if (foundWord !== null) {

        const wordElement =
            document.querySelector(
                '[data-word="' +
                foundWord +
                '"]'
            );


        if (
            wordElement &&
            !wordElement.classList.contains("found")
        ) {

            wordElement.classList.add("found");


            selectedIndexes.forEach(
                function(index) {

                    wordGrid.children[index]
                        .classList.add(
                            "found-letter"
                        );

                }
            );


            foundWords++;


            document.getElementById("score")
                .textContent =
                "Words Found: " +
                foundWords +
                " / " +
                wordsToFind.length;


            document.getElementById("message")
                .textContent =
                "🎉 You Found " +
                foundWord +
                "!";


            if (
                foundWords ===
                wordsToFind.length
            ) {

                document.getElementById(
                    "levelComplete"
                ).style.display = "block";

            }

        }

        else {

            document.getElementById("message")
                .textContent =
                "You already found " +
                foundWord +
                "!";

            clearSelection();

        }

    }

    else {

        document.getElementById("message")
            .textContent =
            "Try again! 🔎";

        clearSelection();

    }


    firstLetter = null;

    secondLetter = null;

}


// ========================================
// CLEAR TEMPORARY SELECTION
// ========================================

function clearSelection() {

    const selectedLetters =
        document.querySelectorAll(
            ".letter.selected"
        );


    selectedLetters.forEach(
        function(letter) {

            if (
                !letter.classList.contains(
                    "found-letter"
                )
            ) {

                letter.classList.remove(
                    "selected"
                );

            }

        }
    );

}
    const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", function(){
    window.location.href = "final.html";
})