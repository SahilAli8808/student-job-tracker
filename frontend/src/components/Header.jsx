import { BsBriefcase } from 'react-icons/bs';

function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <BsBriefcase className="text-2xl mr-3" />
        <h1 className="text-2xl font-bold">Student Job Tracker</h1>
      </div>
    </header>
  );
}

export default Header;