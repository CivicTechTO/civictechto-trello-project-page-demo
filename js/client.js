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
      vm = this
      vm.$http.get('https://trello.com/b/EVvNEGK5.json')
        .then(function (response) {
          vm.featuredCards = featuredCards(response.data)
        })
    }
  }
})

var featuredCards = function(data) {
  return data.cards.filter(card => card.idLabels.indexOf(featuredLabelId(data)) > -1)
};

var featuredLabelId = function(data) {
  return data.labels.filter(label => label.name == 'Website Featured')[0].id;
};
