const game = {
    mode: "intro",
    // 弹弓的坐标
    slingshotX: 140,
    slingshotY: 280,

    // 弹弓
    slingshotBandX: 140 + 55,
    slingshotBandY: 280 + 23,

    // 游戏是否结束
    ended: false,

    // 分数
    score: 0,

    // 水平平移
    offsetLeft: 0,

    // 每帧平移的最大速度
    maxSpeed: 3,

    start: function() {
        game.hideScreens();
        // 显示游戏画布和分数
        game.showScreen("gameCanvas");
        game.showScreen("scoreScreen");

        game.mode = "intro";
        game.currentHero = undefined;

        game.offsetLeft = 0;
        game.ended = false;

        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    // 平移画布，使其根据角色进行居中
    panTo: function(newCenter) {
        // 最大和最小平移距离
        const minOffset = 0;
        const maxOffset = game.currentLevel.backgroundImage.width - game.canvas.width;

        // 当前画布中心为左平移画布宽度的一半。
        const currentCenter = game.offsetLeft + game.canvas.width / 2;

        // 如果新中心和当前中心之前的距离大于0，并且平移量没有达到最大和最小量，保持平移
        if (Math.abs(newCenter - currentCenter) > 0 && game.offsetLeft <= maxOffset && game.offsetLeft >= minOffset) {
            // 我们将会在每一帧平移当前中心与新中心之间距离的一半
            let deltaX = (newCenter - currentCenter) / 2;

            // 如果 deltaX太大，画布会平移地非常快，当它大于 maxSpeed 时
            if (Math.abs(deltaX) > game.maxSpeed) {
                // 限制 deltaX 的大小，使其保持与 maxSpeed 相等或相反数或0
                deltaX = game.maxSpeed * Math.sign(deltaX);
            }

            // 如果我们快到达终点时，我们就直接将画布停止平移
            if (Math.abs(deltaX) <= 1) {
                deltaX = newCenter - currentCenter;
            }

            // 最后调整平移量
            game.offsetLeft += deltaX;

            // 确保我们不超过最大最小的限制
            if (game.offsetLeft <= minOffset) {
                game.offsetLeft = minOffset;
                
                // 告诉函数我们已经最够接近新中心点了
                return true;
            } else if (game.offsetLeft >= maxOffset) {
                // 告诉函数我们已经最够接近新中心点了                
                return true;
            }
        } else {
            // 告诉函数我们已经最够接近新中心点了
            return true;
        }
    },

    handleGameLogic: function() {
        if (game.mode === "intro") {
            if (game.panTo(700)) {
                game.mode = "load-next-hero";
            }
        }

        if (game.mode === "wait-for-firing") {
            if (mouse.dragging) {
                game.panTo(mouse.x + game.offsetLeft);
            } else {
                game.panTo(game.slingShotX);
            }
        }

        if (game.mode === "load-next-hero") {
            // 首先先计算角色和敌人数量，并将它们放进各自的数组中
            // 检查敌人是否还有存活，如果没有，过关
            // 检查是否还有更多的角色等待加载，如果没有，失败
            // 加载角色，设置游戏状态
            game.mode = "wait-for-firing";
        }

        if (game.mode === "firing") {
            // 如果如果按住鼠标，允许调整发射角度
            // 释放鼠标，发射角色
        }

        if (game.mode === "fired") {
            // 移动角色
            // 等待角色停止移动或超出边界
        }

        if (game.mode === "level-success" || game.mode === "level-failure") {
            // 从右到左平移整块画布
            // 显示游戏结束界面
        }
    },
    
    animate: function() {
        // 处理平移，游戏状态和控制流程
        game.handleGameLogic();

        // 用视差滚动绘制背景
        // 首先绘制背景图像，偏移距离的一小部分（1/4）
        // 比例越大，背景看起来越接近
        game.context.drawImage(game.currentLevel.backgroundImage,
                                game.offsetLeft / 4, 0,
                                game.canvas.width, game.canvas.height,
                                0, 0,
                                game.canvas.width, game.canvas.height);

        // 绘制所有实体
        game.drawAllBodies();

        // 绘制前景图像，偏移整个offsetLeft距离
        game.context.drawImage(game.currentLevel.foregroundImage,
                                game.offsetLeft, 0,
                                game.canvas.width, game.canvas.height,
                                0, 0,
                                game.canvas.width, game.canvas.height
                            );
        // 绘制弹弓，偏移整个offsetLeft距离
        game.context.drawImage(game.slingshotImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        // 绘制弹弓前景，偏移整个offsetLeft距离
        game.context.drawImage(game.slingshotFrontImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    },

    drawAllBodies: function() {
        // 绘制调试数据，如果有的话
        if (box2d.debugCanvas) {
            box2d.world.DrawDebugData();
        }
        // 遍历所有实体并绘制到画布上去
        for (let body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
            const entity = body.GetUserData();
            if (entity) {
                entities.draw(entity, body.GetPosition(), body.GetAngle());
            }
        }
    },

    // 初始化对象，预加载资源和显示开始界面
    init: function() {
        // 游戏画布，上下文
        game.canvas = document.getElementById('gameCanvas');
        game.context = game.canvas.getContext('2d');

        // 初始化
        levels.init();
        loader.init();
        mouse.init();

        // 隐藏所有游戏界面，显示开始界面
        game.hideScreens();
        game.showScreen("gameStartScreen");
    },

    hideScreens: function() {
        const screens = document.getElementsByClassName("gameLayer");
        // 循环所有界面，将它们设置为 none
        for (let i = screens.length - 1; i >= 0; i--) {
            const screen = screens[i];

            screen.style.display = "none";
        }
    },

    hideScreen: function(id) {
        const screen = document.getElementById(id);

        screen.style.display = "none";
    },

    showLevelScreen: function() {
        game.hideScreens();
        game.showScreen("levelSelectScreen");
    },

    showScreen: function(id) {
        const screen = document.getElementById(id);

        screen.style.display = "block";
    }
};

const levels = {
    data: [
        {
            foreground: "desert-foreground",
            background: "clouds-background",
            entities: [
                // The ground
                {
                    type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20,
                    isStatic: true
                },
                // The slingshot wooden frame
                {
                    type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80,
                    isStatic: true
                },
                { type: "block", name: "wood", x: 500, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 500, y: 280, angle: 90, width: 100, height: 25 },
                { type: "villain", name: "burger", x: 500, y: 205, calories: 590 },
                { type: "block", name: "wood", x: 800, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 800, y: 280, angle: 90, width: 100, height: 25 },
                { type: "villain", name: "fries", x: 800, y: 205, calories: 420 },
                { type: "hero", name: "orange", x: 80, y: 405 },
                { type: "hero", name: "apple", x: 140, y: 405 }
            ]
        },
        {
            foreground: "desert-foreground",
            background: "clouds-background",
            entities: [
                // The ground
                {
                    type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20,
                    isStatic: true
                },
                // The slingshot wooden frame
                {
                    type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80,
                    isStatic: true
                },
                { type: "block", name: "wood", x: 850, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 700, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 550, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 625, y: 316, width: 150, height: 25 },
                { type: "block", name: "glass", x: 775, y: 316, width: 150, height: 25 },
                { type: "block", name: "glass", x: 625, y: 252, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 775, y: 252, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 700, y: 190, width: 150, height: 25 },
                { type: "villain", name: "burger", x: 700, y: 152, calories: 590 },
                { type: "villain", name: "fries", x: 625, y: 405, calories: 420 },
                { type: "villain", name: "sodacan", x: 775, y: 400, calories: 150 },
                { type: "hero", name: "strawberry", x: 30, y: 415 },
                { type: "hero", name: "orange", x: 80, y: 405 },
                { type: "hero", name: "apple", x: 140, y: 405 }
            ]
        }
    ],

    init: function() {
        const levelSelectScreen = document.getElementById("levelSelectScreen");

        const buttonClickHandler = function() {
            game.hideScreen("levelSelectScreen");

            levels.load(this.value - 1);
        };

        for (let i = 0; i < levels.data.length; i++) {
            let button = document.createElement("input");

            button.type = "button";
            button.value = (i + 1);
            button.addEventListener("click", buttonClickHandler);

            levelSelectScreen.appendChild(button);
        }
    },

    // 加载指定关卡所有数据和图片
    load: function(number) {

        // 加载一个关卡后，初始化其Box2D环境
        box2d.init();

        // 声明一个新的当前关卡的对象
        game.currentLevel = { number: number };
        game.score = 0;

        document.getElementById('score').innerHTML = "Score: " + game.score;
        const level = levels.data[number];
        // 加载背景，前景和弹弓
        game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
        game.currentLevel.foregroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");
        game.slingshotImage = loader.loadImage("images/slingshot.png");
        game.slingshotFrontImage = loader.loadImage("images/slingshot-front.png");

        // 加载所有实体
        for (let i = 0; i < level.entities.length; i++) {
            const entity = level.entities[i];

            entities.create(entity);
        }

        // 当资源加载完后调用 game.start()
        loader.onload = game.start;
    }
};

const loader = {
    loaded: true,
    loadedCount: 0, // 目前加载的资源数
    totalCount: 0,  // 所有需要加载的资源数

    init: function() {
        // 检查音效是否能播放
        let mp3Support, oggSupport;
        let audio = document.createElement('audio');

        if (audio.canPlayType) {
            // canPlayType() 返回三种值： "", "maybe" 或 "probably"
            mp3Support = '' !== audio.canPlayType("audio/mpeg");
            oggSupport = '' !== audio.canPlayType("audio/ogg; codecs=\"vorbis\"");
        } else {
            mp3Support = false;
            oggSupport = false;
        }

        // 先检查是否支持 ogg 然后再 mp3， 最后将 soundFileExtn 设置为 undefined
        loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },

    loadImage: function(url) {
        this.loaded = false;
        this.totalCount++;

        game.showScreen("loadingScreen");

        const image = new Image();

        image.addEventListener("load", loader.itemLoaded, false);
        image.src = url;

        return image;
    },

    soundFileExtn: ".ogg",

    loadSound: function(url) {
        this.loaded = false;
        this.totalCount++;

        game.showScreen("loadingScreen");

        const audio = new Audio();

        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        audio.src = url + loader.soundFileExtn;

        return audio;
    },

    itemLoaded: function(ev) {
        // 此item加载完成时停止监听此item的所有事件类型
        ev.target.removeEventListener(ev.type, loader.itemLoaded, false);

        loader.loadedCount++;

        document.getElementById("loadingMessage").innerHTML = "Loaded" + loader.loadedCount + " of " + loader.totalCount;

        if (loader.loadedCount === loader.totalCount) {
            // 已完全加载完成
            // 重置并清除 loader
            loader.loaded = true;
            loader.loadedCount = 0;
            loader.totalCount = 0;

            // 隐藏加载界面
            game.hideScreen("loadingScreen");

            // 调用loader.onload
            if (loader.onload) {
                loader.onload();
                loader.onload = undefined;
            }
        }
    }
}

const mouse = {
    x: 0,
    y: 0,
    down: false,
    dragging: false,

    init: function() {
        const canvas = document.getElementById('gameCanvas');

        canvas.addEventListener("mousemove", mouse.mouseMoveHandler, false);
        canvas.addEventListener("mousedown", mouse.mouseDownHandler, false);
        canvas.addEventListener("mouseup", mouse.mouseUpHandler, false);
        canvas.addEventListener("mouseout", mouse.mouseOutHandler, false);        
    },

    mouseMoveHandler: function(ev) {
        const offset = game.canvas.getBoundingClientRect();

        mouse.x = ev.clientX - offset.left;
        mouse.y = ev.clientY - offset.top;

        if (mouse.down) {
            mouse.dragging = true;
        }

        ev.preventDefault();
    },

    mouseDownHandler: function(ev) {
        mouse.down = true;

        ev.preventDefault();
    },

    mouseUpHandler: function(ev) {
        mouse.down = false;
        mouse.dragging = false;

        ev.preventDefault();
    }
}

const entities = {
    definitions: {
        "glass": {
            fullHealth: 100,
            density: 2.4,
            friction: 0.4,
            restitution: 0.15,
        },
        "wood": {
            fullHealth: 500,
            density: 0.7,
            friction: 0.4,
            restitution: 0.4,
        },
        "dirt": {
            density: 3.0,
            friction: 1.5,
            restitution: 0.2,
        },
        "burger": {
            shape: "circle",
            fullHealth: 40,
            radius: 25,
            density: 1,
            friction: 0.5,
            restitution: 0.4,
        },
        "sodacan": {
            shape: "rectangle",
            fullHealth: 80,
            width: 40,
            height: 60,
            density: 1,
            friction: 0.5,
            restitution: 0.7
        },
        "fries": {
            shape: "rectangle",
            fullHealth: 50,
            width: 40,
            height: 50,
            density: 1,
            friction: 0.5,
            restitution: 0.6
        },
        "apple": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
        "orange": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
        "strawberry": {
            shape: "circle",
            radius: 15,
            density: 2.0,
            friction: 0.5,
            restitution: 0.4

        }
    },

    // 获取实体，创建Box2D实体，加入到游戏中
    create: function(entity) {
        const definition = entities.definitions[entity.name];

        if (!definition) {
            console.log("Undefined entity name", entity.name);

            return;
        }

        switch(entity.type) {
            case "block":   // 简单的矩形
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.shape = "rectangle";
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");

                box2d.createRectangle(entity, definition);
                break;
            case "ground":  // 简单的矩形
                entity.shape = "rectangle";
                box2d.createRectangle(entity, definition);
                break;
            case "hero":    // 简单的圆形
            case "villain": // 圆形或矩形
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                entity.shape = definition.shape;
                if (definition.shape === 'circle') {
                    entity.radius = definition.radius;
                    box2d.createCircle(entity, definition);
                } else if (definition.shape === 'rectangle') {
                    entity.width = definition.width;
                    entity.height = definition.height;
                    box2d.createRectangle(entity, definition);
                }
                break;
            default:
                console.log("Undefined entity type", entity.type);
                break;
        }
    },

    // 从 entities 中获取 entity，及其坐标，角度，然后绘制在画布上
    draw: function(entity, position, angle) {

        game.context.translate(position.x * box2d.scale - game.offsetLeft, position.y * box2d.scale);
        game.context.rotate(angle);
        const padding = 1;

        switch (entity.type) {
            case "block":
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width,
                    entity.sprite.height,
                    -entity.width / 2 - padding, -entity.height / 2 - padding,
                    entity.width + 2 * padding, entity.height + 2 * padding);
                break;
            case "villain":
            case "hero":
                if (entity.shape === "circle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width,
                        entity.sprite.height,
                        -entity.radius - padding, -entity.radius - padding,
                        entity.radius * 2 + 2 * padding, entity.radius * 2 + 2 * padding);
                } else if (entity.shape === "rectangle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width,
                        entity.sprite.height,
                        -entity.width / 2 - padding, -entity.height / 2 - padding,
                        entity.width + 2 * padding, entity.height + 2 * padding);
                }
                break;
            case "ground":
                // 不作任何处理
                break;
        }

        game.context.rotate(-angle);
        game.context.translate(-position.x * box2d.scale + game.offsetLeft, -position.y * box2d.scale);
    },
};

// 声明共用的Box2D对象
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;

const box2d = {
    scale: 30,
    debugCanvas: undefined,
    
    init: function() {
        // 设置Box2D环境来处理大部分的物理计算
        const gravity = new b2Vec2(0, 9.8); // 自由落体加速度
        const allowSleep = true;    // 允许所有对象进入休眠，无需进行计算

        box2d.world = new b2World(gravity, allowSleep);

        // 启用调试
        this.setupDebugDraw();
    },

    setupDebugDraw: function () {
        // 动态创建一个画布来进行调试
        if (!box2d.debugCanvas) {
            var canvas = document.createElement("canvas");
            canvas.width = 1024;
            canvas.height = 480;
            document.body.appendChild(canvas);
            canvas.style.top = "480px";
            canvas.style.position = "absolute";
            canvas.style.background = "white";
            box2d.debugCanvas = canvas;
        }
        // 设置这个画布
        var debugContext = box2d.debugCanvas.getContext("2d");
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);
    },

    createRectangle: function(entity, definition) {
        const bodyDef = new b2BodyDef();

        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        const fixtureDef = new b2FixtureDef();

        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(entity.width / 2 / box2d.scale, entity.height / 2 / box2d.scale);

        const body = box2d.world.CreateBody(bodyDef);

        body.SetUserData(entity);
        body.CreateFixture(fixtureDef);

        return body;
    },

    createCircle: function(entity, definition) {
        const bodyDef = new b2BodyDef();

        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        const fixtureDef = new b2FixtureDef();

        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2CircleShape(entity.radius / box2d.scale);

        const body = box2d.world.CreateBody(bodyDef);

        body.SetUserData(entity);
        body.CreateFixture(fixtureDef);

        return body;
    },
}

window.addEventListener('load', () => {
    game.init();
});