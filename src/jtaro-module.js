/**
 * JTaro Module
 * 将含以下规则的import/export解释成ES5可执行代码
 * import
 * 1) import { a, b, c } from './util.js'
 * 2) import { abc as a } from './util.js'
 * 3) import { a } from './util.js'
 * 4) import './util.js'
 * 5) import * as a from './util.js'
 * export
 * 1) export var a = 'xxx'
 * 2) export { a, b, c }
 * 3) export function a () {}
 * 4) export default a
 * 5) export { abc as a }
 */
function parseImport (text) {
  var reg = /\bimport\s+.*(?=\n)/g
  console.log(reg.exec(text))
  return text
}

module.exports = function (file, name) {
  file = parseImport(file)
  file = file.replace(/\bexport\s+default\b/, 'window.JTaroModules[\'' + name + '\'] =')
  return file
}
