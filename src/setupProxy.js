const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // Proxy all requests starting with `/api`
        createProxyMiddleware({
            target: 'https://api.jsonserve.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }, // Remove `/api` from the request path
        })
    );
};