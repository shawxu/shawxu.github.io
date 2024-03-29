define((require) => {
  if ("undefined" == typeof console) {
    throw new Error("No console object.");
  }

  const LOG_MAP = {
      "debug": 1
      , "error": 1
      , "info": 1
      , "log": 1
      , "warn": 1
    };

  let proto = {}
    , logEntries = []
    , logEntry = [
        "console-plus" //default product name
        , "" //log level
        , "" //performance now time
        , "" //log message
      ]
    , logStorage = {
        "debug":    []
        , "error":  []
        , "info":   []
        , "log":    []
        , "warn":   []
      }
    , clearTimes = 0
    , reportUrlCfg = "https://shawxu.cn/log/" //上报结果的接口URL，可配置
    , injected = false
    , silent = false;
  
  for (let k in console) {
    if (LOG_MAP[k] && "function" == typeof console[k]) {
      let prxy = new Proxy(console[k], {
        apply (tgt, thisArg, argArr) {
          let t;
          logEntry[1] = k;
          logEntry[2] = performance.now().toFixed(3); //小数点后3位够了
          logEntry[3] = argArr.join(" ");
          logEntries.push(t = logEntry.join("\t"));
          logStorage[k].push(t);
          if(!silent){
            if(!injected){
              tgt(...argArr);
            } else {
              ("function" == typeof LOG_MAP[k]) && LOG_MAP[k](...argArr);
            }
          }
  
        }
      });

      proto[k] = prxy;
    }
  }

  proto.config = ({ productName = logEntry[0], reportUrl = reportUrlCfg, silentMode = false } = {}) => {
    if (productName && "string" == typeof productName) logEntry[0] = productName;
    if (reportUrl && "string" == typeof reportUrl) reportUrlCfg = reportUrl;
    silent = !!silentMode;
    //TODO
  };

  proto.get = filter => {
    let r = logStorage[filter] || logEntries;
    return r.join("\r\n");
  };

  proto.clear = clearConsole => {
    logEntries = [];
    for (let k in logStorage) {
      logStorage[k] = [];
    }

    clearConsole && console.clear && console.clear();

    proto.info("console-plus cleared, ", ++clearTimes, "times");
  };

  proto.report = ({
    componentUrl = "./components/reportr",
    reportUrl = reportUrlCfg,
    filter,
    params,
    clear = true
  } = {}) => {
    require([componentUrl], rpt => {
      rpt.send(reportUrl, {
        //"reportUrl":    reportUrl
        "filter":       filter
        , "extParams":  params
        , "clear":      clear
        , "logStorage": logStorage
        , "logEntries": logEntries
        , "cpRefer":    proto
      });
    });
  };

  proto.inject = () => {
    if(!injected){
      for (let k in LOG_MAP) {
        if ("function" == typeof console[k]) {
          LOG_MAP[k] = console[k]; //把老的引用存起来
          console[k] = proto[k]; //inject掉
        }
      }
      injected = true;
    }
  };

  proto.info(logEntry[0], "loaded, hello world!");

  return proto; //export consolePlus
});

