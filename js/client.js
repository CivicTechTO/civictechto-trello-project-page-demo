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
    },
    coverAttachment: function (card) {
      return card.attachments.filter(function (attachment) {
        return attachment.id == card.idAttachmentCover
      }).pop()
    },
    attributionAttachment: function (card) {
      return card.attachments.filter((attachment) => {
        return attachment.name.toLowerCase().startsWith('image attribution:')
      }).pop()
  }
  }
})

var featuredCards = function(data) {
  return data.cards.filter(card => card.idLabels.indexOf(featuredLabelId(data)) > -1)
};

var featuredLabelId = function(data) {
  return data.labels.filter(label => label.name == 'Website Featured')[0].id;
};
