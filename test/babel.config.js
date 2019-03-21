// babel recommends a babel.config.js file over a .babelrc file
// // https://babeljs.io/docs/en/configuration
/* eslint-env node */
module.exports = function() {
  return {
    plugins: ['babel-plugin-syntax-dynamic-import']
  };
};
