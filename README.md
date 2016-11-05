# JTaro 醉芋头

> An H5 SPA framework for Vue.js 2.0

## 演示

```bash
git clone https://github.com/chjtx/JTaro.git

cd JTaro

npm install

npm run dev
```

## 依赖

- Vue 2.0 [Vue 2.0 中文教程](https://www.vuefe.cn/)
- JRoll 2.x [JRoll 2.x 官网](http://www.chjtx.com/JRoll/)

## 说明

- JTaro是一款基于Vue2.0开发的轻量级SPA框架
- JTaro没有使用vue-router，自身提供简单路由功能和页面切换动画
- 页面组件名称即为路由，省去手动配置的麻烦

## 简单使用

1. 引入Vue和JRoll
2. 引入JTaro
3. 编写Vue组件
4. 执行`JTaro.boot()`启动应用

## 配合vue-cli使用

敬请期待

## 方法

### 启动 boot

```
JTaro.boot()

// or
JTaro.boot('page')
```

boot允许传入一个字符串作为默认路由，参数为空时默认为`home`，因Vue不允许main作为组件名，所以取默认为home

### 跳转 go

```
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
- 参数二，键值对，该键值将保存在JTaro.params里，作为传递给下一页面使用
- 支持在url传参，使用`?a=1&b=2`形式，最终也是保存在JTaro.params里
- url传参优先级高于键值对传参

## 路由



