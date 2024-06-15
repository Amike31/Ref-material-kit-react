import propTypes from "prop-types";
import { ButtonBase, Card } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { convertSalaryRange, dateDifference } from "utils/functions";

const JobCard = (props) => {
  const { job, setSelectedJob } = props;
  return (
    <ButtonBase
      onClick={() => setSelectedJob(job)}
      key={job.id}
      sx={{ width: "100%", textAlign: "left" }}
    >
      <Card key={job.id} sx={{ width: "100%" }}>
        <MKBox px={4.8} pt={4} pb={1.7}>
          {/* max height 20 */}
          {job.img && <img src={job.img} alt={job.title} style={{ maxHeight: "60px" }} />}
          <MKTypography variant="h5">{job.title}</MKTypography>
          <MKTypography variant="body2">{job.company}</MKTypography>
          <MKTypography variant="body2">{job.location}</MKTypography>
          {job.salary && (
            <MKTypography variant="body2">{convertSalaryRange(job.salary)}</MKTypography>
          )}
          {/* if had advantages */}
          {job.advantages && (
            <MKTypography variant="body2" pl={1}>
              {job.advantages.map((advantage) => (
                <li key={advantage}>{advantage}</li>
              ))}
            </MKTypography>
          )}
          <MKTypography variant="body2" sx={{ fontWeight: 400, marginTop: "12px", color: "grey" }}>
            {dateDifference(job.datePosted)}
          </MKTypography>
        </MKBox>
      </Card>
    </ButtonBase>
  );
};

JobCard.propTypes = {
  job: propTypes.object.isRequired,
  setSelectedJob: propTypes.func.isRequired,
};

export default JobCard;
