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
		if(text)
		{
			
			var res = text.match(new RegExp(escapeRegExp(keyword), "i"));
			console.log(escapeRegExp(keyword));
			if(res)
			{
				var flag = false;
				
				var n1 = res[0].match(/\d+/);
				var n2 = keyword.match(/\d+/);
				console.log(n1+" "+n2);
				if( n1 > 0 && n2 > 0)
				{
					if(Number(n2[0]) <= Number(n1[0]))
						flag = true;
				}
				else
					flag = true;
				if(flag)
				{
					count += res.length;
					console.log(res[0]);
					var span = "<span style='background-color:#BB0000 !important'>"+res[0]+"</span>";
					text = text.replace(res[0], span);
					document.body.innerHTML = text;
				}	
			}	
		}
	}

	console.log(count+" found");

	chrome.runtime.sendMessage(count.toString());
});

	
function escapeRegExp(str) {
	str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	str = str.replace(/\d+/, "\\d+");
  return str.replace(/\s+/g, "\\s+");
}
	
	

