chrome.runtime.onMessage.addListener(function(message, sender) {
	console.log('caught');

	var elements = document.getElementsByTagName('*');
	var count = 0
	var keywordsArray;
	chrome.storage.local.get('keywords', function (result) {
		keywordsArray = result.keywords;
		
		var text = document.body.innerHTML;
		for(var index in keywordsArray)
		{
			var keyword = keywordsArray[index];
			var matches = [];
			if(text)
			{
				var re = (new RegExp(escapeRegExp(keyword), "gi"));
				while ((match = re.exec(text)) != null) {
					matches.push(match);
				}

				count += matches.length;
				
				for(var i = matches.length-1; i > 0; i--)
				{
					var span = "<span style='background-color:#008800 !important'>"+matches[i][0]+"</span>";
					text = text.replaceAt(matches[i].index, matches[i][0], span);								
				}	
				document.body.innerHTML = text;
			}
		}

		console.log(count+" found");

		chrome.runtime.sendMessage(count.toString());
	});
});

function escapeRegExp(str) {
	str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	str = str.replace(/\d+/, "\\d+");
  return str.replace(/\s+/g, "\\s+");
}
	
String.prototype.replaceAt=function(index, source, destination) {
    return this.substr(0, index) + destination + this.substr(index+source.length);
}
	

