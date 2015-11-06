var io = require('socket.io').listen(80)

var chat = io
  // of方法会返回特定命名空间的sockets实例
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('msg', {
        that: 'only',
        '/chat': 'will get'
    })
    chat.emit('msg', {
        everyone: 'in',
        '/chat': 'will get'
    })
  })

var news = io
  .of('/news')
  // 此时news的connection事件与chat的connection互相是不会有关系的
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' })
  })