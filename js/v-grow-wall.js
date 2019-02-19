'use-strict'

class VGrowingWall{
    constructor(canvas, x, y, sizeY, dy){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.sizeX = 20;
        this.sizeY = sizeY;
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = dy;
        this.convertWallTop = false;
        this.convertWallBottom = false;
    };

    update(){
        if(this.dy === 1){
            if(this.convertWallBottom === false){
                this.sizeY++;
            };
        };
        if(this.dy === -1){
            if(this.convertWallTop === false){
                this.sizeY--;
            };
        };
        this.checkScreen();
    };

    draw(){
        if(this.dy === 1){ 
            this.ctx.fillStyle = "#78c6e8";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };

        if(this.dy === -1){  
            this.ctx.fillStyle = "#92b7ef";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };
    };
    
    checkScreen(){
        if(this.dy === -1){
            if(this.y - 20 === Math.abs(this.sizeY)){
                this.convertWallTop = true;
            };
        };

        if(this.dy === 1){
            if(this.canvas.height - this.y - 20 === this.sizeY){
                this.convertWallBottom = true;
            }; 
        };
    };

    drawFixed(){
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    };
};
