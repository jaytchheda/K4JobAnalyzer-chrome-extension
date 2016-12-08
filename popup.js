document.addEventListener('DOMContentLoaded', function() {
	
	var list = document.getElementById("list");
	
	chrome.storage.local.get('keywords', function (result) {
		console.log(result.keywords);
		var keywordsArray = result.keywords;
		for(var index in keywordsArray)
		{
			var entry = document.createElement('li');
			entry.appendChild(document.createTextNode(keywordsArray[index]));
			list.appendChild(entry);
		}	
	});
	
	var checkPageButton = document.getElementById('add');
	checkPageButton.addEventListener('click', function() {
		chrome.storage.local.get('keywords', function (result) {
			var text = document.getElementById("keyword").value;
			console.log(result);
			var keywordsArray = [];
			if(result.keywords)
				keywordsArray = result.keywords;
			var entry = document.createElement('li');
			entry.appendChild(document.createTextNode(text));
			list.appendChild(entry);
			keywordsArray.push(text);
			chrome.storage.local.set({keywords: keywordsArray}, function(){
				console.log('saved');
			});
		});
	
	}, false);
	
	var deleteAllButton = document.getElementById('deleteAll');
	deleteAllButton.addEventListener('click', function() {
		chrome.storage.local.clear(function() {
			var error = chrome.runtime.lastError;
			if (error) 
			{
				console.error(error);
			}
			else
			{
				while (list.firstChild) {
					list.removeChild(list.firstChild);
				}
			}
		});
	});
}, false);