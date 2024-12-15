/* MIDDLEWARE */ 


export function logDate(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.path}`);
    next();
};

export function logMDW(req, res, next) {
    console.log('Logged');
    next();
};

