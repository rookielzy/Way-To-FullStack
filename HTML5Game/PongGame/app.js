class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}

class Rect {
    constructor(x = 0, y = 0) {
        this.pos = new Vec;
        this.size = new Vec(x, y);
    }

    get left() {
        return this.pos.x - this.size.x / 2;
    }
    get right() {
        return this.pos.x + this.size.x / 2;
    }
    get top() {
        return this.pos.y - this.size.y / 2;
    }
    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

class Player extends Rect {
    constructor() {
        super(20, 100);
        this.vel = new Vec;
        this.score  = 0;

        this._lastPos = new Vec;
    }

    update(dt) {
        this.vel.y = (this.pos.y - this._lastPos.y) / dt;
        this._lastPos.y = this.pos.y;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.initialSpeed = 2.5;

        this.ball = new Ball;

        this.players = [
            new Player,
            new Player,
        ];

        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2;
        });

        let lastTime = null;
        this._frameCallback = (millis) => {
            if (lastTime !== null) {
                this.update((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(this._frameCallback);
        };

        this.CHAR_PIXEL = 10;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.height = this.CHAR_PIXEL * 5;
            canvas.width = this.CHAR_PIXEL * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect((i % 3) * this.CHAR_PIXEL, (i / 3 | 0) * this.CHAR_PIXEL, this.CHAR_PIXEL, this.CHAR_PIXEL);
                }
            });
            return canvas;
        });

        this.reset();
    }

    clear() {
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    play() {
        const ball = this.ball;
        if (ball.vel.x === 0 & ball.vel.y === 0) {
            ball.vel.x = 3 * (Math.random() > 0.5 ? 1 : -1);
            ball.vel.y = 3 * (Math.random() * 2 - 1);
            ball.vel.len = this.initialSpeed;
        }
    }

    reset() {
        this.ball.pos.x = this._canvas.width / 2;
        this.ball.pos.y = this._canvas.height / 2;
        
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
    }

    start() {
        requestAnimationFrame(this._frameCallback);
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left
            && player.top < ball.bottom && player.bottom > ball.top) {
           const len = ball.vel.len;
           ball.vel.x = -ball.vel.x * 1.05;
           ball.vel.y += player.vel.y * 2;
           ball.vel.len = len;
        }
    }

    draw() {
        this.clear();

        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
        this.drawScore();
    }

    drawRect(rect) {
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    drawScore() {
        const align = this._canvas.width / 3;
        const CHAR_W = this.CHAR_PIXEL * 4;
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split('');
            const offset = align * 
                            (index + 1) - 
                            (CHAR_W * chars.length / 2) + 
                            this.CHAR_PIXEL / 2;
            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[char | 0], offset + pos * CHAR_W, 20);
            });
        });
    }

    update(dt) {
        const canvas = this._canvas;
        const ball = this.ball;
        ball.pos.x += ball.vel.x + dt;
        ball.pos.y += ball.vel.y + dt;
    
        if (ball.right < 0 || ball.left > canvas.width) {
            ++this.players[ball.vel.x < 0 | 0].score;
            this.reset();
        }
        if (ball.top < 0 || ball.bottom > canvas.height) {
            ball.vel.y = -ball.vel.y;
        }
        
        this.players[1].pos.y = ball.pos.y;

        this.players.forEach(player => {
            this.collide(player, ball);
        });

        this.draw();
    }
}

const canvas = document.getElementById('canvas');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    const scale = event.offsetY / event.target.getBoundingClientRect().height;
    pong.players[0].pos.y = canvas.height * scale;
});

canvas.addEventListener('click', () => {
    pong.play();
});

pong.start();