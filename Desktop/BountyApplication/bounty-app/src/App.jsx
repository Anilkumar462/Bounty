import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Step1Basics from './components/Step1Basics';
import Step2RewardsTimeline from './components/Step2RewardsTimeline';
import Step3BackerInformation from './components/Step3BackerInformation';
import ConfirmationPage from './components/ConfirmationPage';
import ResultsPage from './components/ResultsPage';
import React from 'react';
import { FormProvider } from './context/FormContext';
import AppContent from './AppContent';

const BountyWizard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 w-full">
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            <AppContent />
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