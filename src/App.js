import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import SignInBasic from "pages/Authentication/SignIn";
import SignUpApplicant from "pages/Authentication/SignUp/Applicant";
import SignUpCompany from "pages/Authentication/SignUp/Company";
import HomeApplicant from "pages/Home/Applicant";

import { convertResponseRole } from "utils/functions";

import routes from "utils/enums/routes";

export default function App() {
  const { pathname } = useLocation();

  const getFilteredRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.for === "all") {
        return <Route exact path={route.route} element={route.component} key={route.name} />;
      }

      if (route.for === convertResponseRole(localStorage.getItem("role"))) {
        return <Route exact path={route.route} element={route.component} key={route.name} />;
      }

      return null;
    });

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {localStorage.getItem("token") ? (
          <>
            {getFilteredRoutes(routes)}
            <Route
              path="*"
              element={
                <Navigate to={`/${convertResponseRole(localStorage.getItem("role"))}/home`} />
              }
            />
          </>
        ) : (
          <>
            <Route path="/sign-in" element={<SignInBasic />} />
            <Route path="/applicant/sign-up" element={<SignUpApplicant />} />
            <Route path="/company/sign-up" element={<SignUpCompany />} />
            <Route path="/applicant/home" element={<HomeApplicant />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}
