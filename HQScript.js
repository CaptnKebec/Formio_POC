var _loaded = {};

function addScript(url) {
  if (!loaded[url]) {
    var s = document.createElement('script');
    s.src = url;
    document.head.appendChild(s);
    _loaded[url] = true;
  }
}

addScript('https://code.jquery.com/jquery-3.7.1.min.js');