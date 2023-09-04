//#! /usr/bin/env node

const os = require('os');



module.exports.getOSType = function()  {
    // if (os.type() == 'Windows_NT') {
    //     //windows平台
    // }
    // if (os.type() == 'Darwin') {
    //     //mac
    // }
    // if (os.type() == 'Linux') {
    //     //Linux平台
    // }
    return os.type();
}
