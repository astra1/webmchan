const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err, data) {
    console.log('hack https://github.com/angular/devkit/commit/8e7658aabc71829153e0dfccf60cc526142a16dd#diff-085e357d25d94ae495a662c157178fb0L103');
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/node: false/g, "node: {fs: 'empty', global: true, crypto: 'empty', tls: 'empty', net: 'empty', process: true, module: false, clearImmediate: false, setImmediate: false}");

    fs.writeFile(f, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});