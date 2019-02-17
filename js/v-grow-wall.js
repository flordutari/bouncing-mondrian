'use-strict'

class VGrowingWall{
    constructor(canvas, lives, x, y, sizeY, dy){
        this.sizeX = 20;
        this.sizeY = sizeY;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = dy;
        this.lives = lives;
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
            this.ctx.fillStyle = "rgba(20, 20, 200, .8)";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };

        if(this.dy === -1){  
            this.ctx.fillStyle = "rgba(200, 20, 20, .8)";
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

    loseLive(){
        this.lives--;
    };

    drawFixed(){
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    };
};
