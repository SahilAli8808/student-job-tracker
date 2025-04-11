import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaPaperPlane, FaUserCheck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import JobCard from './JobCard';
import toast from 'react-hot-toast';
import AddJobModal from './AddJobModal'; // Make sure it's imported
const apiUrl = import.meta.env.VITE_API_URL;
const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/jobs`);
     

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
    <div className="mx-16 p-6 min-h-screen  bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 Job Tracker</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <FaPlus className="text-white" /> Add New Job Application
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading jobs...</div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<FaPaperPlane />} title="Total" count={counts.total} color="bg-blue-100" />
            <StatCard icon={<FaUserCheck />} title="Interviews" count={counts.interview} color="bg-purple-100" />
            <StatCard icon={<FaCheckCircle />} title="Offers" count={counts.offer} color="bg-green-100" />
            <StatCard icon={<FaTimesCircle />} title="Rejections" count={counts.rejected} color="bg-red-100" />
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onUpdate={fetchJobs} />
            ))}
          </div>
        </>
      )}

      {showModal && <AddJobModal onClose={() => setShowModal(false)} onAdded={fetchJobs} />}
    </div>
  );
};

const StatCard = ({ icon, title, count, color }) => (
  <div className={`p-4 rounded-xl shadow-sm ${color} transition-transform hover:scale-105`}>
    <div className="flex items-center gap-2 text-gray-700">
      <span className="text-xl">{icon}</span>
      <span className="text-md font-semibold">{title}</span>
    </div>
    <div className="text-3xl font-bold mt-2 text-gray-900">{count}</div>
  </div>
);

export default JobDashboard;
