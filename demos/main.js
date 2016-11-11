/* global Vue, JRoll, JTaro */

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
Vue.component('index', {
  template: '<div id="index">' +
              '<my-head>{{title}}<a class="right" href="javascript:void(0)" @click="goAbout">about &gt;&gt;</a></my-head>' +
              '<div id="index_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">index page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  data: function () {
    return {
      title: 'Index'
    }
  },
  onMessage: function (event) {
    if (event.message === 'modifyTitle' && event.origin === 'about') {
      this.title = 'Index Back'
    }
  },
  beforeEnter: function (cb) {
    console.log('Index - beforeEnter')
    var b = '22'
    cb(function () {
      console.log(b)
    })
  },
  afterEnter: function () {
    console.log('Index - afterEnter')
  },
  beforeLeave: function (cb) {
    setTimeout(function () {
      console.log('Index - beforeLeave')
      cb()
    })
  },
  afterLeave: function () {
    console.log('Index - afterLeave')
  },
  methods: {
    goAbout: function () {
      this.go('about?a=1&b=2&c=3', {
        x: 1,
        y: 2,
        z: 3
      })
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#index_wrapper')
  }
})

// 关于页
Vue.component('about', {
  template: '<div id="about">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="goIndex">&lt;&lt; index</a>' +
              'About<a class="right" href="javascript:void(0)" @click="goList">list &gt;&gt;</a></my-head>' +
              '<div id="about_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  beforeEnter: function (cb) {
    console.log('About - beforeEnter')
    console.log(this)
    cb(function () {
      console.log(this)
    })
  },
  afterEnter: function (params) {
    console.log(params)
  },
  methods: {
    goIndex: function () {
      this.postMessage('modifyTitle', 'index')
      this.postMessage('modifyTitle', 'list') // nothing will do
      this.go('index')
    },
    goList: function () {
      this.go('list')
    }
  },
  mounted: function () {
    console.log('About - mounted')
    this.jroll = new JRoll('#about_wrapper')
  }
})

// 列表页
Vue.component('list', {
  template: '<div id="list">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="goAbout">&lt;&lt; about</a>' +
              'List<a class="right" href="javascript:void(0)" @click="goFour">four &gt;&gt;</a></my-head>' +
              '<div id="list_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  methods: {
    goAbout: function () {
      this.go('about')
    },
    goFour: function () {
      this.go('four')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#list_wrapper')
  }
})

// 第四页
Vue.component('four', {
  template: '<div id="four">' +
              '<my-head><a class="left" href="javascript:void(0)" @click="goAbout">&lt;&lt; about</a>' +
              '<a style="margin-left:10px" class="left" href="javascript:void(0)" @click="goIndex">&lt;&lt; index</a>Four</my-head>' +
              '<div id="four_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">four page {{ i }}</p></div></div>' +
            '<div>',
  mixins: [mixin],
  methods: {
    goAbout: function () {
      this.go('about')
    },
    goIndex: function () {
      this.go('index')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#four_wrapper')
  }
})
