# kraken-example

## installation
```
npm i
```

## build

```
npm run build
```

### Run
```
set NODE_ENV='stage'
node --inspect ./dist/server.js
```

To check the server is running, open the web browser and visit `http://localhost:8000/`


### dust.js build

to compile .dust files into .js files, run `npm run build:dust`.



npm i @types/express --save-dev