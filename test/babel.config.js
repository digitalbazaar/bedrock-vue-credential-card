// babel recommends a babel.config.js file over a .babelrc file
// // https://babeljs.io/docs/en/configuration
module.exports = function(api) {
  return {
    plugins: ['babel-plugin-syntax-dynamic-import']
  }
}
