module.exports = ((typeof process != 'undefined') && process.env.TEST_COV) ? require('./lib-cov/protection') : require('./lib/protection');
