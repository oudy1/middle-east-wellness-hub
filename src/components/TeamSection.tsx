
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeamSection = () => {
  const affiliatedPhysicians = [
    {
      name: "Dr. Raed Hawa",
      role: "Affiliated Physician & Co-Director",
      specialization: "Internal medicine and community health"
    }
  ];

  const projectTeam = [
    {
      name: "Mahmoud Noweir",
      role: "Director",
      specialization: "Founder and strategic leadership"
    },
    {
      name: "Amr Al Masri",
      role: "Project Team Committee Lead",
      specialization: "Events"
    },
    {
      name: "Mohamed Salem",
      role: "Project Team Committee Lead",
      specialization: "Research and publication"
    },
    {
      name: "Qamar Al Farsi",
      role: "Project Team Committee Lead",
      specialization: "Community partnerships and engagement co-lead"
    },
    {
      name: "Lodi Sinanios",
      role: "Project Team Committee Lead",
      specialization: "Technology and digital initiatives"
    },
    {
      name: "Mousa El-Sururi",
      role: "Project Team Committee Lead",
      specialization: "Community partnerships and engagement and research"
    }
  ];

  const renderPersonCard = (person, index) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-healthDarkBlue">{person.name}</CardTitle>
        <p className="text-healthTeal font-medium">{person.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{person.specialization}</p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-healthDarkBlue">
          Our Team
        </h2>
        
        {/* Affiliated Physicians */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-healthDarkBlue">Affiliated Physicians</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliatedPhysicians.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        {/* Project Team Committee */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-healthDarkBlue">Project Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
