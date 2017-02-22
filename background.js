chrome.runtime.onMessage.addListener(function(message, sender) {
	//console.log('caught in background ');
	chrome.browserAction.setIcon({path:"icon.png"}); 
	if(message === "0")
		chrome.browserAction.setBadgeBackgroundColor({color: "#888888"});
	else
		chrome.browserAction.setBadgeBackgroundColor({color: "#008800"});
    chrome.browserAction.setBadgeText({text: message});
	
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	
	if(changeInfo.status == "complete") {
		chrome.tabs.sendMessage(tabId, "run");
	}
});

addToStorage = function(word){
    var query = word.selectionText;
    chrome.storage.local.get('keywords', function (result) {
		
		var keywordsArray = [];
		if(result.keywords)
			keywordsArray = result.keywords;
		keywordsArray.push(query);
		chrome.storage.local.set({keywords: keywordsArray}, function(){
			console.log('saved');
		});
	});
 };

chrome.contextMenus.create({
 title: "Add to K4 Job Analyzer",
 contexts:["selection"],  // ContextType
 onclick: addToStorage // A callback function
});