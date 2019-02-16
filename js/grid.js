'use strict'
class Grid{
    constructor(canvas, w, h){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = w;
        this.height = h;
    }

    draw(){
        for (let x = 0; x <= w; x += 20) {
            for (let y = 0; y <= h; y += 20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            };
        };
    };
};