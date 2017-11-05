Vue.prototype.$http = axios
var app = new Vue({
  el: '#app',
  data: {
    featuredCards: [],
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', 'https://trello.com/b/EVvNEGK5.json')
      xhr.onload = function () {
        var data = JSON.parse(xhr.responseText)
        self.featuredCards = featuredCards(data)
        console.log(self.featuredCards)
      }
      xhr.send()
    }
  }
})

var featuredCards = function(data) {
  return data.cards.filter(card => card.idLabels.indexOf(featuredLabelId(data)) > -1)
};

var featuredLabelId = function(data) {
  return data.labels.filter(label => label.name == 'Website Featured')[0].id;
};
