'use-strict'

class Ball {
    constructor(canvas, x, y){
        this.radius = 10;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.dx = 3;
        this.dy = 3;
        this.score = 0;
    };
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
    };

    draw(){
        this.ctx.fillStyle = '#1d4cb7';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        this.ctx.strokeStyle = '#1d4cb7';
        this.ctx.fill();
        this.ctx.stroke();

        if(this.x > innerWidth || this.x < 0){
            this.dx = -this.dx;
        };
        this.x += this.dx;
    
        if(this.y > innerHeight || this.y < 0){
            this.dy = -this.dy;
        };
        this.y += this.dy;
    };

    checkCollisionScreen(){
        if(this.y - this.radius < 0){
            this.dy = this.dy;
            this.countScore();
        } else if (this.y + this.radius > this.canvas.height){
            this.dy = -this.dy;
            this.countScore();
        } else if (this.x - this.radius < 0){
            this.dx = this.dx;
            this.countScore();
        } else if (this.x + this.radius > this.canvas.width){
            this.dx = -this.dx;
            this.countScore();
        };
    };

    checkCollisionWalls(wall){
        const bottom = this.y - this.radius < (wall.y + wall.sizeY);
        const top = this.y + this.radius > wall.y;
        const right = this.x - this.radius < (wall.x + wall.sizeX);
        const left = this.x + this.radius > wall.x;
        
        const collision = top && bottom && right && left; 

        const x1 = this.x - this.radius + 6 < wall.x + wall.sizeX;
        const y1 = this.y - this.radius + 6 < wall.y + wall.sizeY;
        const x2 = this.x + this.radius - 6 > wall.x;
        const y2 = this.y + this.radius - 6 > wall.y;

        const audio = document.getElementById("bounce");

        if(collision && x1){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y1){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && x2){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y2){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };
    };

    checkCollisionWallsNegativeV(wall){
        const bottom = this.y - this.radius < wall.y;
        const top = this.y + this.radius > wall.y - Math.abs(wall.sizeY);
        const right = this.x - this.radius < (wall.x + wall.sizeX);
        const left = this.x + this.radius > wall.x;
        
        const collision = top && bottom && right && left; 

        const x1 = this.x - this.radius + 6 < wall.x + wall.sizeX;
        const y1 = this.y - this.radius + 6 < wall.y;
        const x2 = this.x + this.radius - 6 > wall.x;
        const y2 = this.y + this.radius - 6 > wall.y - Math.abs(wall.sizeY);

        const audio = document.getElementById("bounce");

        if(collision && x1){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y1){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && x2){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y2){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };
    };

    checkCollisionWallsNegativeH(wall){
        const bottom = this.y - this.radius < (wall.y + wall.sizeY);
        const top = this.y + this.radius > wall.y;
        const right = this.x - this.radius < wall.x;
        const left = this.x + this.radius > wall.x - Math.abs(wall.sizeX);
        
        const collision = top && bottom && right && left; 

        const x1 = this.x - this.radius + 6 < wall.x;
        const y1 = this.y - this.radius + 6 < wall.y + wall.sizeY;
        const x2 = this.x + this.radius - 6 > wall.x - Math.abs(wall.sizeX);
        const y2 = this.y + this.radius - 6 > wall.y;

        const audio = document.getElementById("bounce");

        if(collision && x1){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y1){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && x2){
            this.dx = -this.dx;
            this.dy = this.dy;
            this.changeScore();
            audio.play();
        };

        if(collision && y2){
            this.dx = this.dx;
            this.dy = -this.dy;
            this.changeScore();
            audio.play();
        };
    };
    
    checkGrowWallV(wall){
        if(wall.dy === 2) {
            const bottom = this.y - this.radius < (wall.y + wall.sizeY);
            const top = this.y + this.radius > wall.y;
            const right = this.x - this.radius < (wall.x + wall.sizeX);
            const left = this.x + this.radius > wall.x;
            
            if(bottom && top && left && right){
                return true;
            } else {
                return false;
            };
        };

        if(wall.dy === -2) {
            const bottom = this.y - this.radius > (wall.y + wall.sizeY);
            const top = this.y + this.radius < wall.y;
            const right = this.x - this.radius < (wall.x + wall.sizeX);
            const left = this.x + this.radius > wall.x;
            
            if(bottom && top && left && right){
                return true;
            } else {
                return false;
            };
        };
    };

    checkGrowWallH(wall){
        if(wall.dx === 2) {
            const bottom = this.y - this.radius < (wall.y + wall.sizeY);
            const top = this.y + this.radius > wall.y;
            const right = this.x - this.radius < (wall.x + wall.sizeX);
            const left = this.x + this.radius > wall.x;
            
            if(bottom && top && left && right){
                return true;
            } else {
                return false;
            };
        };

        if(wall.dx === -2) {
            const bottom = this.y - this.radius < (wall.y + wall.sizeY);
            const top = this.y + this.radius > wall.y;
            const right = this.x - this.radius < wall.x;
            const left = this.x + this.radius > wall.x - Math.abs(wall.sizeX);
            
            if(bottom && top && left && right){
                return true;
            } else {
                return false;
            };
        };
    };

  changeScore(){
      this.score++;
  };
};
    
