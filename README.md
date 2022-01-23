# vue3-webpack5-admin

## 准备

node版本`v10.x.x`

webpack5官方文档：https://webpack.docschina.org/

vue3官方文档： https://v3.cn.vuejs.org/


## 搭建


### 基础

mkdir vue3-webpack5-admin

cd vue3-webpack5-admin

npm init -y

npm install webpack webpack-cli -D
> 安装webpack5


npm i webpack-dev-server webpack-merge cross-env -D
> 热更新； 合并配置； cross-env: 设置环境变量



npm i html-webpack-plugin -D,  新建index.html
> 生成html入口



### babel

npm i babel-loader @babel/core @babel/preset-env -D
> babel 配置

npm i @babel/plugin-transform-runtime @babel/proposal-class-properties @babel/proposal-object-rest-spread -D

npm i @babel/runtime-corejs3 -D

新建 .babelrc 文件




### loader

npm install style-loader css-loader less less-loader sass-loader node-sass -D 
> 安装loader: 解析 css, less, sass/scss

npm i url-loader file-loader svg-sprite-loader -D
> loader: 图片，视频，svg 等静态资源

npm i sass-resources-loader -D 
> 全局注册less/sass全局变量

https://github.com/shakacode/sass-resources-loader







### plugins

npm install mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin -D
> 压缩 css 文件, 压缩 js 文件

npm i clean-webpack-plugin  -D
> 打包前先清除以前的打包文件


npm i friendly-errors-webpack-plugin webpackbar webpack-dashboard webpack-bundle-analyzer -D
> 优化类插件




### 集成 typescript 环境

https://v3.cn.vuejs.org/guide/typescript-support.html

npm install typescript ts-loader -D

npm i @babel/preset-typescript -D
> .babelrc 中引入

tsc -init
> 生成 tsconfig.json 文件
- https://www.tslang.cn/docs/handbook/compiler-options.html

新建 shims-vue.d.ts 文件
> 识别 .vue 文件


npm i @types/node @types/webpack-env -D
> tsconfig.json 中添加配置


### 集成 vue3

npm i vue@next -S 

npm i vue-loader@next @vue/compiler-sfc -D
> @vue/compiler-sfc 是替换 vue2 中的 vue-template-compile

vue-style-loader

npm i vue-router@4 vuex@next -S
> vuex, vue-router



### 安装 element-plus

npm i @element-plus/icons element-plus -S

plugins/element-plus.js中全局引入


### svg-icon全局配置
> svg-sprite-loader



### tsx支持


### mock

npm i mockjs -D


### 其他配置

npm i axios js-cookie nprogress -S
> 接口，进度条...

npm i path -S
> 路径







## 代码规范

### eslint 规范

npm i eslint -D

新建 .eslintrc.js, .eslintignore 文件

npm i eslint-webpack-plugin -D
> eslint-loader 已经被官方放弃了 

参考：https://webpack.docschina.org/plugins/eslint-webpack-plugin/




可以配置一个独立的 .eslintrc.* 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

[eslint的配置](http://eslint.cn/docs/user-guide/configuring)

[eslint的rules配置](http://eslint.cn/docs/rules/)



#### parser 解析器
> ESLint 默认使用[Espree](https://github.com/eslint/espree)作为其解析器，你可以在配置文件中指定一个不同的解析器:

- Babel-ESLint - 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
- @typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。






#### vscode中配置


``` json
// vscode/setting.json

{
    "eslint.autoFixOnSave": true, // 保存代码的时候自动格式化
}
```


- `.editorconfig`
> 因为并不是所有的人都使用VS code，所以为了在同样的项目下保持一致，比如tab的宽度或者行尾要不要有分号，我们可以使用.editorconfig来统一这些配置。


虽然vscode插件也可以单独配置格式，但是如果项目中有.eslintrc.js文件，那么eslint插件会优先执行.eslintrc.js文件的配置。



- **兼容ts**

npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue  -D
> 支持 ts 和 vue  

npm i @vue/eslint-config-typescript -D


- **Prettier规范**
> [Prettier](https://prettier.io/) 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格。


npm i @vue/eslint-config-prettier eslint-plugin-prettier prettier -D

- `eslint-plugin-prettier`: 将 Prettier 的规则设置到 ESLint 的规则中；
- `eslint-config-prettier`: 关闭 ESLint 中与 Prettier 中会发生冲突的规则。
> 通过使用eslint-config-prettier配置，能够关闭一些不必要的或者是与prettier冲突的lint选项。这样我们就不会看到一些error同时出现两次。使用的时候需要确保，这个配置在extends的最后一项。

新建 .prettierrc 文件
> prettier.config.js or .prettierrc.js


``` js
// prettier.config.js

module.exports = {
  "printWidth": 80, //一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, //一个tab代表几个空格数，默认为80
  "useTabs": false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "singleQuote": false, //字符串是否使用单引号，默认为false，使用双引号
  "semi": true, //行位是否使用分号，默认为true
  "trailingComma": "none", //是否使用尾逗号，有三个可选值"< none | es5 | all>"
  "bracketSpacing": true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  "parser": "vue" //代码的解析引擎，默认为babylon，与babel相同。
}

```

.eslintrc.js 中添加配置













## 其他

- 新建 .gitignore 文件


## 其他插件

- purgecss-webpack-plugin 清除无用css
- image-webpack-loader 图片压缩
- node-notifier 脚本弹窗提示插件











## 报错


1. `TS2695: Left side of comma operator is unused and has no side effects.`
> ts-loader 配置中 transpileOnly 改为 true



2. `'main.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.`
> tsconfig.json 中 isolatedModules 设为 false



3. `ERROR in Must use import to load ES Module: /Users/admin/my-code/self/byme/vue3-study/vue3-webpack5-admin/node_modules/@eslint/eslintrc/universal.js`
> eslint-webpack-plugin 插件的配置问题


4. `eslint-loader`报错
> eslint 降至 `5.16.0`, eslint-loader 降至 `2.1.2`



5. `ESLint: Cannot find module 'eslint/use-at-your-own-risk'. Please see the 'ESLint' output channel for details.`



## 问题记录




