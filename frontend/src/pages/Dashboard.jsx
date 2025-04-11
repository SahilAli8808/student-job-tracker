import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import AddJobForm from '../components/AddJobForm';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Student Job Tracker</h1>
      <AddJobForm refresh={fetchJobs} />
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} onDelete={deleteJob} onUpdate={fetchJobs} />
        ))}
      </div>
    </div>
  );
}
