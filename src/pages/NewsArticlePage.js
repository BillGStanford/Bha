import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaShare, 
  FaPrint, 
  FaBookmark, 
  FaClock, 
  FaTag, 
  FaFileDownload, 
  FaEnvelope, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin 
} from 'react-icons/fa';

// Import news data
import newsData from '../data-center/news.js';

const NewsArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [readingTime, setReadingTime] = useState('');
  const contentRef = useRef(null);
  const shareOptionsRef = useRef(null);

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareOptionsRef.current && !shareOptionsRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Simulate loading delay for better UX
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Find the article by id
      const foundArticle = newsData.find(news => news.id === parseInt(id));
      
      if (foundArticle) {
        setArticle(foundArticle);
        document.title = `${foundArticle.title} | Royal Briefing Room`;
        
        // Calculate reading time (average reading speed: 200 words per minute)
        const wordCount = foundArticle.content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / 200);
        setReadingTime(`${minutes} min read`);
        
        // Get related articles based on category or tags if available
        let filteredNews = [];
        if (foundArticle.category) {
          filteredNews = newsData.filter(news => 
            news.id !== parseInt(id) && 
            news.category === foundArticle.category
          );
        }
        
        // If not enough category-related articles, add some random ones
        if (filteredNews.length < 3) {
          const remainingToFetch = 3 - filteredNews.length;
          const otherArticles = newsData.filter(news => 
            news.id !== parseInt(id) && 
            (!foundArticle.category || news.category !== foundArticle.category)
          );
          const randomAdditional = [...otherArticles]
            .sort(() => 0.5 - Math.random())
            .slice(0, remainingToFetch);
          
          filteredNews = [...filteredNews, ...randomAdditional];
        }
        
        setRelatedArticles(filteredNews.slice(0, 3));
        
        // Check if article is bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
        setBookmarked(bookmarks.includes(parseInt(id)));
      } else {
        // If article not found, set a timeout before redirecting
        setTimeout(() => {
          navigate('/briefing-room');
        }, 3000);
      }
      
      setIsLoading(false);
    }, 800);
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    const articleId = parseInt(id);
    
    if (bookmarked) {
      const updatedBookmarks = bookmarks.filter(item => item !== articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
    }
    
    setBookmarked(!bookmarked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaEmail = () => {
    if (!article) return;
    const subject = encodeURIComponent(article.title);
    const body = encodeURIComponent(`Check out this article: ${article.title}\n\nRead more: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShowShareOptions(false);
  };

  const shareViaTwitter = () => {
    if (!article) return;
    const text = encodeURIComponent(`${article.title} ${window.location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`);
    setShowShareOptions(false);
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
    setShowShareOptions(false);
  };

  const shareViaLinkedIn = () => {
    if (!article) return;
    const title = encodeURIComponent(article.title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${title}`);
    setShowShareOptions(false);
  };

  const downloadPDF = () => {
    alert('PDF download function would be implemented here');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-royal-burgundy border-t-royal-gold rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-serif text-royal-burgundy">Loading briefing...</h2>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-regal max-w-lg">
          <div className="w-20 h-20 mx-auto mb-6 text-royal-burgundy">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif mb-4 text-royal-burgundy">Briefing Not Found</h2>
          <p className="mb-6 text-gray-600">The requested briefing could not be located. You will be redirected to the Briefing Room shortly.</p>
          <Link to="/briefing-room" className="inline-block px-6 py-3 bg-royal-burgundy text-white rounded-md hover:bg-royal-burgundy-dark transition-colors">
            Return to Briefing Room
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-cream min-h-screen print:bg-white" id="article-container">
      {/* Top navigation bar - non-printable */}
      <div className="bg-royal-burgundy text-white py-3 print:hidden">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/briefing-room" className="flex items-center text-white hover:text-royal-gold-light transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Briefing Room
          </Link>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleBookmark} 
              className={`flex items-center ${bookmarked ? 'text-royal-gold' : 'text-white'} hover:text-royal-gold-light transition-colors`}
              title={bookmarked ? "Remove Bookmark" : "Bookmark"}
            >
              <FaBookmark className="mr-1" /> 
              <span className="hidden md:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>
            <div className="relative" ref={shareOptionsRef}>
              <button 
                onClick={handleShare} 
                className="flex items-center text-white hover:text-royal-gold-light transition-colors"
                title="Share"
              >
                <FaShare className="mr-1" /> 
                <span className="hidden md:inline">Share</span>
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 text-gray-800">
                  <button onClick={shareViaEmail} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                    <FaEnvelope className="mr-2 text-gray-600" /> Email
                  </button>
                  <button onClick={shareViaTwitter} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                    <FaTwitter className="mr-2 text-blue-400" /> Twitter
                  </button>
                  <button onClick={shareViaFacebook} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                    <FaFacebook className="mr-2 text-blue-600" /> Facebook
                  </button>
                  <button onClick={shareViaLinkedIn} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left">
                    <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={handlePrint} 
              className="flex items-center text-white hover:text-royal-gold-light transition-colors"
              title="Print"
            >
              <FaPrint className="mr-1" /> 
              <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero image with title overlay */}
      <div className="relative h-72 md:h-96 lg:h-[500px] print:h-64">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="container mx-auto">
            {article.category && (
              <span className="inline-block px-3 py-1 bg-royal-gold text-white text-sm font-medium rounded-md mb-4">
                {article.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" /> {article.date}
              </div>
              {readingTime && (
                <div className="flex items-center">
                  <FaClock className="mr-2" /> {readingTime}
                </div>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center">
                  <FaTag className="mr-2" /> {article.tags.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-elegant p-6 md:p-8 relative">
              {/* Official seal watermark - visible only in print mode */}
              <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center hidden print:flex">
                <div className="w-1/2 aspect-square rounded-full border-8 border-royal-burgundy flex items-center justify-center">
                  <div className="text-center text-royal-burgundy">
                    <div className="text-xs font-serif uppercase tracking-widest">Official</div>
                    <div className="text-xl font-serif font-bold">Royal Office</div>
                    <div className="text-xs font-serif uppercase tracking-widest">State of Bhari</div>
                  </div>
                </div>
              </div>
              
              {/* Article metadata - visible in both print and screen */}
              <div className="mb-6 pb-4 border-b border-gray-200 print:mb-8 print:pb-6 print:border-gray-300">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <span className="font-medium text-royal-burgundy mr-2">Published:</span> {article.date}
                </div>
                {article.author && (
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="font-medium text-royal-burgundy mr-2">By:</span> {article.author}
                  </div>
                )}
                {article.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-royal-burgundy mr-2">Location:</span> {article.location}
                  </div>
                )}
              </div>

              {/* If there's an excerpt/summary, display it prominently */}
              {article.excerpt && (
                <div className="mb-8 italic text-lg text-gray-700 border-l-4 border-royal-gold pl-4 py-2">
                  {article.excerpt}
                </div>
              )}

              {/* Article content - split by paragraphs */}
              <div className="prose max-w-none text-gray-800" ref={contentRef}>
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">{paragraph.trim()}</p>
                ))}
              </div>

              {/* Article footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                {/* Tags if available */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Related Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Link 
                          key={index}
                          to={`/briefing-room?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons for the article - non-printable */}
                <div className="flex flex-wrap gap-4 print:hidden">
                  <button 
                    onClick={downloadPDF} 
                    className="flex items-center px-4 py-2 bg-royal-burgundy text-white rounded-md hover:bg-royal-burgundy-dark transition-colors"
                  >
                    <FaFileDownload className="mr-2" /> Download PDF
                  </button>
                  <button 
                    onClick={toggleBookmark} 
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      bookmarked 
                        ? 'bg-royal-gold text-white hover:bg-royal-gold-dark' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaBookmark className="mr-2" /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={handleShare} 
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <FaShare className="mr-2" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles Section - non-printable */}
            <div className="mt-8 bg-white rounded-lg shadow-elegant p-6 md:p-8 print:hidden">
              <h3 className="font-serif text-2xl font-bold mb-6 text-royal-burgundy">Related Briefings</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map(related => (
                  <div key={related.id} className="group">
                    <Link to={`/briefing-room/${related.id}`} className="block">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        {related.category && (
                          <div className="absolute top-0 left-0 bg-royal-burgundy text-white text-xs font-medium px-2 py-1 m-2 rounded">
                            {related.category}
                          </div>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-lg mb-2 group-hover:text-royal-burgundy transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">{related.date}</p>
                      {related.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2">{related.excerpt}</p>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/briefing-room" 
                  className="inline-block px-6 py-3 bg-royal-burgundy text-white rounded-md hover:bg-royal-burgundy-dark transition-colors"
                >
                  View All Briefings
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - non-printable */}
          <div className="lg:w-1/4 print:hidden">
            {/* Recent News Widget */}
            <div className="bg-white rounded-lg shadow-elegant p-6 mb-6">
              <h3 className="font-serif text-xl font-bold mb-4 text-royal-burgundy pb-2 border-b border-gray-200">
                Recent Briefings
              </h3>
              <div className="space-y-4">
                {relatedArticles.map(related => (
                  <div key={related.id} className="group">
                    <Link to={`/briefing-room/${related.id}`} className="block">
                      <div className="flex flex-col">
                        <img 
                          src={related.image} 
                          alt={related.title} 
                          className="w-full h-32 object-cover rounded mb-2 transition-opacity group-hover:opacity-90" 
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-royal-burgundy transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{related.date}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link to="/briefing-room" className="text-royal-burgundy hover:text-royal-gold font-medium">
                  View All Briefings →
                </Link>
              </div>
            </div>

            {/* Royal Office Contact Information */}
            <div className="bg-royal-burgundy text-white rounded-lg shadow-regal p-6">
              <h3 className="font-serif text-xl font-bold mb-4">Royal Press Office</h3>
              <p className="mb-4 text-white/90">For press inquiries and official statements, please contact the Royal Press Office.</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <FaEnvelope className="text-royal-gold" />
                  </div>
                  <div className="ml-3">
                    <p className="text-white/80 font-medium">Email:</p>
                    <a href="mailto:press@royaloffice.bhari.gov" className="text-white hover:text-royal-gold-light transition-colors">
                      press@royaloffice.bhari.gov
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-royal-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-white/80 font-medium">Phone:</p>
                    <a href="tel:+1234567890" className="text-white hover:text-royal-gold-light transition-colors">
                      +123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-royal-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-white/80 font-medium">Office Hours:</p>
                    <p className="text-white">Mon-Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <Link 
                  to="/contact" 
                  className="inline-block w-full py-3 bg-royal-gold text-white text-center rounded-md hover:bg-royal-gold-dark transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer - non-printable */}
      <div className="bg-royal-burgundy text-white py-4 mt-12 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Royal Office of Bhari. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;