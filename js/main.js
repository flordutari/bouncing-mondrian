'use-strict'
const main = () => {
    
    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;
        return main;
    };

    const buildSplashScreen = () => {
        const splashScreen = buildDom(`
        <section class="splash-screen">
        <section id="top-section">
            <div id="first-yellow" class="yellow"></div>
            <div id="first-white"></div>
            <div id="second-white"></div>
            <div></div>
        </section>
            <h1>Bouncing in a<br> Mondrian</h1>
            <button id="start">Start</button>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);

    };

    const buildGameScreen = () => {
        const gameScreen = buildDom(`
            <section class="game-screen">
                <canvas class="jscv direction"></canvas>
                <audio id="loop" controls>
                    <source type="audio/wav" src="audio/funky.wav"  allow="autoplay">
                </audio>
                <div class="lives-score">
                    <p class="lives">Lives : 3</p>
                    <p class="score">Score : 0</p>
                    <div id="countdown"></div>
                    <audio id="lost-live" controls>
                        <source type="audio/wav" src="audio/exp.wav">
                    </audio>
                    <audio id="bounce" controls>
                        <source type="audio/wav" src="audio/bounce2.wav">
                    </audio>
                </div>
                
                <p class="instruction">Press the Spacebar to toggle direction</p>
            </section>           
        `);

        // <p class="levels">Level : 1 </p>

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const pLives = document.querySelector('.lives');
        const changeLives = (lives) => {
            pLives.innerText = `Lives : ${lives}`
        };

        const pScore = document.querySelector('.score');
        const changeScore = (score) => {
            pScore.innerText = `Score : ${score}`
        };

        const game = new Game(canvasElement);
        game.gameOverCallback((score) => {
            buildGameOver(score);
        });
        game.onLivesChange(changeLives);
        game.onScoreChange(changeScore);
        
        document.addEventListener('keyup', event => {
            if(event.code === 'Space'){                
                game.direction = !game.direction;
                if (game.direction === true){
                canvasElement.className = "old-class";
                } else if (game.direction === false){
                canvasElement.className = "direction"; 
                }
              };
        });

        document.getElementById("countdown").innerText ="0:30";
        
        game.counter();
        game.startLoop();

    };

    const buildGameOver = (score) => {
        buildDom(`
            <section class="game-over">
                <h2>Game Over</h2>
                <p class="final-score"></p>
                <button id="restart">Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);

        const changeFinalScore = document.querySelector('.final-score');
            changeFinalScore.innerHTML = "Your score : " + score;
        
        if (game) { game.onScoreChange(changeFinalScore); };
    };

    buildSplashScreen();

};
window.addEventListener('load', main);
