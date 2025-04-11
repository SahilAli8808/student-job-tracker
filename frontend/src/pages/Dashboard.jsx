import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import AddJobForm from '../components/AddJobForm';
import axios from 'axios';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get('/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = async (data) => {
    const res = await axios.post('/api/jobs', data);
    setJobs([...jobs, res.data]);
  };

  const handleUpdate = async (id, status) => {
    await axios.patch(`/api/jobs/${id}`, { status });
    setJobs(jobs.map((job) => (job._id === id ? { ...job, status } : job)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/jobs/${id}`);
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <AddJobForm onAdd={handleAdd} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;