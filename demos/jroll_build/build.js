var rollup = require('rollup')
var path = require('path')
var jtaroModule = require('rollup-plugin-jtaro-module')
var jtaroBundle = require('jtaro-bundle')

// 遍历demos/jroll_demo/pages里的js文件路径创建bundle.js
jtaroBundle.bundle({
  src: 'demos/jroll_demo/pages',
  dest: 'demos/jroll_demo/pages.js'
})

rollup.rollup({
  entry: path.resolve('demos/jroll_demo/pages.js'),
  plugins: [jtaroModule({ root: 'demos' })]
}).then(function (bundle) {
  bundle.write({
    format: 'iife',
    dest: path.resolve('demos/jroll_build/main.js')
  })
})
