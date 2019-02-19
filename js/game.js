"use-strict";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.balls = [];
    this.growWallTop = [];
    this.growWallBottom = [];
    this.growWallLeft = [];
    this.growWallRight = [];
    this.walls = [];
    this.convWallsTop = [];
    this.convWallsBottom = [];
    this.convWallsLeft = [];
    this.convWallsRight = [];
    this.unitedWallsV = [];
    this.unitedWallsH = [];
    this.checkSpace;
    this.isGameOver = false;
    this.module = 20;
    this.direction = true;
    this.lives = 5;
  }

  startLoop() {
    this.balls.push(new Ball(this.canvas, 200, 200));
    console.log(this.balls)
    this.walls.push(new Wall(this.canvas, this.canvas.width, this.module, 0, 0));
    this.walls.push(new Wall(this.canvas, this.module, this.canvas.height - this.module * 2, this.canvas.width - this.module, this.module));
    this.walls.push(new Wall(this.canvas, this.canvas.width, this.module, 0, this.canvas.height - this.module));
    this.walls.push(new Wall(this.canvas, this.module, this.canvas.height - this.module * 2, 0, this.module));  

    let x;
    let y;
    this.canvas.addEventListener("click", event => {
      x = Math.round(event.x / 20)*20;
      y = Math.round(event.y / 20)*20;
      x -= this.canvas.offsetLeft;
      y -= this.canvas.offsetTop;

      if(this.growWallBottom.length === 0 && this.growWallTop.length === 0 && this.direction === true){
        this.growWallBottom.push(new VGrowingWall(this.canvas, x, y, 20, 1));
        this.growWallTop.push(new VGrowingWall(this.canvas, x, y, -20, -1));};
      if(this.growWallRight.length === 0 && this.growWallLeft.length === 0 && this.direction === false){
        this.growWallRight.push(new HGrowingWall(this.canvas, x, y, 20, 1));
        this.growWallLeft.push(new HGrowingWall(this.canvas, x, y, -20, -1));};
    });

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
  };

  updateCanvas() {
    this.balls.forEach(ball => {
      ball.update();
    });
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
    if (this.growWallLeft) {
        this.growWallLeft.forEach(growWall => {
        growWall.update();
        });
    }
    if (this.growWallRight) {
        this.growWallRight.forEach(growWall => {
        growWall.update();
        });
    }
  };

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    this.balls.forEach(ball => {
      ball.draw();
    });
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
    if (this.growWallLeft) {
        this.growWallLeft.forEach(growWall => {
        growWall.draw();
        });
    }
    if (this.growWallRight) {
        this.growWallRight.forEach(growWall => {
        growWall.draw();
        });
    }
    if(this.convWallsTop) {
        this.convWallsTop.forEach(wall => {
        wall.drawFixed();
        });
    }
    if(this.convWallsBottom) {
        this.convWallsBottom.forEach(wall => {
        wall.drawFixed();
        });
    }
    if(this.convWallsLeft) {
        this.convWallsLeft.forEach(wall => {
        wall.drawFixed();
        });
    }
    if(this.convWallsRight) {
        this.convWallsRight.forEach(wall => {
        wall.drawFixed();
        });
    }
    if(this.unitedWallsV) {
      this.unitedWallsV.forEach(wall => {
        wall.drawFixed();
        });
    }
    this.walls.forEach(wall => {
      wall.draw();
    });
  }

  checkIfTwoWalls(){
    this.convWallsTop.forEach((wall, indexTop) => {
      this.convWallsBottom.find((otherWall, indexBottom) => {
        if(otherWall.x === wall.x){
          let equis = wall.x;
        this.unitedWallsV.push(new VGrowingWall(this.canvas, equis, 0, this.canvas.height, -1));
        this.convWallsBottom.splice(indexBottom, 1);
        this.convWallsTop.splice(indexTop, 1);
        };
      });
    });
  };
  
  checkAllCollisions() {
    this.walls.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWalls(wall);
      });
    });

    this.growWallTop.forEach((growWall) => {
      this.balls.forEach(ball => {
        ball.checkGrowWallV(this.growWallTop);
        if (ball.checkGrowWallV(growWall) === true) {
          this.growWallTop.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives)
          console.log(this.lives);
        }
        if(growWall.convertWallTop === true){
          this.convWallsTop.push(growWall);
          this.growWallTop.pop(growWall);
        }
      });
    });

    this.growWallBottom.forEach((growWall) => {
      this.balls.forEach(ball => {
        ball.checkGrowWallV(this.growWallBottom);
        if (ball.checkGrowWallV(growWall) === true) {
          this.growWallBottom.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives)
          console.log(this.lives);
        }
        if(growWall.convertWallBottom === true){
          this.convWallsBottom.push(growWall);
          this.growWallBottom.pop(growWall);
        }
      });
    });

    this.growWallLeft.forEach((growWall) => {
      this.balls.forEach(ball => {
        ball.checkGrowWallH(this.growWallLeft);
        if (ball.checkGrowWallH(growWall) === true){
          this.growWallLeft.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives)
          console.log(this.lives);
        }
        if(growWall.convertWallLeft === true){
          this.convWallsLeft.push(growWall);
          this.growWallLeft.pop(growWall);
        }
      });
    });

    this.growWallRight.forEach((growWall) => {
      this.balls.forEach(ball => {
        ball.checkGrowWallH(this.growWallRight);
        if (ball.checkGrowWallH(growWall) === true){
          this.growWallRight.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives)
          console.log(this.lives);
        }
        if(growWall.convertWallRight === true){
          this.convWallsRight.push(growWall);
          this.growWallRight.pop(growWall);
        }
      });
    });

    this.convWallsTop.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWallsNegativeV(wall);
      });
    });

    this.convWallsBottom.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWalls(wall);
      });
    });

    this.convWallsLeft.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWallsNegativeH(wall);
      });
    });

    this.convWallsRight.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWalls(wall);
      });
    });
    
    this.unitedWallsV.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWalls(wall);
      });
    });

    this.unitedWallsH.forEach(wall => {
      this.balls.forEach(ball => {
        ball.checkCollisionWalls(wall);
      });
    });

    if(this.lives === 0){
      this.isGameOver = true;
      this.onGameOver();
    };

  this.checkIfTwoWalls();
  };

  gameOverCallback(callback) {
    this.onGameOver = callback;
  };

  onLivesChange(callback) {
    this.changeDomLives = callback;
  }
};
