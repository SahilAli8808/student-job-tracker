import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;
const AddJobModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/jobs`, formData);
      toast.success('Application added');
      onAdded();
      onClose();
    } catch (error) {
      toast.error('Add failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Job Application</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {['Company', 'Role', 'Job Link'].map((label, i) => (
            <input
              key={label}
              type={label === 'Job Link' ? 'url' : 'text'}
              placeholder={label}
              value={formData[label.toLowerCase()]}
              onChange={e => setFormData({ ...formData, [label.toLowerCase()]: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Applied</option>
            
          </select>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
