// 时光倒流到 10 多年前 IE6 刚出生不久
var btn = document.getElementById('btn')
var listener = function(e) {
    alert('十年之前，我不认识你，点我不容易！')
  }
if(btn.addEventListener) {
  btn.addEventListener('click', listener, false)
} else if(btn.attachEvent) {
  btn.attachEvent('onclick', listener)
} else {
  btn.onclick = listener
}

// 10多年后，IE已经升级到10，你的网站也和IE6说拜拜了。
var btn = document.getElementById('btn-2013')
var listener = function(e) {
    alert('十年之后，我们是朋友，点我算问候！')
  }
btn.addEventListener(type, handler, false);