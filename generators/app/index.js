'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');



var UAPGenerator = module.exports = function UAPGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
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
  var _base = this.src._base;
  var _dest = this.src._destBase;

  this.directory('demo', 'demo');
  
  this.mkdir('doc');
  this.directory('src', 'src');
  this.mkdir('src/css');
  this.mkdir('src/js');
  this.mkdir('src/js/sys');
  this.mkdir('src/js/ext');
  this.mkdir('src/themes');
  this.mkdir('src/themes/themes1');
  this.mkdir('src/themes/themes1/css');
  this.mkdir('src/themes/themes1/images');
  this.mkdir('src/templates');
  this.mkdir('src/templates/sys');
  this.mkdir('src/templates/ext');
  this.mkdir('trd');
  this.mkdir('components');
  this.mkdir('components/comp1');
  this.mkdir('components/comp1/css');
  this.mkdir('components/comp1/js');
  this.mkdir('components/comp1/pages');
  this.directory('test', 'test');
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