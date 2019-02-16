'use-strict'

class Ball {
    constructor(canvas){
        this.radius = 5;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = 400;
        this.y = 200;
        this.dx = 1;
        this.dy = -1;
        this.speed = 3;
    };
    
    update(){
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    };

    draw(){
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        this.ctx.fillStyle = '#FC4B2A';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        this.ctx.strokeStyle = '#FC4B2A';
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
        if(this.y - this.radius <= 0){
            this.dy = this.dy;
        } else if (this.y + this.radius >= this.canvas.height){
            this.dy = -this.dy;
        } else if (this.x - this.radius <= 0){
            this.dx = this.dx;
        } else if (this.x + this.radius >= this.canvas.width){
            this.dx = -this.dx;
        };
    };

    checkCollisionWalls(wall){
        const dir1 = this.dx === this.dx && this.dy === this.dy;
        const dir2 = this.dx === this.dx && this.dy === -this.dy;
        const dir3 = this.dx === -this.dx && this.dy === -this.dy;
        const dir4 = this.dx === -this.dx && this.dy === this.dy;

        if(this.x + this.radius >=  wall.x &&
            this.x - this.radius <= (wall.x + wall.sizeX) &&
            this.y + this.radius >=  wall.y &&
            this.y - this.radius <= (wall.y + wall.sizeY)){

           if(dir1){
                if(this.y - this.radius < wall.y + wall.sizeY){
                   this.dy = -this.dy;
                } else if (this.x + this.radius < wall.x){
                    this.dx = this.dx;
                };
            } else if(dir2){
                if(this.y + this.radius > wall.y){
                    this.dy = this.dy;
                } else if (this.x + this.radius > wall.x){
                    this.dx = this.dx;
                };
            } else if(dir3){
                if(this.y + this.radius < wall.y){
                   this.dy = this.dy;
                } else if (this.x - this.radius < wall.x + wall.sizeX){
                    this.dx = this.dx;
                };
            } else if(dir4){
                if(this.y - this.radius < wall.y + wall.sizeY){
                    this.dy = -this.dy;
                } else if(this.x - this.radius > wall.x + wall.sizeX){
                    this.dx = this.dx;
                };
            };
        };
    };
};
    
