import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Step1Basics from './components/Step1Basics';
import Step2RewardsTimeline from './components/Step2RewardsTimeline';
import Step3BackerInformation from './components/Step3BackerInformation';
import ConfirmationPage from './components/ConfirmationPage';
import ResultsPage from './components/ResultsPage';

export default function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Determine current step based on URL
  const getCurrentStep = () => {
    if (location.pathname.includes('/step/1')) return 1;
    if (location.pathname.includes('/step/2')) return 2;
    if (location.pathname.includes('/step/3')) return 3;
    if (location.pathname.includes('/confirmation')) return 4;
    if (location.pathname.includes('/results')) return 5;
    return 1;
  };

  const currentStep = getCurrentStep();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const goToStep = (step) => {
    closeSidebar();
    switch(step) {
      case 1:
        navigate('/step/1');
        break;
      case 2:
        navigate('/step/2');
        break;
      case 3:
        navigate('/step/3');
        break;
      case 4:
        navigate('/confirmation');
        break;
      case 5:
        navigate('/results');
        break;
      default:
        navigate('/step/1');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold relative">
        <button 
          className="md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        Bounty Creation Application Platform
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row p-4 gap-6">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed md:relative z-50 md:z-auto inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white rounded-lg p-4 shadow md:static md:w-1/4`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-lg font-bold">Menu</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={closeSidebar}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex md:flex-col gap-4">
            <button 
              onClick={() => goToStep(1)}
              className={`flex-1 md:flex-none p-2 rounded text-left ${currentStep === 1 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
            >
              1 Basics
            </button>
            <button 
              onClick={() => goToStep(2)}
              className={`flex-1 md:flex-none p-2 rounded text-left ${currentStep === 2 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
            >
              2 Rewards
            </button>
            <button 
              onClick={() => goToStep(3)}
              className={`flex-1 md:flex-none p-2 rounded text-left ${currentStep === 3 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-700 font-medium'}`}
            >
              3 Backer
            </button>
          </nav>
        </aside>

        {/* Form */}
        <main className="flex-1 bg-white rounded-lg p-6 shadow">
          <Routes>
            <Route path="/" element={<Step1Basics />} />
            <Route path="/step/1" element={<Step1Basics />} />
            <Route path="/step/2" element={<Step2RewardsTimeline />} />
            <Route path="/step/3" element={<Step3BackerInformation />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}