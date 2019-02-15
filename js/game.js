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
        this.wall = new Wall(this.canvas);

        let x;
        let y;
        this.canvas.addEventListener("click",  (event) => {
            x = event.x;
            y = event.y;
            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;
            this.expansionWall = new ExpansionWall(this.canvas, 3, x, y);
            console.log(x, y)
        });
        
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
        if(this.expansionWall){
            this.expansionWall.update();
        }
    };

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCanvas(){
        this.ball.draw();
        if(this.expansionWall){
            this.expansionWall.draw();
        }
        this.wall.draw();
        //if (this.expansionWall.obtenerCoords(event)){};
    };

    checkAllCollisions(){
        this.ball.checkCollisionScreen();
        if(this.expansionWall){
        this.expansionWall.checkScreen();
        };
        /*checkCollisionWall();
        if(this.ball.checkCollisionExpWall(expansionWall)){
            this.expansionWall.loseLive();
            if(this.expansionWall.lives === 0){
                this.isGameOver = true;
                this.onGameOver();
            };
        };*/
    };

    gameOverCallback(callback){
        this.onGameOver = callback;
    };
};