/* global JRoll */
import tpl from './4.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo4',
      zoom: true,
      scrollFree: true
    })

    var img = this.$el.querySelector('.scroller img')

    if (img) {
      // 图片加载完成后会改变scroller的高度，因此要refresh一下
      img.onload = function () {
        jroll.refresh()
      }
    }
  }
}
