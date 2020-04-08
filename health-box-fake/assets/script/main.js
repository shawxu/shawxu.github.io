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

  let [tth] = _d.querySelectorAll('#timeIconBar h2');

  let [dtv] = _d.querySelectorAll('#todayValue');

  let [dev] = _d.querySelectorAll('#edgeValue');

  function timerShow(timeTitleH1, dTodayValue, dEdgeValue){
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
  
    if(timeTitleH1 && timeTitleH1.innerHTML) {
      timeTitleH1.innerHTML = `${yr}年${mh}月${dt}日<br>${hr}:${mn}:${sc}`;
    }
  
    ('undefined' === typeof timerShow._counter_) && (timerShow._counter_ = 0);

    if(timerShow._counter_ < 1) {
      if(dTodayValue && dTodayValue.innerHTML) {
        dTodayValue.textContent = `${mh}-${dt} ${hr}:${mn}`;
      }
    
      if(dEdgeValue && dEdgeValue.innerHTML) {
        dEdgeValue.textContent = `${mh}-${dt} 24:00`;
      }
    }

    timerShow._counter_++;
  }

  _w.setInterval(timerShow, 1000, tth, dtv, dev);
})(window, document);