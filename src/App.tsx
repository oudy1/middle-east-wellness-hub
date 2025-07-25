
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
import PhysicianApplication from "@/pages/PhysicianApplication";
import PostOpportunity from "@/pages/PostOpportunity";
import Contact from "@/pages/Contact";
import MentorshipBooking from "@/pages/MentorshipBooking";
import NotFound from "@/pages/NotFound";
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
            <Route path="/physician-application" element={<PhysicianApplication />} />
            <Route path="/post-opportunity" element={<PostOpportunity />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentorship-booking" element={<MentorshipBooking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
