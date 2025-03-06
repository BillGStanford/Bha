import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

// Import decrees data
import decreesData from '../data-center/sovereign-decrees.js';

const DecreeDetailPage = () => {
  const { id } = useParams();
  const [decree, setDecree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the decree by id
    const foundDecree = decreesData.find(d => d.id === id);
    if (foundDecree) {
      setDecree(foundDecree);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-luxury-cream min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!decree) {
    return (
      <div className="bg-luxury-cream min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">Decree Not Found</h1>
          <p className="mb-8">The decree you are looking for does not exist or has been removed.</p>
          <Link 
            to="/sovereign-decrees" 
            className="bg-royal-gold text-white py-2 px-4 rounded hover:bg-royal-burgundy transition-colors duration-300 inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to All Decrees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-cream min-h-screen">
      <div className="bg-royal-gold text-white py-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/sovereign-decrees" 
            className="text-white mb-6 inline-flex items-center hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to All Decrees
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-4">{decree.title}</h1>
          <p className="text-sm mt-4">
            <FaCalendarAlt className="inline mr-2" />{decree.date}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="prose prose-lg max-w-none">
            {/* Decree content would be rendered here, potentially using dangerouslySetInnerHTML if content includes HTML */}
            <div dangerouslySetInnerHTML={{ __html: decree.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecreeDetailPage;