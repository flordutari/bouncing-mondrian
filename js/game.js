"use-strict";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ball;
    this.growWall = [];
    this.walls = [];
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
        
      if(this.growWall.length === 0){
        this.growWall.push(new VGrowingWall(this.canvas, 3, x, y, 20, 1));
        this.growWall.push(new VGrowingWall(this.canvas, 3, x, y, -20, -1));
      }
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
    if (this.growWall) {
      this.growWall.forEach(growWall => {
        growWall.update();
      });
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    this.ball.draw();
    if (this.growWall) {
      this.growWall.forEach(growWall => {
        growWall.draw();
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
    this.ball.checkCollisionScreen();

    this.growWall.forEach((growWall) => {
      this.ball.checkGrowWall(this.growWall);
      if (this.ball.checkGrowWall(growWall) === true) {
        growWall.loseLive();
        this.growWall.splice(this.growWall.indexOf(growWall), 1);
      }
    });

    
        if(this.growWall.convertWallTop === false){
            console.log(growWall);
        }

        if(this.growWall.convertWallBottom === false){
        console.log(growWall);
        }
    });
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}
