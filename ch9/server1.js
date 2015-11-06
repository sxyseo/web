var http = require('http'),
  sio = require('socket.io'),
  fs = require('fs')

function handler(req, res) {
  // index.html包含我们的客户端代码
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200)
    res.end(data)
  })
}
// 利用http模块创建一个服务器实例app，并监听80端口
var app = http.createServer(handler)
app.listen(80)
// 将socket.io绑定至该实例
var io = sio.listen(app)

io.sockets.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  })
  socket.on('myevent', function(data) {
    console.log(data)
  })
})
