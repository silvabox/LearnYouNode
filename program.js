var http = require('http');

function collectData(url, callback) {
  http.get(url, function(response) {
    response.setEncoding('utf8');

    var text = '';
    response.on('data', function(chunk) {
      text += chunk;
    });

    response.on('end', function() {
      callback(text);
    });
  });
}

function printFinalResults(results) {
  for (var i = 0; i < results.length; i++) {
    console.log(results[i]);
  }
};

var urlsArray = process.argv.slice(2);

function series(array, callback) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    collectData(array[i], function(text) {
      results.push(text);
      if (results.length == array.length) callback(results)
    });
  }
}

series(urlsArray, printFinalResults);