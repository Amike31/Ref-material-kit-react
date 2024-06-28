import { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { Box, Popper, SvgIcon, IconButton, ButtonBase, Grow } from "@mui/material";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import {
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const statusIntMap = {
  PENDING: 0,
  AWAITING_INTERVIEW: 1,
  INTERVIEW: 2,
  AWAITING_EVALUATION: 3,
  EVALUATED: 4,
  ACCEPTED: 5,
  REJECTED: 5,
};

const ActionDropdown = ({ app }) => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdownEl, setDropdownEl] = useState("");
  const [arrowRef, setArrowRef] = useState(null);
  // eslint-disable-next-line no-undef
  const hurl = process.env.REACT_APP_API_URL;
  function inviteInterview(app) {
    if (app.status !== "PENDING") {
      console.log("Cannot invite interview for status", app.status);
      return;
    }
    const data = {
      job_application_id: app.id,
      is_accepted: true,
    };
    axios
      .patch(`${hurl}/api/job/application/status`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      action: inviteInterview,
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
    // return actionItems;
    // eslint-disable-next-line no-unreachable
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
  };

  return (
    <Box onMouseLeave={() => setDropdown(false)}>
      <IconButton onMouseEnter={() => setDropdown(true)} ref={setDropdownEl}>
        <SvgIcon component={EllipsisVerticalIcon} style={{ width: 24, height: 24 }} />
      </IconButton>
      <Popper
        anchorEl={dropdownEl}
        popperRef={null}
        open={dropdown}
        placement="bottom-start"
        transition
        style={{ zIndex: 10 }}
        modifiers={[
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => {
          setDropdown(false);
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            sx={{
              transformOrigin: "left top",
              background: ({ palette: { white } }) => white.main,
            }}
          >
            <MKBox shadow="lg" borderRadius="lg" p={2} mt={2} gap={2}>
              {filterActions(statusIntMap[app.status]).map((item, index) => (
                <MKBox key={index} display="flex" sx={{ width: "100%" }} py={0.5}>
                  <ButtonBase onClick={item.action} sx={{ width: "100%" }}>
                    {/* inside */}
                    <MKBox display="flex" alignItems="center" sx={{ width: "100%" }}>
                      <SvgIcon sx={{ height: 30, width: 30 }}>{item.icon}</SvgIcon>
                      <MKBox
                        ml={2}
                        display="flex"
                        flexDirection="column"
                        sx={{ width: "100%" }}
                        alignItems="flex-start"
                      >
                        <MKTypography variant="h6">{item.name}</MKTypography>
                        <MKTypography variant="body2" color="textSecondary">
                          {item.description}
                        </MKTypography>
                      </MKBox>
                    </MKBox>
                  </ButtonBase>
                </MKBox>
              ))}
            </MKBox>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

ActionDropdown.propTypes = {
  app: propTypes.object,
};

export default ActionDropdown;
