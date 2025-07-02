
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const TeamSection = () => {
  const personnel = [
    {
      name: "Dr. Layla Hassan",
      role: "Community Outreach Director",
      email: "l.hassan@shams.org",
      phone: "(480) 555-1234",
      specialization: "Community engagement and cultural health advocacy"
    },
    {
      name: "Ahmed Mahmoud, LCSW",
      role: "Co-Director",
      email: "a.mahmoud@shams.org",
      phone: "(480) 555-2345",
      specialization: "Culturally responsive mental health services"
    },
    {
      name: "Sarah Nasser, RN",
      role: "Health Education Specialist",
      email: "s.nasser@shams.org",
      phone: "(480) 555-3456",
      specialization: "Health literacy and community education"
    }
  ];

  const affiliatedPhysicians = [
    {
      name: "Dr. Raed Hawa",
      role: "Affiliated Physician & Co-Director",
      email: "r.hawa@shams.org",
      phone: "(480) 555-4567",
      specialization: "Internal medicine and community health"
    }
  ];

  const projectTeam = [
    {
      name: "Amr Al Masri",
      role: "Project Team Committee Lead",
      email: "a.almasri@shams.org",
      phone: "(480) 555-5678",
      specialization: "Project management and strategic planning"
    },
    {
      name: "Mohamed Salem",
      role: "Project Team Committee Lead",
      email: "m.salem@shams.org",
      phone: "(480) 555-6789",
      specialization: "Operations and community outreach"
    },
    {
      name: "Qamar Al Farsi",
      role: "Project Team Committee Lead",
      email: "q.alfarsi@shams.org",
      phone: "(480) 555-7890",
      specialization: "Research and data analysis"
    },
    {
      name: "Lodi Sinanios",
      role: "Project Team Committee Lead",
      email: "l.sinanios@shams.org",
      phone: "(480) 555-8901",
      specialization: "Technology and digital initiatives"
    },
    {
      name: "Mousa El-Sururi",
      role: "Project Team Committee Lead",
      email: "m.elsururi@shams.org",
      phone: "(480) 555-9012",
      specialization: "Community partnerships and engagement"
    }
  ];

  const renderPersonCard = (person, index) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-healthDarkBlue">{person.name}</CardTitle>
        <p className="text-healthTeal font-medium">{person.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 text-sm">{person.specialization}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <a href={`mailto:${person.email}`} className="text-sm text-healthTeal hover:underline">
              {person.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <a href={`tel:${person.phone}`} className="text-sm text-healthTeal hover:underline">
              {person.phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-healthDarkBlue">
          Our Team - Here to Help
        </h2>
        
        {/* Core Team */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-healthDarkBlue">Core Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personnel.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        {/* Affiliated Physicians */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-healthDarkBlue">Affiliated Physicians</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {affiliatedPhysicians.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        {/* Project Team Committee */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-healthDarkBlue">Project Team Committee</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
