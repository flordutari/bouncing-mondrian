'use-strict'

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ball;
        this.hGrowingWall;
        this.vGrowingWall;
        this.wall;
        this.checkSpace;
        this.isGameOver = false;
    };

    startLoop() {
        this.ball = new Ball(this.canvas);
        this.wall = new Wall(this.canvas);

        let x;
        let y;
        // this.canvas.addEventListener("click",  (event) => {
        //     x = event.x;
        //     y = event.y;
        //     x -= this.canvas.offsetLeft;
        //     y -= this.canvas.offsetTop;
        //     this.hGrowingWall = new HGrowingWall(this.canvas, 3, x, y);
        // });

        this.canvas.addEventListener("click",  (event) => {
            x = event.x;
            y = event.y;
            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;
            this.vGrowingWall = new VGrowingWall(this.canvas, 3, x, y);
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
        if(this.hGrowingWall){
            this.hGrowingWall.update();
        }
    };

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCanvas(){
        this.ball.draw();
        if(this.hGrowingWall){
            this.hGrowingWall.draw();
        }
        if(this.vGrowingWall){
            this.vGrowingWall.draw();
        }
        this.wall.draw();
    };

    checkAllCollisions(){
        this.ball.checkCollisionScreen();
        this.ball.checkCollisionWall(this.wall);
        if(this.hGrowingWall){
        this.hGrowingWall.checkScreen();
        this.ball.checkCollisionExpWall(this.hGrowingWall);
            if (this.hGrowingWall === true) {
                this.hGrowingWall.loseLive();
            }
            if(this.hGrowingWall.lives === 0){
                this.isGameOver = true;
                this.onGameOver();
            };
        };
        if(this.vGrowingWall){
            this.vGrowingWall.checkScreen();
            this.ball.checkCollisionExpWall(this.vGrowingWall);
                if (this.vGrowingWall === true) {
                    this.vGrowingWall.loseLive();
                }
                if(this.vGrowingWall.lives === 0){
                    this.isGameOver = true;
                    this.onGameOver();
                };
        };
    };
    

    gameOverCallback(callback){
        this.onGameOver = callback;
    };
};