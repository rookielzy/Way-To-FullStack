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
            entities: []
        },
        {
            foreground: "desert-foreground",
            background: "clouds-background",
            entities: []
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

window.addEventListener('load', () => {
    game.init();
});