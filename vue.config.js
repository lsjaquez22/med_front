module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/med_front/'
    : '/',

  // Remove moment.js from chart.js
  // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment'
      }
    }
  }
}
