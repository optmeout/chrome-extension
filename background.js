var sites = {};

function updateSites(){
	var req = new XMLHttpRequest();
	req.addEventListener("load", function(e){
		if(this.status == "200"){
			sites = JSON.parse(this.response);

			// Update our local cache.
			localStorage['sites'] = JSON.stringify(sites);
			localStorage['lastUpdated'] = (new Date() * 1);
		}
	}, false);
	req.open("GET", "https://raw.githubusercontent.com/optmeout/optmeout/main/data.json", true);
	req.send();
}

function runUpdater(){
  // Load the list of supported sites
  if(typeof localStorage['sites'] != 'undefined'){
    sites = JSON.parse(localStorage['sites']);

    // If we haven't updated in the last day.
    if(typeof localStorage['lastUpdated'] == "undefined" || localStorage['lastUpdated'] < new Date().setDate(new Date().getDate()-1)){
      updateSites();
    }
  }else{
    // Reload it via AJAX
    updateSites();
  }
}
runUpdater();