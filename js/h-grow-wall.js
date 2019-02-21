'use-strict'

class HGrowingWall{
    constructor(canvas, x, y, sizeX, dx){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.sizeX = sizeX;
        this.sizeY = 20;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.convertWallRight = false;
        this.convertWallLeft = false;
    };

    update(){
        if(this.dx === 2){
            if (this.convertWallRight === false){
                this.sizeX = this.sizeX + 4;
            };
        };
        if(this.dx === -2){
            if(this.convertWallLeft === false){
                this.sizeX = this.sizeX - 4;
            };
        };
        this.checkScreen();
    };

    draw(){
        if(this.dx === 2){
            this.ctx.fillStyle = "#cb3737";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };

        if(this.dx === -2){  
            this.ctx.fillStyle = "#e4b951";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };
    };

    checkScreen(){
        if(this.dx === -2){
            if(this.x - 20 === Math.abs(this.sizeX)){
                this.convertWallLeft = true;
            };
        };

        if(this.dx === 2){
            if(this.canvas.width - this.x - 20 === this.sizeX){
                this.convertWallRight = true;
            }; 
        };
    };

    checkOtherWallsHTL(wall){
        const bottom = this.y + this.sizeY < wall.y;
        const top = this.y > wall.y + wall.sizeY;
        const left = this.x + this.sizeX < wall.x + wall.sizeX
        const right = this.x + this.sizeX > wall.x;
        if(top && bottom && left && right){
            this.convertWallLeft = true;
        }; 
    };

    checkOtherWallsHBL(wall){
        const bottom = this.y + this.sizeY < wall.y;
        const top = this.y > wall.y + wall.sizeY;
        const left = this.x + this.sizeX > wall.x;
        const right = this.x + this.sizeX < wall.x + wall.sizeX;

        if(top && bottom && left && right){
            this.convertWallLeft = true;
        };
    };

    checkOtherWallsHTR(wall){
        const bottom = this.y + this.sizeY < wall.y;
        const top = this.y > wall.y + wall.sizeY;
        const left = this.x + this.sizeX < wall.x + wall.sizeX
        const right = this.x + this.sizeX > wall.x;
        if(top && bottom && left && right){
            this.convertWallRight = true;
        }; 
    };

    checkOtherWallsHBR(wall){
        const bottom = this.y + this.sizeY < wall.y + wall.sizeY;
        const top = this.y > wall.y;
        const left = this.x + this.sizeX < wall.x + wall.sizeX;
        const right = this.x + this.sizeX > wall.x;

        if(top && bottom && left && right){
            this.convertWallRight = true;
        };
    };

    checkUnitedH(wall){
        const bottom = this.y + this.sizeY < wall.y + wall.sizeY;
        const top = this.y > wall.y;
        const left = this.x + this.sizeX > wall.x;
        const right = this.x + this.sizeX < wall.x + wall.sizeX;

        if(top && bottom && left && right){
            this.convertWallRight = true;
            this.convertWallLeft = true;
        };
    };
    
    drawFixed(){
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    };
};
