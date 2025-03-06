import React from 'react';
import sovereignPhoto from '../assets/office-of-the-sovereign.png'; 
import deputyPhoto from '../assets/crown-prince.jpg'; 

const SovereignPage = ({ isDeputy = false }) => {
  const title = isDeputy ? "HRH The Crown Prince" : "HM The Sovereign";
  const photo = isDeputy ? deputyPhoto : sovereignPhoto;
  const name = isDeputy ? "Prince Edward of Bhari" : "Sovereign Kuma of Bhari";
  const intro = isDeputy 
    ? "His Royal Highness Prince Edward of Bhari, the Crown Prince, works alongside His Majesty in governing the nation and representing its interests domestically and internationally."
    : "His Majesty Sovereign Kuma is the Sovereign of the State of Bhari. Under his visionary leadership, Bhari will become a beacon of prosperity, innovation, and cultural excellence in the region.";

  const biography = isDeputy
    ? `His Royal Highness Prince Edward was born in Addis Ababa, Bhari, in 1975. He received his primary and secondary education in Bhari before pursuing higher studies in Political Science at Oxford University in the United Kingdom.

    HRH The Crown Prince has held various important positions in the government of Bhari, including Minister of Foreign Affairs and Chairman of the Economic Development Board.
    
    His Royal Highness is known for his keen interest in sustainable development, technology, and youth empowerment. He has launched several initiatives to support young entrepreneurs and promote innovation across various sectors.`
    
    : `His Majesty Sovereign Kuma was born in Addis Ababa, Bhari, in 1970. He completed his early education in Bhari before obtaining degrees in International Relations from Georgetown University and an MBA from Harvard Business School.
    
    Since his ascension, His Majesty has focused on transforming Bhari into a modern, prosperous state with a diversified economy. His leadership has been characterized by bold reforms and a commitment to technological advancement.
    
    His Majesty is a strong advocate for environmental sustainability and digital innovation. He has established several foundations and initiatives to address these critical areas.`;

  // Recent activities - sorted with most recent first
  const activities = [
    {
      date: "February 25, 2025",
      title: isDeputy ? "HRH The Crown Prince receives Singapore delegation" : "HM The Sovereign attends Web Summit Bhari 2025"
    },
    {
      date: "February 20, 2025",
      title: isDeputy ? "HRH The Crown Prince opens new Marina development" : "HM The Sovereign chairs Privy Council meeting"
    },
    {
      date: "February 15, 2025",
      title: isDeputy ? "HRH The Crown Prince visits National Museum" : "HM The Sovereign receives Tech Innovation Award"
    }
  ];

  // Recent speeches - sorted with most recent first
  const speeches = [
    {
      title: "National Day Address",
      date: "February 22, 2025",
      url: "#"
    },
    {
      title: "Speech at the Bhari Economic Forum",
      date: "January 15, 2025",
      url: "#"
    },
    {
      title: "Address to the UN General Assembly",
      date: "September 25, 2024",
      url: "#"
    }
  ];

  // Initiatives specific to each royal
  const initiatives = isDeputy 
    ? [
      "Bhari Youth Innovation Fund - Supporting young entrepreneurs",
      "Digital Transformation Initiative - Accelerating technological adoption",
      "Environmental Sustainability Council - Promoting green policies",
      "Cultural Heritage Preservation Program"
    ]
    : [
      "Bhari Vision 2030 - A comprehensive national development plan",
      "Bhari Tech Hub - Establishing a regional technology center",
      "Bhari Sovereign Fund - Strategic national investments",
      "Smart Bhari Initiative - Digital transformation of government services"
    ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="h-64 bg-royal-burgundy flex items-center justify-center">
        <h1 className="text-4xl text-white font-serif font-bold">{title}</h1>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <img 
              src={photo} 
              alt={title} 
              className="w-full rounded-lg shadow-lg mb-6 object-cover aspect-[3/4]"
            />
            
            <div className="bg-luxury-cream p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-xl mb-4 text-royal-burgundy font-bold">Recent Activities</h3>
              <ul className="space-y-4">
                {activities.map((activity, index) => (
                  <li key={index}>
                    <a href="#" className="block hover:text-royal-burgundy transition-colors duration-200">
                      <p className="text-sm text-gray-500">{activity.date}</p>
                      <p className="font-medium">{activity.title}</p>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <a href="#" className="text-royal-burgundy hover:text-royal-gold font-medium inline-flex items-center transition-colors duration-200">
                  View all activities <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-royal-burgundy font-bold">{name}</h2>
            
            <p className="text-lg mb-8 font-medium text-gray-700 leading-relaxed">{intro}</p>
            
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-serif mb-4 text-royal-burgundy font-bold">Biography</h3>
              {biography.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-serif mb-4 text-royal-burgundy font-bold">Initiatives & Achievements</h3>
              <ul className="space-y-3">
                {initiatives.map((initiative, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-royal-gold mr-2 mt-1">•</span>
                    <span className="text-gray-700">{initiative}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-serif mb-4 text-royal-burgundy font-bold">Speeches & Statements</h3>
              <ul className="space-y-4">
                {speeches.map((speech, index) => (
                  <li key={index}>
                    <a 
                      href={speech.url} 
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-luxury-cream transition-colors duration-200"
                    >
                      <h4 className="font-medium text-royal-burgundy">{speech.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{speech.date}</p>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <a href="#" className="text-royal-burgundy hover:text-royal-gold font-medium inline-flex items-center transition-colors duration-200">
                  View all speeches <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignPage;