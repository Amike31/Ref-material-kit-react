import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Container, Grid, Box, TextField, Button, Input } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import team1 from "assets/images/team-5.jpg";

import { recent } from "dummy";

const ApplyCV = () => {
  const { id: jobId } = useParams();
  const location = useLocation();
  const { job } = location.state || {};

  const [recentCV, setRecentCV] = useState(recent);
  const [selectedCV, setSelectedCV] = useState(recent[0]);
  const inputRef = useRef();
  let upload = 0;

  // useEffect(() => { // get recent cv
  //   axios.get("/cv").then((res) => {
  //     setRecentCV(res.data);
  //   });
  // }, [upload]);

  // const uploadCV = (file) => {
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("cv", file);
  //   axios.post("/cv", formData).then((res) => {
  //     console.log(res.data);
  //   });
  //   upload++;
  // };

  return (
    <Container>
      <DefaultNavbar routes={routes} relative transparent />
      <MKBox width="85%" mx="auto" mt={3} display="flex" flexDirection="column" gap={3}>
        {/* job short detail */}
        <MKBox
          display="flex"
          alignItems="center"
          gap={3}
          bgColor="white"
          px={3.75}
          pt={3.5}
          pb={4}
          sx={{ borderRadius: "20px" }}
        >
          <img
            src={team1}
            alt="company"
            style={{ width: "150px", height: "150px", borderRadius: "20px" }}
          />
          <MKBox display="flex" flexDirection="column" gap={0.5}>
            <MKTypography variant="body2" sx={{ color: "grey" }} mb={0.5}>
              Apply to
            </MKTypography>
            <MKTypography variant="h3">{job.title}</MKTypography>
            <MKTypography variant="body2">{job.company}</MKTypography>
            <MKTypography variant="body2">{job.location}</MKTypography>
          </MKBox>
        </MKBox>
        {/* upload CV button with 3 button of recent CV */}
        <MKBox
          display="flex"
          flexDirection="column"
          gap={2}
          bgColor="white"
          px={4.5}
          pt={3}
          pb={4}
          sx={{ borderRadius: "20px" }}
        >
          <Input
            type="file"
            accept=".pdf"
            inputRef={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setRecentCV((prev) => {
                const defaultCV = prev[0];
                const newRecent = prev.slice(1, 3);
                return [
                  defaultCV,
                  { name: file.name, file: URL.createObjectURL(file) },
                  ...newRecent,
                ];
              });
              setSelectedCV({ name: file.name, file: URL.createObjectURL(file) });
            }}
          />
          <MKTypography variant="body1" sx={{ color: "black" }}>
            Use recent CV or upload new CV
            <br />
            <span style={{ color: "grey", fontSize: "15px" }}>
              (default CV automatically chosen while page load, you can choose another recent CV or
              upload new)
            </span>
          </MKTypography>
          <Grid container spacing={2}>
            {recentCV.map((cv, index) => (
              <Grid item xs={12} key={index}>
                <MKBox display="flex" gap={1}>
                  <MKButton
                    key={index}
                    variant="outlined"
                    color="info"
                    sx={{ gap: 2, width: "83%" }}
                    onClick={() => setSelectedCV(cv)}
                  >
                    {/* Red box with full height and full width consist white Typografy "PDF" */}
                    <MKBox
                      sx={{
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor: cv.name === selectedCV.name ? "green" : "red",
                        height: "100%",
                      }}
                    >
                      <MKTypography variant="body2" color="white">
                        PDF
                      </MKTypography>
                    </MKBox>
                    <MKBox
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ width: "100%" }}
                    >
                      <MKBox
                        display="flex"
                        alignItems="flex-start"
                        gap={0.5}
                        flexDirection="column"
                      >
                        <MKTypography variant="body2" sx={{ fontWeight: "bold" }}>
                          {cv.name}
                        </MKTypography>
                        <MKTypography variant="body2">Upload on 12/12/2021</MKTypography>
                      </MKBox>
                      {selectedCV.name === cv.name && (
                        <MKTypography variant="body2" sx={{ color: "green" }}>
                          Selected
                        </MKTypography>
                      )}
                    </MKBox>
                  </MKButton>
                  <MKButton
                    variant="text"
                    color="info"
                    size="large"
                    sx={{ width: "17%" }}
                    onClick={() => {
                      window.open(cv.file, "_blank");
                    }}
                  >
                    {index === 0 ? "View Default" : `View`}
                  </MKButton>
                </MKBox>
              </Grid>
            ))}
          </Grid>
          <MKBox display="flex" mt={1} justifyContent="flex-end" mr={2}>
            <MKButton
              variant="contained"
              color="primary"
              onClick={() => {
                inputRef.current.click();
              }}
              size="large"
            >
              Upload New CV
            </MKButton>
          </MKBox>
        </MKBox>
        {/* user profile Checking */}
        <MKBox
          mb={10}
          fullWidth
          bgColor="white"
          px={4.5}
          pt={3}
          pb={4}
          sx={{ borderRadius: "20px" }}
        >
          <MKBox display="flex" flexDirection="column" gap={2} width="80%">
            <MKTypography variant="body1" sx={{ color: "black" }}>
              Profile Checking
              {/* code new line */}
              <br />
              <span style={{ color: "grey", fontSize: "15px" }}>
                make sure the information below is correct
              </span>
            </MKTypography>
            <MKInput label="Full Name" variant="outlined" defaultValue="John Doe" fullWidth />
            <MKInput label="Email" variant="outlined" defaultValue="c@gmail.com" fullWidth />
            <TextField label="Location" variant="outlined" defaultValue="Bandung" fullWidth />
            {/*  */}
          </MKBox>
          <MKBox display="flex" mt={2} justifyContent="flex-end" mr={2}>
            <MKButton
              variant="contained"
              color="primary"
              onClick={() => console.log(selectedCV)}
              size="large"
            >
              Submit Application
            </MKButton>
          </MKBox>
        </MKBox>
      </MKBox>
    </Container>
  );
};

export default ApplyCV;
