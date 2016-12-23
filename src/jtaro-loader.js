/* global XMLHttpRequest Vue */
(function () {
  window.JTaroModules = {}
  window.JTaroLoader = {
    // 同步加载
    ajax: function (path, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          callback(xhr.responseText)
        }
      }
      xhr.open('GET', path, false)
      xhr.send()
    },
    // 解释模板
    parse: function (path, obj) {
      var id = path.replace(/\//g, '__')
      // text = text.replace(/export\s+default/, 'return')
      // var obj = new Function(text)()
      if (!obj.template) {
        this.ajax(path + '.html', function (data) {
          var reg = /<style>([\s\S]+)<\/style>/
          var styleText = reg.exec(data)
          var style
          var css

          // 将模板的<style>提取到head
          if (styleText) {
            style = document.getElementById('jtaro_style_' + id)
            if (!style) {
              css = styleText[1]
                .replace(/^\s+/, '[jtaro_' + id + '] ')
                .replace(/}\s+(?!$)/g, '}\n[jtaro_' + id + '] ')
                .split(/,\s+/).join(',\n[jtaro_' + id + '] ')
              style = document.createElement('style')
              style.id = 'jtaro_style_' + id
              style.innerHTML = css
              document.head.appendChild(style)
            }

            data = data.replace(styleText[0], '').replace(/^(\s+)(<\w+) /, function (match, m1, m2) {
              return m2 + ' jtaro_' + id + ' '
            })
          }
          obj.template = data
        })
      }
      return Vue.component(id, obj)
    },
    // 引入模块
    import: function (path, callback) {
      var me = this
      // this.ajax(path + '.js', function (data) {
      //   var d = me.parse(path, data)
      //   if (typeof callback === 'function') callback(d)
      // })
      var mod = path.replace(/\//g, '__')
      var s = document.createElement('script')
      s.src = path + '.js?jtaro_module=' + mod
      s.onload = function () {
        // Vue.component(mod, window.JTaroModules[mod])
        // callback(Vue.options.components[mod])
        var d = me.parse(path, window.JTaroModules[mod])
        if (typeof callback === 'function') callback(d)
      }
      document.head.appendChild(s)
    }
  }
})()
