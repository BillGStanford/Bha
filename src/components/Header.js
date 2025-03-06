import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaGlobe, FaChevronDown } from 'react-icons/fa';
// Remove the logo import that's causing the error
import logo from '../assets/bhari-logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const mainMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'HM The Sovereign', path: '/sovereign' },
    { name: 'Briefing Room', path: '/briefing-room' },
    { name: 'State of Bhari', path: '/state-of-bhari' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`w-full ${scrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : 'relative'} transition-all duration-300`}>
      {/* Top bar with secondary information */}
      <div className="bg-royal-burgundy text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-white/80">
              Official website of the State of Bhari
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-xs text-white/90 hover:text-white">Press Access</a>
              <a href="#" className="text-xs text-white/90 hover:text-white">Media Resources</a>
              <div className="relative group">
                <button className="flex items-center text-xs text-white/90 hover:text-white">
                  <FaGlobe className="mr-1" /> English <FaChevronDown className="ml-1 text-[10px]" />
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md overflow-hidden z-50 hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 text-xs text-gray-700 hover:bg-royal-burgundy hover:text-white">Arabic</a>
                  <a href="#" className="block px-4 py-2 text-xs text-gray-700 hover:bg-royal-burgundy hover:text-white">French</a>
                  <a href="#" className="block px-4 py-2 text-xs text-gray-700 hover:bg-royal-burgundy hover:text-white">Spanish</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo - replaced with text-based logo to fix the image issue */}
            <Link to="/" className="flex items-center">
              {/* Text-based logo instead of image */}
              <div className={`bg- text-white flex items-center justify-center rounded-lg transition-all duration-300 ${scrolled ? 'h-16 w-16' : 'h-20 w-27'}`}>
              <img src={logo} alt="Bhari State Logo" className="h-32" />
              </div>
              <div className="ml-3">
                <h1 className={`text-royal-burgundy font-serif font-bold transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
                  Royal Office
                </h1>
                <h2 className="text-royal-blue font-serif text-sm">Sovereign Office</h2>
                <p className="text-xs text-gray-600">State of Bhari</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center">
                <button 
                  onClick={toggleSearch} 
                  className="p-2 text-royal-burgundy hover:text-royal-gold transition-colors"
                  aria-label="Search"
                >
                  <FaSearch size={18} />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={toggleSearch} 
                className="p-2 mr-2 text-royal-burgundy"
                aria-label="Search"
              >
                <FaSearch size={20} />
              </button>
              <button 
                onClick={toggleMobileMenu} 
                className="p-2 text-royal-burgundy" 
                aria-label="Menu"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div className={`absolute w-full bg-white shadow-md transition-all duration-300 overflow-hidden z-30 ${
        searchOpen ? 'h-16 opacity-100' : 'h-0 opacity-0'
      }`}>
        <div className="container mx-auto px-4 h-full">
          <form onSubmit={handleSearch} className="flex items-center h-full">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search the website..."
                className="w-full h-10 pl-10 pr-4 border-b border-gray-300 focus:outline-none focus:border-royal-burgundy"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              type="submit" 
              className="ml-4 px-4 py-2 bg-royal-burgundy text-white rounded text-sm"
            >
              Search
            </button>
            <button 
              type="button" 
              className="ml-2 p-2 text-gray-500 hover:text-royal-burgundy"
              onClick={toggleSearch}
            >
              <FaTimes size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className={`bg-gradient-to-r from-royal-burgundy to-royal-burgundy-dark text-white ${mobileMenuOpen ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4">
          <ul className={`lg:flex justify-center py-0 overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96' : 'max-h-0 lg:max-h-full'
          }`}>
            {mainMenuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`block py-3 px-6 text-sm font-medium hover:text-royal-gold transition-colors ${
                    location.pathname === item.path ? 'text-royal-gold' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;