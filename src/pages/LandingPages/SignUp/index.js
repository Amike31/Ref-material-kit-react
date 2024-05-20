import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// other packages
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// icons
import EyeIcons from "@heroicons/react/24/solid/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";

function SignUpBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // TODO : add login logic here
        // console.log(values);
        toast.success("Login success");
        // throw error
        throw new Error("Login failed");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error("Login failed");
      }
    },
  });

  return (
    <MKBox bgColor="#dddeea">
      <DefaultNavbar routes={routes} sticky relative />
      <MKBox
        px={1}
        width="100%"
        height="calc(100vh - 50px)"
        mx="auto"
        position="relative"
        zIndex={2}
        sx={{ maxWidth: "1720px" }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
          pb={6}
        >
          <Grid item xs={11} sm={9} md={6} xl={5}>
            <Card>
              <MKBox borderRadius="lg" mx={2} px={4} pt={3} pb={2} textAlign="center">
                <MKTypography variant="h3" fontWeight="medium" color="black" my={0.8}>
                  Sign Up
                </MKTypography>
              </MKBox>
              <MKBox pt={0.5} pb={3} px={8}>
                <MKBox component="form" role="form" onSubmit={formik.handleSubmit}>
                  <MKBox mb={2.5}>
                    <MKInput
                      name="name"
                      type="text"
                      label="Name"
                      fullWidth
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.name && formik.errors.name)}
                      success={formik.touched.name && !formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </MKBox>
                  <MKBox mb={2.5}>
                    <MKInput
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.email && formik.errors.email)}
                      success={formik.touched.email && !formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </MKBox>
                  <MKBox mb={2.5}>
                    <MKInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      fullWidth
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.password && formik.errors.password)}
                      success={formik.touched.password && !formik.errors.password}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                              <SvgIcon color="action" fontSize="small">
                                {showPassword ? <EyeSlashIcon /> : <EyeIcons />}
                              </SvgIcon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MKBox>
                  <MKBox mb={2.5}>
                    <MKInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirm Password"
                      fullWidth
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                      success={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowConfirmPassword} edge="end">
                              <SvgIcon color="action" fontSize="small">
                                {showPassword ? <EyeSlashIcon /> : <EyeIcons />}
                              </SvgIcon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MKBox>
                  {formik.errors.submit && (
                    <MKTypography color="error" variant="body2" mt={0.5}>
                      {formik.errors.submit}
                    </MKTypography>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="contained" color="info" fullWidth type="submit">
                      Continue
                    </MKButton>
                  </MKBox>
                  <MKBox mt={1} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </MKBox>
  );
}

export default SignUpBasic;
