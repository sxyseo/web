var io = require('socket.io').listen(80)

io.sockets.on('connection', function (socket) {
  // 假设有一个异步的获取你的实时微博的方法
  var timer = setInterval(function () {
    getTweets(function (tweets) {
      socket.volatile.emit('tweet', tweets)
    })
  }, 100)
  // 客户端很可能在你获取微博的时候断开连接，此时如果调用socket.emit方法程序会报错
  socket.on('disconnect', function () {
    clearInterval(timer)
  })
})