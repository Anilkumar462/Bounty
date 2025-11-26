import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { validateStep1 } from "../utils/validation";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { RadioGroup } from "../components/ui/RadioGroup";
import { StepNavigation } from "../components/StepNavigation";

const typeOptions = [
  { value: "", label: "Choose Category" },
  { value: "Content", label: "Content" },
  { value: "Design", label: "Design" },
  { value: "Development", label: "Development" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
];

const dominantCoreOptions = [
  { value: "", label: "Choose Core" },
  { value: "Water", label: "Water" },
  { value: "Earth", label: "Earth" },
  { value: "Social", label: "Social" },
  { value: "Energy", label: "Energy" },
];

const modeOptions = [
  { value: "digital", label: "Digital Bounty" },
  { value: "physical", label: "Physical Bounty" },
];

export default function Step1Basics({ onNext }) {
  const navigate = useNavigate();
  const { formData, updateStep1 } = useFormContext();
  const [errors, setErrors] = useState({});

  const data = formData.step1;

  const handleChange = (field, value) => {
    updateStep1({ [field]: value });

    // remove field error when corrected
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleNext = () => {
    const validation = validateStep1(data);

    if (validation.isValid) {
      if (onNext) {
        onNext();
      } else {
        navigate("/step/2");
      }
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bounty Title</h2>
            <p className="text-sm text-muted-foreground">
              Briefly describe what the bounty does
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <Input
              label="Bounty Title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter a title for your bounty"
              maxLength={40}
              required
              error={errors.title}
            />

            <Textarea
              label="Bounty Description"
              value={data.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Provide a detailed description of what you're looking for..."
              required
              error={errors.description}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Select
                label="Bounty Type"
                value={data.type}
                onValueChange={(value) => handleChange("type", value)}
                options={typeOptions}
                required
                error={errors.type}
              />

              <Select
                label="Impact Core"
                value={data.dominant_core}
                onValueChange={(value) => handleChange("dominant_core", value)}
                options={dominantCoreOptions}
                required
                error={errors.dominant_core}
              />
            </div>

            <RadioGroup
              label="Bounty Mode"
              options={modeOptions}
              value={data.mode}
              onChange={(e) => handleChange("mode", e.target.value)}
              name="mode"
              required
              error={errors.mode}
            />

            {data.mode === "physical" && (
              <Input
                label="Location"
                value={data.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Enter the physical location"
                required
                error={errors.location}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="mt-10">
            <StepNavigation
              currentStep={1}
              onNext={handleNext}
              onBack={() => {}}
              canProceed={Object.keys(errors).length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}