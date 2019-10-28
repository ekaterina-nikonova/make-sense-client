const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api/v1', '/rails', '/graphql'], { target: 'http://localhost:3001' }))
};
