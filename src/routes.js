/** 
  All of the routes for the Project are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "pages/Authentication/SignIn";

import SignUpApplicant from "pages/Authentication/SignUp/Applicant";
import HomeApplicant from "pages/Home/Applicant";
import ApplyCV from "pages/Application/Applicant/ApplyCV";

import SignUpCompany from "pages/Authentication/SignUp/Company";
import HomeCompany from "pages/Home/Company";
import AddJob from "pages/Home/Company/AddJob";

// Sections
import PageHeaders from "layouts/sections/page-sections/page-headers";
import Features from "layouts/sections/page-sections/featuers";
import Navbars from "layouts/sections/navigation/navbars";
import NavTabs from "layouts/sections/navigation/nav-tabs";
import Pagination from "layouts/sections/navigation/pagination";
import Inputs from "layouts/sections/input-areas/inputs";
import Forms from "layouts/sections/input-areas/forms";
import Alerts from "layouts/sections/attention-catchers/alerts";
import Modals from "layouts/sections/attention-catchers/modals";
import TooltipsPopovers from "layouts/sections/attention-catchers/tooltips-popovers";
import Avatars from "layouts/sections/elements/avatars";
import Badges from "layouts/sections/elements/badges";
import BreadcrumbsEl from "layouts/sections/elements/breadcrumbs";
import Buttons from "layouts/sections/elements/buttons";
import Dropdowns from "layouts/sections/elements/dropdowns";
import ProgressBars from "layouts/sections/elements/progress-bars";
import Toggles from "layouts/sections/elements/toggles";
import Typography from "layouts/sections/elements/typography";

const routes = [
  // {
  //   name: "Home",
  //   icon: <Icon>home</Icon>,
  //   route: "/applicant/home",
  //   component: <HomeApplicant />,
  // },
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "applicant",
        collapse: [
          {
            name: "sign in",
            route: "/sign-in",
            component: <SignIn />,
            for: "all",
          },
          {
            name: "sign up applicant",
            route: "/applicant/sign-up",
            component: <SignUpApplicant />,
            for: "all",
          },
          {
            name: "home applicant",
            route: "/applicant/home",
            component: <HomeApplicant />,
            for: "applicant",
          },
          {
            name: "apply cv",
            route: "/applicant/apply-cv/:id",
            component: <ApplyCV />,
            for: "applicant",
          },
        ],
      },
      {
        name: "company",
        collapse: [
          {
            name: "sign up company",
            route: "/company/sign-up",
            component: <SignUpCompany />,
            for: "all",
          },
          {
            name: "home company",
            route: "/company/home",
            component: <HomeCompany />,
            for: "company",
          },
          {
            name: "add job",
            route: "/company/add-job",
            component: <AddJob />,
            for: "company",
          },
        ],
      },
    ],
  },
  // {
  //   name: "sections",
  //   icon: <Icon>view_day</Icon>,
  //   collapse: [
  //     {
  //       name: "elements",
  //       description: "See all 32 examples",
  //       dropdown: true,
  //       collapse: [
  //         {
  //           name: "avatars",
  //           route: "/sections/elements/avatars",
  //           component: <Avatars />,
  //           for: "all",
  //         },
  //         {
  //           name: "badges",
  //           route: "/sections/elements/badges",
  //           component: <Badges />,
  //           for: "all",
  //         },
  //         {
  //           name: "breadcrumbs",
  //           route: "/sections/elements/breadcrumbs",
  //           component: <BreadcrumbsEl />,
  //           for: "all",
  //         },
  //         {
  //           name: "buttons",
  //           route: "/sections/elements/buttons",
  //           component: <Buttons />,
  //           for: "all",
  //         },
  //         {
  //           name: "dropdowns",
  //           route: "/sections/elements/dropdowns",
  //           component: <Dropdowns />,
  //           for: "all",
  //         },
  //         {
  //           name: "progress bars",
  //           route: "/sections/elements/progress-bars",
  //           component: <ProgressBars />,
  //           for: "all",
  //         },
  //         {
  //           name: "toggles",
  //           route: "/sections/elements/toggles",
  //           component: <Toggles />,
  //           for: "all",
  //         },
  //         {
  //           name: "typography",
  //           route: "/sections/elements/typography",
  //           component: <Typography />,
  //           for: "all",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default routes;
