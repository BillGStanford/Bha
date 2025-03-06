import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

// Import decrees data
import decreesData from '../data-center/sovereign-decrees.js';

const SovereignDecreesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDecrees, setFilteredDecrees] = useState([]);
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const decreesPerPage = 10;

  // Define months
  const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  // Helper function to get month index from name
  function getMonthIndex(monthName) {
    return months.findIndex(m => m.label === monthName);
  }

  // Parse dates and extract unique years and months
  const parsedDecrees = decreesData.map(decree => {
    // Handle date format like "27th February 2025"
    const dateParts = decree.date.split(' ');
    const month = dateParts[1];
    const year = parseInt(dateParts[2]);
    
    return {
      ...decree,
      parsedDate: {
        day: dateParts[0].replace(/\D/g, ''),
        month,
        monthIndex: getMonthIndex(month),
        year
      }
    };
  });

  // Get unique years from data
  const years = [...new Set(parsedDecrees.map(decree => decree.parsedDate.year))].sort((a, b) => b - a);

  useEffect(() => {
    // Set initial filtered decrees
    setFilteredDecrees(parsedDecrees);
  }, []);

  useEffect(() => {
    // Filter decrees based on search term and date filters
    const results = parsedDecrees.filter(decree => {
      const matchesSearch = decree.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           decree.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply date filters if selected
      const matchesYear = yearFilter ? decree.parsedDate.year === parseInt(yearFilter) : true;
      const matchesMonth = monthFilter !== '' ? decree.parsedDate.monthIndex === parseInt(monthFilter) : true;
      
      return matchesSearch && matchesYear && matchesMonth;
    });
    
    setFilteredDecrees(results);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, yearFilter, monthFilter]);

  // Calculate pagination
  const indexOfLastDecree = currentPage * decreesPerPage;
  const indexOfFirstDecree = indexOfLastDecree - decreesPerPage;
  const currentDecrees = filteredDecrees.slice(indexOfFirstDecree, indexOfLastDecree);
  const totalPages = Math.ceil(filteredDecrees.length / decreesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear all filters
  const clearFilters = () => {
    setYearFilter('');
    setMonthFilter('');
    setSearchTerm('');
  };

  return (
    <div className="gov-page decrees-theme">
      {/* Header Section */}
      <div className="gov-header">
        <div className="gov-header-overlay"></div>
        <div className="gov-header-content">
          <h1 className="gov-header-title">Sovereign Decrees</h1>
          <p className="gov-header-subtitle">
            Official declarations and decisions issued by HH The Amir
          </p>
        </div>
      </div>

      <div className="gov-content">
        <div className="gov-container">
          {/* Search and filter section */}
          <div className="gov-search-section">
            {/* Search bar */}
            <div className="gov-search-bar">
              <input
                type="text"
                placeholder="Search sovereign decrees..."
                className="gov-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="gov-search-icon" />
            </div>

            {/* Date filters */}
            <div className="gov-filter-panel">
              <h3 className="gov-filter-title">Filter by Date</h3>
              <div className="gov-filter-grid">
                {/* Year filter */}
                <div>
                  <label htmlFor="year-filter" className="gov-filter-label">
                    Year
                  </label>
                  <select
                    id="year-filter"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="gov-filter-select"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Month filter */}
                <div>
                  <label htmlFor="month-filter" className="gov-filter-label">
                    Month
                  </label>
                  <select
                    id="month-filter"
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="gov-filter-select"
                  >
                    <option value="">All Months</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active filters display */}
              {(yearFilter || monthFilter !== '' || searchTerm) && (
                <div className="mt-4">
                  <div className="gov-active-filters">
                    {yearFilter && (
                      <span className="gov-filter-tag">
                        Year: {yearFilter}
                        <button 
                          onClick={() => setYearFilter('')}
                          className="ml-2"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {monthFilter !== '' && (
                      <span className="gov-filter-tag">
                        Month: {months[parseInt(monthFilter)].label}
                        <button 
                          onClick={() => setMonthFilter('')}
                          className="ml-2"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {searchTerm && (
                      <span className="gov-filter-tag">
                        Search: "{searchTerm}"
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-2"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={clearFilters}
                    className="gov-clear-filters"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="gov-results-count">
            <p>Showing {filteredDecrees.length} {filteredDecrees.length === 1 ? 'decree' : 'decrees'}</p>
          </div>

          {/* Decrees list */}
          {currentDecrees.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-serif mb-4">No results found</h3>
              <p>Please try different search terms or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentDecrees.map((decree) => (
                <div key={decree.id} className="gov-card">
                  <div className="gov-card-content">
                    <p className="gov-card-date">
                      <FaCalendarAlt className="mr-2" />{decree.date}
                    </p>
                    <h3 className="gov-card-title">{decree.title}</h3>
                    <p className="gov-card-excerpt">{decree.excerpt}</p>
                    <Link 
                      to={`/sovereign-decrees/${decree.id}`} 
                      className="gov-card-link"
                    >
                      Read Full Decree <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="gov-pagination">
              <ul className="gov-pagination-list">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`gov-pagination-button ${
                        currentPage === number ? 'active' : ''
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SovereignDecreesPage;