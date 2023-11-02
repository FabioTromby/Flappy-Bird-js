// todo mettere una scelta della difficolta 
// todo migliorare le prestazioni del gioco 
// todo sistemare la scritta dentro la pagina html

/*
*   Legenda 
* //! Cose importanti 
* //? (n) numero da andare a consultare nella guida
* //todo cose da aggiungere o modificare 
*/

var cvs = document.getElementById("GameSpace");
var ctx = cvs.getContext("2d"); // ? 1 

let frames = 0; // ? 2 

// Immagini 
const birdImg = new Image(); // ? 3 
birdImg.src = "img/game/bird.png"

const bpipeImg = new Image();
bpipeImg.src = "img/game/pipeBottom.png"

const tpipeImg = new Image();
tpipeImg.src = "img/game/pipeTop.png"

const fgImg = new Image();
fgImg.src = "img/game/fg2.png"

// Suoni 

const scoreSound = new Audio();
scoreSound.src = "sound/sfx_point.wav";
scoreSound.volume = 0.25;

const dieSound = new Audio();
dieSound.src = "sound/sfx_die.wav";
dieSound.volume = 0.5;

// ? 4 
const state = {
    current: 0,
    start: 0,
    inGame: 1,
    over: 2
}


// ? 5 
cvs.addEventListener("click", function (evt) {
    switch (state.current) {
        case state.start:
            draw();
            drawPunteggi();
            state.current = state.inGame;
            break;
        case state.inGame:
            // ? 18 
            if (bird.y - bird.radius <= 0) return;
            bird.flap();
            loop;
            break;
        case state.over:
            dead();
            draw();
            state.current = state.start;
            break;
    }
});

// ? 6 
function dead() {
    pipe.reset();
    bird.reset();
    score.reset();
}

// ? 7 
function drawPunteggi() {
    let puntiMax = parseInt(localStorage.getItem("best"));
    document.getElementById("record").value = puntiMax;
    document.getElementById("punteggio").value = 0;
}

const bird = {

    x: 50,
    y: 150,
    w: 34,
    h: 26,

    radius: 12,

    frame: 0,

    gravity: 0.15,
    jump: 4.6,
    speed: 0,
    rotation: 0,

    // ? 8 
    draw: function () {
        ctx.drawImage(birdImg, 0, 0, this.w, this.h, 30, this.y, this.w, this.h)
    },


    // ? 9
    flap: function () {
        this.speed = - this.jump;
    },

    // ? 10
    update: function () {
        // aggiorna la velocita del piccione
        if (state.current == state.over) return
        // * 1
        if (state.current == state.start) {
            this.y = 150;
        } else {
            this.speed += this.gravity;
            // * 2 
            this.y += this.speed;

            // * 3
            if (this.y + this.h >= cvs.height - fg.h) {
                // this.y = cvs.height - fg.h - this.h;
                if (state.current == state.inGame)
                    state.current = state.over;
                dieSound.play();
            }
        }
    },
    reset: function () {
        this.speed = 0;
    }
}

// ? 11 
const fg = {
    h: 160,

    // * 1
    draw: function () {
        ctx.drawImage(fgImg, 0, 0, 800, this.h, 0, cvs.height - this.h, 800, this.h);
    }

}


// ? 12 
const pipe = {

    // * 1
    position: [],

    w: 53,
    h: 400,
    gap: 180,
    maxYPos: -180,
    dx: 2,

    // * 2 
    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            // top pipe
            ctx.drawImage(tpipeImg, 0, 0, this.w, this.h, p.x, topYPos, this.w, this.h);

            // bottom pipe
            ctx.drawImage(bpipeImg, 0, 0, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    // * 3 
    update: function () {
        if (state.current != state.inGame) return;

        // * 4
        if (frames % 150 == 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1),
                passed: 0
            });
        }

        // * 5 
        if (this.position.length == 0) return;

        // * 6 
        // console.log(this.position.length);
        let p = this.position[0];

        let bottomPipeYPos = p.y + this.h + this.gap;


        // * 7
        // TOP PIPE 
        if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
            state.current = state.over;
            dieSound.play();
        }
        // BOTTOM PIPE
        if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h) {
            state.current = state.over;
            dieSound.play();
        }

        // * 8         
        // MOVE THE PIPES TO THE LEFT
        for (let i = 0; i < this.position.length; i++) {
            this.position[i].x -= this.dx;
        }

        // * 9
        // if the pipes go beyond canvas, we delete them from the array
        if (p.x + this.w <= 0) {
            this.position.shift();
        }
    },


    reset: function () {
        this.position = [];
    }
}


// ? 13
const score = {

    scoreNow: 0,
    scoreBest: parseInt(localStorage.getItem("best")) || 0,

    update() {
        // * 1
        if (state.current == state.inGame && pipe.position[0] != undefined) {
            if (pipe.position[0].passed != 1) {
                let birdY = bird.y;
                let birdX = 30;

                let tpipeX = pipe.position[0].x;
                let tpipeY = pipe.position[0].y + pipe.h;
                let bpipeY = tpipeY + pipe.h + pipe.gap;

                // * 2
                if (birdX > tpipeX) {
                    if (birdY > tpipeY && birdY < bpipeY) {
                        this.scoreNow++;
                        pipe.position[0].passed = 1;
                        scoreSound.play();
                    }
                }
            }
        }
    },

    // * 3 
    draw() {
        if (state.current == state.inGame) {
            document.getElementById("punteggio").value = this.scoreNow;
        }
    },

    // * 4 
    reset() {
        if (this.scoreNow > this.scoreBest) {
            this.scoreBest = this.scoreNow;
            localStorage.setItem("best", this.scoreNow);
            document.getElementById("record").value = this.scoreBest;
        }
        this.scoreNow = 0;
    }

}

// ? 14 
function draw() {
    // disegna elementi nel canvas 
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // aggiorna la posizione del piccione
    bird.draw();
    pipe.draw();
    fg.draw();
    score.draw();
}

// ? 15
function update() {
    bird.update();
    pipe.update();
    score.update();
}

// ? 16
function loop() {
    update();
    draw();

    frames++;
}

// ? 17 
var FPS = 120
setInterval(loop, Math.round(1000.0 / FPS)) //! set interval restituisce un tempo quindi io chiedo di renderizzare 1000 ms in 1000/120