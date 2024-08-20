import React from 'react';

function JobFinder() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 font-weight-bold">Job Finder</h1>
      <em className="lead d-block mb-5"> 
        Curated links to tech internship listings for you! 

      </em>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <a href="https://nz.prosple.com/search-jobs?content=internships-new-zealand&study_fields=502%2C502%7C510&locations=796&defaults_applied=1&start=0&opportunity_types=2" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/prosple.png" className="card-img-top p-3" alt="Prosple" />
            </div>
          </a>
        </div>
        <div className="col-md-4 mb-4">
          <a href="https://app.summeroftech.co.nz/jobs" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/summer_of_tech.png" className="card-img-top p-3" alt="Summer of Tech" />
            </div>
          </a>
        </div>
        <div className="col-md-4 mb-4 ">
          <a href="https://www.seek.co.nz/jobs-in-information-communication-technology/in-All-Auckland" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/seek.png" className="card-img-top p-3"  alt="Seek" />
            </div>
          </a>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <a href="https://nz.indeed.com/jobs?q=software+%2C+intern&l=New+Zealand&from=searchOnDesktopSerp&vjk=78107bef7ff5927f" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/indeed.png" className="card-img-top p-3" alt="Indeed" />
            </div>
          </a>
        </div>
        <div className="col-md-4 mb-4">
          <a href="https://www.glassdoor.co.nz/Job/new-zealand-software-intern-jobs-SRCH_IL.0,11_IN186_KO12,27.htm" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/glassdoor.png" className="card-img-top p-3" alt="Glassdoor" />
            </div>
          </a>
        </div>
        <div className="col-md-4 mb-4">
          <a href="https://www.linkedin.com/jobs/search/?currentJobId=3935175062&geoId=105490917&keywords=software%20internship&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&originalSubdomain=nz&refresh=true" target="_blank" rel="noopener noreferrer">
            <div className="card h-100 border border-dark d-flex justify-content-center">
              <img src="images/linkedin.png" className="card-img-top p-3" alt="LinkedIn" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobFinder;
