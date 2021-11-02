module.exports = {
    mode: 'development',
    entry: 'src/index.js',
    output: {
        filename: 'dist/main.js'
    },
    watch: true,
  watchOptions: {
      aggregateTimeout: 500,
      poll: 1000 
  }
}