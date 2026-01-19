
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Resources from "@/pages/Resources";
import Diseases from "@/pages/Diseases";
import Webinars from "@/pages/Webinars";
import PhysicianDirectory from "@/pages/PhysicianDirectory";
import FamilyPhysician from "@/pages/FamilyPhysician";
import FamilyPhysicianDirectory from "@/pages/FamilyPhysicianDirectory";
import FamilyPhysicianCities from "@/pages/FamilyPhysicianCities";
import PhysicianApplication from "@/pages/PhysicianApplication";
import FindHealthcareWorkers from "@/pages/FindHealthcareWorkers";
import JoinUs from "@/pages/JoinUs";
import Volunteer from "@/pages/Volunteer";
import PostOpportunity from "@/pages/PostOpportunity";
import Contact from "@/pages/Contact";
import MentorshipBooking from "@/pages/MentorshipBooking";
import SupportUs from "@/pages/SupportUs";
import NotFound from "@/pages/NotFound";
import ChatWidget from "@/components/chat/ChatWidget";
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/physician-directory" element={<PhysicianDirectory />} />
            <Route path="/family-physician" element={<FamilyPhysician />} />
            <Route path="/find-healthcare-workers" element={<FindHealthcareWorkers />} />
            <Route path="/physicians/family" element={<FamilyPhysicianDirectory />} />
            <Route path="/physicians/family/cities" element={<FamilyPhysicianCities />} />
            <Route path="/physicians/family/:citySlug" element={<FamilyPhysicianDirectory />} />
            <Route path="/physician-application" element={<PhysicianApplication />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/post-opportunity" element={<PostOpportunity />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentorship-booking" element={<MentorshipBooking />} />
            <Route path="/support-us" element={<SupportUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
