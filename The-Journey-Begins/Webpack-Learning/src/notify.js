export function announce() {
    console.log('Hi');
};

export function log() {
    console.log('logging');
};


// With this, we can just use import this file by default
// export default {
//     announce: announce,
//     log: log
// }

// Use it in main.js
// import notification from './notify'
// notification.log();
// notification.announce();

// Or we can just use like this
// export default function() {
//    some functions
//}