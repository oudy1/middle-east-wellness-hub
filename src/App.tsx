
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import ChatWidget from "@/components/chat/ChatWidget";
import Header from "@/components/Header";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import './App.css';

// The homepage loads right away; every other page downloads only when visited,
// so phones fetch far less before the first screen appears.
const About = lazyWithRetry(() => import("@/pages/About"));
const Services = lazyWithRetry(() => import("@/pages/Services"));
const Resources = lazyWithRetry(() => import("@/pages/Resources"));
const Research = lazyWithRetry(() => import("@/pages/Research"));
const Diseases = lazyWithRetry(() => import("@/pages/Diseases"));
const Webinars = lazyWithRetry(() => import("@/pages/Webinars"));
const PhysicianDirectory = lazyWithRetry(() => import("@/pages/PhysicianDirectory"));
const FamilyPhysician = lazyWithRetry(() => import("@/pages/FamilyPhysician"));
const FamilyPhysicianDirectory = lazyWithRetry(() => import("@/pages/FamilyPhysicianDirectory"));
const FamilyPhysicianCities = lazyWithRetry(() => import("@/pages/FamilyPhysicianCities"));
const FindHealthcareWorkers = lazyWithRetry(() => import("@/pages/FindHealthcareWorkers"));
const Directory = lazyWithRetry(() => import("@/pages/Directory"));
const PhysicianApplication = lazyWithRetry(() => import("@/pages/PhysicianApplication"));
const JoinUs = lazyWithRetry(() => import("@/pages/JoinUs"));
const Volunteer = lazyWithRetry(() => import("@/pages/Volunteer"));
const Contact = lazyWithRetry(() => import("@/pages/Contact"));
const Privacy = lazyWithRetry(() => import("@/pages/Privacy"));
const MentorshipBooking = lazyWithRetry(() => import("@/pages/MentorshipBooking"));
const SupportUs = lazyWithRetry(() => import("@/pages/SupportUs"));
const Programs = lazyWithRetry(() => import("@/pages/Programs"));
const Mentorship = lazyWithRetry(() => import("@/pages/Mentorship"));
const FAQ = lazyWithRetry(() => import("@/pages/FAQ"));
const Glossary = lazyWithRetry(() => import("@/pages/Glossary"));
const AdminLogin = lazyWithRetry(() => import("@/pages/AdminLogin"));
const ResetPassword = lazyWithRetry(() => import("@/pages/ResetPassword"));
const AdminFaqVotes = lazyWithRetry(() => import("@/pages/AdminFaqVotes"));
const AdminOpportunities = lazyWithRetry(() => import("@/pages/AdminOpportunities"));
const AdminVolunteers = lazyWithRetry(() => import("@/pages/AdminVolunteers"));
const PostOpportunity = lazyWithRetry(() => import("@/pages/PostOpportunity"));
const NotFound = lazyWithRetry(() => import("@/pages/NotFound"));

/** Shown for a moment while a page's files download: the menu bar stays put. */
const PageFallback = () => (
  <div className="flex flex-col min-h-screen bg-healthLightGray">
    <Header />
    <main id="main-content" className="flex-grow" aria-busy="true" />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/research" element={<Research />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/recordings" element={<Webinars />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/physician-directory" element={<PhysicianDirectory />} />
            <Route path="/family-physician" element={<FamilyPhysician />} />
            <Route path="/find-healthcare-workers" element={<FindHealthcareWorkers />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/physicians/family" element={<FamilyPhysicianDirectory />} />
            <Route path="/physicians/family/cities" element={<FamilyPhysicianCities />} />
            <Route path="/physicians/family/:citySlug" element={<FamilyPhysicianDirectory />} />
            <Route path="/physicians/apply" element={<PhysicianApplication />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Navigate to="/privacy#terms" replace />} />
            <Route path="/cookies" element={<Navigate to="/privacy#cookies" replace />} />
            <Route path="/mentorship-booking" element={<MentorshipBooking />} />
            <Route path="/support-us" element={<SupportUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/mentorship" element={<Mentorship />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/faq-votes" element={<AdminFaqVotes />} />
            <Route path="/admin/opportunities" element={<AdminOpportunities />} />
            <Route path="/admin/volunteers" element={<AdminVolunteers />} />
            <Route path="/post-opportunity" element={<PostOpportunity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <ChatWidget />
          <Toaster />
          {/* Global polite live region for route/hash navigation announcements. */}
          <div
            id="route-live-region"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />

        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
