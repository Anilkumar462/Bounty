import React from "react";
import Button from "./Button";

export const StepNavigation = ({ currentStep, onNext, onBack, canProceed }) => {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
      
      {/* Back button */}
      <Button
        onClick={onBack}
        variant="secondary"
        disabled={currentStep === 1}
        className="min-w-[120px]"
      >
        Back
      </Button>

      {/* Next / Create */}
      <Button
        onClick={onNext}
        variant="primary"
        disabled={!canProceed}
        className="min-w-[150px]"
      >
        {currentStep === 3 ? "Create Bounty" : "Next"}
      </Button>
    </div>
  );
};