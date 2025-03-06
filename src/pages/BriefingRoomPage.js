import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Import news data (you'll need to create this file structure)
import newsData from '../data-center/news.js';

const BriefingRoomPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [animateItems, setAnimateItems] = useState(false);
  const newsPerPage = 9;

  useEffect(() => {
    // Filter news based on search term
    const results = newsData.filter(news =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort news by date (most recent first)
    const sortedResults = [...results].sort((a, b) => {
      // Convert dates to timestamp for comparison
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort descending (most recent first)
    });
    
    setFilteredNews(sortedResults);
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateItems(true);
  }, []);

  // Calculate pagination
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setAnimateItems(false);
    setCurrentPage(pageNumber);
    setTimeout(() => setAnimateItems(true), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // Featured news for the top section (most recent news)
  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow">
        {/* Hero Section with Latest Featured News */}
        {featuredNews && searchTerm === '' && (
          <div className="bg-royal-burgundy text-white">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <span className="inline-block px-3 py-1 bg-royal-gold text-white text-sm font-medium rounded-md mb-4">
                    Latest Announcement
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
                    {featuredNews.title}
                  </h1>
                  <p className="text-white/80 mb-6 text-lg">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center mb-6">
                    <FaCalendarAlt className="mr-2 text-royal-gold" />
                    <span className="text-white/70">{featuredNews.date}</span>
                  </div>
                  <Link 
                    to={`/briefing-room/${featuredNews.id}`} 
                    className="inline-block px-6 py-3 bg-royal-gold hover:bg-royal-gold/90 text-white font-medium rounded-md transition-colors duration-300"
                  >
                    Read Full Briefing
                  </Link>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title} 
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-xl" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Briefing Room Title Section */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold text-royal-burgundy mb-2">Briefing Room</h2>
                <p className="text-gray-600 max-w-2xl">
                  Official news, statements, and press releases from the State of Bhari
                </p>
              </div>
              
              {/* Search bar */}
              <div className="mt-6 md:mt-0 w-full md:w-auto">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search news and press releases..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-burgundy/50 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="container mx-auto px-4 py-12">
          {currentNews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h3 className="text-2xl font-serif text-royal-burgundy mb-4">No results found</h3>
              <p className="text-gray-600 mb-6">Please try a different search term</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 bg-royal-burgundy text-white rounded-md hover:bg-royal-burgundy/90 transition-colors"
              >
                View All News
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((news, index) => (
                  <div 
                    key={news.id} 
                    className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform ${
                      animateItems ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <div className="absolute top-0 left-0 bg-royal-burgundy text-white text-xs font-medium px-3 py-1 m-3 rounded">
                        {news.category || 'News'}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FaCalendarAlt className="mr-2 text-royal-gold" />
                        {news.date}
                      </div>
                      <h3 className="font-serif text-xl font-bold mb-3 line-clamp-2 text-gray-900 hover:text-royal-burgundy transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                      <Link 
                        to={`/briefing-room/${news.id}`} 
                        className="inline-flex items-center text-royal-burgundy hover:text-royal-gold font-medium transition-colors"
                      >
                        Read Full Article <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center mr-4 ${
                      currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-royal-burgundy hover:text-royal-gold'
                    }`}
                  >
                    <FaArrowLeft className="mr-2" />
                    Previous
                  </button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                          currentPage === number 
                            ? 'bg-royal-burgundy text-white' 
                            : 'bg-white border border-gray-300 text-royal-burgundy hover:bg-gray-100'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center ml-4 ${
                      currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-royal-burgundy hover:text-royal-gold'
                    }`}
                  >
                    Next
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

    </div>
  );
};

export default BriefingRoomPage;