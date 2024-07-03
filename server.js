const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
// 在server.use(router)之前添加
/*
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});
*/
server.post('/users-login', (req, res) => {
  console.log('req.body :>> ', req.body);
  const { username, password } = req.body;
  // Add your own login logic here
  if (username === 'admin' && password === '123456') {
    res.json({
      code: 200,
      data: { token: 'token-admin' },
      message: '登录成功'
    });
  } else {
    res.json({
      code: 500,
      data: null,
      message: '密码错误'
    });
  }
});

server.post('/table-update', (req, res) => {
  console.log('req.body :>> ', req.body);
  const { username, password } = req.body;
  res.json({
    code: 200,
    data: {...req.body},
    message: '成功'
  });
});
// 在server.use(router)之前添加
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
