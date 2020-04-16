/**
 * @author  x521320930@gmail.com
 * @describe 编译 views 文件
 */


const path = require('path')
const glob = require('glob')
const fs = require('fs')



const PAGE_PATH = path.resolve(__dirname, '../../src/pages')

const PAGE_FILES = glob.sync(PAGE_PATH + '/*').map(n => n.substring(n.lastIndexOf('/') + 1))

const BUILD_PATH = path.resolve(__dirname, '../../build/multipage.js')

const js = `
/**
 * @author  x521320930@gmail.com
 * @describe 当前pages下文件名
 */

module.exports.multipage = ${JSON.stringify(PAGE_FILES)}

`


const data = fs.writeFileSync(BUILD_PATH, js)

console.log(data)