# series

A restful service where users can create episode, create characters, add characters and comment on episodes.


- [Postman Collection can be found here](https://documenter.getpostman.com/view/3344471/TWDTNfAk)
- [The live application can be accessed on HEROKU via https://series00.herokuapp.com/](https://series00.herokuapp.com/)

### Tools

- Node.js
- MySQL
- Sequelize
- Mocha

### Installation

##### Prerequisites

- Ensure Nodejs is installed. [Node.js](https://nodejs.org/) v10+ to run.
- Ensure MySQL is installed.

Install the dependencies and devDependencies and start the server.
Rename the .env-example file to .env file in the root directory and fill in appropriate environment variables.

```sh
$ git clone https://github.com/tajud99n/series.git
$ npm install
$ npm start
$ sequelize db:migrate
```

### Testing

```sh
$ npm run test
```

## License

MIT
