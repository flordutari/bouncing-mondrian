'use-strict'

class VGrowingWall{
    constructor(canvas, x, y, sizeY, dy){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.sizeX = 20;
        this.sizeY = sizeY;
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.convertWallTop = false;
        this.convertWallBottom = false;
    };

    update(){
        if(this.dy === 2){
            if(this.convertWallBottom === false){
                this.sizeY = this.sizeY + 4;
            };
        };
        if(this.dy === -2){
            if(this.convertWallTop === false){
                this.sizeY = this.sizeY - 4;
            };
        };
        this.checkScreen();
    };

    draw(){
        if(this.dy === 2){ 
            this.ctx.fillStyle = "#78c6e8";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };

        if(this.dy === -2){  
            this.ctx.fillStyle = "#92b7ef";
            this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
        };
    };
    
    checkScreen(){
        if(this.dy === -2){
            if(this.y - 20 === Math.abs(this.sizeY)){
                this.convertWallTop = true;
            };
        };

        if(this.dy === 2){
            if(this.canvas.height - this.y - 20 === this.sizeY){
                this.convertWallBottom = true;
            }; 
        };
    };

    checkOtherWallsVLT(wall){
        const bottom = this.y + this.sizeY > wall.y;
        const top = this.y + this.sizeY < wall.y + wall.sizeY;
        const left = this.x > wall.x + wall.sizeX;
        const right = this.x + this.sizeX < wall.x;
        if(top && bottom && left && right){
            this.convertWallTop = true;
        }; 
    };

    checkOtherWallsVRT(wall){
        const bottom = this.y + this.sizeY > wall.y;
        const top = this.y + this.sizeY < wall.y + wall.sizeY;
        const left = this.x > wall.x;
        const right = this.x + this.sizeX < wall.x + wall.sizeX;

        if(top && bottom && left && right){
            this.convertWallTop= true;
        };
    };

    checkOtherWallsVLB(wall){
        const bottom = this.y + this.sizeY < wall.y + wall.sizeY;
        const top = this.y + this.sizeY > wall.y;
        const left = this.x > wall.x + wall.sizeX;
        const right = this.x + this.sizeX < wall.x;
        if(top && bottom && left && right){
            this.convertWallBottom = true;
        }; 
    };

    checkOtherWallsVRB(wall){
        const bottom = this.y + this.sizeY < wall.y + wall.sizeY;
        const top = this.y + this.sizeY > wall.y;
        const left = this.x > wall.x;
        const right = this.x + this.sizeX < wall.x + wall.sizeY;

        if(top && bottom && left && right){
            this.convertWallBottom = true;
        };
    };

    checkUnitedV(wall){
        const bottom = this.y + this.sizeY < wall.y + wall.sizeY;
        const top = this.y + this.sizeY > wall.y;
        const left = this.x > wall.x;
        const right = this.x + this.sizeX < wall.x + wall.sizeX;

        if(top && bottom && left && right){
            this.convertWalTop = true;
            this.convertWallBottom = true;
        };
    };

    drawFixed(){
        this.ctx.fillStyle = "#050505";
        this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    };
};
