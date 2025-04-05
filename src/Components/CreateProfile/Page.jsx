import { useState } from "react";
import { motion } from "framer-motion";
import ProgressBar from "./progressBar";
import PersonalDetails from "./Personal";
import ProfessionalOverview from "./professional";
import SkillsPortfolio from "./skills";
import ToolsEquipmentCertifications from "./tools";
import RatesAvailability from "./rates";
import Preview from "./preview";

const steps = [
  { id: "personal", title: "Personal Details" },
  { id: "professional", title: "Professional Overview" },
  { id: "skills", title: "Skills & Portfolio" },
  { id: "experience", title: "Tools, Equipment & Certifications" },
  { id: "rates", title: "Rates & Availability" },
];

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = (stepData) => {
    setFormData({ ...formData, ...stepData });
    setCompletedSteps([...completedSteps, steps[currentStep].id]);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log("Profile submitted", formData);
    alert("Profile submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetails onNext={handleNext} data={formData} />;
      case 1:
        return <ProfessionalOverview onNext={handleNext} onPrev={handlePrev} data={formData} />;
      case 2:
        return <SkillsPortfolio onNext={handleNext} onPrev={handlePrev} data={formData} />;
      case 3:
        return <ToolsEquipmentCertifications onNext={handleNext} onPrev={handlePrev} data={formData} />;
      case 4:
        return <RatesAvailability onPrev={handlePrev} onSubmit={() => setShowPreview(true)} data={formData} />;
      default:
        return null;
    }
  };

  if (showPreview) {
    return <Preview data={formData} onEdit={() => setShowPreview(false)} onSubmit={handleSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-semibold text-gray-900 text-center">Create Your Profile</h1>
        </div>
        <div className="px-8 py-6">
          <ProgressBar steps={steps} currentStep={currentStep} completedSteps={completedSteps} />
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {renderStep()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}