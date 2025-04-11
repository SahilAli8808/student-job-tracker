import { useState } from 'react';
import axios from 'axios';

export default function AddJobForm({ refresh }) {
  const [job, setJob] = useState({ company: '', role: '', status: 'Applied', date: '', link: '' });

  const submit = async () => {
    await axios.post('http://localhost:5000/api/jobs', job);
    refresh();
  };

  return (
    <div className="flex flex-col gap-2">
      <input placeholder="Company" onChange={(e) => setJob({ ...job, company: e.target.value })} />
      <input placeholder="Role" onChange={(e) => setJob({ ...job, role: e.target.value })} />
      <select onChange={(e) => setJob({ ...job, status: e.target.value })}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" onChange={(e) => setJob({ ...job, date: e.target.value })} />
      <input placeholder="Link" onChange={(e) => setJob({ ...job, link: e.target.value })} />
      <button onClick={submit} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </div>
  );
}
