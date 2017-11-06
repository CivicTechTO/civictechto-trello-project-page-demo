# Demo: CivicTechTO Trello-backed project page

The purpose of this repo is to show how a [static website hosted on
GitHub Pages][website] could be backed by a [**Hacknight Projects** Trello
board][board].

## How it Works

The page is automatically generated from Trello "cards" that each
represent a project. Tagging a card with the "Website Featured" label
automatically renders it on the webpage. By formatting attachments in
specific ways (made easier by [copying][howto-copy] a template card) a
new project can be added and promoted to website -- Slack channels,
project header images, project leads, and various other links are
rendered from the Trello data.

## Why?

Benefits of this approach include:

* Trello has a great interface for administering the page.
* Trello already has a wonderful mobile app for editting boards.
* Trello's model of boards/cards/members/labels/attachments suits our
  needs very well.
* Trello's API makes it possible to surface the data in other ways. (eg.
  a dynamic hacknight project board)
* Lots of features with little backend maintanence burden.

## Technologies Used

* [Vue.js](https://vuejs.org/) for a client-side Javascript framework.
* [Jekyll](https://jekyllrb.com/) for generating website.
* [Trello](https://trello.com/about) for storing data and
  administration.
* [GitHub Pages](https://pages.github.com/) for hosting.

## Contributing

To contribute to this project, just submit a pull request to the
`master` branch. GitHub Pages will auto-deploy on merge.

<!-- Links -->

   [website]: https://civictechto.github.io/civictechto-trello-project-page-demo/
   [board]: https://trello.com/b/EVvNEGK5/hacknight-projects
   [howto-copy]: http://help.trello.com/article/802-copying-cards-lists-or-boards
