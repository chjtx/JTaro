/*! JTaro.js v0.5.0 ~ (c) 2016 Author:BarZu Git:https://github.com/chjtx/JTaro */
/* global define JTaroLoader JTaroModules */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
  : typeof define === 'function' && define.amd ? define(factory)
  : (global.JTaro = factory())
}(this, function () {
  'use strict'

  // 将路径转为vue组件id
  function path2id (p) {
    return p.replace(/\/|\\/g, '__')
  }

  // JTaro
  var JTaro = Object.create(null)

  /**
   * JTaro Global Hooks 全局钩子
   * <globalHook> 表示beforeEnter、afterEnter或beforeLeave
   * JTaro.<globalHook>.add 添加钩子
   *    @param name
   *    @param method
   * JTaro.<globalHook>.remove 删除钩子
   *    @param name
   * JTaro.<globalHook>.run 运行钩子
   */
  function createHook () {
    return Object.create({
      add: function (name, method) {
        // **JTaro Comment Start**
        if (name === 'add' || name === 'remove' || name === 'run') {
          console.error('[JTaro warn]: `add` `remove` `run` is preserve key, please use other key')
          return
        }
        if (typeof name !== 'string') {
          console.error('[JTaro warn]: first argument must be string')
          return
        }
        if (typeof method !== 'function') {
          console.error('[JTaro warn]: second argument must be function')
          return
        }
        if (this.hasOwnProperty(name)) {
          console.error('[JTaro warn]: [ ' + name + ' ] already exits')
          return
        }
        // **JTaro Comment end**;;
        this[name] = method
      },
      remove: function (name) {
        delete this[name]
      },
      run: function () {
        for (var i in this) {
          if (this.hasOwnProperty(i) && typeof this[i] === 'function') {
            this[i]()
          }
        }
      }
    })
  }
  JTaro.beforeEnter = createHook()
  JTaro.afterEnter = createHook()
  JTaro.beforeLeave = createHook()

  JTaro.tools = {
    isEmptyObject: function (o) {
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          return false
        }
      }
      return true
    }
  }

  // Vue install
  JTaro.install = function (Vue, options) {
    // **JTaro Comment Start**
    if (options && !options.JRoll && !window.JRoll) {
      console.error('[JTaro warn]: JTaro must depend on JRoll')
    }
    if (options && options.distance && (options.distance < 0 || options.distance > 1)) {
      console.error('[JTaro warn]: distance options range must be: 0 < distance < 1')
    }
    // **JTaro Comment end**;;

    // 创建样式
    var style = document.getElementById('jtaro_style')
    if (!style) {
      style = document.createElement('style')
      style.id = 'jtaro_style'
      style.innerHTML = 'html,body{height:100%;padding:0;margin:0}#jtaro_app{position:relative;width:100%;height:100%;overflow:hidden}.jtaro-view{position:absolute;width:100%;height:100%;overflow:hidden;background:#fff;}'
      document.head.appendChild(style)
    }

    var WIDTH = window.innerWidth
    var currentPage = '' // 当前路由

    options = options || {}

    JTaro.views = []
    JTaro.history = []
    JTaro.version = '0.5.0'
    JTaro.options = {
      JRoll: options.JRoll || window.JRoll,
      el: options.el || '#jtaro_app', // 默认挂载元素
      default: options.default || 'home',  // 默认页
      distance: isNaN(options.distance) ? 0.1 : Number(options.distance),    // 页面后退距离百分比，以屏幕宽度为1
      duration: isNaN(options.duration) ? 200 : Number(options.duration)     // 页面过渡时间
    }

    // beforeEnter路由钩子
    function beforeEnterHook (vueCompoent, callback) {
      var beforeEnter = vueCompoent.options.beforeEnter

      // 先执行全局beforeEnter路由钩子
      JTaro.beforeEnter.run()

      if (typeof beforeEnter === 'function') {
        if (beforeEnter.call(JTaro, function (method) { callback(method) })) {
          callback()
        }
      } else {
        callback()
      }
    }

    // afterEnter路由钩子
    function afterEnterHook (viewCompoent) {
      // **JTaro Comment Start**
      if (!Vue.options.components[path2id(viewCompoent.jtaro_tag)]) {
        console.error('[JTaro warn]: Vue component <' + viewCompoent.jtaro_tag + '> is not define. Please use `this.go` to modify the route, do not manually modify the hash')
      }
      // **JTaro Comment end**;;

      var afterEnter = Vue.options.components[path2id(viewCompoent.jtaro_tag)].options.afterEnter

      // 先执行全局afterEnter路由钩子
      JTaro.afterEnter.run()

      if (typeof afterEnter === 'function') {
        afterEnter.call(viewCompoent.$children[0], JTaro.tools.isEmptyObject(JTaro.params) ? null : JTaro.params)
      }
      JTaro.params = null
    }

    // beforeLeave路由钩子
    function beforeLeaveHook (viewCompoent, callback) {
      var beforeLeave = Vue.options.components[path2id(viewCompoent.jtaro_tag)].options.beforeLeave

      // 先执行全局beforeLeave路由钩子
      JTaro.beforeLeave.run()

      if (typeof beforeLeave === 'function') {
        if (beforeLeave.call(viewCompoent.$children[0], function () { callback() })) {
          callback()
        }
      } else {
        callback()
      }
    }

    // 页面切入动画（新增页面）
    function slideIn (viewCompoent, _jroll) {
      var el = viewCompoent.$el
      var preSib = el.previousElementSibling

      if (JTaro.method) {
        JTaro.method.call(viewCompoent.$children[0], viewCompoent.$children[0])
      }

      JTaro.sliding = true
      _jroll.utils.moveTo(el, WIDTH, 0)

      setTimeout(function () {
        // 收入当前页
        if (preSib) {
          _jroll.utils.moveTo(preSib, -WIDTH * JTaro.options.distance, 0, JTaro.options.duration, function () {
            // 将当前页的上一页隐藏，保持只有两个页面为display:block
            var preSibSib = preSib.previousElementSibling
            if (preSibSib) {
              preSibSib.style.display = 'none'
            }
          })
        }

        // 滑进新建页
        _jroll.utils.moveTo(el, 0, 0, (JTaro.views.length === 1 ? 0 : JTaro.options.duration), function () {
          JTaro.sliding = false

          // afterEnter hook 前进
          afterEnterHook(viewCompoent)
        })
      }, 0)
    }

    // 页面切出动画（删除页面）
    function slideOut (el, _jroll, cb) {
      var nxtSib = el.nextElementSibling
      JTaro.sliding = true

      // 撤出当前页
      if (nxtSib) {
        _jroll.utils.moveTo(nxtSib, WIDTH, 0, JTaro.options.duration, cb)
      }

      // 滑出上一页
      _jroll.utils.moveTo(el, 0, 0, JTaro.options.duration, function () {
        JTaro.sliding = false
        // 将上一页的上一页显示，保持有两个页面为display:block
        var preSib = el.previousElementSibling
        if (preSib) {
          preSib.style.display = 'block'
        }
      })
    }

    // 递归删除页面
    function recursionDelPage (views, children, _jroll, i) {
      var l = views.length
      if (l - 1 > i) {
        slideOut(children[l - 2], _jroll, function () {
          views.splice(l - 1)
          JTaro.history.splice(l - 1)
          window.sessionStorage.setItem('JTaro.history', JSON.stringify(JTaro.history))
          children[l - 1].parentNode.removeChild(children[l - 1])
          setTimeout(function () {
            recursionDelPage(views, children, _jroll, i)
          }, 0)
        })
      }
      if (l - 1 === i) {
        // afterEnter hook 后退
        afterEnterHook(findVueComponent(views[i]))
      }
    }

    function parseUrlParams (a) {
      var p = a.split('&')
      var o = {}
      p.forEach(function (i) {
        var t = i.split('=')
        o[t[0]] = t[1]
      })
      return o
    }

    function findVueComponent (_hash) {
      var children = JTaro.vm.$children
      var i = 0
      var l = children.length
      for (; i < l; i++) {
        if (children[i].jtaro_tag === _hash) {
          return children[i]
        }
      }
    }

    /* 删除或添加页面
    * 1、与路由对应页面不存在->添加
    * 2、与路由对应页面已存在->将该页面往后的所有页面都删除
    */
    function pushView (_hash, jroll) {
      var h = _hash.replace('#', '').split('?')[0]
      var v = JTaro.vm.$data.views
      var i = JTaro.views.indexOf(h)
      var viewCompoent = findVueComponent(h)

      // 保存当前页面路由
      currentPage = h

      // 页面不存在
      if (i === -1) {
        if (v.indexOf(h) === -1) {
          v.push(h)
        } else {
          JTaro.vm.$el.appendChild(viewCompoent.$el)
          slideIn(viewCompoent, jroll)
        }
        JTaro.views.push(h)
        JTaro.history.push({
          view: h,
          url: _hash.replace('#', ''),
          params: JTaro.tools.isEmptyObject(JTaro.params) ? null : JTaro.params
        })
        window.sessionStorage.setItem('JTaro.history', JSON.stringify(JTaro.history))

      // 页面已存在
      } else {
        recursionDelPage(JTaro.views, JTaro.vm.$el.childNodes, jroll, i)
      }
    }

    function reset () {
      WIDTH = window.innerWidth
    }

    // 页面组件
    var JTaroView = {
      props: ['view'],
      data: function () {
        return {
          'jtaro_tag': this.view
        }
      },
      render: function (h) {
        return h(Vue.options.components[path2id(this.view)])
      },
      mounted: function () {
        slideIn(this, JTaro.options.JRoll)
      }
    }

    Vue.component('jt-view', JTaroView)

    // 注册postMessage方法
    Vue.prototype.postMessage = function (msg, name) {
      var view = findVueComponent(name)
      var component = Vue.options.components[path2id(name)]
      var method = component ? component.options.onMessage : null
      if (view && method) {
        method.call(view.$children[0], { message: msg, origin: this.$parent.jtaro_tag })
      }
    }

    // 跳到路由
    Vue.prototype.go = function (route, options) {
      // 页面切换过程中不执行路由跳转
      if (!JTaro.sliding) {
        /** Fixed issues#2
         *  使用this.go传进数字时直接调用原生的history.go
         */
        if (!isNaN(route)) {
          window.history.go(route)
          return
        }

        // 截取url参数
        var h = route.replace('#', '')
        var p = h.split('?')

        /** Fixed issues#1
         *  如果目标路由对应的页面已存在，且非当前路由，转为负数使用history.go(-?)清除历史记录
         */
        var i = JTaro.views.indexOf(p[0])
        var k
        var o
        if (~i) {
          i = 1 - (JTaro.views.length - i)
          if (i) route = i
        }

        // 设置当前页面的参数
        JTaro.params = {}
        if (options) {
          JTaro.params = options
        }
        if (p[1]) {
          o = parseUrlParams(p[1])
          for (k in o) {
            if (o.hasOwnProperty(k)) JTaro.params[k] = o[k]
          }
        }

        if (typeof route === 'number') {
          window.history.go(route)
        } else {
          window.location.hash = route
        }
      }
    }

    JTaro.vm = new Vue({
      el: JTaro.options.el,
      data: {
        views: []
      },
      template: '<div id="' + JTaro.options.el.replace('#', '') + '"><jt-view class="jtaro-view" v-for="view in views" :view="view" :key="view"></jt-view></div>'
    })

    // 监听路由变化
    window.addEventListener('hashchange', function () {
      // 如果hash为空，清空历史记录缓存，跳回默认页
      if (window.location.hash === '') {
        window.sessionStorage.getItem('JTaro.history')
        window.location.hash = JTaro.options.default
        return
      }

      var hash = window.location.hash.replace('#', '').split('?')[0]
      function beforeEnterCallback (method) {
        if (method) {
          JTaro.method = method
        } else {
          JTaro.method = null
        }
        pushView(window.location.hash, JTaro.options.JRoll)
      }

      // **JTaro Comment Start**
      var vueCompoent = Vue.options.components[path2id(hash)]
      if (!vueCompoent) {
        JTaroDevelopImport(Vue, hash, function (c) {
          if (!c) {
            console.error('[JTaro warn]: Vue component <' + path2id(hash) + '> is not define')
          } else {
            // 如果存在上一页页面先执行上一页面的beforeLeave
            if (currentPage) {
              beforeLeaveHook(findVueComponent(currentPage), function () {
                beforeEnterHook(Vue.options.components[path2id(hash)], beforeEnterCallback)
              })
            } else {
              beforeEnterHook(Vue.options.components[path2id(hash)], beforeEnterCallback)
            }
          }
        })
        return
      }
      // **JTaro Comment end**;;

      // 如果存在上一页页面先执行上一页面的beforeLeave
      if (currentPage) {
        beforeLeaveHook(findVueComponent(currentPage), function () {
          beforeEnterHook(Vue.options.components[path2id(hash)], beforeEnterCallback)
        })
      } else {
        beforeEnterHook(Vue.options.components[path2id(hash)], beforeEnterCallback)
      }
    })
    // 页面宽度改变更新动画宽度
    window.addEventListener('resize', reset)
    window.addEventListener('orientationchange', reset)

    // 启动
    function boot () {
      var hash = window.location.hash
      if (hash === '') {
        // 跳到默认路由
        window.location.hash = JTaro.options.default
        return
      }

      var _hash = hash.replace('#', '').split('?')[0]
      var vueCompoent = Vue.options.components[path2id(_hash)]

      // **JTaro Comment Start**
      if (!vueCompoent) {
        JTaroDevelopImport(Vue, _hash, function (c) {
          if (!c) {
            console.error('[JTaro warn]: Vue component <' + path2id(_hash) + '> is not define')
          } else {
            beforeEnterHook(c, function (method) {
              if (method) {
                JTaro.method = method
              } else {
                JTaro.method = null
              }

              // 保存参数
              var p = hash.split('?')
              JTaro.params = {}
              if (p[1]) {
                JTaro.params = parseUrlParams(p[1])
              }
              pushView(hash, JTaro.options.JRoll)
            })
          }
        })
        return
      }
      // **JTaro Comment end**;;

      if (vueCompoent) {
        beforeEnterHook(vueCompoent, function (method) {
          if (method) {
            JTaro.method = method
          } else {
            JTaro.method = null
          }

          // 保存参数
          var p = hash.split('?')
          JTaro.params = {}
          if (p[1]) {
            JTaro.params = parseUrlParams(p[1])
          }
          pushView(hash, JTaro.options.JRoll)
        })
      }
    }

    // 自动补全历史页面功能
    var historyViews = window.sessionStorage.getItem('JTaro.history')
    JTaro.afterEnter.add('__autoLoadHistoryPages__', function () {
      if (historyViews && historyViews.length > 1) {
        var view = findVueComponent(historyViews.shift().view).$children[0]
        // setTimeout保证上一页面的afterEnter执行完再执行下一页
        setTimeout(function () {
          view.go(historyViews[0].url, historyViews[0].params)
        }, 4)
      }
    })
    // 如果在非首页刷新页面，自动补全之前的页面
    if (historyViews && (historyViews = JSON.parse(historyViews)).length > 1) {
      window.history.go(1 - historyViews.length)

    // 否则根据路由启动页面
    } else {
      boot()
    }
  }

  return JTaro
}))

// **JTaro Comment Start**
function JTaroDevelopImport (Vue, path, callback) {
  JTaroLoader.import(path + '.js', function () {
    var id = path.replace(/\.\w+$/, '').replace(/\/|\\/g, '__')
    var basePath = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'))
    Vue.component(id, JTaroModules[basePath + '/' + path + '.js'].default)
    callback(Vue.options.components[id])
  })
}
// **JTaro Comment end**;;
