/* global JRoll JTaroModules JTaroLoader */
// import header from 'pages/header'

(function (f) {
  var t = { count: 1 }
  var g = function () {
    var p1 = JTaroModules['pages/header']
    f(p1)
  }
  JTaroLoader.import('pages/header', g, t)
})(function (header) {
  JTaroModules['pages/1'] = {
    components: { header: header },
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
})
