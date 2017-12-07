// Using alarms so an event will be fired and this won't be a persistent script
chrome.alarms.create("refreshNow", {"periodInMinutes": 15.0});

let lastAction = Date.now();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let url = changeInfo.url ? changeInfo.url : tab.url;

    if(url.indexOf("openu.ac.il") != -1) {
        lastAction = Date.now();
    }
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if(alarm.name === "refreshNow") {
      chrome.tabs.query({"url": "https://*.openu.ac.il/*"}, (tabs) => {
          let chosenTab;

          // Preventing refresh while watching videos
          for(let currTab of tabs) {
                if(currTab.url.indexOf('video') === -1) {
                    chosenTab = currTab;
                    break;
                }
          }
          
          // Refreshing only if the last interaction with openu website was
          // at least 10 minutes ago and there's a tab to refresh
          if(chosenTab && (lastAction + 600000) <= Date.now()) {
              chrome.tabs.reload(chosenTab.id);
          }
      })
  }
})


