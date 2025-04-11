import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">Student Job Tracker</header>
      <Dashboard />
    </div>
  );
}

export default App;