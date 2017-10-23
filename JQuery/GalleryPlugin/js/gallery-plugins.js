function jQGallery(configs) {
    jQGallery.prototype.JQGConfig = configs;
    jQGallery.prototype.thisOBJ = this.JQGConfig.objName;
    jQGallery.prototype.renderThumbnails();

}

jQGallery.prototype.renderThumbnails = function() {
    var imgArray = this.JQGConfig.imagesArray;
    var thumbWrap = $(this.JQGConfig.thumbsElements);
    thumbWrap.empty();
    for (var img in imgArray) {
        imagesName = imgArray[img];
        thumbWrap.append('<div class="eachThumbWrap" onclick="'+ this.thisOBJ + '.popImage(\'' + imagesName + '\')"><img src="images/' + imagesName + '"></div>');
    }
}

jQGallery.prototype.popImage = function(imgName) {
    $('#fullimage').remove();
    $('body').append('<div id="fullimages" class="popBG"><div class="popImageWrap"><div class="closeBtn" onclick="$(\'#fullimages\').remove()">X</div><img src="images/' + imgName + '"></div></div>')
}