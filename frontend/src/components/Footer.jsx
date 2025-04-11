import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Student Job Tracker | Built by Sahil Ali</p>
    </footer>
  );
};

export default Footer;