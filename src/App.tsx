import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgencyLanding from './pages/AgencyLanding';
import ComingSoon from './pages/ComingSoon';
import BusinessAnalyzer from './pages/BusinessAnalyzer';
import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AnalysisLoading from './pages/AnalysisLoading';
import AnalysisResults from './pages/AnalysisResults';
import PremiumAccessWrapper from './components/PremiumAccessWrapper';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Router>
      <Analytics/>
      <SpeedInsights/>
      <div className="min-h-screen bg-[#13091D]">
        <Navbar scrollToSection={scrollToSection} />
        <Routes>
          <Route path="/" element={<AgencyLanding />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/business-analyzer" element={
            <PremiumAccessWrapper>
              <BusinessAnalyzer />
            </PremiumAccessWrapper>
          } />
          <Route path="/analysis-loading" element={
            <PremiumAccessWrapper>
              <AnalysisLoading />
            </PremiumAccessWrapper>
          } />
          <Route path="/analysis-results" element={
            <PremiumAccessWrapper>
              <AnalysisResults />
            </PremiumAccessWrapper>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;