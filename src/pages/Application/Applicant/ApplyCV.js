import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Container, Grid, Box, TextField, Button, Input, Autocomplete, Stack } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

import { useFormik } from "formik";
import * as Yup from "yup";

import { convertFullDateString } from "utils/functions";
import { cities } from "utils/enums/cities";
import { recent } from "dummy";

const ApplyCV = () => {
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const { id: jobId } = useParams();
  const location = useLocation();
  const { job } = location.state || {};
  const inputRef = useRef();

  const [recentCV, setRecentCV] = useState([]);
  const [selectedCVId, setSelectedCVId] = useState(null);
  const [newCV, setNewCV] = useState(null);
  const [onEdit, setOnEdit] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      location: localStorage.getItem("location") || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      console.log("recentCV", recentCV);
      console.log("selectedCVId", selectedCVId);
      console.log("newCV", newCV);
      // setIsApplied(!isApplied);
    },
  });

  const getRecentCVs = (newId) => {
    axios
      .get(`${url}/api/file/cv/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRecentCV(response.data.files);
        newId ? setSelectedCVId(newId) : setSelectedCVId(response.data.files[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadCV = (file) => {
    if (!file) return;
    setNewCV(file);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${url}/api/file/cv/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("uploaded cv", response.data);
        getRecentCVs(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewCV = (id) => {
    axios
      .get(`${url}/api/file/cv/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        window.open(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecentCVs();
  }, []);

  return (
    <Container>
      <DefaultNavbar routes={routes} relative transparent />

      {!isApplied ? (
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
            {job.img ? (
              <img
                src={job.img}
                alt="company"
                style={{ width: "150px", height: "150px", borderRadius: "20px" }}
              />
            ) : (
              <MKBox
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "20px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            )}
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
            pl={4.5}
            pr={2}
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
                // console.log("uploaded", file);
                uploadCV(file);
                // setRecentCV((prev) => {
                //   const defaultCV = prev[0];
                //   const newRecent = prev.slice(1, 3);
                //   return [
                //     defaultCV,
                //     { name: file.name, file: URL.createObjectURL(file) },
                //     ...newRecent,
                //   ];
                // });
                // setSelectedCVId({ name: file.name, file: URL.createObjectURL(file) });
              }}
            />
            <MKTypography variant="body1" sx={{ color: "black" }}>
              Use recent CV or upload new CV
              <br />
              <span style={{ color: "grey", fontSize: "15px" }}>
                (default CV automatically chosen while page load, you can choose another recent CV
                or upload new)
              </span>
            </MKTypography>
            <Stack spacing={2}>
              {recentCV.map((cv, index) => (
                <MKBox key={index}>
                  <MKBox display="flex" gap={1}>
                    <MKButton
                      key={index}
                      variant="outlined"
                      color="info"
                      sx={{ gap: 2, width: "83%" }}
                      onClick={() => setSelectedCVId(cv.id)}
                    >
                      {/* Red box with full height and full width consist white Typografy "PDF" */}
                      <MKBox
                        sx={{
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: cv.id === selectedCVId ? "green" : "red",
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
                            {cv.fileName}
                          </MKTypography>
                          <MKTypography variant="body2">
                            Uploaded at {convertFullDateString(cv.uploadDate)}
                          </MKTypography>
                        </MKBox>
                        {cv.id === selectedCVId && (
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
                      onClick={() => viewCV(cv.id)}
                    >
                      {index === 0 ? "View Default" : `View`}
                    </MKButton>
                  </MKBox>
                </MKBox>
              ))}
            </Stack>
            <MKBox display="flex" mt={3} justifyContent="flex-end" mr={2}>
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
          <MKBox bgColor="white" px={4.5} pt={3} pb={4} sx={{ borderRadius: "20px" }}>
            <MKBox display="flex" flexDirection="column" gap={2} width="80%">
              <MKTypography variant="body1" sx={{ color: "black" }}>
                Profile Checking
                {/* code new line */}
                <br />
                <span style={{ color: "grey", fontSize: "15px" }}>
                  (you can edit your profile information below)
                </span>
              </MKTypography>
              <MKInput
                label="Full Name"
                variant="outlined"
                fullWidth
                type="text"
                disabled={!onEdit}
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              {/* email only show and cannot be change */}
              <MKInput
                label="Email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                fullWidth
                disabled
              />
              <Autocomplete
                options={cities}
                getOptionLabel={(option) => option}
                autoHighlight
                autoSelect
                autoComplete
                disableClearable
                disabled={!onEdit}
                onChange={(_, value) => {
                  value
                    ? formik.setFieldValue("location", value)
                    : formik.setFieldValue("location", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location (City or Regency)"
                    variant="outlined"
                    fullWidth
                    value={formik.values.location}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                  />
                )}
              />
              <MKBox display="flex" justifyContent="flex-start" mr={2} gap={2}>
                <MKButton
                  variant="text"
                  color="info"
                  size="large"
                  sx={{ width: "17%" }}
                  disabled={onEdit}
                  onClick={() => setOnEdit(!onEdit)}
                >
                  Edit Profile
                </MKButton>
                <MKButton
                  variant="text"
                  color="success"
                  size="large"
                  sx={{ width: "17%" }}
                  disabled={!onEdit}
                  onClick={() => setOnEdit(false)}
                >
                  Save Profile
                </MKButton>
              </MKBox>
            </MKBox>
          </MKBox>
          {/* submit button */}
          <MKBox
            display="flex"
            mt={2}
            mb={25}
            alignItems="center"
            mr={2}
            flexDirection="column"
            gap={2}
          >
            {onEdit ? (
              <MKTypography variant="body2" color="error">
                Finish editing your profile before submitting
              </MKTypography>
            ) : (
              <MKTypography variant="body2" sx={{ color: "grey", textAlign: "center" }}>
                By clicking submit application, you agree to the terms and conditions
                <br />
                Make sure your information is correct before submitting
              </MKTypography>
            )}
            <MKButton
              variant="contained"
              color="primary"
              onClick={formik.handleSubmit}
              size="large"
              sx={{ width: "50%" }}
              disabled={onEdit}
            >
              Submit Application
            </MKButton>
          </MKBox>
        </MKBox>
      ) : (
        <MKBox display="flex" flexDirection="column" alignItems="center" gap={2} mx="auto">
          <MKTypography variant="h3">You have applied to this job</MKTypography>
          <MKTypography variant="body1">
            Job vacancy only can be applied once. You can view your application status on your
            history page.
          </MKTypography>
          <MKButton variant="contained" color="primary" size="large">
            Go to history page
          </MKButton>
        </MKBox>
      )}
    </Container>
  );
};

export default ApplyCV;
