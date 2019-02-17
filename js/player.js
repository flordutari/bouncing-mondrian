'use strict'

class Player{
    constructor(canvas, x, y, lives){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.lives = lives;
        this.sizeX = 20;
        this.sizeY = 40;
    }

    

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    }

    loseLives(){

    }

    setDirection(){

    }
}