/* global JRoll */
import tpl from './8.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo8',
      scrollBarY: true,
      scrollBarX: true
    })
    var scroller = this.$el.querySelector('.scroller')

    function createLi (num) {
      var str = ''
      for (var i = 1; i <= num; i++) {
        str += '<li>' + i + '</li>'
      }
      scroller.innerHTML = str
      jroll.refresh().scrollTo(0, 0, 400)
    }

    createLi(100)

    // 绑定checkbox的change事件
    var checks = document.querySelectorAll('#btns input')
    for (var j = 0, l = checks.length; j < l; j++) {
      checks[j].onchange = function () {
        jroll.options[this.nextElementSibling.innerText] = this.checked
      }
    }
  }
}
