import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SovereignPage from './pages/SovereignPage';
import BriefingRoomPage from './pages/BriefingRoomPage';
import NewsArticlePage from './pages/NewsArticlePage';
import StateOfBhariPage from './pages/StateOfBhariPage';
import SovereignDecreesPage from './pages/SovereignDecreesPage';
import GovernmentDirectivesPage from './pages/GovernmentDirectivesPage';
import DecreeDetailPage from './pages/DecreeDetailPage';
import DirectiveDetailPage from './pages/DirectiveDetailPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sovereign" element={<SovereignPage />} />
            <Route path="/deputy-sovereign" element={<SovereignPage isDeputy={true} />} />
            <Route path="/briefing-room" element={<BriefingRoomPage />} />
            <Route path="/briefing-room/:id" element={<NewsArticlePage />} />
            <Route path="/state-of-bhari" element={<StateOfBhariPage />} />
            <Route path="/sovereign-decrees" element={<SovereignDecreesPage />} />
            <Route path="/sovereign-decrees/:id" element={<DecreeDetailPage />} />
            <Route path="/government-directives" element={<GovernmentDirectivesPage />} />
            <Route path="/government-directives/:id" element={<DirectiveDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;