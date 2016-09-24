chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    
	var extensions = [".aiff",".aif",".au",".avi",".bat",".bmp",".java",".class",".csv",".cvs",".dbf",".dif",".doc",".docx",".eps",".exe",".fm3",".gif",".hqx",".htm",".html",".jpg",".jpeg",".mac",".map",".mdb",".mid",".midi",".mov",".qt",".mtb",".mtw",".pdf",".png",".ppt",".psd",".pptx",".psp",".qxd",".ra",".rtf",".sit",".tar",".tif",".txt",".wav",".wk3",".wks",".wpd",".wp5",".xls",".xlsx",".zip"];
	var dict = new Object();
	var linksList = document.querySelectorAll('a');
	[].forEach.call(linksList, function(anchors) {


        var url = anchors.href;

        for(var ptr in extensions){
        	if(url.includes(extensions[ptr])){
        	       
                //collect key words to corresponding set. Append url to a new list if url doesn't exsit in dict.
        		if(dict[extensions[ptr]] != null){ 
        			dict[extensions[ptr]].push(url);
        		}else{
        		 	dict[extensions[ptr]]=[url];
        		} 
        		
    		}
    	
        }

	});
	
    console.log(dict);
 
    sendResponse({data:dict, success: true});
});

