'use-strict'

class Wall{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.size = 100;
        this.x = 100;
        this.y = 100;
    };

    draw(){
        this.ctx.fillStyle = "#55151A";
        this.ctx.fillRect(this.x, this.y, this.size, this.size); 
    };
   
};