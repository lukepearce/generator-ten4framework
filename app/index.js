'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Ten4 Framework') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    },
    {
      name: 'name',
      message: 'Whats the name of this project?',
      default: this.appname
    },
      name: 'platform',
      message: 'Are we using Craft or Slim?',
      type: 
      default: 'craft'
    },
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  craft: function() {
    this.mkdir('public');
    this.mkdir('public/assets');
    this.write('public/assets/.gitkeep', '');

    this.copy('index.php', 'public/index.php')
    this.copy('htaccess', 'public/.htaccess');

    this.mkdir('craft');
    this.directory('craft', 'craft');
  },

  install: function () {
    this.installDependencies();
  }
});
