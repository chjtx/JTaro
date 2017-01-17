/* global JRoll */
import tpl from './5.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: {
    myHeader: header
  },
  mounted: function () {
    var pos
    var jroll1 = new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo5'
    })
    var jroll2 = new JRoll(this.$el.querySelector('.inner'))
    jroll2.on('scrollStart', function () {
      pos = this.y
    })
    jroll2.on('scroll', function (e) {
      if ((this.y - pos > 0 && pos === 0) || (this.y - pos < 0 && pos === this.maxScrollY)) {
        jroll2.call(jroll1, e)
      }
    })
  }
}
