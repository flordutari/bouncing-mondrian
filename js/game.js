'use-strict'

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ball;
        this.hGrowingWall;
        this.vGrowingWall;
        this.walls = [];
        this.checkSpace;
        this.isGameOver = false;
    };

    startLoop() {
        this.ball = new Ball(this.canvas);
        this.walls.push(new Wall(this.canvas, this.canvas.width, 20, 0, 0));
        this.walls.push(new Wall(this.canvas, 20, this.canvas.height - 40, this.canvas.width - 20, 20));
        this.walls.push(new Wall(this.canvas, this.canvas.width, 20, 0, this.canvas.height - 20));
        this.walls.push(new Wall(this.canvas, 20, this.canvas.height - 40, 0, 20));

        let x;
        let y;
       
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
        if(this.vGrowingWall){
            this.vGrowingWall.update();
        }
    };

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawCanvas(){
        this.ball.draw();
        if(this.vGrowingWall){
            this.vGrowingWall.draw();
        }
        this.walls.forEach((wall) => {
            wall.draw();
        });
        
    };

    checkAllCollisions(){
        this.walls.forEach((wall) => {
            this.ball.checkCollisionWalls(wall);
        });
        
        this.ball.checkCollisionScreen();
       
    };
    
    gameOverCallback(callback){
        this.onGameOver = callback;
    };
};

 // if(this.vGrowingWall){
        //     this.vGrowingWall.checkScreen();
        //     this.ball.checkCollisionExpWall(this.vGrowingWall);
        //         if (this.vGrowingWall === true) {
        //             this.vGrowingWall.loseLive();
        //         }
        //         if(this.vGrowingWall.lives === 0){
        //             this.isGameOver = true;
        //             this.onGameOver();
        //         };
        // };