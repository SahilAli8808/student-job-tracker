

// 🔢 Problem 1: Job Tracker Sorting (Medium)
// solutions:
function sortJobsByDate(jobs) {
    // If input is not an array, return an empty array
    if (!Array.isArray(jobs)) return [];
  
    // Create a shallow copy to avoid mutating the original array
    const sortedJobs = [...jobs];
  
    // Sort by appliedDate in descending order (latest date first)
    sortedJobs.sort((jobA, jobB) => {
      const dateA = new Date(jobA.appliedDate);
      const dateB = new Date(jobB.appliedDate);
  
      // If either date is invalid, treat it as the oldest
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
  
      return dateB - dateA; // descending order
    });
  
    return sortedJobs;
  }
 
  const jobApplications = [
    { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01" },
    { company: "Meta", role: "Frontend Intern", appliedDate: "2025-03-15" },
    { company: "Netflix", role: "Backend Intern", appliedDate: "invalid-date" },
    { company: "Amazon", role: "DevOps Intern", appliedDate: "2025-04-05" },
  ];
  
  const sortedJobs = sortJobsByDate(jobApplications);
  console.log(sortedJobs);