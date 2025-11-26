# Bounty Creation Application Platform

This is a 3-step "Add Bounty" wizard that simulates a simplified version of a real-world bounty creation flow.

## Project Overview

This application allows users to create bounties through a multi-step form with validation, state persistence, sidebar navigation, and final payload logging. The form includes three steps:

1. **Basic Details** - Capture bounty title, description, type, impact core, and mode
2. **Rewards & Timeline** - Define reward structure, timeline, and impact certificate
3. **Backer Information** - Add backer details and accept terms

After submission, users are redirected to a confirmation screen and then to a results page displaying the full JSON payload.

## Technology Stack

- **React** - Frontend library for building user interfaces
- **Vite** - Fast build tool and development server
- **JavaScript** - Programming language
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Declarative routing for React applications

## Code Structure

```
/src
├── components/          # Reusable UI components
├── context/             # React context for state management
├── utils/               # Utility functions
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

### Components

- **Input** - Reusable text input component with validation
- **Textarea** - Reusable textarea component with validation
- **Select** - Reusable select dropdown component
- **RadioGroup** - Reusable radio button group component
- **Toggle** - Reusable toggle switch component
- **Button** - Reusable button component with variants
- **MultiSelect** - Reusable multi-select component
- **DateInput** - Reusable date input component
- **FileUpload** - Reusable file upload component
- **Step1Basics** - First step of the wizard
- **Step2RewardsTimeline** - Second step of the wizard
- **Step3BackerInformation** - Third step of the wizard
- **StepNavigation** - Navigation component with back/next buttons
- **ConfirmationPage** - Confirmation screen after submission
- **ResultsPage** - Results page displaying the JSON payload

### Context

- **FormContext** - Manages the form state across all steps

### Utilities

- **validation.js** - Form validation functions for each step
- **generatePayload.js** - Function to generate the final bounty payload

## Setup & Run Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open your browser to the provided URL (typically http://localhost:5173)

## Build & Deployment Instructions

To build the application for production:
```
npm run build
```

The build output will be in the `dist` folder, which can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

To preview the production build locally:
```
npm run preview
```

## Features

- Responsive design using Tailwind CSS
- Multi-step form with validation
- State persistence across steps
- Sidebar navigation with current step highlighting
- Form validation with clear error messages
- Reusable UI components
- Clean and organized folder structure
- JSON payload display on results page

## Assumptions & Limitations

- File uploads are simulated with file name storage (in a real application, this would upload files to a server)
- All data is stored in React context and is not persisted to a backend
- The application is a frontend-only implementation
- Some features like real file upload and backend integration would need to be added for a production environment

## Validation Requirements

All required fields block progression unless valid:
- "Title is required"
- "Amount must be greater than 0"
- Next button is disabled on invalid input

## Navigation & Sidebar

The application includes:
- A left sidebar showing Basics, Rewards, and Backer steps
- Current step highlighting
- User can navigate backward freely
- Navigation to future steps only allowed if previous step is valid
- Each step has Back and Next buttons

## Live Deployment

This application can be deployed to any static hosting service. For deployment to Vercel, Netlify, or GitHub Pages:

1. Build the application using `npm run build`
2. Deploy the contents of the `dist` folder to your hosting provider
3. The application will be accessible at your deployment URL

The deployed version functions exactly like the local build and includes all 3 steps plus confirmation and results pages.