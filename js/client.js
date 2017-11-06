Vue.prototype.$http = axios
Vue.prototype.$last = function (item, list) {
  return item == list[list.length - 1]
}
var app = new Vue({
  el: '#app',
  data: {
    fullBoard: {},
    featuredCards: [],
  },
  created: function () {
    this.fetchData()
  },
  computed: {
    stageLabels: function() {
      var labels = this.fullBoard.labels.filter((label) => {
        return label.name.match(/^\d -/)
      })
      labels.forEach((label) => {
        label.normalized = label.name.replace(/^\d - /, '')
      })
      return labels
    }
  },
  methods: {
    fetchData: function () {
      vm = this
      vm.$http.get('https://trello.com/b/EVvNEGK5.json')
        .then(function (response) {
          vm.fullBoard = response.data
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
    },
    members: function (card) {
      return this.fullBoard.members.filter((member) => {
        return card.idMembers.indexOf(member.id) > -1
      })
    },
    projectStageLabel: function (card) {
      return this.stageLabels.filter((label) => {
        return card.idLabels.indexOf(label.id) > -1
      }).pop()
    },
    chatLink: function (card) {
      return card.attachments.filter((attachment) => {
        return attachment.name.toLowerCase().startsWith('chat:')
      }).pop()
    }
  },
  filters: {
    markdownify: function (value) {
      return DOMPurify.sanitize(marked(value))
    },
    cleanAttachmentName: function (value) {
      if (!value) return ''
      value = value.toString()
      value = value.replace(/^cover image attribution:/i, '')
      value = value.replace(/^cover image:/i, '')
      value = value.replace(/^primary link:/i, '')
      value = value.replace(/^secondary link:/i, '')
      value = value.replace(/^chat:/i, '')
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
