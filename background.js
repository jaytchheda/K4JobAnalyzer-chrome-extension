chrome.runtime.onMessage.addListener(function(message, sender) {
	//console.log('caught in background ');
	chrome.browserAction.setIcon({path:"icon.png"}); 
    chrome.browserAction.setBadgeText({text: message});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == "complete") {
		chrome.tabs.executeScript(null, {file: "content-script.js"});
	}
});