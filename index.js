const colors = require('ansi-colors');

/* Inject red color for first line of error */
const originalConsoleError = console.error;
const error = (...args) => {
    if (!args[0]) {
        return originalConsoleError.call(console, ...args);
    }
    try {
        const error = (args[0]?.stack).split('\n');
        error[0] = colors.red(error[0]);
        if (args.response) {
            return originalConsoleError.call(console, error.join('\n'), args.response);
        }
        return originalConsoleError.call(console, error.join('\n'));
    } catch {
        try {
            const error = colors.red(args[0]?.stack);
            if (args.response) {
                return originalConsoleError.call(console, error, args.response);
            }
            return originalConsoleError.call(console, error);
        } catch {
            return originalConsoleError.call(console, ...args);
        }
    }
}

/* Color first line of warning yellow (maybe would be fine just coloring the whole thing yellow?) */
const originalConsoleWarn = console.warn;
const warn = (...args) => {
    if (!args[0]) {
        return originalConsoleWarn.call(console, ...args);
    }
    try {
        const warning = args[0].split('\n');
        warning[0] = colors.yellow(warning[0]);
        return originalConsoleWarn.call(console, warning.join('\n'));
    } catch {
        try {
            const warning = colors.yellow(args[0]);
            return originalConsoleWarn.call(console, warning);
        } catch {
            return originalConsoleWarn.class(console, ...args);
        }
    }
}

/* Export as functions for importing */
module.exports.warn = warn;
module.exports.error = error;

/* Export as a function that can be called to override native console.* functions */
module.exports.init = () => {
    console.warn = warn;
    console.error = error;
}