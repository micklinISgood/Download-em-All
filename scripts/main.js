document.addEventListener('DOMContentLoaded', function() {


    var button = document.getElementById('download');
    button.disabled = true;
    var keys = [];
    var folder;
    var rdata ; 
    var selector = new Object(); 
    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data) {
            var json = data,
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
            a.href = data;
            var slashIndex = data.lastIndexOf('/'); 
            var ext = data.substring(slashIndex+1);
            var qIndex = ext.lastIndexOf('?'); 
            var fileName = ext.substring(0,qIndex);
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: null}, function(response) {
                rdata = response.data;
                Object.keys(rdata).forEach(function(key) {
                        selector[key] = true;
                        keys.push(key);
                });
                folder = tabs[0].url + "_";
                if(keys.length !=0){button.disabled = false;} 

                var tree = document.createDocumentFragment();
                for(var i in keys){
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.id = keys[i].substring(1);
                    tree.appendChild(checkbox);
                }
                document.getElementById('form').appendChild(tree);
                for(var i in keys){
                    var str = keys[i].substring(1);
                    $("#"+str).bootstrapSwitch();
                    $("#"+str).bootstrapSwitch("state", true);
                    $("#"+str).bootstrapSwitch("size", 'mini');
                    $("#"+str).bootstrapSwitch("onText", 'o');
                    $("#"+str).bootstrapSwitch("offText", 'x');
                    $("#"+str).bootstrapSwitch("labelText", str+"("+rdata[keys[i]].length+")");
                    $("#"+str).on('switchChange.bootstrapSwitch', function(event, state){
                        selector[keys[i]] = state;
                        //console.log(selector);
                    });

                }
                // chrome.fileSystem.getDisplayPath(Entry entry, function (displayPath) {
                //     console.log(displayPath);
                // });


                button.addEventListener('click', function () {
                    folder += new Date().toString();
                    for(var i in keys){
                        if(selector[keys[i]]){
                            for(var j in rdata[keys[i]]){

                                    saveData(rdata[keys[i]][j]);

                            }
                        }
                    }
       
                });

            
            });
    });

   
   
});

