const statusColors = {
    Applied: 'bg-blue-100 text-blue-700',
    Interview: 'bg-purple-100 text-purple-700',
    Offer: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700'
  };
  
  export default function JobCard({ job, onDelete, onUpdate }) {
    return (
      <div className="p-4 shadow rounded border flex justify-between">
        <div>
          <h2 className="font-bold">{job.company}</h2>
          <p>{job.role}</p>
          <p>Applied on: {new Date(job.date).toLocaleDateString()}</p>
          <span className={`px-2 py-1 text-sm rounded ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onUpdate(job._id)}>Update</button>
          <button onClick={() => onDelete(job._id)}>Delete</button>
        </div>
      </div>
    );
  }
  