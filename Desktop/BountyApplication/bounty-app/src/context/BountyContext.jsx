import React, { createContext, useContext, useState } from 'react';

const BountyContext = createContext();

export const useBounty = () => {
  const context = useContext(BountyContext);
  if (!context) {
    throw new Error('useBounty must be used within a BountyProvider');
  }
  return context;
};

export const BountyProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    title: '',
    description: '',
    type: '',
    dominant_core: '',
    mode: 'digital',
    location: '',
    
    // Step 2: Rewards & Timeline
    reward: {
      currency: 'USD',
      amount: '',
      winners: 1
    },
    timeline: {
      expiration_date: '',
      estimated_completion: {
        days: 0,
        hours: 0,
        minutes: 0
      }
    },
    hasImpactCertificate: false,
    impactBriefMessage: '',
    sdgs: [],
    
    // Step 3: Backer Information
    has_backer: false,
    backer: {
      name: '',
      logo: '',
      message: ''
    },
    terms_accepted: false
  });

  const updateFormData = (data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateRewardData = (data) => {
    setFormData(prev => ({
      ...prev,
      reward: {
        ...prev.reward,
        ...data
      }
    }));
  };

  const updateTimelineData = (data) => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        ...data
      }
    }));
  };

  const updateEstimatedCompletion = (data) => {
    setFormData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        estimated_completion: {
          ...prev.timeline.estimated_completion,
          ...data
        }
      }
    }));
  };

  const updateBackerData = (data) => {
    setFormData(prev => ({
      ...prev,
      backer: {
        ...prev.backer,
        ...data
      }
    }));
  };

  const value = {
    formData,
    updateFormData,
    updateRewardData,
    updateTimelineData,
    updateEstimatedCompletion,
    updateBackerData
  };

  return (
    <BountyContext.Provider value={value}>
      {children}
    </BountyContext.Provider>
  );
};