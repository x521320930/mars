
# source-map: 
* 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

*  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  source-map：外部
    错误代码准确信息 和 源代码的错误位置
  inline-source-map：内联
    只生成一个内联source-map
    错误代码准确信息 和 源代码的错误位置
  hidden-source-map：外部
    错误代码错误原因，但是没有错误位置
    不能追踪源代码错误，只能提示到构建后代码的错误位置
  eval-source-map：内联
    每一个文件都生成对应的source-map，都在eval
    错误代码准确信息 和 源代码的错误位置
  nosources-source-map：外部
    错误代码准确信息, 但是没有任何源代码信息
  cheap-source-map：外部
    错误代码准确信息 和 源代码的错误位置 
    只能精确的行
  cheap-module-source-map：外部
    错误代码准确信息 和 源代码的错误位置 
    module会将loader的source map加入

  内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

  开发环境：速度快，调试更友好
    速度快(eval>inline>cheap>...)
      eval-cheap-souce-map
      eval-source-map
    调试更友好  
      souce-map
      cheap-module-souce-map
      cheap-souce-map

    --> eval-source-map  / eval-cheap-module-souce-map

  生产环境：源代码要不要隐藏? 调试要不要更友好
    内联会让代码体积变大，所以在生产环境不用内联
    nosources-source-map 全部隐藏
    hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

    --> source-map / cheap-module-souce-map
    
# 文件资源缓存 
  * 文件资源缓存
    hash: 每次wepack构建时会生成一个唯一的hash值。
      问题: 因为js和css同时使用一个hash值。
        如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
    chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
      问题: js和css的hash值还是一样的
        因为css是在js中被引入的，所以同属于一个chunk
    contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
    --> 让代码上线运行缓存更好使用文件缓存



# postcss-pxtorem
1. `rootValue` （Number）根元素字体大小。
2. `unitPrecision` （Number）允许REM单位增长的十进制数。
3. `propList` （Array）可以从px更改为rem的属性。
   - 值必须完全匹配。
   - 使用通配符`*`匹配所有属性。例：`['*']`
   - `*`在单词的开头或结尾使用。（ `['*position*']` 会匹配background-position-y）
   - `!`用于不匹配这个属性。例：`['*', '!letter-spacing']`，除了不会转换`letter-spacing`的px为rem，其他的都会转换。
   - 将`！`前缀与其他前缀组合在一起。例：`['*', '!font*']`
4. `selectorBlackList` （Array）要忽略的选择器并保留为px。
   - 如果value是string，则检查selector是否包含字符串。
   - `['body'] `会匹配 `.body-class`
   - 如果value是regexp，它会检查选择器是否与正则表达式匹配。
   - `[/^body$/]`会匹配`body`但不会`.body`。
5. `replace` （Booleam）替换包含rems的规则，而不是添加回退。
6. `mediaQuery` （Booleam）允许在媒体查询中转换px。
7. `minPixelValue` （Number）设置要替换的最小像素值。




# multipage 脚本
 > - 当多页很多的情况，每次构建会比较耗时。为了解决开发时，没有必要构建其他页面 特此增加的脚本
 > - npm run page 会在 build 下生成一个 multipage.js 文件
 > - 可以在 multipage.js 删除掉，不进行开发的文件名