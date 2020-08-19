import React from 'react';

const JOB_API = 'http://localhost:3001/api/jobs';


export default class FirstPost extends React.Component {
  
  componentDidMount() {
    this.fetchJobs();
  }
  
  async fetchJobs() {
    let res = await fetch(`${JOB_API}`);
    let { jobs } = await res.json();
    this.setState({ jobs });
  }

  render() {
    let { jobs = [] } = this.state || {};
    return (
      <div className="job-group">
        <h2>Github Jobs</h2>
        <ul>
          {
            jobs.map((job) => (
              <li>
              {job.title}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}