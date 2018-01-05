# gun-restrict-examples

Examples of how to restrict put with [GUN](https://github.com/amark/gun)

## Setup

Clone or download the repo.

cd into directory and run ```npm install```

Now open 4 terminals and follow the instructions

### Terminal 1

Start the gunserver with restricted put

```bash
$ npm run restricted-put
```

This will start the server at localhost port 8000

### Terminal 2

Setup a tunnel with ngrok

```bash
$ npm run tunnel
```
This will start ngrok and make your localhost:8000 accesible to the world

### Terminal 3

Start the webserver for authenticated site

```bash
$ npm start
```
Visit [http://localhost:3000](http://localhost:3000)

### Terminal 4

Start the webserver for authenticated

```bash
$ npm run start-unauth
```
Visit [http://localhost:4000](http://localhost:4000) in another browser

## What to expect

Everything you write on the authenticated site will be synced to the unathenticated, but not the other way around.

## Explore more

If you want to se GUN in action without restrictions stop your localhost:8000 and start an unrestricted GUN server.

```bash
$ npm run unrestricted
```

Now your sync will work both ways.

## License

[MIT](LICENSE)

![Robohash image of gun-restrict-examples](https://robots.kebabstudios.party/gun-restrict-examples.png "Robohash image of gun-restrict-examples")
