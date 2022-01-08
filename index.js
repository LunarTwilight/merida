const colors = require('ansi-colors');

/* Inject red color for first line of error */
const originalConsoleError = console.error;
const error = (...args) => {
    const error = (args[0].stack ? args[0].stack : args[0]).split('\n');
    error[0] = colors.red(error[0]);
    if (args.response) {
        return originalConsoleError.call(console, error.join('\n'), args.response);
    }
    return originalConsoleError.call(console, error.join('\n'));
}

/* Color first line of warning yellow (maybe would be fine just coloring the whole thing yellow?) */
const originalConsoleWarn = console.warn;
const warn = (...args) => {
    const warning = args[0].split('\n');
    warning[0] = colors.yellow(warning[0]);
    return originalConsoleWarn.call(console, warning.join('\n'));
}

/* Export as functions for importing */
module.exports.warn = warn;
module.exports.error = error;

/* Export as a function that can be called to override native console.* functions */
module.exports.init = () => {
    console.warn = warn;
    console.error = error;
}