'use-strict'

class Ball {
    constructor(canvas){
        this.radius = 10;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = 100;
        this.y = 200;
        this.dx = 2;
        this.dy = 2;
    };
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
    };

    draw(){
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        this.ctx.fillStyle = 'rgb(199, 92, 21)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        this.ctx.strokeStyle = 'rgb(199, 92, 21)';
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
        } else if (this.y + this.radius > this.canvas.height){
            this.dy = -this.dy;
        } else if (this.x - this.radius < 0){
            this.dx = this.dx;
        } else if (this.x + this.radius > this.canvas.width){
            this.dx = -this.dx;
        };
    };

    checkCollisionWalls(wall){
        const bottom = this.y - this.radius < (wall.y + wall.sizeY);
        const top = this.y + this.radius > wall.y;
        const right = this.x - this.radius < (wall.x + wall.sizeX);
        const left = this.x + this.radius > wall.x;
        
        const collision = top && bottom && right && left; 

        const x1 = this.x - this.radius + 2 < wall.x + wall.sizeX;
        const y1 = this.y - this.radius + 2 < wall.y + wall.sizeY;
        const x2 = this.x + this.radius - 2 > wall.x;
        const y2 = this.y + this.radius - 2 > wall.y;

        if(collision && x1){
            this.dx = -this.dx;
            this.dy = this.dy;
        };

        if(collision && y1){
            this.dx = this.dx;
            this.dy = -this.dy;
        };

        if(collision && x2){
            this.dx = -this.dx;
            this.dy = this.dy;
        };

        if(collision && y2){
            this.dx = this.dx;
            this.dy = -this.dy;
        };
        
    };

    checkCollisionWallsNegative(wall){
        const bottom = this.y - this.radius < wall.y;
        const top = this.y + this.radius > wall.y - Math.abs(wall.sizeY);
        const right = this.x - this.radius < (wall.x + wall.sizeX);
        const left = this.x + this.radius > wall.x;
        
        const collision = top && bottom && right && left; 

        const x1 = this.x - this.radius + 2 < wall.x + wall.sizeX;
        const y1 = this.y - this.radius + 2 < wall.y;
        const x2 = this.x + this.radius - 2 > wall.x;
        const y2 = this.y + this.radius - 2 > wall.y - Math.abs(wall.sizeY);

        if(collision && x1){
            this.dx = -this.dx;
            this.dy = this.dy;
        };

        if(collision && y1){
            this.dx = this.dx;
            this.dy = -this.dy;
        };

        if(collision && x2){
            this.dx = -this.dx;
            this.dy = this.dy;
        };

        if(collision && y2){
            this.dx = this.dx;
            this.dy = -this.dy;
        };
    };

    checkGrowWall(wall){
        if(wall.dy === 1) {
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

        if(wall.dy === -1) {
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

        if(wall.dx === 1) {
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

        if(wall.dx === -1) {
            const bottom = this.y - this.radius > (wall.y + wall.sizeY);
            const top = this.y + this.radius < wall.y;
            const right = this.x - this.radius > (wall.x + wall.sizeX);
            const left = this.x + this.radius < wall.x;
            
            if(bottom && top && left && right){
                return true;
            } else {
                return false;
            };
        };
    };
};
    