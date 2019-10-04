'use strict';

requirejs.config({
  //baseUrl: 'js/lib',
  paths: {
      // the left side is the module ID,
      // the right side is the path to
      // the file, relative to baseUrl.
      // Also, the path should NOT include
      // the '.js' file extension.
      jquery: 'lib/jquery',
      //popperjs: 'lib/popper', //不要了，bootstrap对这里的依赖太紧
      bootstrap: 'lib/bootstrap.bundle' //用包含popper.js的版本
  }
});

require(['jquery', 'bootstrap'], function($, pper, bts){
  console.log('jq loaded!');
});