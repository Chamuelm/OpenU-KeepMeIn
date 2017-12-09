// Using alarms so an event will be fired and this won't be a persistent script
chrome.alarms.create("refreshNow", {"periodInMinutes": 15.0});

let lastAction = -1;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let url = changeInfo.url ? changeInfo.url : tab.url;

    // Capturing login/last interaction with sheilta
    if(url.indexOf("sheilta") !== -1) {
        lastAction = Date.now();
    }
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if(alarm.name === "refreshNow" && navigator.onLine && lastAction !== -1) {
      chrome.tabs.query({"url": "https://*.openu.ac.il/*"}, (tabs) => {
          let chosenTab;

          // Searching for a sheilta page
          for(let currTab of tabs) {
                if(currTab.url.indexOf('sheilta') !== -1) {
                    chosenTab = currTab;
                    break;
                }
          }

          // Refreshing only if the last interaction with openu website was
          // at least 10 minutes ago and there's a tab to refresh
          if(chosenTab && (lastAction + 600000) <= Date.now()) {
              chrome.tabs.reload(chosenTab.id);
          } else if(tabs && tabs.length > 0 && (lastAction + 600000) <= Date.now()) {
              // If there isn't a sheilta tab active but there's an openu one
              document.getElementById('refresh').src = "https://sheilta.apps.openu.ac.il/pls/dmyopt2/KOLHAODAOT.showhod";
          }
      })
  }
})


