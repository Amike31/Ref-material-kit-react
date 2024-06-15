/* eslint-disable prettier/prettier */
import team1 from "assets/images/team-5.jpg";
const dJob = {
  id: 1, // id
  img: team1, // string
  title: "Frontend Developer UX", // string
  company: "PT. Sejahtera Bahagia Selamanya PASTI", // string
  location: "Bandung, Indonesia CDN", // string
  salary: [1000000, 5000000], // array integer (monthly salary range)
  datePosted: Date.now(), // date -> kebutuhan filter [ "Any time", "Last 24 hours", "Last 3 days", "Last 7 days", "Last 14 days", "Last 30 days"];
  mode: "Remote", // ["Remote", "Hybrid", "On-site"];
  type: "Full-time", // ["Internship", "Full-time", "Part-time", "Contract"];
  experienceLevel: "Mid Level", // ["Internship", "Junior Level", "Associate", "Mid Level", "Senior Level", "Lead Level"]
  description: "Build web applications using ReactJS",
  advantages: ["Advantage 1", "Advantage 2", "Advantage 3"],
  requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
  responsibilities: ["Responsibility 1", "Responsibility 2", "Responsibility 3"],
  additionalInfo: "Additional Information",
};

const dJobs = Array.from({ length: 14 }, (_, i) => {
  return {
    ...dJob,
    id: i + 1,
    datePosted: Date.now() - i * 86400000,
  };
});
// djobs add djob 30 days and djob 60 days
dJobs.push({
  ...dJob,
  id: 15,
  datePosted: Date.now() - 30 * 86400000,
});
dJobs.push({
  ...dJob,
  id: 16,
  datePosted: Date.now() - 60 * 86400000,
});

import fcv1 from "utils/files/cv1.pdf";
import fcv2 from "utils/files/cv2.pdf";
import fcv3 from "utils/files/cv3.pdf";
import fdefcv from "utils/files/defcv.pdf";

const cv1 = { name: fcv1.split("/").pop(), file: fcv1 };
const cv2 = { name: fcv2.split("/").pop(), file: fcv2 };
const cv3 = { name: fcv3.split("/").pop(), file: fcv3 };
const defcv = { name: fdefcv.split("/").pop(), file: fdefcv };
const recent = [defcv, cv1, cv2, cv3];



export { dJobs, recent };
