import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Input,
  Autocomplete,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  IconButton,
  SvgIcon,
  Stack,
  Paper,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

import { convertDateString } from "utils/functions";

const NewTableCell = styled(TableCell)({
  textAlign: "center",
  padding: "0.75rem 0.5rem",
  maxWidth: "100px",
});

function HomeCompany() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const editJob = (id) => {
    console.log("Edit job", id);
  };
  const openJob = (id) => {
    console.log("Open job", id);
  };
  const closeJob = (id) => {
    console.log("Close job", id);
  };
  const deleteJob = (id) => {
    console.log("Delete job", id);
  };

  const fetchJobs = () => {
    axios
      .get(`${url}/api/job/posted`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container width="lg">
      <DefaultNavbar routes={routes} relative transparent />
      <Stack direction="column" spacing={2} mt={2}>
        {/* Search bar and add button */}
        <Stack direction="row" spacing={5} justifyContent="space-between" px={1} pb={1}>
          <MKTypography variant="h3" sx={{ width: "40%" }}>
            {jobs.length} Job Vancacies
          </MKTypography>
          <Stack
            direction="row"
            spacing={5}
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
            bgcolor="white"
          >
            <Input
              sx={{ width: "50%" }}
              placeholder="Search job"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  console.log("Query", query);
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
            <MKButton
              variant="contained"
              color="primary"
              startIcon={<SvgIcon as={PlusIcon} size="normal" />}
              width="30%"
              onClick={() => {
                navigate("/company/add-job");
              }}
            >
              Add Job
            </MKButton>
          </Stack>
        </Stack>
        {/* Table */}
        <MKBox>
          <TableContainer
            compoment={Paper}
            style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10 }}
          >
            <Table>
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <NewTableCell sx={{ width: "80px", paddingLeft: "20px" }}>
                    Open Status
                  </NewTableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    Job
                  </TableCell>
                  <NewTableCell>Applied</NewTableCell>
                  <NewTableCell>Interview Offered</NewTableCell>
                  <NewTableCell>Interviewed</NewTableCell>
                  <NewTableCell sx={{ minWidth: "100px" }}>Actions</NewTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index}>
                    <NewTableCell sx={{ width: "50px", paddingLeft: "20px" }}>
                      {job.status === "OPEN" ? (
                        <Checkbox checked disabled />
                      ) : (
                        <Checkbox disabled />
                      )}
                    </NewTableCell>
                    <TableCell sx={{}}>
                      <MKTypography variant="h6">{job.title}</MKTypography>
                      <MKTypography variant="body2">{job.location}</MKTypography>
                      <Stack direction="row" spacing={10}>
                        <MKTypography variant="body2">
                          Created at {convertDateString(job.createdAt)}
                        </MKTypography>
                        {job.status === "OPEN" ? (
                          <MKTypography variant="body2">
                            Last updated: {convertDateString(job.updatedAt)}
                          </MKTypography>
                        ) : (
                          <MKTypography variant="body2">
                            <span style={{ color: "red" }}>Closed </span>at{" "}
                            {convertDateString(job.dateClosed)}
                          </MKTypography>
                        )}
                      </Stack>
                    </TableCell>
                    <NewTableCell>{job.applicants}</NewTableCell>
                    <NewTableCell>{job.offeredInterview}</NewTableCell>
                    <NewTableCell>{job.interviewed}</NewTableCell>
                    {/* <NewTableCell>{job.interviewResult}</NewTableCell> */}
                    <TableCell align="center">
                      <Stack direction="row" spacing={1.5} justifyContent="center">
                        <IconButton onClick={() => navigate(`/company/history/${job.id}`)}>
                          <SvgIcon as={UsersIcon} />
                        </IconButton>
                        <IconButton onClick={() => navigate(`/detail-vacancy/${job.id}`)}>
                          <SvgIcon as={EyeIcon} />
                        </IconButton>
                        <IconButton onClick={() => editJob(job.id)}>
                          <SvgIcon as={PencilIcon} />
                        </IconButton>
                        {job.status === "OPEN" ? (
                          <IconButton onClick={() => openJob(job.id)}>
                            <SvgIcon as={PlayIcon} />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => closeJob(job.id)}>
                            <SvgIcon as={StopIcon} />
                          </IconButton>
                        )}
                        <IconButton onClick={() => deleteJob(job.id)}>
                          <SvgIcon as={TrashIcon} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MKBox>
      </Stack>
    </Container>
  );
}

export default HomeCompany;
