/**
 * Carousel 组件构造函数
 */
function Carousel(selector) {
  var self = this
  var $element = $(selector)
  var element = $element.get(0)
  var container = $(">ul", element)
  var panes = $(">ul>li", element)

  var paneWidth = 0
  var paneCount = panes.length

  var currentPane = 0


  /**
   * 初始化方法
   */
  this.init = function() {
    setPaneDimensions()
    // 重点在于 orientationchange 事件，它用来检测用户是否改变了屏幕方向
    // 对于任何改变屏幕尺寸的行为，都重新设置整个面板的尺寸
    $(window).on("load resize orientationchange", function() {
      setPaneDimensions()
    })
  }


  /**
   * 将所有面板的宽度都设置为外部元素的宽度，
   * 然后再将容器（ul）的宽度设置为所有面板的宽度
   * 这样可以让所有面板横着一一排好
   * 当然这个步骤也可以使用CSS来实现
   */
  function setPaneDimensions() {
    paneWidth = $element.width()
    panes.each(function() {
      $(this).width(paneWidth)
    })
    container.width(paneWidth * paneCount)
  }


  /**
   * 切换到某一面板
   */
  this.showPane = function(index) {
    index = Math.max(0, Math.min(index, paneCount - 1))
    currentPane = index

    var offset = -((100 / paneCount) * currentPane)
    setContainerOffset(offset, true)
  }

  //
  function setContainerOffset(percent, animate) {
    container.removeClass("animate")
    if (animate) {
      container.addClass("animate")
    }
    container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)")
  }

  this.next = function() {
    return this.showPane(currentPane + 1, true)
  }
  this.prev = function() {
    return this.showPane(currentPane - 1, true)
  }

  function handleSwitchImg(e) {
    // 禁止浏览器默认的滚动行为
    e.preventDefault()

    switch (e.type) {
      case 'dragright':
      case 'dragleft':
        // 让面板跟着手指移动
        var paneOffset = -(100 / paneCount) * currentPane
        var dragOffset = ((100 / paneWidth) * e.gesture.deltaX) / paneCount

        // 第一个和最后一个面板无法再进行拖动，因此降低其“粘手”的感觉
        if ((currentPane === 0 && e.gesture.direction === 'right') ||
          (currentPane === paneCount - 1 && e.gesture.direction === 'left')) {
          dragOffset *= 0.4
        }

        setContainerOffset(dragOffset + paneOffset)
        break

      case 'swipeleft':
        self.next()
        // 当触发了 swipe 后，调用 stopDetect 停止探测其他手势
        e.gesture.stopDetect()
        break

      case 'swiperight':
        self.prev()
        e.gesture.stopDetect()
        break

      case 'release':
        // 在拖拽时，如果拖动幅度超过 50% 之后松手，那么这一次导航是有效的
        if (Math.abs(e.gesture.deltaX) > paneWidth / 2) {
          if (e.gesture.direction === 'right') {
            self.prev()
          } else {
            self.next()
          }
        } else {
          self.showPane(currentPane, true)
        }
        break
    }
  }

  var posX = 0, posY = 0,
    scale = 1.5, rotation = 0,
    last_scale, last_rotation,
    last_posX, last_posY, $img
  function handleImgTouch(e) {
    $img.removeClass('animate')
    e.stopPropagation()
    switch (e.type) {
      // 当 dragstart 开始时记录下当前的缩放量、旋转量、位移量
      case 'touch':
        last_scale = scale
        last_rotation = rotation
        last_posX = posX
        last_posY = posY
        break
        // 拖拽时改变位移量
      case 'drag':
        posX = last_posX + e.gesture.deltaX
        posY = last_posY + e.gesture.deltaY
        break
        // hammer 提供的 transform 事件非常好用
      case 'transform':
        rotation = last_rotation + e.gesture.rotation
        scale = Math.min(last_scale * e.gesture.scale, 10)
        break
    }
    // 使用 CSS3 transform 进行图片的变换
    var transform =
      "translate3d(" + posX + "px," + posY + "px, 0) " +
      "scale3d(" + scale + "," + scale + ", 0) " +
      "rotate(" + rotation + "deg) "

    $img.css('transform', transform)
  }

  function zoomImg (zoomin) {
    $img.addClass('animate')
    if (zoomin) {
      // transform 的参数要写齐全，否则浏览器无法知道不同的变换属性如何做过度
      $img.css('transform', "translate3d(0, 0, 0) scale3d(1.5, 1.5, 0) rotate(0deg)")
    } else {
      $img.css('transform', 'translate3d(0, 0, 0) scale3d(1, 1, 0) rotate(0deg)')
    }
    setTimeout(function () {
      $img.removeClass('animate')
    }, 300)
  }

  var hammerEl = Hammer(element)
  hammerEl.on("release dragleft dragright drag swipeleft swiperight", handleSwitchImg)
  // 阻止图片本身的可拖拽行为
  $('img', element).on('dragstart', function (e) {
    e.preventDefault()
  })

  // zooming 用来指示当前是否进入了浏览模式
  var zooming = false
  function viewMode(img, enable) {
    $img = $(img)
    zooming = !zooming
    if (enable) {
      zoomImg(enable)
      // 进入浏览模式后便不再处理外部的事件
      hammerEl
        .off("release dragleft dragright drag swipeleft swiperight", handleSwitchImg)
        .on('touch drag transform', handleImgTouch)
    } else {
      zoomImg(enable)
      hammerEl
        .off('touch drag transform', handleImgTouch)
        .on("release dragleft dragright drag swipeleft swiperight", handleSwitchImg)
      // 退出当前图片的浏览模式后需要重置这些预设值。
      posX = 0
      posY = 0,
      scale = 1.5
      rotation = 0
    }
  }
  hammerEl.on('doubletap', function (e) {
    var img
    if (e.target.tagName === 'IMG') {
      img = e.target
    } else {
      img = $(e.target).find('img').get(0)
    }
    // 轻触屏幕两次将图片放大 50% 并进入图片浏览模式
    // 在浏览模式下，可以进行拖拽移动图片，pinch 缩放图片等
    viewMode(img, !zooming)
  })

}