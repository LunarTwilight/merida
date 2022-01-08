const colors = require('ansi-colors');

const error = (...args) => {
    const error = (args[0].stack ? args[0].stack : args[0]).split('\n');
    error[0] = colors.red(error[0]);
    if (args.response) {
        console.error(error, args.response);
    } else {
        console.error(error);
    }
}

const warn = (...args) => {
    var warning = args[0].split('\n');
    warning[0] = colors.yellow(warning[0]);
    console.warn(warning);
}

const init = () => {
    global.error = error;
    global.warn = warn;
}

module.exports = init;