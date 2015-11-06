// 麻雀虽小，五脏俱全。
// 基本的面向对象素养还是得有滴。
function Editor(selector) {
  // 把整个 editor 对象缓存下来，jQuery对象的前面加上$符号是个好习惯。
  this.$editor = $(selector)
  this.bindEvents_()
}
Editor.prototype.bindEvents_ = function() {
  // 真实的编辑器可能有数十个按钮，使用事件代理可以大大提高代码的执行效率。
  this.$editor.on('click', 'button', function(e) {
    switch(e.currentTarget.id) {
      case 'bold':
        // 后两个参数在大多数情况下可以省略
        document.execCommand('bold')
        break
      case 'italic':
        document.execCommand('italic')
        break
      case 'underline':
        document.execCommand('underline')
        break
    }
  })
}