import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step1: {
      title: '',
      description: '',
      type: '',
      dominant_core: '',
      mode: 'digital',
      location: ''
    },
    step2: {
      reward: {
        currency: 'INR',
        amount: 100,
        winners: 1
      },
      timeline: {
        expiration_date: '',
        estimated_completion: {
          days: 7,
          hours: 0,
          minutes: 0
        }
      },
      hasImpactCertificate: false,
      impactBriefMessage: '',
      sdgs: [],
      failureThreshold: 0
    },
    step3: {
      has_backer: false,
      backer: {
        name: '',
        logo: '',
        message: ''
      },
      terms_accepted: false
    }
  });

  const updateStep1 = (data) => {
    setFormData(prev => ({
      ...prev,
      step1: {
        ...prev.step1,
        ...data
      }
    }));
  };

  const updateStep2 = (data) => {
    setFormData(prev => ({
      ...prev,
      step2: {
        ...prev.step2,
        ...data
      }
    }));
  };

  const updateStep3 = (data) => {
    setFormData(prev => ({
      ...prev,
      step3: {
        ...prev.step3,
        ...data
      }
    }));
  };

  const value = {
    formData,
    updateStep1,
    updateStep2,
    updateStep3
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};