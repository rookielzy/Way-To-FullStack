let player;
let enemyList = {};
let upgradeList = {};
let bulletList = {};

// 实例
function Entity(type, id, x, y, spdX, spdY, width, height, img) {
    let self = {
        type: type,
        id: id,
        x: x,
        y: y,
        spdX: spdX,
        spdY: spdY,
        width: width,
        height: height,
        img: img,
    };

    // 更新实例位置
    self.updatePosition = function () {
        self.x += self.spdX;
        self.y += self.spdY;

        if (self.x < 0 || self.x > WIDTH) {
            self.spdX = -self.spdX;
        }

        if (self.x < 0 || self.x > HEIGHT) {
            self.spdY = -self.spdY;
        }

    };

    // 显示实例
    self.draw = function () {
        ctx.save();
        let x = self.x - player.x;
        let y = self.y - player.y;

        x += WIDTH/2;
        y += HEIGHT/2;

        x -= self.width/2;
        y -= self.height/2;
        
        ctx.drawImage(self.img, 0, 0, self.img.width, self.img.height, x, y, self.width, self.height);
        ctx.restore();
    };

    // 更新实例
    self.update = function () {
        self.updatePosition();
        self.draw();
    };

    // 计算两个实例之间的距离
    self.getDisctance = function (entity2) {
        let vx = self.x - entity2.x;
        let vy = self.y - entity2.y;
        return Math.sqrt(vx * vx + vy * vy);
    };

    // 测试两个实例之间位置是否够近
    self.testCollision = function (entity2) {
        let rect1 = {
            x: self.x - self.width / 2,
            y: self.y - self.height / 2,
            width: self.width,
            height: self.height,
        };
        let rect2 = {
            x: entity2.x - entity2.width / 2,
            y: entity2.y - entity2.height / 2,
            width: entity2.width,
            height: entity2.height,
        };
        return testCollisionRectRect(rect1, rect2);
    }

    return self;
};

// 添加玩家和AI的实例
Actor = function (type, id, x, y, spdX, spdY, width, height, img, hp, atkSpd) {
    let self = Entity(type, id, x, y, spdX, spdY, width, height, img);

    self.hp = hp;
    self.atkSpd = atkSpd;
    self.attackCounter = 0;
    self.aimAngle = 0;

    // 类似子类继承超类，减少覆写的代码量
    let super_update = self.update;
    self.update = function () {
        super_update();
        self.attackCounter += self.atkSpd;
    }

    // 普通攻击
    self.performAttack = function () {
        if (self.attackCounter > 25) {
            self.attackCounter = 0;
            randomlyGenerateBullet(self);
        }
    };

    // 大招
    self.performSpecialAttack = function () {
        if (self.attackCounter > 50) {
            self.attackCounter = 0;

            randomlyGenerateBullet(self, self.aimAngle - 5);
            randomlyGenerateBullet(self, self.aimAngle);
            randomlyGenerateBullet(self, self.aimAngle + 5);
        }
    };

    return self;
}

Player = function () {
    let self = Actor('player', 'myId', 50, 40, 30, 5, 50, 70, Img.player, 10, 1);

    self.pressingDown = false;
    self.pressingUp = false;
    self.pressingLeft = false;
    self.pressingRight = false;

    // 覆写玩家移动
    self.updatePosition = function () {
        if (self.pressingRight) {
            self.x += 10;
        }
        if (self.pressingLeft) {
            self.x -= 10;
        }
        if (self.pressingDown) {
            self.y += 10;
        }
        if (self.pressingUp) {
            self.y -= 10;
        }

        if (self.x < self.width / 2) {
            self.x = self.width / 2;
        }
        if (self.x > WIDTH - self.width / 2) {
            self.x = WIDTH - self.width / 2;
        }
        if (self.y < self.height / 2) {
            self.y = self.height / 2;
        }
        if (self.y > HEIGHT - self.height / 2) {
            self.y = HEIGHT - self.height / 2;
        }
    };

    let super_update = self.update;
    self.update = function () {
        super_update();
        if (player.hp <= 0) {
            let timeSurvived = Date.now() - timeWhenGameStarted;
            console.log('You lost! You survived for ' + timeSurvived + " ms.");
            // 游戏重新开始
            startNewGame();
        }
    }

    return self;
};

// AI 属性
function Enemy(id, x, y, spdX, spdY, width, height) {
    let self = Actor('enemy', id, x, y, spdX, spdY, width, height, Img.enemy, 10, 1);

    let super_update = self.update;
    self.update = function () {
        super_update();
        self.performAttack();

        let isColliding = player.testCollision(self);
        if (isColliding) {
            player.hp = player.hp - 1;
        }
    }

    enemyList[id] = self;
}

// 奖励
function Upgrade(id, x, y, spdX, spdY, width, height, img, category) {
    let self = Entity('upgrade', id, x, y, spdX, spdY, width, height, img);

    self.category = category;

    let super_update = self.update;
    self.update = function () {
        super_update();
        let isColliding = player.testCollision(self);
        if (isColliding) {
            if (self.category === 'score') {
                score += 100;
            }
            if (self.category === 'atkSpd') {
                player.atkSpd += 3;
            }
            delete upgradeList[self.id];
        }
    }

    upgradeList[id] = self;
}

// 子弹
function Bullet(id, x, y, spdX, spdY, width, height) {
    let self = Entity('bullet', id, x, y, spdX, spdY, width, height, Img.bullet);

    self.timer = 0;

    let super_update = self.update;
    self.update = function () {
        super_update();
        let toRemove = false;
        self.timer++;
        if (self.timer > 75) {
            toRemove = true;
        }

        for (let key in enemyList) {
            // let isColliding = self.testCollision(enemyList[key]);
            // if (isColliding) {
            //     toRemove = true;
            //     delete enemyList[key];
            //     break;
            // }
        }
        if (toRemove) {
            delete bulletList[self.id];
        }
    }

    bulletList[id] = self;
}


// 随机生成AI
function randomlyGenerateEnemy() {
    let x = Math.random() * WIDTH;
    let y = Math.random() * HEIGHT;
    let height = 64;
    let width = 64;
    let id = Math.random();
    let spdX = Math.random() * 5 + 5;
    let spdY = Math.random() * 5 + 5;
    Enemy(id, x, y, spdX, spdY, width, height);
}

// 随机生成奖励
function randomlyGenerateUpgrade() {
    let x = Math.random() * WIDTH;
    let y = Math.random() * HEIGHT;
    let height = 32;
    let width = 32;
    let id = Math.random();
    let spdX = 0;
    let spdY = 0;
    let category;
    let img;

    if (Math.random() < 0.5) {
        category = 'score';
        img = Img.upgrade1;
    } else {
        category = 'atkSpd';
        img = Img.upgrade2;
    }
    Upgrade(id, x, y, spdX, spdY, width, height, img, category);
}

// 随机生成子弹
function randomlyGenerateBullet(entity, overwriteAngle) {
    let x = entity.x;
    let y = entity.y;
    let height = 32;
    let width = 32;
    let id = Math.random();

    // 子弹发射角度随机，角度不能用 degree 来表示，应用 rad
    let angle = entity.aimAngle;
    if (overwriteAngle !== undefined) {
        angle = overwriteAngle;
    }
    let spdX = Math.cos(angle / 180 * Math.PI) * 5;
    let spdY = Math.sin(angle / 180 * Math.PI) * 5;
    Bullet(id, x, y, spdX, spdY, width, height);
}