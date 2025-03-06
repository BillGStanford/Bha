import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaChevronRight
} from 'react-icons/fa';
import footerLogo from '../assets/bhariflag.jpg'; // You'll need to create this logo

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'HM The Sovereign', path: '/sovereign' },
    { name: 'HRH The Crown Prince', path: '/deputy-sovereign' },
    { name: 'Briefing Room', path: '/briefing-room' },
    { name: 'State of Bhari', path: '/state-of-bhari' },
  ];
  
  const socialLinks = [
    { icon: <FaFacebook size={20} />, url: '#', name: 'Facebook' },
    { icon: <FaTwitter size={20} />, url: '#', name: 'Twitter' },
    { icon: <FaInstagram size={20} />, url: '#', name: 'Instagram' },
    { icon: <FaYoutube size={20} />, url: '#', name: 'YouTube' },
  ];

  return (
    <footer className="bg-royal-burgundy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <div className="flex items-start mb-4">
              <img src={footerLogo} alt="State of Bhari" className="h-16 mr-3" />
              <div>
                <h3 className="text-xl font-serif font-bold">Sovereign Office</h3>
                <p className="text-sm text-white/70">State of Bhari</p>
              </div>
            </div>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              The official website of the State of Bhari's Sovereign Office. Providing 
              information about royal activities, state affairs, and government initiatives 
              to citizens and the international community.
            </p>
            
            <h4 className="text-lg font-serif mb-4">Connect With Us</h4>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-royal-gold transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 relative pl-4 border-l-2 border-royal-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="inline-flex items-center text-sm text-white/80 hover:text-royal-gold transition-colors"
                  >
                    <FaChevronRight className="mr-2 text-xs text-royal-gold" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-sm text-white/70 mb-4 md:mb-0">
              &copy; {currentYear} Sovereign Office of the State of Bhari. All Rights Reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;