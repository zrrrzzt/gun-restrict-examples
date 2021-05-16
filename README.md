[![Build Status](https://travis-ci.com/zrrrzzt/gun-restrict-examples.svg?branch=main)](https://travis-ci.com/zrrrzzt/gun-restrict-examples)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/zrrrzzt/gun-restrict-examples.svg)](https://greenkeeper.io/)

# gun-restrict-examples

Examples of how to restrict writes and still have public reads with [GUN](https://github.com/amark/gun)

# NOT UPDATED

This is a bit out of sync at the moment. Maybe I'll fix it some day...

Use at your own risk :-)

## Setup

Clone or download the repo.

cd into directory and run ```npm install```

## Restricted writes with SEA

Open a terminal and start the services

```bash
$ npm run sea
```

This will start 3 servers
- The GUN server at localhost port 8000
- The authenticated site on localhost port 3000
- The unauthenticated site on localhost port 4000 

Open your browser at [http://localhost:3000](http://localhost:3000)

Login with whatever username/password you want. If the user doesn't exist it will be created.

Add some messages

Use the link to open the unathorized site

### What to expect

Everything you write on the authenticated site will be synced to the unathenticated, but not the other way around.

Shut down the services with `CTRL + C` in the terminal

## Restricted put with token example

Open a terminal and start the services

```bash
$ npm start
```

This will start 3 servers
- The GUN server at localhost port 8000
- The authenticated site on localhost port 3000
- The unauthenticated site on localhost port 4000 

Open 2 browsers.
- Visit [http://localhost:3000](http://localhost:3000) in one
- Visit [http://localhost:4000](http://localhost:4000) in the other

### What to expect

Everything you write on the authenticated site will be synced to the unathenticated, but not the other way around.

## Explore more

If you want to se GUN in action without restrictions stop the running service pressing CTRL + C in the terminal.

Start an unrestricted GUN server.

```bash
$ npm run unrestricted
```
Now your sync will work both ways.

## Acknowledgements

The solutions are based on an answer from [stackoverflow](https://stackoverflow.com/questions/38598391/jwt-authentication-with-gundb), the [SEA contact example](https://github.com/amark/gun/blob/master/examples/contact/index.html) and of course the [GUN Gitter](https://gitter.im/amark/gun)

## License

[MIT](LICENSE)
