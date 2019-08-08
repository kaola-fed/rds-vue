## rds-vue [文档](http://seven-kl.netease.com/docs/27432/#/rdsComponent/course)

### Install

``` bash
# 安装
npm i rds-vue -S

```

### Usage(全局)

``` javascript
import Vue from 'vue';
import rdsVue from 'rds-vue';
import 'rds-vue/dist/rdsvue.css';

// 初始化
rdsVue.install(Vue, {
    // 传入项目级配置
    selectUrl() {
        return './test'; // 通用下拉url配置函数，需返回字符串类型
    },
    resolveCommonReturn(res) {
        // 处理通用下拉接口的返回函数，更多使用可参见KSSelectMixin
    },
    remoteSelectUrl() {
        return '/remote'; // 远程搜索下拉组件的通用url配置函数，需返回字符串类型
    },
    authUrl: '', // 系统级的获取权限接口，更多使用可参见KSAuthMixin文档
    unauthorizedUrl: '', // 系统级的无权限页
    transferAuthResult() {
        // 权限接口返回值的处理函数，更多使用可参见KSAuthMixin文档
    }
})
```

### Usage(按需引用)

``` javascript
// mixins在页面级使用
import { listMixin as list } from 'rds-vue';

export default {
    //...
    mixins: [list],
    //...
}

```

### 注意事项
- rds-vue组件库中已经引入了element-kaola,所以项目中无需重复引用。

### 本地开发组件库
本地开发组件库。

``` bash
npm i
# 本地开发命令
npm run serve
# 在src/components目录下根据组件用途分为基础组件和复杂组件，复杂组件主要供物料使用。开发完成需在对应目录index.ts中注册。
# 在__demo__文件夹可以写预览示例。

```

### git commit msg 规范

``` bash
$ git commit -m 'feat: add feature'
```

- feat: 表示新增了一个功能
- fix: 表示修复了一个 bug
- docs: 表示只修改了文档
- style: 表示修改格式、书写错误、空格等不影响代码逻辑的操作
- refactor: 表示修改的代码不是新增功能也不是修改 bug，比如代码重构
- perf: 表示修改了提升性能的代码
- test: 表示修改了测试代码
- build: 表示修改了编译配置文件
- chore: 无 src 或 test 的操作
- revert: 回滚操作

### 可使用npm run cm 提交

``` bash
$ npm run cm
```

### 组件库打包及发布

``` bash
# 发布命令，运行后自动打包
npm publish
```

### 文档编写
[文档地址](http://seven-kl.netease.com/docs/27432/#/rdsComponent/course)

``` bash
npm i
# 本地开发
npm run docs:dev
# 在 docs目录下rds-components中可书写相关文档
```