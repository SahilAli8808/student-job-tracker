import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaPaperPlane, FaUserCheck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import JobCard from './JobCard';
import toast from 'react-hot-toast';
import AddJobModal from './AddJobModal'; // Make sure it's imported

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      console.log(res.data)
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error('Error loading jobs');
    } finally {
      setLoading(false); // done fetching
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getCount = (status) => jobs.filter(j => j.status === status).length;

  const counts = {
    total: jobs.length,
    interview: getCount('Interview'),
    offer: getCount('Offer'),
    rejected: getCount('Rejected'),
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Applications Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add New Application
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading jobs...</div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<FaPaperPlane />} title="Total Applications" count={counts.total} color="bg-blue-100" />
            <StatCard icon={<FaUserCheck />} title="Interviews" count={counts.interview} color="bg-purple-100" />
            <StatCard icon={<FaCheckCircle />} title="Offers" count={counts.offer} color="bg-green-100" />
            <StatCard icon={<FaTimesCircle />} title="Rejections" count={counts.rejected} color="bg-red-100" />
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onUpdate={fetchJobs} />
            ))}
          </div>
        </>
      )}

      {/* Modal (initially hidden) */}
      {showModal && <AddJobModal onClose={() => setShowModal(false)} onAdded={fetchJobs} />}
    </div>
  );
};

const StatCard = ({ icon, title, count, color }) => (
  <div className={`p-4 rounded shadow-sm ${color}`}>
    <div className="text-sm text-gray-600 flex items-center gap-2">{icon} {title}</div>
    <div className="text-2xl font-bold">{count}</div>
  </div>
);

export default JobDashboard;
