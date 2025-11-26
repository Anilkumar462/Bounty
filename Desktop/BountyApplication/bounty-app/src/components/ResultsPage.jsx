import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bountyData = location.state?.bountyData;

  if (!bountyData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
        <p className="text-gray-600 mb-6">
          No bounty data was found. Please create a bounty first.
        </p>
        <Button onClick={() => navigate('/')}>Create New Bounty</Button>
      </div>
    );
  }

  // Format data safely
  const formattedData = {
    ...bountyData,
    reward: {
      ...bountyData.reward,
      amount: Number(bountyData.reward.amount) || 0
    },
    timeline: {
      ...bountyData.timeline,
      estimated_completion: {
        days: Number(bountyData.timeline.estimated_completion.days) || 0,
        hours: Number(bountyData.timeline.estimated_completion.hours) || 0,
        minutes: Number(bountyData.timeline.estimated_completion.minutes) || 0
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Bounty Results</h2>

      {/* Bounty Details Card */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Bounty Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Detail label="Title" value={bountyData.title} />
          <Detail label="Type" value={bountyData.type} />
          <Detail label="Dominant Core" value={bountyData.dominant_core} />
          <Detail label="Mode" value={bountyData.mode} />

          {bountyData.mode === "physical" && (
            <Detail label="Location" value={bountyData.location} />
          )}
        </div>

        <Section label="Description" value={bountyData.description} />
      </div>

      {/* Reward & Timeline */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Reward & Timeline</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Detail label="Currency" value={bountyData.reward.currency} />
          <Detail label="Amount" value={bountyData.reward.amount} />
          <Detail label="Winners" value={bountyData.reward.winners} />
          <Detail label="Expiration Date" value={bountyData.timeline.expiration_date} />
        </div>

        <Section
          label="Estimated Completion"
          value={`${bountyData.timeline.estimated_completion.days} days, 
          ${bountyData.timeline.estimated_completion.hours} hours, 
          ${bountyData.timeline.estimated_completion.minutes} minutes`}
        />

        {bountyData.hasImpactCertificate && (
          <Section label="Impact Brief" value={bountyData.impactBriefMessage} />
        )}

        {bountyData.SDGs?.length > 0 && (
          <Section label="SDGs" value={bountyData.SDGs.join(", ")} />
        )}
      </div>

      {/* Backer Information */}
      {bountyData.has_backer && bountyData.backer && (
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Backer Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Backer Name" value={bountyData.backer.name} />
            <Detail label="Logo URL" value={bountyData.backer.logo} />
          </div>

          {bountyData.backer.message && (
            <Section label="Message" value={bountyData.backer.message} />
          )}
        </div>
      )}

      {/* JSON Payload */}
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">Full JSON Payload</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(formattedData, null, 2)}
        </pre>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Button onClick={() => navigate('/')}>Create Another Bounty</Button>
      </div>
    </div>
  );
};

export default ResultsPage;

/* Small reusable display components */
const Detail = ({ label, value }) => (
  <div>
    <p className="font-medium text-gray-700">{label}:</p>
    <p className="text-gray-900 mt-1">{value || "—"}</p>
  </div>
);

const Section = ({ label, value }) => (
  <div className="mt-4">
    <p className="font-medium text-gray-700">{label}:</p>
    <p className="text-gray-900 mt-1">{value || "—"}</p>
  </div>
);