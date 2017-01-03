/*! JTaro-Module client.js v0.0.1 ~ (c) 2017 Author:BarZu Git:https://github.com/chjtx/JTaro-Module/ */
/* global */
(function () {
  window.JTaroModules = {}

  var loader = {
    // 路径处理
    path: {
      dirname: function (p) {
        return p.substr(0, p.lastIndexOf('/'))
      },
      resolve: function (p) {
        var currentScript = document.currentScript.src
        var d = this.dirname(currentScript)
        var path

        // 支持http/https请求
        if (/^http/.test(p)) {
          path = p

        // 相对路径请求
        } else {
          p = p.replace(/(\.\.\/)|(\.\/)/g, function (match, up) {
            if (up) {
              d = d.substr(0, d.lastIndexOf('/'))
            }
            return ''
          })
          path = (d + '/' + p)
        }
        return {
          from: currentScript,
          src: path.replace(window.location.origin, ''),
          path: path
        }
      }
    },
    // 判断脚本是否存在
    isExist: function (path) {
      var exist = false
      var scripts = document.getElementsByTagName('script')
      for (var i = 0, l = scripts.length; i < l; i++) {
        if (scripts[i].src === path) {
          exist = true
          break
        }
      }
      return exist
    },
    // 引入模块
    import: function (path, callback) {
      var me = this
      var src = this.path.resolve(path)
      var script

      if (!me.isExist(src.path)) {
        script = document.createElement('script')
        script.src = src.src
        script.onload = function () {
          if (typeof callback === 'function') callback(src)
        }
        script.onerror = function (e) {
          console.error('`JTaroLoader.import(\'' + src.src + '\', g)` load fail from ' + src.from)
        }
        setTimeout(function () {
          // 防止多次引入同一模块
          if (!me.isExist(src.path)) {
            document.head.appendChild(script)
          } else {
            callback(src)
          }
        }, 0)
      } else if (typeof callback === 'function') {
        callback(src)
      }
    }
  }

  window.JTaroLoader = loader
})()
