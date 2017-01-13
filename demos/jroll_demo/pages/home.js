/* global JRoll */
import tpl from './home.html'

export default {
  template: tpl,
  methods: {
    goto: function (p) {
      this.go('pages/' + p)
    }
  },
  mounted: function () {
    this.jroll = new JRoll(this.$el)
  }
}
