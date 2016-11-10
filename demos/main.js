/* global Vue, JTaro, JRoll */

Vue.component('MyHead', {
  template: '<div class="my-head"><slot></slot></div>'
})

// 页面公共部分
var mixin = {
  data: function () {
    return {
      items: (function () {
        var arr = []
        for (var i = 0; i < 50; i++) {
          arr.push(i)
        }
        return arr
      })()
    }
  },
  methods: {
    deleteItem: function (i) {
      this.$data.items.splice(this.$data.items.indexOf(i), 1)
    }
  },
  updated: function () {
    this.jroll.refresh()
  }
}

// 首页
Vue.component('home', {
  template: '<div id="home">' +
              '<my-head>{{title}}<a class="right" href="javascript:void(0)" @click="go">about &gt;&gt;</a></my-head>' +
              '<div id="home_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">home page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  data: function () {
    return {
      title: 'Home'
    }
  },
  onMessage: function (event) {
    if (event.message === 'modifyTitle' && event.origin === 'about') {
      this.title = 'Home Back'
    }
  },
  beforeEnter: function (cb) {
    console.log('Home - beforeEnter')
    return true
  },
  afterEnter: function () {
    console.log('Home - afterEnter')
  },
  beforeLeave: function (cb) {
    setTimeout(function () {
      console.log('Home - beforeLeave')
      cb()
    })
  },
  afterLeave: function () {
    console.log('Home - afterLeave')
  },
  methods: {
    go: function () {
      JTaro.go('about?a=1&b=2&c=3', {
        x: 1,
        y: 2,
        z: 3
      })
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#home_wrapper')
  }
})

// 关于页
Vue.component('about', {
  template: '<div id="about">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="go">&lt;&lt; home</a>' +
              'About<a class="right" href="javascript:void(0)" @click="goList">list &gt;&gt;</a></my-head>' +
              '<div id="about_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  beforeEnter: function (cb) {
    console.log('About - beforeEnter')
    return true
  },
  methods: {
    go: function () {
      this.postMessage('modifyTitle', 'home')
      this.postMessage('modifyTitle', 'list') // nothing will do
      JTaro.go('home')
    },
    goList: function () {
      JTaro.go('list')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#about_wrapper')
  }
})

// 列表页
Vue.component('list', {
  template: '<div id="list">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="go">&lt;&lt; about</a>' +
              'List<a class="right" href="javascript:void(0)" @click="goFour">four &gt;&gt;</a></my-head>' +
              '<div id="list_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  methods: {
    go: function () {
      JTaro.go('about')
    },
    goFour: function () {
      JTaro.go('four')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#list_wrapper')
  }
})

// 第四页
Vue.component('four', {
  template: '<div id="four">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="go">&lt;&lt; about</a>' +
              '<a style="margin-left:10px" class="left" href="javascript:void(0)" @click="goHome">&lt;&lt; home</a>Four</my-head>' +
              '<div id="four_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">four page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  methods: {
    go: function () {
      JTaro.go('about')
    },
    goHome: function () {
      JTaro.go('home')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#four_wrapper')
  }
})
