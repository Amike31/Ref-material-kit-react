import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Card, IconButton, SvgIcon } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

import {
  XMarkIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { convertSalaryRange, dateDifference } from "utils/functions";

const JobDetail = (props) => {
  const { selectedJob, setSelectedJob } = props;
  const navigate = useNavigate();

  return (
    <>
      {selectedJob.id ? (
        <Card sx={{ overflowY: "auto", maxHeight: "100vh" }}>
          <MKBox px={7} py={4}>
            <IconButton
              onClick={() => setSelectedJob({})}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <SvgIcon component={XMarkIcon} />
            </IconButton>
            {selectedJob.img && (
              <img src={selectedJob.img} alt={selectedJob.title} style={{ maxHeight: "100px" }} />
            )}
            <MKTypography variant="h3">{selectedJob.title}</MKTypography>
            <MKTypography variant="body2" sx={{ fontSize: "20px" }}>
              {selectedJob.company}
            </MKTypography>
            <MKBox display="flex" alignItems="center" gap={1.5} mt={2}>
              <SvgIcon component={MapPinIcon} />
              <MKTypography variant="body2">{selectedJob.location}</MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" gap={1.5}>
              <SvgIcon component={ClockIcon} />
              <MKTypography variant="body2">{selectedJob.type}</MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" gap={1.5}>
              <SvgIcon component={BuildingOfficeIcon} />
              <MKTypography variant="body2">{selectedJob.mode}</MKTypography>
            </MKBox>
            {selectedJob.salary && (
              <MKBox display="flex" alignItems="center" gap={1.5}>
                <SvgIcon component={BanknotesIcon} />
                <MKTypography variant="body2">
                  {convertSalaryRange(selectedJob.salary)} per month
                </MKTypography>
              </MKBox>
            )}
            <MKBox display="flex" alignItems="center" gap={1.5} mt={2}>
              <SvgIcon component={UserGroupIcon} />
              <MKTypography variant="body2">{selectedJob.experienceLevel}</MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" gap={1.5} mt={2}>
              <MKTypography variant="body2" sx={{ fontWeight: 400, color: "grey" }}>
                Posted {dateDifference(selectedJob.datePosted)}
              </MKTypography>
            </MKBox>
            {/* 80% center */}
            <MKBox display="flex" justifyContent="center" mt={1} mb={3}>
              <MKButton
                variant="contained"
                color="primary"
                sx={{ width: "50%", marginTop: "5px" }}
                size="large"
                onClick={() =>
                  navigate(`/apply-cv/${selectedJob.id}`, { state: { job: selectedJob } })
                }
              >
                Apply
              </MKButton>
            </MKBox>
            {selectedJob.description && (
              <MKBox mt={2} display="flex" flexDirection="column" gap={0.5}>
                <MKTypography variant="h6">Job Description</MKTypography>
                <MKTypography variant="body2">{selectedJob.description}</MKTypography>
              </MKBox>
            )}
            <MKBox mt={2} display="flex" flexDirection="column" gap={0.5}>
              <MKTypography variant="h6">Requirements</MKTypography>
              <MKTypography variant="body2" pl={3}>
                {selectedJob.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </MKTypography>
            </MKBox>
            {selectedJob.responsibilities && (
              <MKBox mt={2} display="flex" flexDirection="column" gap={0.5}>
                <MKTypography variant="h6">Responsibilities</MKTypography>
                <MKTypography variant="body2" pl={3}>
                  {selectedJob.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </MKTypography>
              </MKBox>
            )}
            {selectedJob.advantages && (
              <MKBox mt={2} display="flex" flexDirection="column" gap={0.5}>
                <MKTypography variant="h6">Advantages</MKTypography>
                <MKTypography variant="body2" pl={3}>
                  {selectedJob.advantages.map((advantage) => (
                    <li key={advantage}>{advantage}</li>
                  ))}
                </MKTypography>
              </MKBox>
            )}
            {selectedJob.additionalInfo && (
              <MKBox mt={2} display="flex" flexDirection="column" gap={0.5}>
                <MKTypography variant="h6">Additional Information</MKTypography>
                <MKTypography variant="body2">{selectedJob.additionalInfo}</MKTypography>
              </MKBox>
            )}
          </MKBox>
        </Card>
      ) : (
        <MKBox p={3} display="flex" justifyContent="center">
          <MKTypography variant="h3">Choose a job vacancy</MKTypography>
        </MKBox>
      )}
    </>
  );
};

JobDetail.propTypes = {
  selectedJob: propTypes.object.isRequired,
  setSelectedJob: propTypes.func.isRequired,
};

export default JobDetail;
