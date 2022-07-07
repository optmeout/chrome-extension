var currenturl;
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    var tab = tabs[0];
    currenturl = tab.url;
});

function getURL() {
  return currenturl;
}

var sites = JSON.parse(localStorage['sites']);

function getHostname(url,tld) {
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    if(tld){
      let hostnames = hostname.split('.');
      hostname = hostnames[hostnames.length-2] + '.' + hostnames[hostnames.length-1];
    }
    return hostname;
}
  
function getInfo(url){
	var hostname = getHostname(url, true);
	for(var i in sites){
    var site = sites[i];
    for(var d in site.domain){
      var domain = site.domain[d];
      if(domain.indexOf(hostname) != -1){
        let o = "";
        for (let x = 0; x < site.url.length; x++) {
          o += site.url[x] + "^";
        }
        return o.slice(0,-1);
      }
    }
	}
	return false;
}

window.onload = function(){
  document.getElementById("btn").onclick = function(){
    var check = getInfo(currenturl);
    if (check !== false) {
      document.querySelector("#domain").innerHTML = getHostname(currenturl, true);
      document.getElementById("urllabel").innerHTML = "Link(s) for optout:";
      var obj = getInfo(currenturl).split("^");
      for (let i = 0; i < obj.length; i++) {
        document.querySelector("#link" + i).innerHTML = obj[i];
        document.querySelector("#link" + i).href = obj[i];
      }
    } else {
      document.querySelector("#domain").innerHTML = "Optout link not found";
    }
  }
}