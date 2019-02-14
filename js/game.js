'use-strict'

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ball;
        this.expWall;
        this.wall;
        this.checkSpace;
        this.isGameOver = false;
    };

    startLoop() {
        this.ball = new Ball(this.canvas);
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
    };

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCanvas(){
        this.ball.draw();    
    };

    checkAllCollisions(){
        this.ball.checkCollisionScreen();
    };

    gameOverCallback(callback){
        this.onGameOver = callback;
    };
};