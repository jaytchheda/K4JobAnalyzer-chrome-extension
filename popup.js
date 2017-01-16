document.addEventListener('DOMContentLoaded', function() {
	
	var list = document.getElementById("list");
	
	
	chrome.storage.local.get('keywords', function (result) {
		console.log(result.keywords);
		var keywordsArray = result.keywords;
		for(var index in keywordsArray)
		{
			list.appendChild(getListItem(keywordsArray[index]));
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
			
			list.appendChild(getListItem(text));
			keywordsArray.push(text);
			chrome.storage.local.set({keywords: keywordsArray}, function(){
				console.log('saved');
			});
		});
	
	}, false);
	
	$("#list").on("click", "button.delete", function(){
		$(this).closest("li").remove();
	});

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
	
	function getListItem(textItem)
	{
		var entry = document.createElement('li');
		entry.className = "list-group-item";
		
		var entryDiv = document.createElement('div');
		entryDiv.className = 'row clearfix';
		
		var textDiv = document.createElement('div');
		textDiv.className = 'col-xs-9';
		textDiv.innerHTML = textItem;
		entryDiv.appendChild(textDiv);
		
		var deleteButtonDiv = document.createElement('div');
		deleteButtonDiv.className = 'btn-group pull-right col-xs-3';
		deleteButtonDiv.innerHTML = "<button class='delete btn btn-warning'><span class='glyphicon glyphicon-remove'></span></button>";
		entryDiv.appendChild(deleteButtonDiv);

		entry.appendChild(entryDiv);
		return entry;
	}
}, false);