const fetch = require('node-fetch');
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);

const JobsAPI = 'https://jobs.github.com/positions.json';

module.exports = async function fetchGithubJobs() {
  let iterator = true;
  let page = 1;
  let totalJobs = [];
  while (iterator > 0) {
    let res = await fetch(`${JobsAPI}?page=${page}`);
    let jobs = await res.json();
    iterator = jobs.length;
    console.log(jobs.length);
    totalJobs.push(...jobs);
    page++;
  }
  
  setAsync('githubjobs', JSON.stringify(totalJobs)).then(() => {
    console.log('Github Jobs Are Fetched');
  }).catch((error) => {
    console.error(error);
  });
}