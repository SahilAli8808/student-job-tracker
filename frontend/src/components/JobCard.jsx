import React from 'react';
import { FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobCard = ({ job, onUpdate }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/jobs/${job._id}`);
      toast.success('Deleted successfully');
      onUpdate();
    } catch {
      toast.error('Delete failed');
    }
  };

  const updateStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs${job._id}`, { status });
      toast.success('Status updated');
      onUpdate();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{job.company}</h2>
          <p className="text-sm text-gray-500">{job.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeColor(job.status)}`}>
          {job.status}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        Applied on: <span className="font-medium">{new Date(job.date).toDateString()}</span>
      </p>

      <div className="flex items-center justify-between">
        <select
          value={job.status}
          onChange={(e) => updateStatus(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <div className="flex items-center gap-3">
          <a
            href={job.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaExternalLinkAlt />
          </a>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

const badgeColor = (status) => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-500';
    case 'Interview':
      return 'bg-purple-500';
    case 'Offer':
      return 'bg-green-500';
    case 'Rejected':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

export default JobCard;
