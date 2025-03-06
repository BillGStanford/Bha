import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

// Import directives data
import directivesData from '../data-center/government-directives.js';

const DirectiveDetailPage = () => {
  const { id } = useParams();
  const [directive, setDirective] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the directive by id
    const foundDirective = directivesData.find(d => d.id === id);
    if (foundDirective) {
      setDirective(foundDirective);
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

  if (!directive) {
    return (
      <div className="bg-luxury-cream min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">Directive Not Found</h1>
          <p className="mb-8">The directive you are looking for does not exist or has been removed.</p>
          <Link 
            to="/government-directives" 
            className="bg-royal-burgundy text-white py-2 px-4 rounded hover:bg-royal-gold transition-colors duration-300 inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to All Directives
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-cream min-h-screen">
      <div className="bg-royal-burgundy text-white py-12">
        <div className="container mx-auto px-4">
          <Link 
            to="/government-directives" 
            className="text-white mb-6 inline-flex items-center hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to All Directives
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-4">{directive.title}</h1>
          <p className="text-sm mt-4">
            <FaCalendarAlt className="inline mr-2" />{directive.date}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="prose prose-lg max-w-none">
            {/* Directive content would be rendered here, potentially using dangerouslySetInnerHTML if content includes HTML */}
            <div dangerouslySetInnerHTML={{ __html: directive.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectiveDetailPage;