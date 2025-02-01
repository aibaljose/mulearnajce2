import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              className="h-[200px] w-auto"
              src="https://envs.sh/aOS.png" 
              alt="UXplore Logo" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              About
            </a>
            <a href="#schedule" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Schedule
            </a>
            <a href="#judges" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Judges
            </a>
            <a href="#guidelines" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Guidelines
            </a>
            <Link to="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Register Now
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#schedule"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Schedule
          </a>
          <a
            href="#judges"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Judges
          </a>
          <a
            href="#guidelines"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Guidelines
          </a>
          <Link 
            to="/register"
            className="block px-3 py-2"
          >
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNav;