let cron = require('node-cron');
let fetchGithubJobs = require('./tasks/githubjobs');

 
cron.schedule('* * * * *', () => {
  fetchGithubJobs();
});