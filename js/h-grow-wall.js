'use-strict'

class HGrowingWall{
    constructor(canvas, x, y, sizeX, dx){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.sizeX = sizeX;
        this.sizeY = 20;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = 2;
        this.convertWallRight = false;
        this.convertWallLeft = false;
    };

    update(){
        if(this.dx === 1){
            if (this.convertWallRight === false){
                this.sizeX++;
            };
        };
        if(this.dx === -1){
            if(this.convertWallLeft === false){
                this.sizeX--;
            };
        };
        this.checkScreen();
    };

    draw(){
        if(this.dx === 1){
            this.ctx.fillStyle = "#78c6e8";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };

        if(this.dx === -1){  
            this.ctx.fillStyle = "#92b7ef";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };
    };

    checkScreen(){
        if(this.dx === -1){
            if(this.x - 20 === Math.abs(this.sizeX)){
                this.convertWallLeft = true;
            };
        };

        if(this.dx === 1){
            if(this.canvas.width - this.x - 20 === this.sizeX){
                this.convertWallRight = true;
            }; 
        };
    };

    drawFixed(){
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    };
};
