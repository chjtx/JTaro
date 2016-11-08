# JTaro 醉芋头

> An H5 SPA framework for Vue.js 2.0

## 依赖

- Vue 2.0 [Vue 2.0 中文教程](https://www.vuefe.cn/)
- JRoll 2.x [JRoll 2.x 官网](http://www.chjtx.com/JRoll/)

## 下载

### CDN

```html
<script src='https://unpkg.com/jtaro/src/jtaro.js'></script>
```

### NPM

```bash
npm install jtaro
```

## 说明

- JTaro是一款基于Vue2.0开发的轻量级SPA框架
- JTaro不需要vue-router，自身提供简单路由功能和页面切换动画
- 页面组件名称即为路由，省去手动配置的麻烦
- JTaro会自动创建一些css样式，将html、body的width、height设为100%，并overflow:hidden，超出内容需要使用JRoll进行滑动

## 快速上手

1、 创建index.html文件并在head里引入Vue、JRoll

```html
<script src='https://unpkg.com/vue/dist/vue.js'></script>
<script src='https://unpkg.com/jroll/src/jroll.js'></script>
```

2、 在body里创建id为`jtaro_app`的div，并在其后引入JTaro

```html
<div id="jtaro_app"></div>
<script src='https://unpkg.com/jtaro/src/jtaro.js'></script>
```

3、 在`div#jtaro_app`之后编写Vue组件，并执行`JTaro.boot()`启动应用

```html
<script>
Vue.component('home', {
  template: '<div id="home">Hello JTaro!</div>'
})

JTaro.boot()
</script>
```

4、 将index.html文件拖到浏览器访问

要了解更多请查看示例

## 运行示例

```bash
git clone https://github.com/chjtx/JTaro.git

cd JTaro

npm install

npm run dev
```

## 方法

### 启动 boot

```js
JTaro.boot()

// or
JTaro.boot('page')
```

boot允许传入一个字符串作为默认路由，参数为空时默认为`home`，因Vue不允许用main作为组件名，所以取home为默认值

### 跳转 go

```js
JTaro.go('page')

// or
JTaro.go(-1)

// or
JTaro.go('page?a=1&b=2')

// or
JTaro.go('page', {a: 1, b: 2})
```

- go可传入两个参数，第一个必须，第二个可选
- 参数一，字符串或数字，当为字符串时即渲染对应组件，为数字时调用原生history.go方法
- 参数二，键值对，该键值将保存在JTaro.params里，用作传递给下一页面使用
- 支持在url传参，使用`?a=1&b=2`形式，最终也是保存在JTaro.params里
- url传参优先级高于键值对传参

## 路由

- 只识别以`#!`分割的hash
- 每个hash路由都应有与之对应的Vue组件，如在浏览器访问index.html#!home，JTaro将自动查找以`home`命名的Vue组件并渲染到`div#jtaro_app`里
- 路由不可重复，如有A、B、C、D四个页面，按顺序访问A->B->C->D，在D页面返回到B，将剩下A->B两个页面
- 尽量使用`JTaro.go`进行页面跳转，避免直接操作hash破坏路由历史记录，而且`JTaro.go`在页面切换动画进行时不会触发，阻止频繁切换页面
- 尽量使用`JTaro.go(-1)`进行页面后退操作，可让历史记录保持在最简洁状态，若要连续返回上两个页面，则使用`JTaro.go(-2)`，如此类推

## 页面组件间通讯

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

### Q & A

*问：为什么不提供获取页面实例的方法？例如`getPageByName('home')`获取home页面，然后可以在其它页面操作home页面*

*答：为了方便维护，每处修改都有据可寻，因此建议每个页面组件只操作自身的数据，如果需要操作其它页面的数据，只需要向目标页面发送消息，让目标页面去处理。*


## 配合vue-cli使用

敬请期待...

## TODO

- [x] 页面组件与页面组件之间的通讯postMessage、onMessage，使用方式要比官方的$on和$emit更简单
- [ ] 保持最多不超过三个页面为display:block，其余为display:none，有效解决安卓机页面过多渲染慢的问题
- [ ] 实现beforeRouteEnter、afterRouteEnter和beforeRouteLeave、afterRouteLeave路由勾子

