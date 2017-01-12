# battlefield-stats-express

A simple battlefield stats middleware for nodejs express.

## Usage

```
npm install battlefield-stats-express
```

```javascript
const express = require('express');
const battlefieldStats = require('battlefield-stats-express');
const app = express();

// Get or use your key from https://battlefieldtracker.com/site-api`
const bfs = battlefieldStats(YOUR_API_TOKEN);

app.use('/api', bfs)
app.listen(3000);
```

Now you can see results when you navigate to http://localhost:3000/api/Stats/DetailedStats?platform=3&displayName=Ravic

## API Docs
For documentation use http://docs.trnbattlefield.apiary.io/ then replace `https://battlefieldtracker.com/bf1/api/` with `http://localhost:3000/api`

## Advanced Usage

### POSTing json data

This middleware also supports POST requests if you are using `body-parser` - which will populate req.body with json.

#### Example using bodyParser to parse json
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const battlefieldStats = require('battlefield-stats-express');

const app = express();
const bfs = battlefieldStats(YOUR_API_TOKEN); // obtained from https://battlefieldtracker.com/site-api

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', bfs)

app.listen(3000);
```
When the json is sent via POST it is then parsed where the query params mentioned in documentation reflect json key value pairs.

For example the following json is equivelant to `displayName=Ravic&platform=3`

```json
{
  "displayName": "Ravic",
  "platform": 3
}
```

### Applying more middlewares

If you wish, you can have this middleware just add the data from the battlefield tracker service to
the request object, then do something else with your own handler.

```javascript
const bfs = battlefieldStats(YOUR_API_TOKEN, false)
app.use('/api', bfs);
app.use('/api', function (req, res, next) {
  // lets just log it out before we send the data to the browser
  console.log(req.bfData);
  res.send(req.bfData);
});
```
