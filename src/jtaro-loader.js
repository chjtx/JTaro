/* global XMLHttpRequest Vue */
(function () {
  window.JTaroModule = {
    // 同步加载
    ajax: function (path, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          callback(xhr.responseText)
        }
      }
      xhr.open('GET', path + '.js' + '?' + Date.now(), false)
      xhr.send()
    },
    // 解释模板
    parse: function (path, text) {
      var id = path.replace(/\//g, '___')
      text = text.replace(/export\s+default/, 'return')
      var obj = new Function(text)()
      if (!obj.template) {
        this.ajax(path + '.html' + '?' + Date.now(), function (data) {
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
      this.ajax(path + '.js' + '?' + Date.now(), function (data) {
        var d = me.parse(path, data)
        if (typeof callback === 'function') callback(d)
      })
    }
  }
})()
