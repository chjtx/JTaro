/* global JRoll */
import tpl from './2.html'
import header from '../common/header.js'

export default {
  template: tpl,
  components: { myHeader: header },
  mounted: function () {
    new JRoll(this.$el.querySelector('.wrapper'), {
      id: 'demo2',
      scrollBarY: 'custom',
      scrollBarFade: true
    })
  }
}
