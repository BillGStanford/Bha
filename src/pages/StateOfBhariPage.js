import React from 'react';
import { Link } from 'react-router-dom';
import { FaScroll, FaLandmark, FaHistory, FaGlobe, FaUniversity, FaArrowRight } from 'react-icons/fa';

// Import a hero image (you'll need to create this)
import stateBanner from '../assets/palace-building.jpg';

const StateOfBhariPage = () => {
  // Sample data for government branches
  const governmentBranches = [
    {
      title: "Executive",
      description: "Led by the Prime Minister and Cabinet, responsible for implementing laws and managing state affairs.",
      icon: <FaLandmark className="text-2xl" />
    },
    {
      title: "Legislative",
      description: "The Parliament of Bhari debates and passes laws, oversees the government, and represents citizens.",
      icon: <FaScroll className="text-2xl" />
    },
    {
      title: "Judiciary",
      description: "Independent courts uphold the rule of law and administer justice according to Bhari's constitution.",
      icon: <FaUniversity className="text-2xl" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-80 md:h-96 overflow-hidden">
          <img 
            src={stateBanner} 
            alt="State of Bhari Parliament Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-white font-serif text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              The State of Bhari
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md">
              A sovereign nation built on democratic principles, cultural heritage, and progressive vision
            </p>
          </div>
        </div>
        
      </section>
      {/* Official Documents Section */}
      <section className="py-16 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-royal-burgundy text-center mb-12 relative inline-block mx-auto">
            Official State Documents
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-royal-gold"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sovereign Decrees Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-elegant hover:shadow-regal transition-all duration-300 group">
              <div className="p-8 border-t-4 border-royal-burgundy">
                <div className="w-16 h-16 rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-6 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaScroll className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-royal-burgundy">
                  Sovereign Decrees
                </h3>
                <p className="text-neutral-500 text-sm mb-4">
                  Official declarations and decisions issued by HH The Sovereign
                </p>
                <p className="text-neutral-600 mb-6">
                  View all recent Sovereign decisions, orders, and decrees affecting the governance and direction of the State of Bhari.
                </p>
                <Link 
                  to="/sovereign-decrees" 
                  className="inline-flex items-center px-6 py-3 bg-royal-burgundy text-white rounded hover:bg-royal-burgundy-dark transition duration-300 shadow-regal"
                >
                  View All Decrees
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Government Directives Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-elegant hover:shadow-regal transition-all duration-300 group">
              <div className="p-8 border-t-4 border-royal-burgundy">
                <div className="w-16 h-16 rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-6 group-hover:bg-royal-burgundy/20 transition-colors">
                  <FaLandmark className="text-royal-burgundy text-2xl" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-royal-burgundy">
                  Government Directives
                </h3>
                <p className="text-neutral-500 text-sm mb-4">
                  Official policies and regulations from ministerial/agencies bodies
                </p>
                <p className="text-neutral-600 mb-6">
                  Access ministerial decisions, cabinet resolutions, and other governmental directives from the State of Bhari.
                </p>
                <Link 
                  to="/government-directives" 
                  className="inline-flex items-center px-6 py-3 bg-royal-burgundy text-white rounded hover:bg-royal-burgundy-dark transition duration-300 shadow-regal"
                >
                  View All Directives
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-luxury-cream border-b border-royal-gold/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-royal-burgundy mb-8 relative inline-block">
              National Governance
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-royal-gold"></span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed">
              The State of Bhari operates under a constitutional monarchy where the Sovereign serves as Head of State,
              working in concert with a democratically elected government to ensure prosperity, justice, and security for all citizens.
            </p>
            <p className="mb-6 leading-relaxed">
              Our governance system combines traditional values with modern democratic principles,
              supporting sustainable development while preserving our rich cultural heritage.
            </p>
          </div>
        </div>
      </section>


      {/* Additional Resources Section */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-royal-burgundy text-center mb-12 relative inline-block mx-auto">
            Additional Resources
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-royal-gold"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-elegant border-t-3 border-royal-burgundy transition duration-300 hover:shadow-regal">
              <div className="w-12 h-12 rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4">
                <FaHistory className="text-royal-burgundy text-xl" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-royal-burgundy">National History</h3>
              <p className="text-neutral-600 mb-4">
                Explore the rich historical journey of the State of Bhari from its founding to the present day.
              </p>
              <Link 
                to="/state-of-bhari/history" 
                className="inline-flex items-center text-royal-burgundy hover:text-royal-gold font-medium transition-colors"
              >
                Learn More
                <FaArrowRight className="ml-2 text-sm" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-elegant border-t-3 border-royal-burgundy transition duration-300 hover:shadow-regal">
              <div className="w-12 h-12 rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4">
                <FaGlobe className="text-royal-burgundy text-xl" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-royal-burgundy">International Relations</h3>
              <p className="text-neutral-600 mb-4">
                View information about Bhari's diplomatic missions, international agreements, and global partnerships.
              </p>
              <Link 
                to="/state-of-bhari/international" 
                className="inline-flex items-center text-royal-burgundy hover:text-royal-gold font-medium transition-colors"
              >
                Explore
                <FaArrowRight className="ml-2 text-sm" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-elegant border-t-3 border-royal-burgundy transition duration-300 hover:shadow-regal">
              <div className="w-12 h-12 rounded-full bg-royal-burgundy/10 flex items-center justify-center mb-4">
                <FaUniversity className="text-royal-burgundy text-xl" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-royal-burgundy">Legal Framework</h3>
              <p className="text-neutral-600 mb-4">
                Access the constitution, legal codes, and foundational documents of the State of Bhari.
              </p>
              <Link 
                to="/state-of-bhari/legal" 
                className="inline-flex items-center text-royal-burgundy hover:text-royal-gold font-medium transition-colors"
              >
                View Documents
                <FaArrowRight className="ml-2 text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-royal-blue relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
            Serving the People of Bhari
          </h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto mb-10 text-white/90 text-lg">
            The State of Bhari is committed to transparent governance, public service, and creating opportunities 
            for all citizens to participate in our nation's continued development and prosperity.
          </p>
          <Link 
            to="/services/citizens" 
            className="inline-flex items-center px-8 py-4 bg-white text-royal-blue rounded hover:bg-royal-gold hover:text-white transition duration-300 shadow-lg"
          >
            Citizen Services
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StateOfBhariPage;