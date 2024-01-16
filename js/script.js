const initializer = () => {
    const keyboard = document.querySelector(".keyboard");
    const h4 = document.querySelector("h4");
    const wordDisplay = document.querySelector(".word-display");
    const chance = document.querySelector(".chance");
    const img = document.querySelector(".img");

    const gameover = document.querySelector(".game-over");
    const gameoverimg = document.querySelector(".gameoverImg");
    const answer = document.querySelector(".answer");
    const h3 = document.querySelector("h3");
    const h6 = document.querySelector("h6");

    const gameOverTitle = gameover.querySelector(".game-over__title");
    const gameOverTextAnswer = gameover.querySelector(".game-over__text-answer");


    const newGameButton = document.querySelector(".game-over__btn");
    newGameButton.addEventListener("click", initializer);

    gameover.classList.remove("show");
    document.body.classList.remove('_lock');
    img.src = "./img/hangman-0.svg";

    let count = 0;

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const { word, hint } = wordList[randomIndex];
    console.log('word:',word);

    keyboard.innerHTML = "";
    chance.innerText = "0/6";

    for (let i = 97; i <= 122; i++) {
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = String.fromCharCode(i);
        keyboard.appendChild(button);
    }

    const gameOver = (bool) => {
        if (bool) {
            gameOverTitle.textContent = "Game over";
            gameover.classList.add("show");
            document.querySelector(".game").style.opacity = 0.8;
            document.body.classList.add('_lock');
            answer.textContent = word;

        } else {

            gameOverTitle.textContent = "Winner!"
            gameover.classList.add("show");
            document.querySelector(".game").style.opacity = 0.8;
            document.body.classList.add('_lock');
            answer.textContent = word;


        }
    };

    const gameOverwin = () => {
        const letterElem = document.querySelectorAll(".letter");
        var matchLetter = "";

        letterElem.forEach((v) => {
            matchLetter += v.innerText.toLowerCase();
        });
        if (matchLetter === word) {
            gameOver(false);
        }
    };

    const matchWord = (val) => {

        //console.log(val)

        const matches = [];
        word.split("").forEach((el, index) => {
            if (el === val.toLowerCase()) {
                matches.push(index);
            }
        });

        if (matches.length === 0) {
            count++;
            chance.innerText = `${count}/6`;
        } else {
            matches.forEach((v) => {
                const letterElem = document.querySelectorAll(".letter");
                letterElem[v].innerText = val;
                letterElem[v].classList.add("guess");
            });
        }
    };

    const loadQuestion = () => {
        h4.innerText = `Hint: ${hint}`;
        wordDisplay.innerHTML= '';
        for (let i = 0; i < word.length; i++) {
            let liTag = document.createElement("li");
            liTag.classList.add("letter");
            wordDisplay.appendChild(liTag);
        }

        const buttonTag = document.querySelectorAll(".btn");

        buttonTag.forEach((v) => {
            v.addEventListener("click", (e) => {
                matchWord(e.target.innerText);

                //console.log(e.target)

                e.target.disabled = true;

                const letterElem = document.querySelectorAll(".letter");

                if (count >= 1 && count < 2) {
                    img.src = "./img/hangman-1.svg";
                } else if (count >= 2 && count < 3) {
                    img.src = "./img/hangman-2.svg";
                } else if (count >= 3 && count < 4) {
                    img.src = "./img/hangman-3.svg";
                } else if (count >= 4 && count < 5) {
                    img.src = "./img/hangman-4.svg";
                } else if (count >= 5 && count < 6) {
                    img.src = "./img/hangman-5.svg";
                } else if (count >= 6 && count < 7) {
                    img.src = "./img/hangman-6.svg";
                    setTimeout(()=>{
                        gameOver(true);
                    },200)

                }
                gameOverwin();
            });
        });
    };

    loadQuestion();

    window.addEventListener('keydown', e =>{

        //console.log(e.key)

        // const clickKey = e.key.toUpperCase();
        // const codeKey = clickKey.charCodeAt(0);
        //
        // if (codeKey >= 65 && codeKey <= 90){
        //     matchWord(clickKey.toLowerCase());
        //     console.log(codeKey);
        // }

        if(e.keyCode >= 65 && e.keyCode <=90){
            //console.log(e.key)

            //console.log(keyboard)

            if (!gameover.classList.contains('show')){
                const currentKey = String.fromCharCode(e.keyCode).toLowerCase();

                console.log(currentKey);

                const btns = keyboard.querySelectorAll('.btn');

                btns.forEach( item => {
                    if(item.textContent === currentKey){
                        if( item.disabled !== true){
                            item.disabled = true;
                            matchWord(e.key.toLowerCase());
                            const letterElem = document.querySelectorAll(".letter");

                            if (count >= 1 && count < 2) {
                                img.src = "./img/hangman-1.svg";
                            } else if (count >= 2 && count < 3) {
                                img.src = "./img/hangman-2.svg";
                            } else if (count >= 3 && count < 4) {
                                img.src = "./img/hangman-4.svg";
                            } else if (count >= 4 && count < 5) {
                                img.src = "./img/hangman-5.svg";
                            } else if (count >= 6 && count < 7) {
                                img.src = "./img/hangman-6.svg";
                                setTimeout(()=>{
                                    gameOver(true);
                                },200)
                            }
                            gameOverwin();
                        }
                    }
                })
            }
        }
    });


}


const startHtml = () =>{
    const body = document.querySelector('body');

    const main = document.createElement("main");
    main.classList.add('main');

    const game =  document.createElement("div");
    game.classList.add('game');

    //left
    const createBlockLeft = document.createElement("div");
    createBlockLeft.classList.add('left');

    const createBlockLeftImg = document.createElement("img");
    createBlockLeftImg.classList.add('img');
    createBlockLeftImg.src = "img/hangman-0.svg";
    createBlockLeft.append(createBlockLeftImg);

    const createBlockLeftTitle = document.createElement("h1");
    createBlockLeftTitle.textContent = "HANGMAN GAME";
    createBlockLeft.append(createBlockLeftTitle);

    game.append(createBlockLeft);

    //right

    const createBlockRight = document.createElement("div");
    createBlockRight.classList.add('right');

    const createBlockRightUl = document.createElement("ul");
    createBlockRightUl.classList.add('word-display');

    const createBlockRightH4 = document.createElement("h4");

    const createBlockRightP = document.createElement("p");
    createBlockRightP.textContent = "Incorrect guessess:";
    const createBlockRightPSpan = document.createElement("span");
    createBlockRightPSpan.classList.add('chance');
    createBlockRightPSpan.textContent = '0/6';

    createBlockRightP.append(createBlockRightPSpan);

    const createBlockRightKeyboard = document.createElement("div");
    createBlockRightKeyboard.classList.add('keyboard');


    createBlockRight.append(createBlockRightUl);
    createBlockRight.append(createBlockRightH4);
    createBlockRight.append(createBlockRightP);
    createBlockRight.append(createBlockRightKeyboard);

    game.append(createBlockRight);


    //game-over

    const createGameOver = document.createElement("div");
    createGameOver.classList.add('game-over');

    const createGameOverTitle = document.createElement("h3");
    createGameOverTitle.classList.add('game-over__title');

    const createGameOverTextAnswer = document.createElement("h6");
    createGameOverTextAnswer.classList.add('game-over__text-answer');
    createGameOverTextAnswer.textContent = 'The Correct Word Was: ';

    const createGameOverAnswer = document.createElement("span");
    createGameOverAnswer.classList.add('answer');
    createGameOverTextAnswer.append(createGameOverAnswer);

    const createGameOverButton = document.createElement("button");
    createGameOverButton.textContent = 'PLAY AGAIN';
    createGameOverButton.classList.add('game-over__btn');


    createGameOver.append(createGameOverTitle);
    createGameOver.append(createGameOverTextAnswer);
    createGameOver.append(createGameOverButton);


    main.append(game);
    main.append(createGameOver);

    body.append(main);

   initializer();

}

window.onload = startHtml;


//window.onload = initializer;


//newGameButton.addEventListener("click", initializer);
