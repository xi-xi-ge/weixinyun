const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const targetServer = 'http://www.lubantec.com';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.headers['content-type'] = 'application/json'; // 设置 Content-Type
  }

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
