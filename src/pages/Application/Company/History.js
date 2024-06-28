import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  SvgIcon,
  Paper,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";

import {
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarSquareIcon,
  XMarkIcon,
  XCircleIcon,
  CheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import { convertFloatToHundredBase } from "utils/functions";
import Ellipsis from "atoms/Ellipsis";
import SpinningBar from "atoms/SpinningBar";

const ActionTableCell = styled(TableCell)({
  textAlign: "center",
  padding: "0.75rem 0.5rem",
  width: "9%",
});

const statusMap = {
  PENDING: "warning",
  AWAITING_INTERVIEW: "info",
  INTERVIEW: "info",
  AWAITING_EVALUATION: "info",
  EVALUATED: "info",
  ACCEPTED: "success",
  REJECTED: "error",
};

const statusIntMap = {
  PENDING: 0,
  AWAITING_INTERVIEW: 1,
  INTERVIEW: 2,
  AWAITING_EVALUATION: 3,
  EVALUATED: 4,
  ACCEPTED: 5,
  REJECTED: 5,
};

const actionItems = [
  {
    name: "CV Details",
    description: "AI Analysis Result",
    icon: <DocumentCheckIcon />,
    action: () => {
      console.log("CV Details");
    },
  },
  {
    name: "Invite Interview",
    description: "Invite the candidate for an interview",
    icon: <ChatBubbleOvalLeftEllipsisIcon />,
    action: () => {
      console.log("Invite Interview");
    },
  },
  {
    name: "Interview Details",
    description: "Interview Logs and Analysis",
    icon: <ChatBubbleLeftRightIcon />,
    action: () => {
      console.log("Interview Details");
    },
  },
  {
    name: "Evaluation Result",
    description: "Interview Evaluation Analysis",
    icon: <ChartBarSquareIcon />,
    action: () => {
      console.log("Evaluation Result");
    },
  },
  {
    name: "Accept",
    description: "Accept the candidate",
    icon: <CheckCircleIcon />,
    action: () => {
      console.log("Accept");
    },
  },
  {
    name: "Reject",
    description: "Reject the candidate",
    icon: <XCircleIcon />,
    action: () => {
      console.log("Reject");
    },
  },
];

const filterActions = (statusInt) => {
  if (statusInt === 0) {
    // index 0 and 1
    return [actionItems[0], actionItems[1]];
  } else if (1 <= statusInt && statusInt <= 2) {
    // index 0 only
    return [actionItems[0]];
  } else if (statusInt === 4) {
    // index 0, 2, 3, 4, 5
    return [actionItems[0], actionItems[2], actionItems[3], actionItems[4], actionItems[5]];
  } else if (statusInt === 5) {
    // index 0, 2, 3
    return [actionItems[0], actionItems[2], actionItems[3]];
  } else {
    return [];
  }
  // return actionItems;
};

function HistoryCompany() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  // eslint-disable-next-line no-undef
  const url = process.env.REACT_APP_API_URL;
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const checkUsers = (id) => {
    console.log("Check users", id);
  };

  const fetchApplications = () => {
    axios
      .get(`${url}/api/job/${jobId}/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setApplications(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchApplications();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} height="calc(100vh - 53px)">
        <Grid item xs={12}>
          <MKBox p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MKInput
                  fullWidth
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon component={MagnifyingGlassIcon} sx={{ width: 24, height: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ padding: 2 }}>
                  <Table>
                    <TableHead sx={{ display: "table-header-group" }}>
                      <TableRow>
                        <TableCell align="center" sx={{ flexGrow: 1 }}>
                          Job Title
                        </TableCell>
                        <TableCell align="center" sx={{ width: "22%" }}>
                          Candidate
                        </TableCell>
                        <TableCell align="center" sx={{ width: "9%" }}>
                          CV Score (0-100)
                        </TableCell>
                        <TableCell align="center" sx={{ width: "9%" }}>
                          CV Relevance
                        </TableCell>
                        <TableCell align="center" sx={{ width: "15%" }}>
                          Status
                        </TableCell>
                        <ActionTableCell>Actions</ActionTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody display={loading ? "none" : "table-row-group"}>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>
                            <MKTypography
                              variant="body2"
                              color="info"
                              sx={{ fontWeight: "bold", fontDecoration: "underline" }}
                            >
                              {app.jobTitle}
                            </MKTypography>
                          </TableCell>
                          <TableCell>{app.userName}</TableCell>
                          <TableCell align="center">
                            <MKTypography variant="body2" color="info">
                              {convertFloatToHundredBase(app.relevanceScore)}
                            </MKTypography>
                          </TableCell>
                          <TableCell align="center">
                            <MKBox
                              display="flex"
                              justifyContent="center"
                              alignContent="center"
                              sx={{ width: "100%" }}
                            >
                              <SvgIcon
                                fontSize="normal"
                                color={app.relevance ? "success" : "error"}
                              >
                                {app.relevance ? <CheckIcon /> : <XMarkIcon />}
                              </SvgIcon>
                            </MKBox>
                          </TableCell>
                          <TableCell>
                            <MKBox
                              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
                            >
                              <MKBox
                                bgColor={statusMap[app.status]}
                                sx={{
                                  borderRadius: 20,
                                  padding: "0.5rem 2rem",
                                  width: "fit-content",
                                }}
                              >
                                <MKTypography
                                  variant="body2"
                                  color="white"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {app.status.toLowerCase()}
                                </MKTypography>
                              </MKBox>
                            </MKBox>
                          </TableCell>
                          <ActionTableCell>
                            <Ellipsis actionItems={filterActions(statusIntMap[app.status])} />
                          </ActionTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {loading && (
                    <MKBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="30vh"
                      gap={2}
                    >
                      <SpinningBar />
                    </MKBox>
                  )}
                </TableContainer>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HistoryCompany;
