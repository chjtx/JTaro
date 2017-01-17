/* global JRoll */
import tpl from './9.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo9',
      scrollBarY: true
    })

    var items = document.querySelectorAll('.item')
    var current = null // 保存当前滑开的item

    for (var i = 0, l = items.length; i < l; i++) {
      var j = new JRoll(items[i], {
        scrollX: true,
        bounce: false
      })

      j.on('scrollStart', function () {
        if (current && current !== this) {
          current.scrollTo(0, 0, 100)
          current = null
        }
      })

      j.on('scroll', function (e) {
        if (this.x === 0 && !current) {
          this.call(jroll, e)
        } else {
          current = this
        }
      })

      j.on('scrollEnd', function () {
        if (this.x > -50) {
          this.scrollTo(0, 0, 100)
          current = null
        } else {
          this.scrollTo(this.maxScrollX, 0, 100)
        }
      })
    };

    // 添加点击删除按钮的事件
    jroll.scroller.addEventListener('click', function (e) {
      if (e.target.className === 'del') {
        window.alert('点击删除')
      }
    }, false)
  }
}
