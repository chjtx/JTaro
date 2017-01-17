var fs = require('fs')
var rollup = require('rollup')
var path = require('path')
var jtaroModule = require('rollup-plugin-jtaro-module')

// 遍历demos/jroll_demo/pages里的js文件路径创建bundle.js
var paths = fs.readdirSync(path.resolve('demos/jroll_demo/pages'))
var content = ''

paths.forEach((item, index) => {
  if (/\.js$/.test(item)) {
    content += 'import v' + index + ' from \'./pages/' + item + '\'\nVue.component(\'pages__' + item.replace('.js', '') + '\', v' + index + ')\n'
  }
})
fs.writeFileSync(path.resolve('demos/jroll_demo/bundle.js'), content)

rollup.rollup({
  entry: path.resolve('demos/jroll_demo/bundle.js'),
  plugins: [jtaroModule({ root: 'demos' })]
}).then(function (bundle) {
  bundle.write({
    format: 'iife',
    dest: path.resolve('demos/jroll_build/main.js')
  })
})
