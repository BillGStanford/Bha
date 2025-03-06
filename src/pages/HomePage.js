import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { FaCalendarAlt, FaNewspaper, FaImage, FaVideo, FaArrowRight } from 'react-icons/fa';

// Import news data to use the same source as BriefingRoomPage
import newsData from '../data-center/news.js';

// Import placeholder images (you'll need to create these)
import slide1 from '../assets/office-of-the-sovereign.png';
import slide2 from '../assets/bhariflag.jpg';
// Removed the pattern-overlay.png reference that might cause issues

const HomePage = () => {
  const slides = [
    {
      image: slide1,
      title: "HM The Sovereign Creates New Emblem",
      description: "His Majesty created the New State Emblem"
    },
    {
      image: slide2,
      title: "State of Bhari Has a New Flag",
      description: "The Sovereign Ordered a New Emblem and Flag just Today. 28th of February, 2025"
    },
  ];

  // Get the 3 most recent news items
  // Assuming newsData is sorted with most recent first (by ID or date)
  const latestNews = newsData.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel with improved styling */}
      <div className="relative">
        <Carousel slides={slides} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-white font-serif text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              State of Bhari
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md">
              A sovereign nation committed to progress, innovation and cultural heritage
            </p>
          </div>
        </div>
      </div>
      
      {/* Welcome Section with improved layout */}
      <section className="py-16 bg-luxury-cream border-b border-royal-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl text-royal-burgundy mb-6 relative">
                Welcome to the State of Bhari
                <span className="absolute -bottom-3 left-0 w-24 h-1 bg-royal-gold"></span>
              </h2>
              
              <p className="mb-6 text-lg leading-relaxed">
                The State of Bhari, a jewel on the coastline, is known for its rich cultural heritage, 
                pristine beaches, and progressive vision for a New African Hope and Economic Miracle.
              </p>
              <p className="mb-8 leading-relaxed">
                As a modern nation, Bhari combines traditional values with 
                innovative approaches to governance, economy, and social development.
              </p>
              <Link 
                to="/state-of-bhari" 
                className="inline-flex items-center px-6 py-3 bg-royal-burgundy text-white rounded hover:bg-royal-burgundy-dark transition duration-300 shadow-regal"
              >
                Discover Bhari
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <div className="p-6 bg-white shadow-elegant rounded-lg text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-regal group">
                <div className="w-16 h-16 mx-auto rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaCalendarAlt className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-royal-burgundy">Royal Events</h3>
                <p className="text-neutral-600">View the calendar of official state events and royal activities</p>
              </div>
              
              <div className="p-6 bg-white shadow-elegant rounded-lg text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-regal group">
                <div className="w-16 h-16 mx-auto rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaNewspaper className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-royal-burgundy">Press Releases</h3>
                <p className="text-neutral-600">Access the latest official statements and announcements</p>
              </div>
              
              <div className="p-6 bg-white shadow-elegant rounded-lg text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-regal group">
                <div className="w-16 h-16 mx-auto rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaImage className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-royal-burgundy">Photo Gallery</h3>
                <p className="text-neutral-600">Browse official photographs from state events and ceremonies</p>
              </div>
              
              <div className="p-6 bg-white shadow-elegant rounded-lg text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-regal group">
                <div className="w-16 h-16 mx-auto rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaVideo className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-royal-burgundy">Video Archive</h3>
                <p className="text-neutral-600">Watch videos of speeches, ceremonies and other official activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section with improved card design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-royal-burgundy text-center mb-12 relative inline-block mx-auto">
            Latest News
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-royal-gold"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <div key={news.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-elegant hover:shadow-regal transition-all duration-300 group">
                <div className="overflow-hidden h-52">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-neutral-500 mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2 text-royal-burgundy-light" />
                    {news.date}
                  </p>
                  <h3 className="font-serif text-xl mb-3 text-royal-burgundy group-hover:text-royal-burgundy-dark transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <Link 
                    to={`/briefing-room/${news.id}`} 
                    className="inline-flex items-center text-royal-burgundy hover:text-royal-gold font-medium transition-colors"
                  >
                    Read More
                    <FaArrowRight className="ml-2 text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/briefing-room" 
              className="inline-flex items-center px-6 py-3 bg-royal-burgundy text-white rounded hover:bg-royal-burgundy-dark transition duration-300 shadow-regal"
            >
              View All News
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action with improved background and layout */}
      <section className="py-20 bg-royal-blue relative">
        {/* Removed the background image pattern reference */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
            Experience the Beauty of Bhari
          </h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto mb-10 text-white/90 text-lg">
            From pristine beaches to cultural landmarks, discover what makes the State of Bhari 
            a unique destination for visitors and a beloved home for its citizens.
          </p>
          <Link 
            to="/state-of-bhari" 
            className="inline-flex items-center px-8 py-4 bg-white text-royal-blue rounded hover:bg-royal-gold hover:text-white transition duration-300 shadow-lg"
          >
            Explore Bhari
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
      
      {/* New Featured Services Section */}
    </div>
  );
};

export default HomePage;