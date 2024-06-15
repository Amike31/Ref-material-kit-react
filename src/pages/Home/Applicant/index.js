import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Grid } from "@mui/material";
import MKBox from "components/MKBox";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

// Pages Section Components
import JobFilter from "sections/Applicant/Home/JobFilter";
import JobCard from "sections/Applicant/Home/JobCard";
import JobDetail from "sections/Applicant/Home/JobDetail";

import { dJobs } from "dummy";

function HomeApplicant() {
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("Any time");
  const [mode, setMode] = useState([]);
  const [type, setType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);

  useEffect(() => {
    // axios.get(`${url}/api/job/all`).then((response) => {
    //   setJobs(response.data);
    // });
    setJobs(dJobs);
  }, [url]);

  const searchJobs = () => {
    // axios.get(`${url}/api/job/search`, {
    //   params: {
    //     query,
    //     location,
    //     datePosted,
    //     mode,
    //     type,
    //     experienceLevel,
    //   },
    // }).then((response) => {
    //   setJobs(response.data);
    // });
    setJobs(dJobs);
  };

  return (
    <Container>
      <DefaultNavbar routes={routes} relative transparent />
      <MKBox>
        <JobFilter
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
          mode={mode}
          setMode={setMode}
          datePosted={datePosted}
          setDatePosted={setDatePosted}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
        />
        <MKBox>
          <Grid container mt={2}>
            {/* Job Card */}
            <Grid item xs={4.5}>
              <Grid container spacing={1} pr={1} sx={{ overflowY: "auto", maxHeight: "100vh" }}>
                {jobs.map((job) => (
                  <Grid item xs={12} key={job.id}>
                    <JobCard setSelectedJob={setSelectedJob} job={job} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Job Detail */}
            <Grid item xs={7.5} pl={1}>
              <JobDetail selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </Container>
  );
}

export default HomeApplicant;
