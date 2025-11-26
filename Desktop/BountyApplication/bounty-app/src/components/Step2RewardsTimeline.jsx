import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep2 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toggle } from '../components/ui/Toggle';
import { Textarea } from '../components/ui/Textarea';
import DateInput from './DateInput';
import { MultiSelect } from '../components/ui/MultiSelect';
import { StepNavigation } from '../components/StepNavigation';

const currencyOptions = [
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const sdgOptions = [
  { value: 'SDG1', label: 'No Poverty' },
  { value: 'SDG2', label: 'Zero Hunger' },
  { value: 'SDG3', label: 'Good Health and Well-being' },
  { value: 'SDG4', label: 'Quality Education' },
  { value: 'SDG5', label: 'Gender Equality' },
  { value: 'SDG6', label: 'Clean Water and Sanitation' },
  { value: 'SDG7', label: 'Affordable and Clean Energy' },
  { value: 'SDG8', label: 'Decent Work and Economic Growth' },
  { value: 'SDG9', label: 'Industry, Innovation and Infrastructure' },
  { value: 'SDG10', label: 'Reduced Inequalities' },
  { value: 'SDG11', label: 'Sustainable Cities and Communities' },
  { value: 'SDG12', label: 'Responsible Consumption and Production' },
  { value: 'SDG13', label: 'Climate Action' },
  { value: 'SDG14', label: 'Life Below Water' },
  { value: 'SDG15', label: 'Life on Land' },
  { value: 'SDG16', label: 'Peace, Justice and Strong Institutions' },
  { value: 'SDG17', label: 'Partnerships for the Goals' },
];

export default function Step2RewardsTimeline({ onNext, onPrev }) {
  const navigate = useNavigate();
  const { formData, updateStep2 } = useFormContext();
  const [errors, setErrors] = useState({});

  const data = formData.step2;

  const handleRewardChange = (field, value) => {
    updateStep2({
      reward: { ...data.reward, [field]: value },
    });

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleTimelineChange = (field, value) => {
    if (field === 'expiration_date') {
      updateStep2({
        timeline: { ...data.timeline, expiration_date: value },
      });
    } else {
      updateStep2({
        timeline: {
          ...data.timeline,
          estimated_completion: {
            ...data.timeline.estimated_completion,
            [field]: value,
          },
        },
      });
    }

    if (errors[field] || errors.expiration_date) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors.expiration_date;
        return newErrors;
      });
    }
  };

  const handleImpactToggle = (pressed) => {
    updateStep2({ hasImpactCertificate: pressed });
    
    // Clear error when toggled
    if (errors.impactBriefMessage) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors['impactBriefMessage'];
        return newErrors;
      });
    }
  };

  const handleImpactMessageChange = (value) => {
    updateStep2({ impactBriefMessage: value });
    
    // Clear error when user types
    if (errors.impactBriefMessage) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors['impactBriefMessage'];
        return newErrors;
      });
    }
  };

  const handleSDGChange = (selectedValues) => {
    updateStep2({ sdgs: selectedValues });
    
    // Clear SDG error when user selects options
    if (errors.sdgs && selectedValues.length > 0) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors['sdgs'];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const validation = validateStep2(data);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (onNext) onNext();
    else navigate('/step/3');
  };

  const handleBack = () => {
    if (onPrev) onPrev();
    else navigate('/step/1');
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bounty Reward</h2>
            <p className="text-sm text-muted-foreground">
              Define the reward structure and timeline for your bounty
            </p>
          </div>

          <div className="space-y-8">
            {/* === Reward Section === */}
            <div className="bg-card border border-border rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Bounty Reward
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <Select
                    label="Currency"
                    value={data.reward.currency}
                    onValueChange={(value) =>
                      handleRewardChange('currency', value)
                    }
                    options={currencyOptions}
                    required
                    error={errors.currency}
                  />

                  <Input
                    label="Reward Amount"
                    type="number"
                    value={data.reward.amount || ''}
                    onChange={(e) =>
                      handleRewardChange(
                        'amount',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    required
                    error={errors.amount}
                  />

                  <Input
                    label="How many Winners"
                    type="number"
                    min="1"
                    value={data.reward.winners || ''}
                    onChange={(e) =>
                      handleRewardChange(
                        'winners',
                        parseInt(e.target.value) || 1
                      )
                    }
                    placeholder="1"
                    required
                    error={errors.winners}
                  />
                </div>
              </div>
            </div>

            {/* === Timeline Section === */}
            <div className="bg-card border border-border rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Timeline
              </h3>

              <div className="space-y-4">
                <DateInput
                  label="Expiration Date"
                  value={data.timeline.expiration_date}
                  onChange={(value) =>
                    handleTimelineChange('expiration_date', value)
                  }
                  required
                  error={errors.expiration_date}
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 sm:mb-3">
                    Estimated Completion Time
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <Input
                      label="Days"
                      type="number"
                      min="0"
                      value={data.timeline.estimated_completion.days || ''}
                      onChange={(e) =>
                        handleTimelineChange('days', e.target.value)
                      }
                      placeholder="0"
                    />

                    <Input
                      label="Hours"
                      type="number"
                      min="0"
                      max="23"
                      value={data.timeline.estimated_completion.hours || ''}
                      onChange={(e) =>
                        handleTimelineChange('hours', e.target.value)
                      }
                      placeholder="0"
                    />

                    <Input
                      label="Minutes"
                      type="number"
                      min="0"
                       max="59"
                      value={data.timeline.estimated_completion.minutes || ''}
                      onChange={(e) =>
                        handleTimelineChange('minutes', e.target.value)
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* === Impact & SDGs === */}
            <div className="bg-card border border-border rounded-xl p-4 md:p-6">
              <div className="space-y-4">
                {/* Impact Certificate Toggle with label and toggle side by side */}
                <div className="flex items-start justify-between pb-4 border-b border-border">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Include Impact Certificate
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Provide an impact certificate for contributors
                    </p>
                  </div>
                  
                  <Toggle
                    pressed={data.hasImpactCertificate}
                    onPressedChange={handleImpactToggle}
                  />
                </div>

                {/* Conditional Impact Brief Message */}
                {data.hasImpactCertificate && (
                  <Textarea
                    label="Impact Brief Message"
                    value={data.impactBriefMessage}
                    onChange={(e) =>
                      handleImpactMessageChange(e.target.value)
                    }
                    placeholder="Describe the expected impact..."
                    required
                    error={errors.impactBriefMessage}
                  />
                )}

                {/* SDGs Section with heading */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Sustainable Development Goals (SDGs)
                  </h3>
                  
                  <MultiSelect
                    options={sdgOptions}
                    value={data.sdgs}
                    onValueChange={handleSDGChange}
                    placeholder="Select SDGs"
                    required
                    error={errors.sdgs}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <StepNavigation
            currentStep={2}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={Object.keys(errors).length === 0}
          />
        </div>
      </div>
    </div>
  );
}