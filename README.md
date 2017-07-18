
# 醉芋头 JTaro

> An H5 SPA framework for Vue.js 2.0

## 相关视频教程

JTaro Tutorial：[https://github.com/chjtx/JTaro-Tutorial](https://github.com/chjtx/JTaro-Tutorial)

## 依赖

- Vue 2.x [Vue 2.x 中文教程](http://cn.vuejs.org/v2/guide/)
- JRoll 2.x [JRoll 2.x 官网](http://www.chjtx.com/JRoll/)

## 下载 download

### 本地

> <a href="http://www.chjtx.com/JTaro/dist/jtaro.js" download>jtaro.0.5.1.js</a>

> <a href="http://www.chjtx.com/JTaro/dist/jtaro.min.js" download>jtaro.0.5.1.min.js</a>

### CDN

```html
<script src='https://unpkg.com/jtaro/dist/jtaro.js'></script>
<script src='https://unpkg.com/jtaro/dist/jtaro.min.js'></script>
```

### NPM

```bash
npm install jtaro
```

## 说明 brief 

- JTaro是一款基于Vue2.0开发的轻量级SPA（单页应用）框架
- JTaro不需要vue-router，自身提供简单路由功能和页面切换动画
- 页面组件名称即为路由，省去手动配置路由的麻烦
- JTaro会自动创建一些css样式，将html、body的width、height设为100%，并overflow:hidden，超出内容需要使用JRoll进行滑动

## 能解决什么问题

- 使用Vue2作为底层，省去直接操作dom的烦恼，带来组件复用的便利
- 提供页面切换动画，让H5应用看上去更像原生APP
- 自动路由管理，无需手动配置
- 在任何页面刷新，自动从第一页切回到当前页
- 页面缓存，从列表页到详细页，再回到列表页不刷新
- 基于页面开发，开发者只须关心各自的页面，更利于合作开发

## 快速上手 quick start

1、 创建index.html文件并在head里引入Vue、JRoll

```html
<!-- 国外网址，访问较慢，建议下载到本地 -->
<script src='https://unpkg.com/vue/dist/vue.js'></script>
<script src='https://unpkg.com/jroll/src/jroll.js'></script>
```

2、 在body里创建id为`jtaro_app`的div，并在其后引入JTaro

**<span style="color:red">注意：压缩版 jtaro.min.js 去除了所有开发相关代码，开发过程中请使用未经压缩的 jtaro.js</span>**

```html
<div id="jtaro_app"></div>
<script src='https://unpkg.com/jtaro/src/jtaro.js'></script>
```

3、 在`div#jtaro_app`之后编写Vue组件，并执行`Vue.use(JTaro)`启动应用

*注意：务必确保首页组件在Vue.use(JTaro)之前注册*

```html
<script>
Vue.component('home', {
  template: '<div id="home">Hello JTaro!</div>'
})

Vue.use(JTaro)
</script>
```

4、 将index.html文件拖到浏览器访问

要了解更多请查看示例

## 运行示例 run demo

```bash
git clone https://github.com/chjtx/JTaro.git

cd JTaro

npm install

npm run dev
```

> `npm install`下载太慢？那就直接`clone`之后将`index.html`拖到浏览器即可。不要用`cnpm`，会导致很多依赖缺失

## 基础用法 basic usage

### 启动 Vue.use(JTaro)

```js
Vue.use(JTaro)

// or 传入选项参数
Vue.use(JTaro, {
  el: '#jtaro_app',
  default: 'home',
  distance: 0.3,
  duration: 200,
  JRoll: window.JRoll
})
```

| 选项 | 默认值 | 说明 |
|:----:|:----:|:----|
| el | '#jtaro_app' | 给Vue挂载的元素 |
| default | 'home' | 默认首页 |
| distance | 0.1 | 页面折叠距离倍数，以屏幕宽度为1，取值范围为0 <= distance <= 1 |
| duration | 200 | 页面切换过渡时间 |
| JRoll | window.JRoll | 用于异步引入JRoll，不能确保JRoll和JTaro顺序时使用 |


### 跳转 this.go

```js
Vue.component('home', {
  methods: {
    goPage: function () {
      // 跳到page页
      this.go('page')

      // or 返回上一页
      this.go(-1)

      // or Url带参跳到page页
      this.go('page?a=1&b=2')

      // or 键值对带参跳到page页
      this.go('page', {a: 1, b: 2})
    }
  }
})

Vue.component('page', {
  afterEnter: function (params) {
    console.log(params)
  }
})
```

- this.go可传入两个参数，第一个必须，第二个可选
- 参数一，字符串或数字，当为字符串时即渲染对应组件，为数字时调用原生history.go方法
- 参数二，键值对，该键值将保存在JTaro.params里，并传递给下一页面的afterEnter钩子
- 支持在url传参，使用`?a=1&b=2`形式，最终也是保存在JTaro.params里
- url传参优先级高于键值对传参

## 路由 route

### 路由说明

- 只识别以`#`分割的hash，不支持`history.pushState`
- 每个hash路由都应有与之对应的Vue组件，如在浏览器访问`index.html#home`，JTaro将自动查找以`home`命名的Vue组件并渲染到`div#jtaro_app`里。访问`index.html#sub/abc`，将自动查找以`sub__abc`命名的Vue组件
- 路由不可重复，如有A、B、C、D四个页面，按顺序访问A->B->C->D，在D页面返回到B，将剩下A->B两个页面
- 使用`this.go`可带参数返回之前的页面，如果使用history.back或浏览器后退键，回退页的afterEnter接收到的参数为null
- 非首页刷新，自动加载历史页，即A->B，在B页面按F5刷新，会自动加载A->B，如果手动修改了url，可能会导致非预期效果，这时需要自行删除sessionStorage里的`JTaro.history`
- 请使用`this.go`进行页面跳转，其作用有：
  - 避免直接操作hash破坏路由历史记录
  - 在页面切换动画进行时不会触发hashChange，阻止频繁切换页面

### 路由钩子

- [beforeEnter](#beforeenter)
- [afterEnter](#afterenter)
- [beforeLeave](#beforeleave)

#### beforeEnter

进入该路由（页面滑入）之前执行

```js
Vue.component('home', {
  beforeEnter: function () {
    // 不！能！获取页面组件实例 `this`
    // 因为当钩子执行时，组件实例还没被创建
    return true
  }
})

// or
Vue.component('home', {
  beforeEnter: function (cb) {
    // 不！能！获取页面组件实例 `this`
    // 因为当钩子执行时，组件实例还没被创建
    setTimeout(function () {
      cb()
    }, 3000)
  }
})
```

`beforeEnter`会阻断路由，可执行同步或异步代码，因此需要`return true`或者执行回调`cb()`继续执行后面的代码，同步使用`return true`，异步或需要使用页面组件实例`this`时请用`cb()`

`beforeEnter`不能获取页面组件实例`this`，因为当勾子执行时，组件实例还没被创建，可将方法传进`cb()`，实例创建后会立即执行该方法

```js
Vue.component('home', {
  beforeEnter: function (cb) {
    console.log(this) // JTaro
    cb(function (vm) {
      console.log(this) // <home>组件实例`this`
      console.log(vm)   // <home>组件实例`this`
    })
  }
})
```

#### afterEnter

进入该路由（页面已滑入，不含动画过程）后执行

```js
Vue.component('home', {
  afterEnter: function (params) {
    // 这里获取上一个页面使用this.go携带的参数
    console.log(params)
  }
})
```

afterEnter 不会阻断路由执行

#### beforeLeave

离开该路由（页面滑出）之前执行

```js
Vue.component('home', {
  beforeLeave: function (cb) {
    setTimeout(function () {
      // ...
      cb()
    }, 1000)
  }
})
```

beforeLeave 和 beforeEnter 一样都会阻断路由执行，因此需要`return true`或者执行回调`cb()`来继续执行后面的代码。不同的是beforeLeave能够获取到this，因而在`cb()`里传入function是无效的。

四个钩子执行顺序 beforeEnter -> (mounted) -> afterEnter -> beforeLeave

**注意：**

1. mounted为Vue原有生命周期钩子，首次访问页面时会执行该钩子，此后JTaro将缓存该页面，不会再执行该钩子
2. beforeEnter、afterEnter、beforeLeave在每次路由变更都会执行

### 钩子使用技巧

- beforeEnter （JTaro扩展） 进入页面之前要先处理一些事情时使用该钩子
- mounted （Vue原有） 无论何时基本上不会发生变更的页面使用该钩子，例如列表页
- afterEnter （JTaro扩展） 页面加载后才开始加载数据，填充数据，并且每次进入该路由都有数据变更的情况使用该钩子，例如详情页
- beforeLeave （JTaro扩展） 页面离开前先需要执行一此操作，例如关闭弹窗、确认表单等情况可使用该钩子

### 全局路由钩子

#### 添加全局路由钩子 add

```js
JTaro.beforeEnter.add('hook', function () { ... })
JTaro.afterEnter.add('hook', function () { ... })
JTaro.beforeLeave.add('hook', function () { ... })
```

JTaro.[globalHook].add(name, method)

- [globalHook]表示beforeEnter、afterEnter或beforeLeave
- name 钩子名称，其值不能为`add`、`remove`或`run`等全局路由钩子的保留键
- method 是函数方法，可使用bind绑定作用域

#### 移除全局路由钩子 remove

```js
JTaro.beforeEnter.remove('hook')
JTaro.afterEnter.remove('hook')
JTaro.beforeLeave.remove('hook')
```

#### 手动执行全局路由钩子 run

```js
JTaro.beforeEnter.run()
JTaro.afterEnter.run()
JTaro.beforeLeave.run()
```

注意：`run`方法一般不需要我们手动调用，JTaro会在适当的时候自动调用

## 页面组件间通讯 communication

- 使用`this.postMessage(<msg>, <page>)`发送消息

```js
/* postMessage(<msg>, <name>)
 * @param msg 消息内容
 * @param name Vue组件名称
 */
Vue.component('about', {
  mounted: function () {
    //向home页面发送modifyTitle消息通知home页面修改标题
    this.postMessage('modifyTitle', 'home')
  }
})
```

- 使用`onMessage`选项接收消息

```js
Vue.component('home', {
  onMessage: function (event) {
    console.log(event) // {message: 'modifyTitle', origin: 'about'}
  }
})
```

> 注意：只有页面组件（与路由对应的组件）才可以使用postMessage和onMessage，

## Q & A

*问：为什么不提供获取页面实例的方法？例如`getPageByName('home')`获取home页面，然后可以在其它页面操作home页面，用`this.postMessage`有什么好处？*

*答：为了方便维护，每处修改都有据可寻，因此建议每个页面组件只操作自身的数据，如果需要操作其它页面的数据，只需要向目标页面发送消息，让目标页面去处理。这也是页面组件通讯的必要性*

## ~~优化~~ 该优化已转交 JTaro UI 库处理

~~JTaro嵌入了微型加速点击代码，效果类似于fastclick.js，用于解决IOS8以下苹果机和旧安卓系统的点击300ms延迟问题。~~

~~该优化只针对普通的div/span/a等非控件元素起作用，忽略AUDIO|BUTTON|VIDEO|SELECT|INPUT|TEXTAREA等多媒体或表单元素~~

## 配合 JTaro Module 使用


### 开发模式

[JTaro Module](https://github.com/chjtx/JTaro-Module) 是开发JTaro应用时用于管理模块的插件，上线时可删除

#### 【步骤一】安装使用

需要 nodejs 6 以上版本，若未安装，请访问[http://nodejs.cn/](http://nodejs.cn/)

创建一个空文件夹，然后在命令行里cd到该文件夹，初始化工程，然后安装JTaro、JTaro Module、JTaro Bundle

```bash
# 初始化
npm init

# 输入项目名称
name: (jtaro-demo) jtaro-demo

# 以下选项一路回车即可
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

# 输入yes结束
Is this ok? (yes) yes

# 安装JTaro
npm i -D jtaro jtaro-module jtaro-bundle
```

#### 【步骤二】创建index.html

index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Hello JTaro</title>
    <script src="./node_modules/jtaro-module/src/client.js"></script>
    <script src="./node_modules/jroll/src/jroll.js"></script>
    <script src="./node_modules/vue/dist/vue.js"></script>
</head>
<body>
    <div id="jtaro_app"></div>
    <script src="./node_modules/jtaro/dist/jtaro.js"></script>
    <script>
        Vue.use(JTaro, {
            default: 'pages/home'
        })
    </script>
</body>
</html>
```

#### 【步骤三】创建首页home

新建一个文件夹，名字随意，例如命名为`pages`，将来上线可将pages文件夹打包成一个pages.js文件

pages文件夹与index.html同级，在pages文件夹里新建home.js、home.html

home.js的内容就是一个Vue组件，JTaro以页面组件为单元进行开发

home.js

```js
import html from './home.html' //该路径是相对于home.js的，不能忽略./，否则在rollup.js打包时会出错

export default {
  template: html,
  data: function () {
    return {
      title: 'Hello JTaro'
    }
  }
}
```

home.html

```html
<style>
    this {
        padding-top: 50px;
        text-align: center;
        font-size: 42px;
    }
</style>
<div>
    {{title}}
</div>
```

#### 【步骤四】跑起node服务

在命令行运行

```
node ./node_modules/jtaro-module/src/server.js
```

在浏览器上运行`localhost:3000/`，能够看到`Hello JTaro`文字表示成功了

### 上线模式

[JTaro Bundle](https://github.com/chjtx/JTaro-Bundle) 是部署JTaro应用时用于将零散的开发代码合并压缩的插件

#### 【步骤一】创建www/index.html

在工程文件夹（即是与index.html同级）新建一个`www`文件夹，用于存放上线代码，在www文件夹下新建index.html

**<span style="color:red">注意：上线方可使用压缩版 jtaro.min.js</span>**

www/index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Hello JTaro</title>
    <script src="./node_modules/jroll/build/jroll.min.js"></script>
    <script src="./node_modules/vue/dist/vue.min.js"></script>
</head>
<body>
    <div id="jtaro_app"></div>
    <script src="./node_modules/jtaro/dist/jtaro.min.js"></script>
    <script src="./pages.js"></script>
    <script>
        Vue.use(JTaro, {
            default: 'pages/home'
        })
    </script>
</body>
</html>
```

这个要上线的index.html与开发的index.html区别在于

- 没有client.js，上线版本不需要node环境也可以运行
- 多了pages.js，打包时 JTaro Bundle 会将pages文件夹打包成pages.js
- jroll/vue/jtaro换成了带.min后缀的压缩版

#### 【步骤二】打包

在工程文件夹新建一个`build.js`

build.js

```js
var jtaroBundle = require('jtaro-bundle')

jtaroBundle.bundle({
  origin: 'index.html',
  target: 'www/index_template.html'
})
```

在命令行运行

```
node build.js
```

JTaro Bundle 会自动根据www/index_template.html里的内容去查找相对index.html的文件并拷贝，如果该文件不存在，则查找对应名称的文件夹，如果文件夹存在，即尝试将该文件夹里的文件打包成一个与文件夹同名的js文件

将会看到www文件夹下多了pages.js、index.html和node_modules/文件夹，然后将www/indwx.html拖到浏览器访问，能看到与开发环境一致的效果表明成功了

## JTaro完成了哪些功能？

- [x] 简单路由功能，根据组件名称动态创建页面
- [x] 页面切换动画
- [x] 页面组件与页面组件之间的通讯postMessage、onMessage
- [x] 保持最多不超过三个页面为display:block，其余为display:none，有效解决安卓机页面过多渲染慢的问题
- [x] 实现页面beforeEnter、afterEnter和beforeLeave路由钩子
- [x] JTaro.boot({...})选项配置
- [x] 实现全局路由钩子
- [x] ~~嵌入微型fastclick解决老机点击300ms延迟问题~~
- [x] 使用 JTaro Module 进行模块管理
- [x] 自动加载Vue页面组件
- [x] 在非首页刷新自动切换到当前页，解决单页应用每次刷新都回到首页的短板

