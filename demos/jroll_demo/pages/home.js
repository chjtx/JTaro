/* global JRoll */

export default {
  methods: {
    goto: function (p) {
      this.go('pages/' + 1)
    }
  },
  mounted: function () {
    this.jroll = new JRoll('#wrapper')
  }
}
