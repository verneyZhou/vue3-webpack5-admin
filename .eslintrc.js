module.exports = {
    root: true, // 当前目录即为根目录，eslint规则被应用到该目录下
    env: { // 要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true
      // node: true, // 会添加所有的全局变量比如global
      browser: true, // 会添加所有的浏览器变量比如Windows
      es6: true, //  启用除了 modules 以外的所有 ECMAScript 6 特性（这个功能在设置ecmaVersion版本为6的时候自动设置）。
      commonjs: true, // CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
    },
    parserOptions: { // 解析
      parser: '@typescript-eslint/parser', // 解析器, ESLint 默认使用 Espree 进行语法解析
      // parser: 'babel-eslint',
      ecmaVersion: 2018, //  默认值是5，可以设置为3、5、6、7、8、9、10，用来指定使用哪一个ECMAScript版本的语法。也可以设置基于年份的JS标准，比如2015(ECMA 6)
      sourceType: 'module', // 如果你的代码是ECMAScript 模块写的，该字段配置为module，否则为script(默认值)
      ecmaFeatures: { // 想使用的额外的语言特性
        jsx: true, // 启用 JSX
      }
    },
    // plugin:prettier/recommended：使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
    extends: [ // 需要继承的配置: 指定eslint规范
        'plugin:vue/base',
        "plugin:@typescript-eslint/recommended"
        // 'airbnb-base',
        // 'plugin:prettier/recommended'
    ],
    plugins: [ // 插件,插件名称可以省略 eslint-plugin- 前缀
      'vue', 
      '@typescript-eslint',
      // 'prettier'
    ],
    globals: { // 要在配置文件中配置全局变量，请将 globals 配置属性设置为一个对象，该对象包含以你希望使用的每个全局变量
      // Atomics: 'readonly', // 只被读取, 不允许重写变量
      // SharedArrayBuffer: 'readonly',
    },
  
    rules: { //  自定义规则，可以覆盖掉extends的配置

      "indent": ["warn", 4, { "SwitchCase": 1 }], // 强制使用一致的缩进:warn警告； 4个空格缩进；强制 switch 语句中的 case 子句1个缩进
      "quotes": ["error", "single", { "allowTemplateLiterals": true }], // js都用单引号，template里面的html用双引号
      "semi": ["warn", "always"], // 代码段后面都加上分号
      "comma-dangle": ["warn", "never"], //对象里的最后属性不加逗号
      "no-undef": 0, // 0是忽略，1是警告，2是报错, 默认是 1
      "vue/html-self-closing": ["warn", { // vue中自闭合标签：warn警告
          "html": {
              "void": "any",
              "normal": "any",
              "component": "any"
          }
      }],
      "vue/script-indent": ["error", 4, { "baseIndent": 0, "switchCase": 1}], //  vue中script缩进：error警告；4个空格缩进；强制 switch 语句中的 case 子句1个缩进

      ///// prettier
      // "prettier/prettier": "error" // 表示被prettier标记的地方抛出错误信息。
    },

    // 该字段定义的数据可以在所有的插件中共享。这样每条规则执行的时候都可以访问这里面定义的数据
    settings: {}
  }
  