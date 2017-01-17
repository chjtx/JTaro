/* global JRoll */
import tpl from './7.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: {
    myHeader: header
  },
  mounted: function () {
    var jroll = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo7'
    })

    var imgs = this.$el.querySelectorAll('.scroller img')

    if (imgs) {
      // 图片加载完成后会改变scroller的高度，因此要refresh一下
      Array.prototype.forEach.call(imgs, function (i) {
        i.onload = function () {
          jroll.refresh()
        }
      })
    }
  }
}
