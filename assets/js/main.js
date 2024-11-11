'use strict';

requirejs.config({
  baseUrl: 'assets/js/lib',
  paths: {
      // the left side is the module ID,
      // the right side is the path to
      // the file, relative to baseUrl.
      // Also, the path should NOT include
      // the '.js' file extension.
      //jquery: 'jquery',
      //popperjs: 'lib/popper',
      consolePlus: 'console-plus.min',
      //bootstrap: 'lib/bootstrap', //只使用附加popper以后的bootstrap，在requirejs体系更方便
      bootstrapBundle: 'https://shawxu.net/js/lib/bootstrap/bootstrap.bundle.min'
  }
});

require([/*'jquery', */'bootstrapBundle', 'consolePlus'], function(/*$, */bts, cp){
  cp.inject();
  console.log('jq and bootstrap loaded!');
  //$('div.container p')[0].innerText = cp.get();
  document.querySelector("p#xx_main_content").textContent = cp.get();

  cp.report();
});