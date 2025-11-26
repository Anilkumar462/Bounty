import { validateStep2 } from "./validation";

export const generatePayload = (formData) => {
  const payload = {
    title: formData.step1.title,
    description: formData.step1.description,
    projectTitle: "Project Title...", // This would typically come from form data
    type: formData.step1.type,
    dominant_core: formData.step1.dominant_core,
    mode: formData.step1.mode,
    location: formData.step1.mode === "physical" ? formData.step1.location : undefined,
    reward: {
      currency: formData.step2.reward.currency,
      amount: formData.step2.reward.amount,
      winners: formData.step2.reward.winners
    },
    timeline: {
      expiration_date: formData.step2.timeline.expiration_date,
      estimated_completion: {
        days: formData.step2.timeline.estimated_completion.days,
        hours: formData.step2.timeline.estimated_completion.hours,
        minutes: formData.step2.timeline.estimated_completion.minutes
      }
    },
    hasImpactCertificate: formData.step2.hasImpactCertificate,
    impactBriefMessage: formData.step2.hasImpactCertificate ? formData.step2.impactBriefMessage : undefined,
    SDGs: formData.step2.sdgs && formData.step2.sdgs.length > 0 ? formData.step2.sdgs : undefined,
    has_backer: formData.step3.has_backer,
    backer: formData.step3.has_backer ? {
      name: formData.step3.backer.name,
      logo: formData.step3.backer.logo,
      message: formData.step3.backer.message || undefined
    } : undefined,
    terms_accepted: formData.step3.terms_accepted
  };

  // Remove undefined fields
  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
    
    // Remove undefined nested fields
    if (typeof payload[key] === 'object' && payload[key] !== null) {
      Object.keys(payload[key]).forEach(nestedKey => {
        if (payload[key][nestedKey] === undefined) {
          delete payload[key][nestedKey];
        }
      });
    }
  });

  return payload;
};