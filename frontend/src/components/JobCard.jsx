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
      await axios.patch(`/api/jobs/${job._id}`, { status });
      toast.success('Status updated');
      onUpdate();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{job.company}</h2>
        <span className={`px-2 py-1 rounded text-sm text-white ${badgeColor(job.status)}`}>{job.status}</span>
      </div>
      <p className="text-sm">{job.role}</p>
      <p className="text-xs text-gray-500">Applied on: {new Date(job.date).toDateString()}</p>
      <div className="mt-2 flex justify-between items-center">
        <select value={job.status} onChange={e => updateStatus(e.target.value)} className="text-sm p-1 border rounded">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <div className="flex gap-2">
          <a href={job.link} target="_blank" rel="noreferrer" className="text-blue-600"><FaExternalLinkAlt /></a>
          <button onClick={handleDelete} className="text-red-600"><FaTrash /></button>
        </div>
      </div>
    </div>
  );
};

const badgeColor = (status) => {
  switch (status) {
    case 'Applied': return 'bg-blue-400';
    case 'Interview': return 'bg-purple-500';
    case 'Offer': return 'bg-green-500';
    case 'Rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default JobCard;