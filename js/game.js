"use-strict";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ball;
    this.walls = [];
    this.growWallTop = [];
    this.growWallBottom = [];
    this.growWallLeft = [];
    this.growWallRight = [];
    this.convWallsTop = [];
    this.convWallsBottom = [];
    this.convWallsLeft = [];
    this.convWallsRight = [];
    this.unitedWallsV = [];
    this.unitedWallsH = [];
    this.isGameOver = false;
    this.module = 20;
    this.direction = false;
    this.lives = 3;
    this.score = 0;
  }

  startLoop() {
    this.ball = new Ball(this.canvas, 200, 200);
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
        this.growWallBottom.push(new VGrowingWall(this.canvas, x, y, 20, 2));
        this.growWallTop.push(new VGrowingWall(this.canvas, x, y, -20, -2));};
      if(this.growWallRight.length === 0 && this.growWallLeft.length === 0 && this.direction === false){
        this.growWallRight.push(new HGrowingWall(this.canvas, x, y, 20, 2));
        this.growWallLeft.push(new HGrowingWall(this.canvas, x, y, -20, -2));};
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
    if(this.unitedWallsH) {
      this.unitedWallsH.forEach(wall => {
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
          let ies = wall.y - Math.abs(otherWall.sizeY);
        this.unitedWallsV.push(new VGrowingWall(this.canvas, equis, ies, (Math.abs(wall.sizeY) + Math.abs(otherWall.sizeY)-20), -1));
        this.score++;
        this.changeDomScore(this.score);
        this.convWallsBottom.splice(indexBottom, 1);
        this.convWallsTop.splice(indexTop, 1);
        };
      });
    });
  };

  checkIfTwoWallsH(){
    this.convWallsRight.forEach((wall, indexTop) => {
      this.convWallsLeft.find((otherWall, indexBottom) => {
        if(otherWall.y === wall.y){
          let ies = wall.y;
          let equis = wall.x - Math.abs(otherWall.sizeX);
        this.unitedWallsH.push(new HGrowingWall(this.canvas, equis, ies, (Math.abs(wall.sizeX) + Math.abs(otherWall.sizeX)), 1));
        this.score++;
        this.changeDomScore(this.score);
        this.convWallsLeft.splice(indexBottom, 1);
        this.convWallsRight.splice(indexTop, 1);
        };
      });
    });
  };
  
  checkAllCollisions() {
    this.walls.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });

    this.growWallTop.forEach((growWall) => {
      this.ball.checkGrowWallV(this.growWallTop);
        if (this.ball.checkGrowWallV(growWall) === true) {
          this.growWallTop.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives);
        }
        if(growWall.convertWallTop === true){
          this.convWallsTop.push(growWall);
          this.growWallTop.pop(growWall);
        }
        if(this.convWallsLeft){
          this.convWallsLeft.forEach(wall => {
            growWall.checkOtherWallsVLT(wall);
          });
        };
        if(this.convWallsRight){
          this.convWallsRight.forEach(wall => {
            growWall.checkOtherWallsVRT(wall);
          });
        };
        if(this.unitedWallsH){
          this.unitedWallsH.forEach(wall => {
            growWall.checkUnitedV(wall);
          });
        }; 
    });

    this.growWallBottom.forEach((growWall) => {
      this.ball.checkGrowWallV(this.growWallBottom);
        if (this.ball.checkGrowWallV(growWall) === true) {
          this.growWallBottom.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives);
        }
        if(growWall.convertWallBottom === true){
          this.convWallsBottom.push(growWall);
          this.growWallBottom.pop(growWall);
        }
        if(this.convWallsLeft){
          this.convWallsLeft.forEach(wall => {
            growWall.checkOtherWallsVLB(wall);
          });
        };
        if(this.convWallsRight){
          this.convWallsRight.forEach(wall => {
            growWall.checkOtherWallsVRB(wall);
          });
        };
        if(this.unitedWallsH){
          this.unitedWallsH.forEach(wall => {
            growWall.checkUnitedV(wall);
          });
        }; 
    });

    this.growWallLeft.forEach((growWall) => {
      this.ball.checkGrowWallH(this.growWallLeft);
        if (this.ball.checkGrowWallH(growWall) === true){
          this.growWallLeft.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives);
        }
        if(growWall.convertWallLeft === true){
          this.convWallsLeft.push(growWall);
          this.growWallLeft.pop(growWall);
        }
        if(this.convWallsTop){
          this.convWallsTop.forEach(wall => {
            growWall.checkOtherWallsHTL(wall);
          });
        };
        if(this.convWallsBottom){
          this.convWallsBottom.forEach(wall => {
            growWall.checkOtherWallsHBL(wall);
          });
        };
        if(this.unitedWallsV){
          this.unitedWallsV.forEach(wall => {
            growWall.checkUnitedH(wall);
          });
        }; 
    });

    this.growWallRight.forEach((growWall) => {
      this.ball.checkGrowWallH(this.growWallRight);
        if (this.ball.checkGrowWallH(growWall) === true){
          this.growWallRight.pop(growWall);
          this.lives--;
          this.changeDomLives(this.lives);
        }
        if(growWall.convertWallRight === true){
          this.convWallsRight.push(growWall);
          this.growWallRight.pop(growWall);
        }
        if(this.convWallsTop){
          this.convWallsTop.forEach(wall => {
            growWall.checkOtherWallsHTR(wall);
          });
        };
        if(this.convWallsBottom){
          this.convWallsBottom.forEach(wall => {
            growWall.checkOtherWallsHBR(wall);
          });
        };
        if(this.unitedWallsV){
          this.unitedWallsV.forEach(wall => {
            growWall.checkUnitedH(wall);
          });
        };        
    });

    this.convWallsTop.forEach(wall => {
      this.ball.checkCollisionWallsNegativeV(wall);
    });

    this.convWallsBottom.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });

    this.convWallsLeft.forEach(wall => {
      this.ball.checkCollisionWallsNegativeH(wall);
    });

    this.convWallsRight.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });
    
    this.unitedWallsV.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });

    this.unitedWallsH.forEach(wall => {
      this.ball.checkCollisionWalls(wall);
    });

    if(this.lives === 0){
      this.isGameOver = true;
      this.onGameOver();
    };

  this.checkIfTwoWallsH();
  this.checkIfTwoWalls();
  };
  

  gameOverCallback(callback) {
    this.onGameOver = callback;
  };

  onLivesChange(callback) {
    this.changeDomLives = callback;
  };

  onScoreChange(callback) {
    this.changeDomScore = callback;
  }
};


// this.score++;
// this.changeDomScore(this.score);