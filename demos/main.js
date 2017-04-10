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
Vue.component('home', {
  template: '<div id="home">' +
              '<my-head>{{title}}<a class="right" href="javascript:void(0)" @click="goAbout">about &gt;&gt;</a></my-head>' +
              '<div id="home_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">home page {{ i }}</p></div></div>' +
            '</div>',
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
    if (event.message === 'alertMessage' && event.origin === 'about') {
      window.alert('I am going back!')
    }
  },
  beforeEnter: function (cb) {
    console.log('Home - beforeEnter')
    var b = '22'
    cb(function () {
      console.log(b)
    })
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
    goAbout: function () {
      this.go('about?a=1&b=2&z=z', {
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
              '<my-head><a class="left" href="javascript:void(0)" @click="goIndex">&lt;&lt; home</a>' +
              'About<a class="right" href="javascript:void(0)" @click="goList">list &gt;&gt;</a></my-head>' +
              '<div id="about_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">about page {{ i }}</p></div></div>' +
            '</div>',
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
      this.postMessage('modifyTitle', 'home')
      this.postMessage('alertMessage', 'home')
      this.postMessage('modifyTitle', 'list') // nothing will do
      this.go('home')
    },
    goList: function () {
      this.go('list', { a: 123 })
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
            '</div>',
  mixins: [mixin],
  methods: {
    goAbout: function () {
      this.go('about?io=90')
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
              '<a style="margin-left:10px" class="left" href="javascript:void(0)" @click="goIndex">&lt;&lt; home</a>Four</my-head>' +
              '<div id="four_wrapper"><div><p v-for="i in items" @click="deleteItem(i)">four page {{ i }}</p></div></div>' +
            '</div>',
  mixins: [mixin],
  methods: {
    goAbout: function () {
      this.go('about')
    },
    goIndex: function () {
      this.go('home')
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#four_wrapper')
  }
})

// 注册全局路由钩子
JTaro.beforeEnter.add('m1', function () {
  console.log('===============> global beforeEnter')
})
JTaro.afterEnter.add('m1', function () {
  console.log('===============> global afterEnter')
})
JTaro.beforeLeave.add('m1', function () {
  console.log('===============> global beforeLeave')
})
