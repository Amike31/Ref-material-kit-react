import SignIn from "pages/Authentication/SignIn";

import SignUpApplicant from "pages/Authentication/SignUp/Applicant";
import HomeApplicant from "pages/Home/Applicant";
import DetailVacancy from "pages/Home/Applicant/DetailVacancy";
import ApplyCV from "pages/Application/Applicant/ApplyCV";

import SignUpCompany from "pages/Authentication/SignUp/Company";
import HomeCompany from "pages/Home/Company";
import AddJob from "pages/Home/Company/AddJob";
import HistoryCompany from "pages/Application/Company/History";

const routes2 = [
  {
    name: "sign in",
    route: "/sign-in",
    component: <SignIn />,
    display: true,
    for: "all",
  },
  {
    name: "sign up applicant",
    route: "/applicant/sign-up",
    component: <SignUpApplicant />,
    display: true,
    for: "all",
  },
  {
    name: "home applicant",
    route: "/applicant/home",
    component: <HomeApplicant />,
    display: true,
    for: "applicant",
  },
  {
    name: "detail vacancy",
    route: "/detail-vacancy/:id",
    component: <DetailVacancy />,
    display: false,
    for: "all",
  },
  {
    name: "apply cv",
    route: "/applicant/apply-cv/:id",
    component: <ApplyCV />,
    display: false,
    for: "applicant",
  },

  {
    name: "sign up company",
    route: "/company/sign-up",
    component: <SignUpCompany />,
    display: true,
    for: "all",
  },
  {
    name: "home company",
    route: "/company/home",
    component: <HomeCompany />,
    display: true,
    for: "company",
  },
  {
    name: "add job",
    route: "/company/add-job",
    component: <AddJob />,
    display: true,
    for: "company",
  },
  {
    name: "history company",
    route: "/company/history/:jobId",
    component: <HistoryCompany />,
    display: false,
    for: "company",
  },
];

export default routes2;
