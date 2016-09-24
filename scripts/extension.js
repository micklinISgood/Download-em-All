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
                var data = response.data;
                Object.keys(data).forEach(function(key) {
                        keys.push(key);
                });
                folder = tabs[0].url + "_";
                $('#switch-labelText').bootstrapSwitch("labelText", folder);
                //$('#switch-labelText').bootstrapSwitch("labelText", keys[0]+"("+data[keys[0]].length+")");
                //document.getElementById('switch-labelText').text = keys[0];
                //console.log('success');
            });
    });
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

