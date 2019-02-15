'use-strict'

class ExpansionWall{
    constructor(canvas, lives){
        this.size = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x1 = 150;
        this.y1 = 150;
        this.x2 = 130;
        this.y2 = 150;
        this.speed = 1;
        this.dx = 1;
        this.dy = 1;
        this.lives = lives;
    };

    update(){
        //if(horizontalWall === true) {
        this.x1 = this.x1 + this.dx * this.speed;
        this.x2 = this.x2 - this.dx * this.speed;
        /*} else if (verticalWall === true) {
        this.y1 = this.y1 - this.dy * this.speed;
        this.y2 = this.y2 + this.dy * this.speed;
        }*/
        
    };

    draw(){
        let x1 = this.x1;
        let y1= this.y1;
        for(let i = 0; i < this.canvas.width; i++){
            this.ctx.beginPath();  
            this.ctx.fillStyle = "#435345";
            this.ctx.fillRect(x1, y1, 20, 20);
        };

        let x2 = this.x2;
        let y2 = this.y2;
        for(let i = 0; i < this.canvas.width; i++){
            this.ctx.beginPath();  
            this.ctx.fillStyle = "#435345";
            this.ctx.fillRect(x2, y2, 20, 20);
        };
        
    };

    stopDraw(){
        
    }

    setDirection(direction){
        this.direction = direction;
    };

    checkScreen(){
        if(this.x1 - this.size/2 <= 0){
            //becomeFixedWall();
        } else if (this.y + this.size/2 >= this.canvas.height){
            this.direction = -1;
        };
    };

    loseLive(){
        this.lives--;
    };

    becomeFixedWall(){

    };

    /*obtenerCoords(event){

          this.x = event.x;
          this.y = event.y;
    }*/

}


