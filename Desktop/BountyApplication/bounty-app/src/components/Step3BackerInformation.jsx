import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { validateStep3 } from '../utils/validation';
import { Input } from '../components/ui/Input';
import { FileUpload } from '../components/ui/FileUpload';
import { StepNavigation } from '../components/StepNavigation';
import { generatePayload } from '../utils/generatePayload';
import { Toggle } from '../components/ui/Toggle';
import { Checkbox } from '../components/ui/Checkbox';

export default function Step3BackerInformation({ onNext, onPrev }) {
  const navigate = useNavigate();
  const { formData, updateStep3 } = useFormContext();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const data = formData.step3;

  const handleBackerToggle = (pressed) => {
    updateStep3({ has_backer: pressed });
  };

  const handleBackerChange = (field, value) => {
    // Handle nested backer fields
    if (field.startsWith('backer_')) {
      const backerField = field.replace('backer_', '');
      updateStep3({
        backer: { ...data.backer, [backerField]: value },
      });
    } else {
      updateStep3({ [field]: value });
    }

    // Clear errors for the field
    if (errors[field]) {
      const updated = { ...errors };
      delete updated[field];
      setErrors(updated);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) {
      handleBackerChange('backer_logo', '');
      return;
    }

    // For simplicity, we'll store the file name as the "logo" value
    // In a real app, you might want to upload the file and store a URL
    handleBackerChange('backer_logo', file.name);
  };

  const handleTermsChange = (checked) => {
    updateStep3({ terms_accepted: checked });

    if (errors.terms_accepted) {
      const updated = { ...errors };
      delete updated.terms_accepted;
      setErrors(updated);
    }
  };

  const handleSubmit = () => {
    const validation = validateStep3(data);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      const payload = generatePayload({ ...formData, step3: data });
      console.log("Bounty Payload:", payload);
      if (onNext) {
        onNext();
      } else {
        navigate('/confirmation', { state: { bountyData: payload } });
      }
    }, 1500);
  };

  const handleBack = () => {
    if (onPrev) {
      onPrev();
    } else {
      navigate('/step/2');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Backer Information</h2>
        
      </div>

      <div className="space-y-8">
        {/* Backer Toggle Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">
              Does the bounty have a sponsor or backer?
            </h2>

            {/* Toggle */}
            <Toggle
              pressed={data.has_backer}
              onPressedChange={handleBackerToggle}
            />
          </div>

          <p className="text-muted-foreground mt-2">
         Select this option if you wish to display the bounty sponser/backer's  logo and name on the bounty.
          </p>

          {/* Backer Form Fields */}
          {data.has_backer && (
            <div className="mt-6 space-y-6 pt-6 border-t border-border">
              {/* Backer Name */}
              <Input
                label="Backer Name"
                value={data.backer.name}
                onChange={(e) => handleBackerChange('backer_name', e.target.value)}
                placeholder="Enter backer name"
                required
                error={errors.backer_name}
              />

              {/* Logo Upload */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Upload sponsor or backer's logo*
                </label>

                {/* Display uploaded file and controls */}
                {data.backer.logo && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-muted-foreground mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm truncate max-w-xs">{data.backer.logo}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleFileSelect(null)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove file"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept="image/*"
                  maxSize={2 * 1024 * 1024}
                />

                {errors.backer_logo && (
                  <p className="text-xs text-red-500 mt-1">{errors.backer_logo}</p>
                )}
              </div>

              {/* Sponsor Message */}
              <div>
                <label className="text-sm font-medium text-foreground">
                  Sponsor Message (Optional)
                </label>

                <textarea
                  value={data.backer.message}
                  onChange={(e) => handleBackerChange('backer_message', e.target.value)}
                  placeholder="Add sponsor message if any"
                  maxLength={80}
                  className="
                    mt-2 w-full border border-border rounded-md px-3 py-2 text-sm 
                    bg-background focus:outline-none focus:ring-0 focus:border-black
                  "
                />

                <p className="text-right text-xs text-muted-foreground">
                  {data.backer.message.length}/80
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Terms Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Terms & Conditions</h3>

          <Checkbox
            label="I agree to the terms and conditions for creating a bounty. I confirm all the information provided is accurate and will be publicly visible."
            checked={data.terms_accepted}
            onCheckedChange={handleTermsChange}
            error={errors.terms_accepted}
          />
        </div>

        {/* Submitting Loader */}
        {isSubmitting && (
          <div className="bg-primary/10 border border-primary rounded-xl p-4 text-center">
            <p className="text-primary font-medium">Creating your bounty...</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <StepNavigation
        currentStep={3}
        onNext={handleSubmit}
        onBack={handleBack}
        canProceed={data.terms_accepted && !isSubmitting}
        isLastStep
      />
    </div>
  );
}