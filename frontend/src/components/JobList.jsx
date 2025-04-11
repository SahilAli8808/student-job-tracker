import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      toast.success("Job deleted");
      fetchJobs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/${id}`, { status });
      toast.success("Status updated");
      fetchJobs();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{job.company} - {job.role}</h3>
            <p className="text-sm">Status: {job.status}</p>
            <p className="text-sm">Date: {new Date(job.date).toLocaleDateString()}</p>
            <a href={job.link} className="text-blue-500 text-sm" target="_blank" rel="noreferrer">View Link</a>
          </div>
          <div className="flex gap-2">
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job._id, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
