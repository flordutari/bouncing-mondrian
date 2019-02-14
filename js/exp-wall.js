'use-strict'

class ExpansionWall{
    constructor(canvas, lives){
        this.size = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = 200;
        this.y = 200;
        this.speed = 2;
        this.dx1 = 1;
        this.dx2 = -1;
        this.dy1 = 1;
        this.dy2 = -1;
        this.lives = lives;
    };

    update(){
        this.x = this.x + this.dx1 * this.speed;
    };

    draw(){
        let x = this.x;
        let y = this.y;
        for(let i = 0; i < this.canvas.width; i++){
            this.ctx.beginPath();  
            this.ctx.fillStyle = "#435345";
            this.ctx.fillRect(x, y, (this.size)--, 20);
        };
    };

    setDirection(direction){
        this.direction = direction;
    };

    checkScreen(){
        if(this.y - this.size/2 <= 0){
            this.direction = 1;
        } else if (this.y + this.size/2 >= this.canvas.height){
            this.direction = -1;
        };
    };

    loseLive(){
        this.lives--;
    };

    /*obtenerCoords(event){

          this.x = event.x;
          this.y = event.y;
    }*/

}


