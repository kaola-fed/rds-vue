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
        return './test'; // 返回字符串类型
    },
    resolveCommonReturn(res) {
        // 处理通用下拉接口返回，详细使用见KSSelectMixin
    },
    remoteSelectUrl() {
        return '/remote'; // 返回字符串类型
    },
    authUrl: '' // 系统级的获取权限接口，详细使用情况可参见KSAuthMixin文档
    transferAuthResult() {
        // 权限接口返回值处理函数，详细使用情况可参见KSAuthMixin文档
    }
})
```

### 注意事项
- rds-vue组件库中虽然依赖了element-ui，但是为避免打包后体积太大而采用的按需引用方式。因此和项目中引入element-ui不会冲突，版本相互独立，项目中如需使用，仍可正常引用element-ui。
- rds-vue组件库中已经引入了element-kaola,所以项目中无需重复引用。

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

### 本地开发组件库
本地开发组件库。

``` bash
npm i
# 本地开发命令
npm run serve
# 在src/components目录下根据组件用途分为基础组件和复杂组件，复杂组件主要供物料使用。开发完成需在对应目录index.ts中注册。
# 在__demo__文件夹可以写预览示例。

```

### 组件库打包及发布

``` bash
# 打包命令
npm run build
# 发布命令包含打包
npm run release
```

### 文档编写
[文档地址](http://seven-kl.netease.com/docs/27432/#/rdsComponent/course)

``` bash
npm i
# 本地开发
npm run docs:dev
# 在 docs目录下rds-components中可书写相关文档
```