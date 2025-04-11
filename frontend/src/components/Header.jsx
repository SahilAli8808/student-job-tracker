import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full bg-blue-500 text-white py-4">
      <div className="max-w-7xl mx-6 px-4  flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-xl" />
          <h1 className="text-xl sm:text-2xl font-bold">Student Job Tracker</h1>
        </div>
        <nav className="flex gap-4 text-sm sm:text-base">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#footer" className="hover:underline">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
