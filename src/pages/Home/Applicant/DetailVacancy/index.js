import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";
import MKBox from "components/MKBox";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

// Pages Section Components
import JobDetail from "sections/Applicant/Home/JobDetail";

import { convertBe2FeJob } from "utils/functions";

function DetailVacancy() {
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    if (id) {
      selectJob(id);
    }
  }, []);

  const selectJob = (jobId) => {
    axios
      .get(`${url}/api/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setJob(convertBe2FeJob(res.data));
        // setJob(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <DefaultNavbar routes={routes} relative transparent />
      <MKBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={7}
        sx={{ width: "100%" }}
      >
        <JobDetail selectedJob={job} setSelectedJob={setJob} isFull />
      </MKBox>
    </Container>
  );
}

export default DetailVacancy;
