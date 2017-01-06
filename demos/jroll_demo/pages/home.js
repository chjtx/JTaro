/* global JRoll */
import tpl from './home.html'

export default {
  template: tpl,
  methods: {
    goto: function (p) {
      this.go('pages/' + 1)
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#wrapper')
  }
}
