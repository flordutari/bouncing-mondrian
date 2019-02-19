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
            <h1>Fire hazard</h1>
            <button>Start</button>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);

    };

    const buildGameScreen = (lives, level) => {
        const gameScreen = buildDom(`
            <section class="game-screen">
                <canvas></canvas>
                <p class="lives">Lives : 5 </p>
                <p class="instruction">Press Shift to toggle direction</p>
            </section>           
        `);

        // <p class="levels">Level : 1 </p>

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const pLives = document.querySelector('.lives')
        const changeLives = (lives) => {
            pLives.innerText = `Lives: ${lives}`
        };
        
        const game = new Game(canvasElement);
        game.gameOverCallback(buildGameOver);
        game.onLivesChange(changeLives);
        
        document.addEventListener('keyup', event => {
            if(event.code === 'ShiftLeft' || event.code === 'ShiftRight'){
                console.log(game.direction)
                return game.direction = !game.direction
              };
        });

        game.startLoop();

    };

    const buildGameOver = () => {
        const gameOverScreen = buildDom(`
            <section class="game-over">
                <h2>Game Over</h2>
                <button>Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    };

    buildSplashScreen();

};
window.addEventListener('load', main);