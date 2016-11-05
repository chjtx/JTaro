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
  jroll: 'null',
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
              '<my-head>Home<a class="right" href="javascript:void(0)" @click="go">about &gt;&gt;</a></my-head>' +
              '<div id="home_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">home page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
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
  methods: {
    go: function () {
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
              '<a style="margin-left:10px" class="left" href="javascript:void(0)" @click="goHome">&lt;&lt; home</a>List</my-head>' +
              '<div id="list_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
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
    this.jroll = new JRoll('#list_wrapper')
  }
})
