const game = {
    // 初始化对象，预加载资源和显示开始界面
    init: function() {
        // 游戏画布，上下文
        game.canvas = document.getElementById('gameCanvas');
        game.context = game.canvas.getContext('2d');

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

    showScreen: function(id) {
        const screen = document.getElementById(id);

        screen.style.display = "block";
    }
};

window.addEventListener('load', () => {
    game.init();
});