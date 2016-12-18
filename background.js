chrome.runtime.onMessage.addListener(function(message, sender) {
	//console.log('caught in background ');
	chrome.browserAction.setIcon({path:"icon.png"}); 
    chrome.browserAction.setBadgeText({text: message});
});

chrome.tabs.onHighlighted.addListener(function(){
	
	chrome.tabs.executeScript(null, {file: "content-script.js"});
	
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == "complete") {
		chrome.tabs.executeScript(null, {file: "content-script.js"});
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