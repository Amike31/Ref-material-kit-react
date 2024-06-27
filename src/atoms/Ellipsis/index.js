import React, { useState } from "react";
import propTypes from "prop-types";
import { Box, Popper, SvgIcon, IconButton } from "@mui/material";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Grow from "@mui/material/Grow";
import Icon from "@mui/material/Icon";

const ActionDropdown = ({ actionItems }) => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdownEl, setDropdownEl] = useState("");
  const [arrowRef, setArrowRef] = useState(null);

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
            <MKBox borderRadius="lg">
              <MKTypography variant="h1" color="white">
                <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                  arrow_drop_up
                </Icon>
              </MKTypography>
              <MKBox shadow="lg" borderRadius="lg" p={2} mt={2}>
                {actionItems.map((item, index) => (
                  <MKBox
                    key={index}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    onClick={item.action}
                    sx={{ cursor: "pointer" }}
                  >
                    <SvgIcon>{item.icon}</SvgIcon>
                    <MKBox ml={2}>
                      <MKTypography variant="h6">{item.name}</MKTypography>
                      <MKTypography variant="body2" color="textSecondary">
                        {item.description}
                      </MKTypography>
                    </MKBox>
                  </MKBox>
                ))}
              </MKBox>
            </MKBox>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

ActionDropdown.propTypes = {
  actionItems: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      description: propTypes.string,
      icon: propTypes.element,
      action: propTypes.func,
    })
  ),
};

export default ActionDropdown;
