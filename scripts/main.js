document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('status').textContent = "Extension loaded";
    
    $('#switch-labelText').bootstrapSwitch();
    $('#switch-labelText').bootstrapSwitch("state", true);
    $('#switch-labelText').bootstrapSwitch("size", 'mini');
    $('#switch-labelText').bootstrapSwitch("onText", 'o');
    $('#switch-labelText').bootstrapSwitch("offText", 'x');

    var button = document.getElementById('download');
    var keys = [];
    //var callback_data ;
    var folder;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: null}, function(response) {
                var rdata = response.data;
                Object.keys(rdata).forEach(function(key) {
                        keys.push(key);
                });
                folder = tabs[0].url + "_";
                console.log(keys);
                //$('#switch-labelText').bootstrapSwitch("labelText", folder);
                $('#switch-labelText').bootstrapSwitch("labelText", keys[0]+"("+rdata[keys[0]].length+")");
                // for(var i in keys){
                //     var fragment = create('<input id='+keys[i]+'type="checkbox">');
                //     // var tmpl ='<input id="#{id}" type="checkbox">';
                //     // var vals = { id : keys[i]};
                //     // alert($.tmpl(tmpl, vals));
                //     document.getElementById('form').appendChild(fragment);
                // }
                //document.getElementById('switch-labelText').text = keys[0];
            });
    });
    //alert(keys);
    keys.push(".jpg");
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

    }
    button.addEventListener('click', function () {
        folder += new Date().toString();
        // $('#status').html('Clicked change links button');
        // var text = $('#linkstext').val();
        // if (!text) {
        //     $('#status').html('Invalid text provided');
        //     return;
        // }
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
        //         $('#status').html(response);
        //         //console.log('success');
        //     });
        // });
    });
});

