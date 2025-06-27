
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
import PhysicianApplication from "@/pages/PhysicianApplication";
import Contact from "@/pages/Contact";
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
            <Route path="/physician-application" element={<PhysicianApplication />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
