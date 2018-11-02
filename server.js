const dataDir = '/data/pairs/';
$(document).ready(function() {

  function readFiles(fileList, queryVal) {
    let numQueries = 10;
    if (!isNaN(queryVal)) {
      numQueries = queryVal;
    }
    console.log("NumQueries: " + numQueries);
    let reader = new FileReader();
    reader.readAsText(fileList);
    reader.onload = function(e) {
      var copyArr = e.target.result.split('\n');
      for (let i = 0; i < numQueries; i++) {
        console.log("In for loop");
        let randInt = Math.floor(Math.random() * copyArr.length);
        $.getJSON(dataDir + copyArr[randInt], function(results) {
          addCode(results.bad, results.fix);
          console.log("Added code");
        });
      }
    };
  }

  function addCode(bad, fix) {
    console.log("Added a query");
    let badOutputHTML = '<div class="badOutput">\n' + 
      '<label for="before"><strong>Before</strong></label><br>\n' +
			'<textarea readonly id="badOutputBox" name="outputBox">';
		badOutputHTML += bad;
    badOutputHTML += '</textarea></div><br>';
    
    let goodOutputHTML = '<div class="goodOutput">\n' + 
      '<label for="after"><strong>After</strong></label><br>\n' +
			'<textarea readonly id="goodOutputBox" name="outputBox">';
		goodOutputHTML += fix;
    goodOutputHTML += '</textarea></div><br>';

    $('.queryarea').append(badOutputHTML + goodOutputHTML);
    changeTextAreaSize($('textarea'));
  }

  function changeTextAreaSize(elts) {
    elts.each(function(idx, elt) {
      elt.style.height = elt.scrollHeight + 'px';
    });
  }

  $('#submitButton').on('click', function() {
    $('.queryarea').empty();
    var numQueries = $('#queries').val();
    console.log("Query button pressed with queryValue: " + numQueries);
    readFiles(document.querySelector('input').files[0], parseInt(numQueries));
  });
});
