"use-strict";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ball;
    this.growWallTop = [];
    this.growWallBottom = [];
    this.walls = [];
    this.convWalls = [];
    this.checkSpace;
    this.isGameOver = false;
    this.module = 20;
  }

  startLoop() {
    this.ball = new Ball(this.canvas);
    this.walls.push(
      new Wall(this.canvas, this.canvas.width, this.module, 0, 0)
    );
    this.walls.push(
      new Wall(
        this.canvas,
        this.module,
        this.canvas.height - this.module * 2,
        this.canvas.width - this.module,
        this.module
      )
    );
    this.walls.push(
      new Wall(
        this.canvas,
        this.canvas.width,
        this.module,
        0,
        this.canvas.height - this.module
      )
    );
    this.walls.push(
      new Wall(
        this.canvas,
        this.module,
        this.canvas.height - this.module * 2,
        0,
        this.module
      )
    );

    let x;
    let y;
    this.canvas.addEventListener("click", event => {
      x = event.x;
      y = event.y;
      x -= this.canvas.offsetLeft;
      y -= this.canvas.offsetTop;
        
      if(this.growWallBottom.length === 0 && this.growWallTop <= 1){
        this.growWallBottom.push(new VGrowingWall(this.canvas, 3, x, y, 20, 1));};
      if(this.growWallTop.length === 0 && this.growWallBottom.length <= 1){
        this.growWallTop.push(new VGrowingWall(this.canvas, 3, x, y, -20, -1));};
    });

    // this.canvas.addEventListener('mousemove', (event)=> {
    //     x = event.x;
    //     y = event.y;

    //     this.player.clearRect(0,0,1200,800);
    //     this.player.beginPath();
    //     this.player.arc(x,y,10,0,Math.PI*2,true);
    //     this.player.fill();
    // });

    const loop = () => {
      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.ball.update();
    if (this.growWallTop) {
      this.growWallTop.forEach(growWall => {
        growWall.update();
      });
    }
    if (this.growWallBottom) {
        this.growWallBottom.forEach(growWall => {
          growWall.update();
        });
      }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    this.ball.draw();
    if (this.growWallTop) {
        this.growWallTop.forEach(growWall => {
        growWall.draw();
        });
    }
    if (this.growWallBottom) {
        this.growWallBottom.forEach(growWall => {
        growWall.draw();
        });
    }
    if (this.convWalls) {
        this.growWallTop.forEach(growWall => {
        growWall.draw();
        });
    }
    if (this.growWallBottom) {
        this.growWallBottom.forEach(growWall => {
        growWall.draw();
        });
    }
    if(this.convWalls) {
        this.convWalls.forEach(wall => {
        wall.drawFixed();
        });
    }
    this.walls.forEach(wall => {
      wall.draw();
    });
  }

  checkAllCollisions() {
    this.walls.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });

    this.convWalls.forEach(wall => {
        this.ball.checkCollisionWalls(wall);
        this.ball.checkCollisionWallsNegative(wall);
      });

    this.ball.checkCollisionScreen();

    this.growWallTop.forEach((growWall) => {
      this.ball.checkGrowWall(this.growWallTop);
      if (this.ball.checkGrowWall(growWall) === true) {
        this.growWallTop.pop(growWall);
      }
      if(growWall.convertWallTop === true){
        this.convWalls.push(growWall);
        this.growWallTop.pop(growWall);
        console.log(this.convWalls);
      }
    });

    this.growWallBottom.forEach((growWall) => {
        this.ball.checkGrowWall(this.growWallBottom);
      if (this.ball.checkGrowWall(growWall) === true) {
        this.growWallBottom.pop(growWall);
      }
      if(growWall.convertWallBottom === true){
        this.convWalls.push(growWall);
        this.growWallBottom.pop(growWall);
        console.log(this.convWalls);
      }
    });
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}
