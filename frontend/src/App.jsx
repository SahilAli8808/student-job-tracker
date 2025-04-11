import React from 'react';
import JobDashboard from './components/JobDashboard';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header/>
      <JobDashboard />
      <Footer/>
    </div>
  );
}

export default App;