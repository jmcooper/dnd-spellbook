module.exports = {
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8081/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}