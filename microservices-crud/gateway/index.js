const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Forward to Users Service
app.use('/users', createProxyMiddleware({
  target: 'http://users-service:3001',
  changeOrigin: true
}));

// Forward to Products Service
app.use('/products', createProxyMiddleware({
  target: 'http://products-service:3002',
  changeOrigin: true
}));

app.listen(3000, () => console.log('API Gateway running on port 3000'));
