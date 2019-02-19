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

    const buildGameScreen = () => {
        const gameScreen = buildDom(`
            <section class="game-screen">
                <canvas></canvas>
                <p>Lives : ${this.lives} </p>
                <p>Level : ${this.level} </p>
            </section>           
        `);

        setInterval(buildGameOver, 500000000);

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const game = new Game(canvasElement);
        game.gameOverCallback(buildGameOver);
        
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