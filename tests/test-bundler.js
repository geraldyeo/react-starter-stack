// ======================================== //
//     Test Environment Setup
// ======================================== //
// import sinon from 'sinon'

// global.sinon = sinon

// ======================================== //
//     Require Tests
// ======================================== //
// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.tape\.js$/);
testsContext.keys().forEach(testsContext);

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/);
componentsContext.keys().forEach(componentsContext);
