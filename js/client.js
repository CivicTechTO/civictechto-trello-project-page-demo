var request = new XMLHttpRequest();
request.open('GET', 'https://trello.com/b/EVvNEGK5.json', true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    document.getElementById('content').innerHTML = request.responseText;
    console.log(featuredCards(data));
  } else {
    console.log('error');
  }
};

var featuredCards = function(data) {
  return data.cards.filter(card => card.idLabels.indexOf(featuredLabelId(data)) > -1)
};

var featuredLabelId = function(data) {
  return data.labels.filter(label => label.name == 'Website Featured')[0].id;
};

request.onerror = function() {
  console.log('there was an error');
};

request.send();
