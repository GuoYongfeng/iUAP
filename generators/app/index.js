'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var UAPGenerator = module.exports = function UAPGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  // console.log(__dirname + '=========');
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, './templates/_package.json')));
};

util.inherits(UAPGenerator, yeoman.generators.Base);

UAPGenerator.prototype.askFor = function askFor() {
  var callBack = this.async();

  var prompts = [
    {
      type    : 'input',
      name    : 'name',
      message : 'Your project name?',
      default : this.appname
    },
    {
      type    : 'input',
      name    : 'author',
      message : 'Your name?',
      default : this.author
    },
    {
      type    : 'input',
      name    : 'description',
      message : 'How do you descripe this project?',
      default : 'A new project named ' + this.appname
    }
  ];

  this.prompt(prompts, function (props) {
    this.appname = props.name;    
    this.author = props.author;
    this.description = props.description
    callBack();
  }.bind(this));
};

UAPGenerator.prototype.app = function app() {

  this.directory('webapp', 'webapp');
  this.directory('test', 'test');
  this.directory('dist', 'dist');

  this.mkdir('webapp/css');
  this.mkdir('webapp/js');
  this.mkdir('webapp/js/sys');
  this.mkdir('webapp/js/ext');
  this.mkdir('webapp/themes');
  this.mkdir('webapp/themes/themes1');
  this.mkdir('webapp/themes/themes1/css');
  this.mkdir('webapp/themes/themes1/images');
  this.mkdir('webapp/templates');
  this.mkdir('webapp/templates/sys');
  this.mkdir('webapp/templates/ext');
  this.mkdir('webapp/trd');
  this.mkdir('webapp/components');
  this.mkdir('webapp/components/comp1');
  this.mkdir('webapp/components/comp1/css');
  this.mkdir('webapp/components/comp1/js');
  this.mkdir('webapp/components/comp1/pages');
  console.log('Directories initialization done!');
  
};

UAPGenerator.prototype.projectfiles = function projectfiles() {
  var context = { 
    name: this.appname,
    author: this.author,
    description: this.description
  };
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('README.md', 'README.md');
  this.template('_package.json', 'package.json', context);
};