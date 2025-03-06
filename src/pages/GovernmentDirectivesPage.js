import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

// Import directives data
import directivesData from '../data-center/government-directives.js';

const GovernmentDirectivesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDirectives, setFilteredDirectives] = useState([]);
  const directivesPerPage = 10;

  useEffect(() => {
    // Filter directives based on search term
    const results = directivesData.filter(directive =>
      directive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directive.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDirectives(results);
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const indexOfLastDirective = currentPage * directivesPerPage;
  const indexOfFirstDirective = indexOfLastDirective - directivesPerPage;
  const currentDirectives = filteredDirectives.slice(indexOfFirstDirective, indexOfLastDirective);
  const totalPages = Math.ceil(filteredDirectives.length / directivesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="gov-page directives-theme">
      {/* Header Section */}
      <div className="gov-header">
        <div className="gov-header-overlay"></div>
        <div className="gov-header-content">
          <h1 className="gov-header-title">Government Directives</h1>
          <p className="gov-header-subtitle">
            Official policies and regulations from ministerial bodies
          </p>
        </div>
      </div>

      <div className="gov-content">
        <div className="gov-container">
          {/* Search bar */}
          <div className="gov-search-section">
            <div className="gov-search-bar">
              <input
                type="text"
                placeholder="Search government directives..."
                className="gov-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="gov-search-icon" />
            </div>
          </div>

          {/* Results count */}
          <div className="gov-results-count">
            <p>Showing {filteredDirectives.length} {filteredDirectives.length === 1 ? 'directive' : 'directives'}</p>
          </div>

          {/* Directives list */}
          {currentDirectives.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-serif mb-4">No results found</h3>
              <p>Please try a different search term</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentDirectives.map((directive) => (
                <div key={directive.id} className="gov-card">
                  <div className="gov-card-content">
                    <p className="gov-card-date">
                      <FaCalendarAlt className="mr-2" />{directive.date}
                    </p>
                    <h3 className="gov-card-title">{directive.title}</h3>
                    <p className="gov-card-excerpt">{directive.excerpt}</p>
                    <Link 
                      to={`/government-directives/${directive.id}`} 
                      className="gov-card-link"
                    >
                      Read Full Directive <span className="ml-1">→</span>
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

export default GovernmentDirectivesPage;