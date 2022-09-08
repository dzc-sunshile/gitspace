// import 'default-passive-events'
window.addEventListener('load', function () {
  //1、自动轮播
  var focus = document.querySelector('.focus')
  var goback = document.querySelector('.goback')
  var nav = document.querySelector('.nav')
  var ul = focus.children[0]
  var ol = focus.children[1]
  var w = focus.offsetWidth
  var index = 0
  var timer = setInterval(function () {
    index++
    var translatex = -index * w
    ul.style.transition = 'all 1.5s'
    ul.style.transform = 'translateX(' + translatex + 'px)'
  }, 2000)
  //2、等过渡完成之后再去判读是否到了最后一张图，然后快速跳转
  //过渡监听事件transitionend
  //移动端用translate来控制动画效果，重置位置时不能和PC端一样用设置left为0来完成，
  //因为translate不改变原来的位置，他的left一直都是0
  ul.addEventListener('transitionend', function () {
    if (index >= ul.children.length - 2) {
      index = 0
      ul.style.transition = 'none'
      var translatex = -index * w
      ul.style.transform = 'translateX(' + translatex + 'px)'
    } else if (index < 0) {
      index = ul.children.length - 3
      ul.style.transition = 'none'
      var translatex = -index * w
      ul.style.transform = 'translateX(' + translatex + 'px)'
    }
    //3、小圆点跟随效果
    //这里和PC端的排他思想是一样的，只是PC端用的是循环清除其他li的样式
    //移动端是用classList.remove清除
    //因为每次都只有一个li有current样式，所以用querySelector选出拿一个就好了
    ol.querySelector('.current').classList.remove('current')
    ol.children[index].classList.add('current')
  })

  //4、手指滑动轮播图
  var startX = 0
  var moveX = 0
  var flag = false
  var last_client_X = 0
  ul.addEventListener('touchstart', function (e) {
    clearInterval(timer)
    startX = e.targetTouches[0].pageX
  })
  ul.addEventListener('touchmove', function (e) {
    moveX = e.targetTouches[0].pageX - startX
    var translatex = -index * w + moveX
    ul.style.transition = 'none'
    ul.style.transform = 'translateX(' + translatex + 'px)'
    e.preventDefault()
    flag = true
  })
  ul.addEventListener('touchend', function () {
    if (flag) {
      if (Math.abs(moveX) > 50) {
        if (moveX > 0) {
          index--
        } else {
          index++
        }
        var translatex = -index * w
        ul.style.transition = 'all 1.5s'
        ul.style.transform = 'translateX(' + translatex + 'px)'
      } else {
        var translatex = -index * w
        ul.style.transition = 'all 0.3s'
        ul.style.transform = 'translateX(' + translatex + 'px)'
      }
      flag = false
    }
    clearInterval(timer)
    timer = setInterval(function () {
      index++
      var translatex = -index * w
      ul.style.transition = 'all 1.5s'
      ul.style.transform = 'translateX(' + translatex + 'px)'
    }, 2000)
  })
  //返回顶部模块
  window.addEventListener('scroll', function () {
    var top = nav.offsetTop
    var pageY = window.pageYOffset
    if (pageY >= top) {
      goback.style.display = 'block'
    } else {
      goback.style.display = 'none'
    }
  })
  goback.addEventListener('click', function () {
    window.scroll(0, 0)
  })
})
