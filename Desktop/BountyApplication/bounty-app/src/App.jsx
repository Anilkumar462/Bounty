import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Step1Basics from './components/Step1Basics';
import Step2RewardsTimeline from './components/Step2RewardsTimeline';
import Step3BackerInformation from './components/Step3BackerInformation';
import ConfirmationPage from './components/ConfirmationPage';
import ResultsPage from './components/ResultsPage';
import { FormProvider } from './context/FormContext';

const BountyWizard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Determine current step based on URL
  const getCurrentStep = () => {
    if (location.pathname.includes('/step/2')) return 2;
    if (location.pathname.includes('/step/3')) return 3;
    if (location.pathname.includes('/confirmation')) return 4;
    if (location.pathname.includes('/results')) return 5;
    return 1;
  };

  const currentStep = getCurrentStep();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 w-full" key={location.pathname}>
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 relative w-full">
              <h1 className="text-3xl font-bold w-full text-center">Bounty Creation Application Platform</h1>
              {/* Hamburger Menu for Mobile */}
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden text-white"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row w-full">
              {/* Sidebar - Hidden on mobile when menu is closed */}
              <div className={`md:block ${isMenuOpen ? 'block' : 'hidden'} md:w-1/4 bg-gray-50 p-6 border-r border-gray-200 md:relative absolute top-0 left-0 h-full w-64 z-10`}>
                {/* Close button for mobile menu */}
                <div className="md:hidden flex justify-end mb-4">
                  <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <div 
                        className={`p-3 rounded-lg cursor-pointer ${currentStep === 1 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
                        onClick={() => closeMenu()}
                      >
                        1 Basics
                      </div>
                    </li>
                    <li>
                      <div 
                        className={`p-3 rounded-lg cursor-pointer ${currentStep === 2 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
                        onClick={() => closeMenu()}
                      >
                        2 Rewards
                      </div>
                    </li>
                    <li>
                      <div 
                        className={`p-3 rounded-lg cursor-pointer ${currentStep === 3 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
                        onClick={() => closeMenu()}
                      >
                        3 Backer
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Form */}
              <div className="md:w-3/4 p-6 w-full">
                <Routes>
                  <Route path="/" element={<Step1Basics />} />
                  <Route path="/step/1" element={<Step1Basics />} />
                  <Route path="/step/2" element={<Step2RewardsTimeline />} />
                  <Route path="/step/3" element={<Step3BackerInformation />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <BountyWizard />
    </FormProvider>
  );
}

export default App;