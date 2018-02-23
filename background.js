chrome.alarms.create("refreshNow", {"periodInMinutes": 15.0});

chrome.alarms.onAlarm.addListener((alarm) => {
  if(alarm.name === "refreshNow" && navigator.onLine) {
      chrome.tabs.query({"url": "https://*.openu.ac.il/*"}, (tabs) => {
          let chosenTab = tabs.find((tab) => tab.url.indexOf('sheilta') > -1);

          if(chosenTab) {
              chrome.tabs.reload(chosenTab.id);
          }
      })
  }
})


