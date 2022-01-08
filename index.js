const colors = require('ansi-colors');

const originalConsoleError = console.error;
const error = (...args) => {
    const error = (args[0].stack ? args[0].stack : args[0]).split('\n');
    error[0] = colors.red(error[0]);
    if (args.response) {
        return originalConsoleError.call(console, error, args.response);
    }
    return originalConsoleError.call(console, error);
}

const originalConsoleWarn = console.warn;
const warn = (...args) => {
    const warning = args[0].split('\n');
    warning[0] = colors.yellow(warning[0]);
    return originalConsoleWarn.call(console, warning);
}

module.exports.warn = warn;
module.exports.error = error;

module.exports.init = () => {
    console.warn = warn;
    console.error = error;
}