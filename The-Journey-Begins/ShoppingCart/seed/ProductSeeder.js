var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/shopping', {
    useMongoClient: true,
});

var products = [
    new Product({
        imagePath: 'http://www.u-acg.com/wp-content/uploads/2016/11/dota-2.jpg',
        title: 'DotA 2',
        description: 'The Greast MOBA Game All Time',
        price: 10
    }),
    new Product({
        imagePath: 'https://i.ytimg.com/vi/GT9jAv-fo6E/maxresdefault.jpg',
        title: 'inside',
        description: 'Awesome Misery Game',
        price: 68
    }),
    new Product({
        imagePath: 'https://lh3.ggpht.com/ejbcfd31sYjE7634xrKS91zDSC8IYHauzZvxBtGSvk8Y-eoNopwOjA3Au-Ok1dGtecA=h900',
        title: 'Geometry Dash',
        description: 'Awesome Funny Game',
        price: 12
    }),
    new Product({
        imagePath: 'http://cdn.akamai.steamstatic.com/steam/apps/8930/header.jpg?t=1490021806',
        title: 'Sid Meier\'s Civilization V',
        description: 'Awesome History Game',
        price: 68
    }),
    new Product({
        imagePath: 'http://media.moddb.com/images/mods/1/29/28788/This_War_of_Mine_wallpaper_01.jpg',
        title: 'This War of Mine',
        description: 'The Most Touchable Game',
        price: 16
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

// When store the all data disconnect the database
function exit() {
    mongoose.disconnect();  
}

