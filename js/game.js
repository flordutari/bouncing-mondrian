'use-strict'

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ball;
        this.expansionWall;
        this.wall;
        this.checkSpace;
        this.isGameOver = false;
    };

    startLoop() {
        this.ball = new Ball(this.canvas);
        this.expansionWall = new ExpansionWall(this.canvas, 3);
        this.canvas.addEventListener("click", this.expansionWall.obtenerCoords, false);
        const loop = () => {
            
            this.checkAllCollisions();
            this.updateCanvas();
            this.clearCanvas();
            this.drawCanvas();
            if(!this.isGameOver){

            window.requestAnimationFrame(loop);
            };
        };

        window.requestAnimationFrame(loop);
    };
    
    updateCanvas(){
        this.ball.update();
        this.expansionWall.update();
    };

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCanvas(){
        this.ball.draw();
        this.expansionWall.draw();
        //if (this.expansionWall.obtenerCoords(event)){};
    };

    checkAllCollisions(){
        this.ball.checkCollisionScreen();
        this.expansionWall.checkScreen();
    };

    gameOverCallback(callback){
        this.onGameOver = callback;
    };
};