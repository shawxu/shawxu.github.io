'use strict';

/*
requirejs.config({
  baseUrl: "assets/script",
  paths: {
    domReady: "https://s3.shawxu.net/js/lib/requirejs/plugins/domReady.2.0.1"
  }
});

require(['domReady'], (domReady) => {
  domReady(() => {
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
    console.log('OK');

  });
}); */

((_w, _d) => {
  let tm = new Date();
  let yr = tm.getFullYear();

  let mh = tm.getMonth() + 1;
  (mh < 10) && (mh = '0' + mh);

  let dt = tm.getDate();
  (dt < 10) && (dt = '0' + dt);

  let hr = tm.getHours();
  (hr < 10) && (hr = '0' + hr);

  let mn = tm.getMinutes();
  (mn < 10) && (mn = '0' + mn);

  let sc = tm.getSeconds();
  (sc < 10) && (sc = '0' + sc);

  let [timeTitleH1] = _d.querySelectorAll('#timeIconBar h2');
  if(timeTitleH1 && timeTitleH1.innerHTML) {
    timeTitleH1.innerHTML = `${yr}年${mh}月${dt}日<br>${hr}:${mn}:${sc}`;
  }

  let [dTodayValue] = _d.querySelectorAll('#todayValue');
  if(dTodayValue && dTodayValue.innerHTML) {
    dTodayValue.textContent = `${mh}-${dt} ${hr}:${mn}`;
  }

  let [dEdgeValue] = _d.querySelectorAll('#edgeValue');
  if(dEdgeValue && dEdgeValue.innerHTML) {
    dEdgeValue.textContent = `${mh}-${dt} 24:00`;
  }
})(window, document);