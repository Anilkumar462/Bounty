export const validateStep1 = (data) => {
  const errors = {};
  
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 40) {
    errors.title = 'Title must be 40 characters or less';
  }
  
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }
  
  if (!data.type) {
    errors.type = 'Bounty type is required';
  }
  
  if (!data.dominant_core) {
    errors.dominant_core = 'Dominant Impact Core is required';
  }
  
  if (data.mode === 'physical' && !data.location.trim()) {
    errors.location = 'Location is required for physical bounties';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStep2 = (data) => {
  const errors = {};
  
  // Reward validation
  if (!data.reward.currency) {
    errors.currency = 'Currency is required';
  }
  
  if (!data.reward.amount || data.reward.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!data.reward.winners || data.reward.winners <= 0) {
    errors.winners = 'Number of winners must be greater than 0';
  }
  
  // Timeline validation - expiration date is required
  if (!data.timeline.expiration_date) {
    errors.expiration_date = 'Expiration date is required';
  } else if (isNaN(new Date(data.timeline.expiration_date).getTime())) {
    errors.expiration_date = 'Expiration date is invalid';
  }
  
  // Impact Certificate validation
  if (data.hasImpactCertificate && !data.impactBriefMessage.trim()) {
    errors.impactBriefMessage = 'Impact Brief is required';
  }
  
  // SDG validation - at least one SDG must be selected
  if (!data.sdgs || data.sdgs.length === 0) {
    errors.sdgs = 'At least one Sustainable Development Goal must be selected';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateStep3 = (data) => {
  const errors = {};
  
  if (data.has_backer) {
    if (!data.backer.name.trim()) {
      errors.backer_name = 'Backer Name is required';
    }
    
    if (!data.backer.logo.trim()) {
      errors.backer_logo = 'Backer Logo is required';
    }
  }
  
  if (!data.terms_accepted) {
    errors.terms_accepted = 'You must accept the terms and conditions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};