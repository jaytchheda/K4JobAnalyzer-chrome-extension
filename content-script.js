console.log('caught');
var elements = document.getElementsByTagName('*');
var count = 0
var keywordsArray;
chrome.storage.local.get('keywords', function (result) {
	keywordsArray = result.keywords;
	//console.log(result);
	/*	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		for (var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];

			if (node.nodeType === 3) {
				
				var text = node.nodeValue;
				for(var index in keywordsArray)
				{
					var keyword = keywordsArray[index];
					if(text && text.match(new RegExp(keyword, "i")))
						count++;
				}
			}
		}
	}*/

	var text = document.body.innerHTML;
	for(var index in keywordsArray)
	{
		var keyword = keywordsArray[index];
		if(text)
		{
			
			var res = text.match(new RegExp(escapeRegExp(keyword), "i"));
			console.log(escapeRegExp(keyword));
			if(res)
				count += res.length;
		}
	}

	console.log(count+" found");

	chrome.runtime.sendMessage(count.toString());
});

	
function escapeRegExp(str) {
	str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  return str.replace(/\s+/g, "\\s+");
}
	
	

