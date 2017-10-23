# JQery Gallery Plugin

## 如何使用
```js
objName // 画廊的名字
thumbsElements  // 画廊的 ID
imagesArray // 画廊的画

function jQGallery(configs) {
    jQGallery.prototype.JQGConfig = configs;
    jQGallery.prototype.thisOBJ = this.JQGConfig.objName;
    jQGallery.prototype.renderThumbnails();
}

// 使用示例
    natureGallery = new jQGallery({
        objName: "natureGallery",
        thumbsElements: "#thumbnails",
        imagesArray: [
            "nature0.jpeg",
            "nature1.jpeg",
            "nature2.jpeg",
            "nature3.jpeg",
            "nature4.jpeg",
            "nature5.jpeg",
            "nature6.jpeg",
            "nature7.jpeg",
            "nature8.jpeg",
            "nature9.jpeg",
        ]
    })
```