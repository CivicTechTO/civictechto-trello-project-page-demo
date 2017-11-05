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
        return attachment.name.toLowerCase().startsWith('cover image attribution:')
      }).pop()
    },
    primaryLink: function (card) {
      return card.attachments.filter((attachment) => {
        return attachment.name.toLowerCase().startsWith('primary link:')
      }).pop()
    },
    secondaryLinks: function (card) {
      return card.attachments.filter((attachment) => {
        return attachment.name.toLowerCase().startsWith('secondary link:')
      })
    }
  },
  filters: {
    cleanAttachmentName: function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.replace(/^cover image attribution:/i, '')
      value = value.replace(/^cover image:/i, '')
      value = value.replace(/^primary link:/i, '')
      value = value.replace(/^secondary link:/i, '')
      value.trim()
      return value
    }
  }
})

var featuredCards = function(data) {
  return data.cards.filter(card => card.idLabels.indexOf(featuredLabelId(data)) > -1)
};

var featuredLabelId = function(data) {
  return data.labels.filter(label => label.name == 'Website Featured')[0].id;
};