const express = require('express');
const redis = require("redis");
const { promisify } = require("util");
const url  = require("url").parse(process.env.OPENREDIS_URL);
const app = express();
const client = redis.createClient({
  port:url.port, 
  hostname: url.hostname,
  password: 'password'
});
const getAsync = promisify(client.get).bind(client);

const port = process.env.PORT || 3001;

app.get('/api/jobs', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let jobs = await getAsync('githubjobs');
  res.send({
    jobs: JSON.parse(jobs)
  });
});

app.get('/', async (req, res) => {
  res.send('server is running');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})