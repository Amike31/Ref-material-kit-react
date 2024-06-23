import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Grid } from "@mui/material";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

// Pages Section Components
import JobFilter from "sections/Applicant/Home/JobFilter";
import JobCard from "sections/Applicant/Home/JobCard";
import JobDetail from "sections/Applicant/Home/JobDetail";

import { convertBe2FeJob } from "utils/functions";

function HomeApplicant() {
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState({});
  // filter
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [createdAt, setCreatedAt] = useState("Any time");
  const [mode, setMode] = useState([]);
  const [type, setType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios
      .get(`${url}/api/job/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const newJobs = response.data.data.map((job) => convertBe2FeJob(job));
        setJobs(newJobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectJob = (jobId) => {
    axios
      .get(`${url}/api/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSelectedJob(convertBe2FeJob(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (jobId) {
      selectJob(jobId);
    }
  }, [jobId]);

  const searchJobs = () => {};

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
          createdAt={createdAt}
          setCreatedAt={setCreatedAt}
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
                    <JobCard job={job} setJobId={setJobId} />
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
