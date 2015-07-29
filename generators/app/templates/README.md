# 17173前端开发模版 #

##简介
fedp的目的是快速构建前端开发项目所需的工具及基础配置，开发人员可以在一条命令生成基本项目框架后，在基础配置上，根据项目实际情况对配置进行调整，代替手动实现对开发代码的监控，jshint代码质量检查，js和css的压缩合并，单元测试，YUIDoc文档生成，coffeescript编译及代码发布等操作。

##前置条件
系统安装[nodejs](http://nodejs.org/)及Yeoman工作流套件（[Yo](http://yeoman.io/)，[Bower](http://bower.io/)和[Grunt](http://gruntjs.com/)）

##快速开始
准备好前置条件中的环境及依赖后就可以通过下面的命令安装我们的生成器：

`npm install -g generator-fedp`

安装完成后，可以切换到你的工作目录执行：

`yo fedp`

工具会初始化工作目录框架并自动下载开发所需的依赖包，一切准备就绪后执行`grunt`即可开始工作了。

当然，如果你想在开始工作之前修改和自定义自动化流程，可以在初始化的时候在命令后加`--skip-install`参数，修改完bower配置或Gruntfile后手动执行`bower install`和`npm install`，命令如下：

`yo fedp --skip-install`


## 文件结构说明 ##
前端开发项目文件初始化结构如下：

	+--demo
	|	+--img
	|	+--js
	|		+--lib
	|	+--index.html
	+--dist
	|	+--css
	|		+--lib
	|		+--style.css
	|		+--style.min.css
	|	+--js
	|		+--min
	|		+--main.js
	+--doc
	+--node_modules
	+--src
	|	+--css
	|		+--sass
	|		+--style.css
	|	+--js
	|		+--coffee
	|		+--main.js
	+--test
	+--.jshintrc
	+--bower.json
	+--.bowerrc
	+--Gruntfile.js
	+--pakage.json
	+--README.md

demo：效果预览目录；

demo/js/lib：bower开发包默认存放目录；

dist：静态资源发布版本目录；

dist/js/min：JS压缩未合并版本目录；

doc：YUIDoc文档存放目录；

node_modules：nodejs模块默认存放目录；

src：静态资源开发版本目录；

test：单元测试脚本存放目录；

.jshintrc：jshint默认配置文件，用于编辑器jshint配置，自动化的jshint代码审查配置在Gruntfile.js中配置；

bower.json：开发包管理配置文件；

.bowerrc：bower配置文件；

Gruntfile.js：grunt任务管理配置文件；

package.json：grunt项目配置文件；

README.md：说明文档；

##配置
###bower配置说明
fedp使用bower来管理第三方库，保存位置在demo/js/lib下，通过bower.json来管理第三方库的依赖及下载，默认情况下只有一个jquery库，初始化的时候可以跳过第三方库和node模块的安装，修改配置后手动运行bower和npm命令在处理这些模块。
###Grunt配置说明
如果你是刚接触Grunt的新手可以先学习一下[Grunt入门教程](http://gruntjs.com/getting-started)。

当前默认Grunt配置的实现如下：

* uglify：将src/js下的js文件压缩并存放到dist/js/min，这里单独存放每个js的压缩版本是考虑到有的项目多个页面调用不同的js是不需要合并的；开启ascii转码，移除不被执行到的代码；banner没有加感叹号是为了合并的时候重新生成单独的banner；
* concat：将dist/js/min下的js合并成一个js，以项目名和版本号命名；
* qunit：单元测试未实现具体逻辑，只写了最简单的一个样例，可以根据自己测试的代码进行编写；
* jshint：读取项目目录下.jshintrc配置规则对src目录下的js代码进行验证；该代码验证规则为17173规范中的配置；
* cssmin：将src/css下的样式合并压缩到dist/css下以项目名命名；
* copy：拷贝一份src/css下的未压缩样式到dist/css下；
* watch：监视coffeescript，js，css文件变化并执行相关的编译工作；
* coffee：将src/js/coffee下的coffeescript脚本编译为js文件存放在src/js下；
* clean：初始化项目的时候清理.gitignore和.npmignore垃圾文件；
* yuidoc：解析src/js下js代码生成代码文档，代码注释必须符合YUIDoc规范；