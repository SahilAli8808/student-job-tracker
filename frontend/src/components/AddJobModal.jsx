import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddJobModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Interview',
    date: '',
    link: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      toast.success('Application added');
      onAdded();  // refresh job list
      onClose();  // close modal
    } catch (error) {
      toast.error('Add failed');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // prevents modal from closing when clicking inside
      >
        <h2 className="text-lg font-bold mb-4">Add Job Application</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="url"
            placeholder="Job Link"
            value={formData.link}
            onChange={e => setFormData({ ...formData, link: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
