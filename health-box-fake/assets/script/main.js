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
  const SECOND = 1000;
  //let [tth, dtv, dev] = _d.querySelectorAll('#timeIconBar h2, #todayValue, #edgeValue');
  let [tth, phtctn, dtv, dev] = _d.querySelectorAll('#timeIconBar h2, #photoContainer, #todayValue, #edgeValue');
  //let [dtv] = _d.querySelectorAll('#todayValue');

  //let [dev] = _d.querySelectorAll('#edgeValue');

  function timerShow(timeTitleH1, dTodayValue, dEdgeValue) {
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

  function photoFileShow(evt) {
    let [phc, ifc, pid, ifc1] = _d.querySelectorAll('#formContainer, #infoContainer, #photoId, #infoContainer1');

    pid.src = evt.target.result;
    ifc.style.display = '';
    ifc1.style.display = '';
    phc.style.display = 'none';

    _w.setInterval(timerShow, SECOND, tth, dtv, dev);
    _w.setInterval(borderShow, SECOND * 0.4, phtctn);
  }

  function filePreview(evt) {
    let fr, f0;
    if(evt && evt.target && evt.target.files && (f0 = evt.target.files[0])) {
      fr = new FileReader();
      fr.readAsDataURL(f0); //base64编码
      fr.addEventListener('load', photoFileShow);
    }
  }

  function initEventsBind() {
    let fm = _d.getElementById('loadPhoto');

    fm && fm.addEventListener && fm.addEventListener('change', filePreview);
  }

  function borderShow(photoCtn) {
    ('undefined' === typeof borderShow._counter_) && (borderShow._counter_ = 0);
    if(borderShow._counter_ % 2 === 0) {
      photoCtn.style.borderRadius = "38px";
    } else {
      photoCtn.style.borderRadius = "8px";
    }
    borderShow._counter_++;
  }

  initEventsBind();
  //_w.setInterval(timerShow, SECOND, tth, dtv, dev);
  //_w.setInterval(borderShow, SECOND * 0.6, phtctn);
})(window, document);