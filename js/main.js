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
            <h1>Isolate it</h1>
            <button>Start</button>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);

    };

    const buildGameScreen = () => {
        const gameScreen = buildDom(`
            <section class="game-screen">
                <canvas></canvas>
            </section>
            <form>
                <input id="switchButton1" class="switch" type="button" value="V" />
                <input id="switchButton2" class="switch" type="button" value="V" />
                <input id="switchButton3" class="switch" type="button" value="V" />
                <input id="switchButton4" class="switch" type="button" value="V" />
                <input id="nextLevelButton" type="button" value="Next level" />
                <input id="playAgainButton" type="button" value="Play again" />
            </form>
            
        `);

        setInterval(buildGameOver, 3000000);

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const game = new Game(canvasElement);
        game.gameOverCallback(buildGameOver);
        
        game.startLoop();

        const setPlayerDirection = (event) => {
            if(event.code === 'ArrowUp'){
                game.player.setDirection(-1)
            } else if(event.code === 'ArrowDown'){
                game.player.setDirection(1)
            };
        };

        document.addEventListener('click', setPlayerDirection);

    };

    const buildGameOver = () => {
        const gameOverScreen = buildDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <button>Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    };

    buildSplashScreen();

};
window.addEventListener('load', main);