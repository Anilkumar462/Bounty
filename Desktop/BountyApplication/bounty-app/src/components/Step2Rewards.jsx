import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep2 } from '../utils/validation';

import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toggle } from '../components/ui/Toggle';
import { Textarea } from '../components/ui/Textarea';
import { MultiSelect } from '../components/ui/MultiSelect';
import { StepNavigation } from '../components/StepNavigation';

const currencyOptions = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
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

export default function Step2Rewards({ onNext }) {
  const navigate = useNavigate();
  const { formData, updateStep2 } = useFormContext();

  const [errors, setErrors] = useState({});
  const [perWinnerAmount, setPerWinnerAmount] = useState(0);
  const [maxImpactPoints, setMaxImpactPoints] = useState(0);

  const data = formData.step2;

  // ---- Live Calculations ----
  useEffect(() => {
    if (data.reward.amount && data.reward.winners) {
      setPerWinnerAmount(data.reward.amount / data.reward.winners);
    } else {
      setPerWinnerAmount(0);
    }

    const points = (data.reward.winners || 0) * (data.failureThreshold || 0);
    setMaxImpactPoints(points);
  }, [data.reward.amount, data.reward.winners, data.failureThreshold]);

  const handleRewardChange = (field, value) => {
    updateStep2({ reward: { ...data.reward, [field]: value } });

    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleImpactToggle = (pressed) => {
    updateStep2({ hasImpactCertificate: pressed });
  };

  const handleImpactMessageChange = (e) => {
    updateStep2({ impactBriefMessage: e.target.value });

    if (errors.impactBriefMessage) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.impactBriefMessage;
        return updated;
      });
    }
  };

  const handleSDGChange = (value) => {
    if (value.length <= 4) {
      updateStep2({ sdgs: value });

      if (errors.sdgs) {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.sdgs;
          return updated;
        });
      }
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

  const handleBack = () => navigate('/step/1');

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full">

        {/* ---------------- HEADER ---------------- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bounty Reward</h1>
          <p className="text-muted-foreground">
            Define the reward structure for your bounty
          </p>
        </div>

        <div className="space-y-10">

          {/* ---------------- BUDGET SECTION ---------------- */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Bounty Reward</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Select
                label="Budget Currency"
                value={data.reward.currency}
                onChange={(e) => handleRewardChange('currency', e.target.value)}
                options={currencyOptions}
                required
                error={errors.currency}
              />

              <Input
                label="Reward Amount"
                type="number"
                value={data.reward.amount || ''}
                onChange={(e) =>
                  handleRewardChange('amount', parseFloat(e.target.value) || 0)
                }
                placeholder="12000"
                required
                error={errors.amount}
              />

              <Input
                label="How many Winners?"
                type="number"
                value={data.reward.winners || ''}
                onChange={(e) =>
                  handleRewardChange('winners', parseInt(e.target.value) || 0)
                }
                placeholder="10"
                required
                error={errors.winners}
              />
            </div>

            {/* PER WINNER AMOUNT */}
            <Input
              label="Each winner will be awarded"
              value={perWinnerAmount > 0 ? perWinnerAmount.toFixed(2) : ''}
              readOnly
            />

            <p className="text-sm font-semibold">
              Maximum impact points allocated: {maxImpactPoints}
            </p>
          </div>

          {/* ---------------- FAILURE THRESHOLD ---------------- */}
          <div className="space-y-6">
            <Input
              label="Set Failure Threshold %"
              type="number"
              value={data.failureThreshold || ''}
              onChange={(e) =>
                updateStep2({ failureThreshold: parseInt(e.target.value) || 0 })
              }
              placeholder="e.g. 5"
              required
              error={errors.failureThreshold}
            />
          </div>

          {/* ---------------- IMPACT CERTIFICATE SECTION ---------------- */}
          <div className="space-y-4">

            {/* TOGGLE + LABEL */}
            <div className="flex items-center gap-4">
              <Toggle
                pressed={data.hasImpactCertificate}
                onPressedChange={handleImpactToggle}
                className={`w-[42px] h-[24px] rounded-full relative transition 
                ${data.hasImpactCertificate ? 'bg-orange-500' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-[18px] h-[18px] bg-white rounded-full transition 
                  ${data.hasImpactCertificate ? 'translate-x-[18px]' : ''}`}
                ></span>
              </Toggle>

              <div>
                <h3 className="text-[15px] font-semibold">Impact Certificate</h3>
                <p className="text-sm text-muted-foreground -mt-1">
                  Do you wish to issue impact certificates for this bounty?
                </p>
              </div>
            </div>

            {/* TEXTAREA (VISIBLE ONLY WHEN TOGGLE ON) */}
            {data.hasImpactCertificate && (
              <Textarea
                label="Impact Certificate Brief"
                value={data.impactBriefMessage}
                onChange={handleImpactMessageChange}
                placeholder="Creating digital assets for fellow guild members"
                required
                error={errors.impactBriefMessage}
                maxLength={100}
              />
            )}
          </div>

          {/* ---------------- SDGs SECTION ---------------- */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">SDGs*</h2>

            <MultiSelect
              label="Select SDGs related to your bounty"
              options={sdgOptions}
              value={data.sdgs || []}
              onChange={handleSDGChange}
              placeholder="Choose upto 4 secondary SDGs (optional)"
            />

            {errors.sdgs && (
              <p className="text-sm text-red-500">{errors.sdgs}</p>
            )}
          </div>
        </div>

        {/* ---------------- NAVIGATION ---------------- */}
        <StepNavigation
          currentStep={2}
          onNext={handleNext}
          onBack={handleBack}
          canProceed={true}
        />
      </div>
    </div>
  );
}
