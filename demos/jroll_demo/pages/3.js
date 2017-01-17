/* global JRoll */
import tpl from './3.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: { myHeader: header },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo3'
    })
    var scroller = this.$el.querySelector('.scroller')
    var evt = document.getElementById('evt')
    var pos = document.getElementById('pos')

    function createLi (n) {
      var html = ''
      for (var i = 0; i < n; i++) {
        html += '<li>' + (i + 1) + '</li>'
      }
      scroller.innerHTML = html
      jroll.scrollTo(0, 0).refresh()
    }

    createLi(40)

    jroll.on('scrollStart', function () {
      evt.innerText = 'scrollStart'
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')'
    })

    jroll.on('scroll', function () {
      evt.innerText = 'scroll'
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')'
    })

    jroll.on('scrollEnd', function () {
      evt.innerText = 'scrollEnd'
      pos.innerText = '(0, ' + this.y.toFixed(2) + ')'
    })

    jroll.on('touchEnd', function () {
      evt.innerText = 'touchEnd'
    })

    // 旋转屏幕会执行该事件
    jroll.on('refresh', function () {
      evt.innerText = 'refresh'
    })
  }
}
