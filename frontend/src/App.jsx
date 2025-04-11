import React from 'react';
import JobDashboard from './components/JobDashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <JobDashboard />
    </div>
  );
}

export default App;