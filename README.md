# gun-restrict-examples

Example of how to restrict put with [GUN](https://github.com/amark/gun)

The solutions are based on an answer from [stackoverflow](https://stackoverflow.com/questions/38598391/jwt-authentication-with-gundb)

## Setup

Clone or download the repo.

cd into directory and run ```npm install```

## Restricted put example

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

## License

[MIT](LICENSE)

![Robohash image of gun-restrict-examples](https://robots.kebabstudios.party/gun-restrict-examples.png "Robohash image of gun-restrict-examples")
