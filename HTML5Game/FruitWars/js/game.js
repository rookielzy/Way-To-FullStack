const game = {
    // 初始化对象，预加载资源和显示开始界面
    init: function() {
        // 游戏画布，上下文
        game.canvas = document.getElementById('gameCanvas');
        game.context = game.canvas.getContext('2d');

        // 初始化
        levels.init();
        loader.init();

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

        if (loader.loadedCount === loaded.totalCount) {
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

window.addEventListener('load', () => {
    game.init();
});