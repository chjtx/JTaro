/* global JRoll */
import tpl from './1.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: { myHeader: header },
  mounted: function () {
    var wrapper = document.getElementById('wrapper')
    var scroller = document.getElementById('scroller')
    var jroll = new JRoll(wrapper, {
      id: 'demo1',
      scrollBarY: true
    })
    var menu = document.getElementById('menu')
    var tips = document.getElementById('tips')

    function createLi (n) {
      var html = ''
      for (var i = 0; i < n; i++) {
        html += '<li>' + (i + 1) + '</li>'
      }
      scroller.innerHTML = html
      jroll.scrollTo(0, 0).refresh()
    }

    menu.onclick = function (e) {
      var target = e.target
      var num = Number(target.innerText)
      if (!isNaN(num)) {
        if (num === 9999) {
          tips.style.display = 'block'
        }
        setTimeout(function () {
          createLi(num)
          Array.prototype.forEach.call(menu.children, function (c) {
            c.classList.remove('current')
          })
          target.classList.add('current')
          tips.style.display = 'none'
        }, 10)
      }
    }

    createLi(6)
  }
}
