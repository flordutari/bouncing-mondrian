'use-strict'

class VGrowingWall{
    constructor(canvas, lives, x, y){
        this.sizeX = 20;
        this.sizeY1 = 20;
        this.sizeY2 = -20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.dx = 1;
        this.dy = 1;
        this.lives = lives;
        this.convertWallY1 = false;
        this.convertWallY2 = false;
    };

    update(){
        if (this.convertWallY1 === false){
            this.sizeY1++;
        };
        if(this.convertWallY2 === false){
            this.sizeY2--;
        };
    };

    draw(){
        for(let i = 0; i < this.canvas.width; i++){  
            this.ctx.fillStyle = "rgba(20, 20, 200, .8)";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY1);
        };

        for(let i = 0; i < this.canvas.width; i++){  
            this.ctx.fillStyle = "rgba(200, 20, 20, .8)";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY2);
        };
    };
       
    setDirection(direction){
        this.direction = direction;
    };

    checkScreen(){
        if((this.canvas.width - this.y) === this.sizeY2){
            this.convertWallY1 = true;
        };
        if(-this.y === this.sizeY1){
            this.convertWallY2 = true;
        };  
    };

    loseLive(){
        this.lives--;
        console.log(this.lives);
    };

    becomeFixedWall(){

    };
};
