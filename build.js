const fs = require('fs')
const path = require('path')
const marked = require('marked')
const uglify = require('uglify-js')
const version = require('./package.json').version

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

function buildCode () {
  const copyright = `/*! JTaro.js v${version} ~ (c) 2016-2018 Author:BarZu Git:https://github.com/chjtx/JTaro */\n`

  let content = copyright + fs.readFileSync(path.resolve(__dirname, './src/jtaro.js')).toString()

  content = content.replace('{{version}}', version)

  // 保存开发版本
  fs.writeFileSync(path.resolve(__dirname, './dist/jtaro.js'), content)

  content = content.replace(/\/\/ \*\*JTaro Comment[^;]+;;/g, '')
  content = copyright + uglify.minify(content).code

  // 保存生产版本
  fs.writeFileSync(path.resolve(__dirname, './dist/jtaro.min.js'), content)
}

function buildWww () {
  const rd = fs.readFileSync('./README.md').toString()
  const tp = fs.readFileSync('./www/index-template.html').toString()
  const content = marked(rd)
    // 将[x]转为打勾的input
    .replace(/\[x]/g, '<input type="checkbox" checked disabled>')
    // 所有外链a标签加上_blank
    .replace(/<a\s+href="http/g, '<a target="_blank" href="http')

  fs.writeFileSync('./www/index.html', tp.replace('{{doc}}', content))
}

if (process.argv[2] === 'code') {
  buildCode()
} else if (process.argv[2] === 'www') {
  buildWww()
}

