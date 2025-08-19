
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeamSection = () => {
  const affiliatedPhysicians = [
    {
      name: "Dr. Raed Hawa",
      role: "Affiliated Physician",
      specialization: "Consultation liaison psychiatry, sleep medicine and obesity medicine"
    }
  ];

  const projectTeam = [
    {
      name: "Mahmoud Noweir",
      role: "Team Member",
      specialization: "Founder and strategic leadership"
    },
    {
      name: "Amr Al Masri",
      role: "Team Member",
      specialization: "Events"
    },
    {
      name: "Mohamed Salem",
      role: "Team Member",
      specialization: "Research and publication"
    },
    {
      name: "Qamar Al Farsi",
      role: "Team Member",
      specialization: "Community partnerships and engagement co-lead"
    },
    {
      name: "Lodi Sinanios",
      role: "Team Member",
      specialization: "Technology and digital initiatives"
    },
    {
      name: "Mousa El-Sururi",
      role: "Team Member",
      specialization: "Community partnerships and engagement and research"
    },
    {
      name: "Sarah Durani",
      role: "Team Member",
      specialization: "Research and community engagement"
    },
    {
      name: "Riad Sankari",
      role: "Team Member",
      specialization: "Healthcare advocacy and outreach"
    },
    {
      name: "Saif Arabiat",
      role: "Team Member",
      specialization: "Digital health and innovation"
    }
  ];

  const renderPersonCard = (person, index) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-healthDarkBlue text-lg md:text-xl leading-tight">{person.name}</CardTitle>
        <p className="text-healthTeal font-medium text-sm md:text-base">{person.role}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{person.specialization}</p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-12 md:py-16 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-healthDarkBlue">
          Our Team
        </h2>
        
        {/* Affiliated Physicians */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue">Affiliated Physicians</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {affiliatedPhysicians.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        {/* Project Team Committee */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue">Project Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
