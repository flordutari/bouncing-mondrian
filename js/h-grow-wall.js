'use-strict'

class HGrowingWall{
    constructor(canvas, lives, x, y){
        this.sizeX1 = 20;
        this.sizeX2 = -20;
        this.sizeY = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.dx = 1;
        this.dy = 1;
        this.lives = lives;
        this.convertWallX1 = false;
        this.convertWallX2 = false;
    };

    update(){
        if (this.convertWallX1 === false){
            this.sizeX1++;
        };
        if(this.convertWallX2 === false){
            this.sizeX2--;
        };
    };

    draw(){
        for(let i = 0; i < this.canvas.width; i++){  
            this.ctx.fillStyle = "rgba(150, 10, 10, .8)";
            this.ctx.fillRect(this.x, this.y, this.sizeX1, this.sizeY);
        };

        for(let i = 0; i < this.canvas.width; i++){  
            this.ctx.fillStyle = "rgba(10, 10, 150, .8)";
            this.ctx.fillRect(this.x, this.y, this.sizeX2, this.sizeY);
        };
    };
       
    setDirection(direction){
        this.direction = direction;
    };

    checkScreen(){
        if((this.canvas.width - this.x) === this.sizeX1){
            this.convertWallX1 = true;
        };
        if(-this.x === this.sizeX2){
            this.convertWallX2 = true;
        };  
    };

    loseLive(){
        this.lives--;
        console.log(this.lives);
    };

    becomeFixedWall(){
        if(this.convertWallX1) {}
    };
};
