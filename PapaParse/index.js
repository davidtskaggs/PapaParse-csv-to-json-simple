document.getElementById('txtFileUpload').addEventListener('change', upload, false);
var parsedData
function upload(evt) {

  var data = null;
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event) {
    var csvData = event.target.result;

    var data = Papa.parse(csvData, {header : true});
    loopThroughJson(data)
    return data
  };

  reader.onerror = function() {
    alert('Unable to read ' + file.fileName);
  };

}

function loopThroughJson(data) {
  var settings = {
    "app_group_id" : "cd2c2142-d204-4f93-a72a-a93d76ef2713",
    "attributes" : [
    ]
  };

	for( var key in data) {
    for(var i = data[key].length - 2; i >= 0; i--) {
      settings.attributes.push(data[key][i])
    }
	}
  console.log(settings)
  executePostRequest(settings)
}

function executePostRequest(data) {
  var dataStringified = JSON.stringify(data);
  console.log(dataStringified)
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
});

xhr.open("POST", "https://rest.iad-01.braze.com/users/track");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "777332eb-dd6f-4a41-acc5-47b387d58fff");

xhr.send(dataStringified);
}
