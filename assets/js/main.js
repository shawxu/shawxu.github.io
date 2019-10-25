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
      popperjs: 'lib/popper',
      consolePlus: 'lib/console-plus',
      //bootstrap: 'lib/bootstrap', //只使用附加popper以后的bootstrap，在requirejs体系更方便
      bootstrapBundle: 'lib/bootstrap.bundle'
  }
});

require(['jquery', 'bootstrapBundle', 'consolePlus'], function($, bts, cp){
  cp.inject();
  console.log('jq and bootstrap loaded!');
  $('div.container p')[0].innerText = cp.get();
});