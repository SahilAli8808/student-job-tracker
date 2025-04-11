import React, { useState } from 'react';

const AddJobForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ company: '', role: '', status: 'Applied', date: '', link: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ company: '', role: '', status: 'Applied', date: '', link: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-xl max-w-md mx-auto">
      <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="url" name="link" placeholder="Application Link" value={formData.link} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Add Application</button>
    </form>
  );
};

export default AddJobForm;