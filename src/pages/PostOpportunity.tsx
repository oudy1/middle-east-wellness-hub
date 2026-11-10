import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import PostOpportunityForm from "@/components/PostOpportunityForm";

import { SEOHead } from "@/components/SEOHead";
const PostOpportunity = () => {
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      <SEOHead
        path="/post-opportunity"
        title="Submit a Research Opportunity | SHAMS"
        description="Researchers can submit studies and research opportunities for review and posting on the SHAMS Research Opportunities page."
        titleAr="أرسل فرصة بحثية | شمس"
        descriptionAr="يمكن للباحثين إرسال الدراسات والفرص البحثية لمراجعتها ونشرها في صفحة الفرص البحثية لدى شمس."
      />
      
      <main id="main-content" className="flex-grow relative z-10 py-12">
        <div className="container mx-auto px-4">
          <PostOpportunityForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostOpportunity;