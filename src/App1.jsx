import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/HireEditor/Page';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Footer from './Components/Footer';
import Homepage2 from './Components/Homepage2';
import Aieditor from './Components/Aieditor';
import BusinessGrowth from './Components/BusinessGrowth';
import Testimonials from './Components/Testimonials';
import JoinPage from './Components/Join/Join';
import SignupPage from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import CreateProfile from './Components/CreateProfile/create-profile';
import VideoEditorDashboard from './Components/EditorDashboard/editorDashboard';
import ContactUs from './Components/Contactus/Contactus';
import ReviewPage from './Components/ReviewPage';
import ChatInterface from './Components/ChatPage/ChatInterface';
import PricingTiers from './Components/Profile/pricing-tiers';
import Dashboard from './Components/ClientDashboard/Dashboard';
import AboutUs from './Components/AboutUs/Aboutus';
import JobPage from './Components/JobPage/Jobpage';
import ProfilePage from './Components/Profile/Profile';
import EmailVerification from './Components/Signup/EmailVerification';
import PasswordRecovery from './Components/Login/password_recovery';
import JobPosting from './Components/JobPost/Page';
import ProjectPage from './Components/ProjectManagement/Page';
import PaymentPage from './Components/PaymentPage/Payment';
import JobProfile from './Components/JobProfilePage/Page';
import ProjectWorkspace from './Components/ProjectManagement/ProjectWorkspace';
import FAQPage from './Components/Faqs/FaqsPage';
import EditorPaymentDetails from './Components/EditorPaymentDetails/Page';
import FindEditorsPage from './Components/EditorsPage/Page';
import WorkYourWay from './Components/WorkYourWay';
import HowItWorks from './Components/HowitWorks';
import PopularServices from './Components/PopularService';
import Suite from './Components/Suite';
import TrendingGigs from './Components/GigsSection';
import OnboardingPage from './Components/TypeOfEditorPopup';
import TeamMembers from './Components/TeamMembers/TeamMembers';
import PortfolioPage from './Components/Portfolio';
import BlogPage from './Components/Blog';

function NavbarPage() {
  return (
    <Router>
      <Navbar /> {/* Navbar always rendered */}
      <div style={{ paddingTop: '5rem' }}> {/* Reserve space for the fixed Navbar */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <TrendingGigs></TrendingGigs>
                <Aieditor />
                <PopularServices></PopularServices>
                <Homepage2 />
                <BusinessGrowth />
                <WorkYourWay></WorkYourWay>
                <HowItWorks></HowItWorks>
                <Suite></Suite>
                <Testimonials />
              </>
            }
          />
          <Route path="/hireeditor" element={<Home />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/editor-dashboard" element={<VideoEditorDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/findwork" element={<JobPage />} />
          <Route path="/jobposting" element={<JobPosting />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/pricing" element={<PricingTiers />} />
          <Route path="/client-dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/verify-email/:email" element={<EmailVerification />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/jobprofile" element={<JobProfile />} />
          <Route path="/project-workspace" element={<ProjectWorkspace />} />
          <Route path="/editor-payment" element={<EditorPaymentDetails />} />
          <Route path="/editors" element={<FindEditorsPage />} />
          <Route path="/pop" element={<OnboardingPage />} />
          <Route path="/team" element={<TeamMembers />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
\          
         

        </Routes>
      </div>
      <Footer /> {/* Footer always rendered */}
    </Router>
  );
}

export default NavbarPage;
