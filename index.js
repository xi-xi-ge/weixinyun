const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const targetServer = 'http://www.lubantec.com';

const server = http.createServer((req, res) => {
  // 处理微信小程序调用，获取微信 Open ID
  if (req.url === '/api/wx_openid' && req.headers['x-wx-source']) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(req.headers['x-wx-openid']);
    return;
  }

  // 将请求转发到另一个代理服务器
  proxy.web(req, res, { target: targetServer }, (err) => {
    console.error('代理请求错误:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('代理请求错误');
  });
});

const port = process.env.PORT || 80;

server.listen(port, () => {
  console.log('代理服务器启动成功，监听端口', port);
});
