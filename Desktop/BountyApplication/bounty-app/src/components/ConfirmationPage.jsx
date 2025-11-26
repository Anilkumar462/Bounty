import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bountyData = location.state?.bountyData;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results', { state: { bountyData } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, bountyData]);

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-bold mb-4">Bounty Created Successfully!</h2>

      <p className="text-gray-600 mb-6">
        Your bounty "{bountyData?.title || 'Untitled Bounty'}" has been created successfully.
      </p>

      <p className="text-gray-500">Redirecting to the results page...</p>
    </div>
  );
};

export default ConfirmationPage;