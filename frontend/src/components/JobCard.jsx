import React from 'react';

const JobCard = ({ job, onUpdate, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold">{job.company}</h2>
      <p className="text-gray-600">{job.role}</p>
      <p className="text-sm text-gray-400">Applied on: {job.date}</p>

      <div className="flex justify-between mt-4">
        <select
          value={job.status}
          onChange={(e) => onUpdate(job._id, e.target.value)}
          className="p-2 rounded border"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <div className="flex gap-2">
          <a href={job.link} target="_blank" className="bg-blue-500 text-white p-2 rounded">View</a>
          <button onClick={() => onDelete(job._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;