'use-strict'

class Wall{
    constructor(canvas, sizeX, sizeY, x, y){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.x = x;
        this.y = y;
    };

    draw(){
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY); 
    };
   
};
