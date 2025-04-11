import React from 'react';
import JobDashboard from './components/JobDashboard';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <JobDashboard />
      <Footer/>
    </div>
  );
}

export default App;