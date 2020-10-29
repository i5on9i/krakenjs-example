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


### for test auth

to test the /login/auth, use the below curl command

```
curl -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
"login_id": "test01",
"password" : "1111"

}' "http://192.168.0.25:8000/login/auth"
```

npm i @types/express --save-dev