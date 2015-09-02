### Clone the repository

```sh
$ git clone https://github.com/boilerplates/boilerplates.github.io
```

### Install NPM and Bower dependencies

```sh
$ cd boilerplates.github.io && npm i && bower i
```

### Assemble

> assemble-cli needs to be installed globally. Currently the `dev` branch should be installed.

```sh
$ npm i -g assemble/assemble-cli#dev
```

### Assemble tasks

> The default builds the site and places it in `_gh_pages`

```sh
$ assemble
```

> Watch the source files and rebuild the site

```sh
$ assemble watch
```

> For development, start a `connect` server, watch the sources files, and rebuild the site. The site will be available on [localhost](http://localhost:8080).

```sh
$ assemble dev
```

> Deploy to the `master` branch on [github](https://github.com/boilerplates/boilerplates.github.io)

```sh
$ assemble deploy
```
