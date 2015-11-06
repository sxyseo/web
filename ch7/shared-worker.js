var ports = []
function broadcast(msg) {
  ports.forEach(function (port) {
    port.postMessage(msg)
  })
}
// connect 依然可以使用addEventListener来绑定
self.onconnect = function(e) {
  // 任何客户端发起连接的时候都会新建一个MessagePort实例
  var newPort = e.ports[0]
  // 将该实例管理起来
  ports.push(newPort)
  newPort.onmessage = function (e) {
    if (e.data.cmd === 'hi') {
      broadcast(e.data.id + '说：' + e.data.msg)
    }
  }
}